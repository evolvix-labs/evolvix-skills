#!/usr/bin/env python3
"""Checks the marketplace, the plugins, and every skill against catalog/tools.json and catalog/evolvix.d.ts.

Run from the repository root: python3 scripts/check.py [--report]
Set TSC to the TypeScript compiler to use; the default is tsc on PATH, else npx typescript.
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
IDENT_RE = re.compile(r"^[a-z][a-z0-9]*(_[a-z0-9]+)+$")
CODE_RE = re.compile(r"`([^`\n]+)`")
LINK_RE = re.compile(r"\]\(([^)\s]+)\)")
METHOD_RE = re.compile(r"^(?:evolvix\.)?([a-z]+(?:[A-Z][a-z0-9]*)+)(?:\(.*\))?$")
FENCE_RE = re.compile(r"^```(\w*)\n(.*?)^```", re.M | re.S)
SHARED_RE = re.compile(r"<!-- shared:start -->\n(.*?)<!-- shared:end -->", re.S)
FRONTMATTER_KEYS = {"name", "description", "license", "compatibility", "metadata"}
# Code mode's own tools sit next to the SDK, so the catalog does not list them.
CODE_MODE_TOOLS = {"execute", "search_api", "apply_changes"}
TSC_FALLBACK = ["npx", "-y", "-p", "typescript@5.9.3", "tsc"]

errors: list[str] = []
warnings: list[str] = []


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT))


def load_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        errors.append(f"{rel(path)}: missing")
    except json.JSONDecodeError as err:
        errors.append(f"{rel(path)}: invalid JSON ({err})")
    return None


def frontmatter(path: Path) -> tuple[dict[str, str], str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        errors.append(f"{rel(path)}: no YAML frontmatter")
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        errors.append(f"{rel(path)}: frontmatter is not closed")
        return {}, text
    fields: dict[str, str] = {}
    key = None
    for line in text[4:end].splitlines():
        match = re.match(r"^([A-Za-z][\w-]*):\s*(.*)$", line)
        if match and not line.startswith(" "):
            key, value = match.group(1), match.group(2).strip()
            fields[key] = "" if value in (">", "|", ">-", "|-") else value.strip("\"'")
        elif key and line.startswith(" "):
            fields[key] = (fields[key] + " " + line.strip()).strip()
    return fields, text[end + 5:]


def method_name(tool: str) -> str:
    parts = [part for part in tool.split("_") if part]
    return parts[0] + "".join(part[:1].upper() + part[1:] for part in parts[1:])


def check_catalog() -> tuple[set[str], set[str], set[str]]:
    data = load_json(ROOT / "catalog" / "tools.json")
    if not data:
        return set(), set(), set()
    tools = {tool["name"] for tool in data["tools"]}
    values = {value for tool in data["tools"] for value in tool.get("values", [])}
    methods = set()
    for tool in data["tools"]:
        if tool.get("method") != method_name(tool["name"]):
            errors.append(f"catalog/tools.json: {tool['name']} needs method {method_name(tool['name'])!r}")
        methods.add(method_name(tool["name"]))
    dts = ROOT / "catalog" / "evolvix.d.ts"
    if not dts.exists():
        errors.append("catalog/evolvix.d.ts: missing")
    else:
        declared = set(re.findall(r"^  (\w+)\(args", dts.read_text(encoding="utf-8"), re.M))
        dts_fields.update(re.findall(r"^\s+(\w+)\??: ", dts.read_text(encoding="utf-8"), re.M))
        for method in sorted(methods - declared):
            errors.append(f"catalog/evolvix.d.ts: no declaration for {method}")
        for method in sorted(declared - methods):
            errors.append(f"catalog/evolvix.d.ts: {method} is not in catalog/tools.json")
    return tools, values, methods


ts_blocks: list[tuple[str, int, str]] = []
dts_fields: set[str] = set()
shared_blocks: dict[str, str] = {}


def line_of(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def check_skill(skill_dir: Path, tools: set[str], values: set[str], methods: set[str]) -> set[str]:
    skill_md = skill_dir / "SKILL.md"
    if not skill_md.exists():
        errors.append(f"{rel(skill_dir)}: no SKILL.md")
        return set()
    fields, body = frontmatter(skill_md)
    name = fields.get("name", "")
    if name != skill_dir.name:
        errors.append(f"{rel(skill_md)}: name {name!r} must equal the folder name {skill_dir.name!r}")
    if not NAME_RE.match(name) or len(name) > 64:
        errors.append(f"{rel(skill_md)}: name must be lowercase words joined by hyphens, at most 64 characters")
    if "claude" in name or "anthropic" in name:
        errors.append(f"{rel(skill_md)}: name may not contain claude or anthropic")
    description = fields.get("description", "")
    if not description:
        errors.append(f"{rel(skill_md)}: description is empty")
    elif len(description) > 1024:
        errors.append(f"{rel(skill_md)}: description is {len(description)} characters, the limit is 1024")
    if "<" in description or ">" in description:
        errors.append(f"{rel(skill_md)}: description may not contain angle brackets")
    for key in fields:
        if key not in FRONTMATTER_KEYS:
            warnings.append(f"{rel(skill_md)}: frontmatter key {key!r} is not part of the Agent Skills spec")
    if body.count("\n") > 500:
        warnings.append(f"{rel(skill_md)}: body is over 500 lines; move detail into references/")

    shared = SHARED_RE.search(body)
    if shared:
        shared_blocks[rel(skill_md)] = shared.group(1)
    else:
        errors.append(f"{rel(skill_md)}: no shared rules block (<!-- shared:start --> ... <!-- shared:end -->)")

    used: set[str] = set()
    for path in [skill_md, *sorted(skill_dir.glob("references/*.md"))]:
        text = path.read_text(encoding="utf-8")
        for fence in FENCE_RE.finditer(text):
            if fence.group(1) == "ts":
                ts_blocks.append((rel(path), line_of(text, fence.start()) + 1, fence.group(2)))
                used.update(t for t in tools if method_name(t) in re.findall(r"evolvix\.(\w+)", fence.group(2)))
            elif fence.group(1) not in ("text", ""):
                errors.append(f"{rel(path)}:{line_of(text, fence.start())}: code blocks are ts or text, not {fence.group(1)!r}")
        prose = FENCE_RE.sub("", text)
        if "\u2014" in prose:
            errors.append(f"{rel(path)}: contains an em dash")
        for span in CODE_RE.findall(prose):
            token = span.strip()
            if token in CODE_MODE_TOOLS:
                continue
            method = METHOD_RE.match(token)
            if method:
                if method.group(1) in methods:
                    used.update(t for t in tools if method_name(t) == method.group(1))
                elif method.group(1) not in dts_fields:
                    errors.append(f"{rel(path)}: `{token}` is neither a method nor a field in catalog/evolvix.d.ts")
                continue
            if not IDENT_RE.match(token):
                continue
            if token in tools:
                used.add(token)
            elif token not in values:
                errors.append(f"{rel(path)}: `{token}` is not a tool in catalog/tools.json or one of their argument values")
        for target in LINK_RE.findall(text):
            if re.match(r"^[a-z]+:", target) or target.startswith("#"):
                continue
            if not (path.parent / target.split("#")[0]).exists():
                errors.append(f"{rel(path)}: link {target!r} does not resolve")
    return used


def check_plugins(tools: set[str], values: set[str], methods: set[str]) -> dict[str, dict[str, set[str]]]:
    report: dict[str, dict[str, set[str]]] = {}
    market = load_json(ROOT / ".claude-plugin" / "marketplace.json")
    if not market:
        return report
    for key in ("name", "owner", "plugins"):
        if key not in market:
            errors.append(f".claude-plugin/marketplace.json: missing {key}")
    for entry in market.get("plugins", []):
        source = ROOT / entry["source"]
        if not source.is_dir():
            errors.append(f"marketplace plugin {entry['name']}: source {entry['source']} does not exist")
            continue
        manifest = load_json(source / ".claude-plugin" / "plugin.json")
        if manifest and manifest.get("name") != entry["name"]:
            errors.append(f"{rel(source)}: plugin.json name {manifest.get('name')!r} differs from the marketplace entry {entry['name']!r}")
        mcp = load_json(source / ".mcp.json")
        if mcp:
            for server, config in mcp.get("mcpServers", {}).items():
                if not str(config.get("url", "")).startswith("https://"):
                    errors.append(f"{rel(source)}/.mcp.json: server {server} needs an https url")
        skills_dir = source / "skills"
        skill_dirs = sorted(d for d in skills_dir.iterdir() if d.is_dir()) if skills_dir.is_dir() else []
        if not skill_dirs:
            errors.append(f"{rel(source)}: no skills")
        report[entry["name"]] = {d.name: check_skill(d, tools, values, methods) for d in skill_dirs}
    return report


def check_shared() -> None:
    if len(set(shared_blocks.values())) > 1:
        first = next(iter(shared_blocks))
        for path, block in shared_blocks.items():
            if block != shared_blocks[first]:
                errors.append(f"{path}: the shared rules block differs from the one in {first}")


def tsc_command() -> list[str] | None:
    if os.environ.get("TSC"):
        return os.environ["TSC"].split()
    if shutil.which("tsc"):
        return ["tsc"]
    if shutil.which("npx"):
        return TSC_FALLBACK
    return None


def check_ts() -> int:
    """Type-checks every ts block as the body of an async function against catalog/evolvix.d.ts."""
    if not ts_blocks:
        return 0
    command = tsc_command()
    if command is None:
        errors.append("no TypeScript compiler: install typescript or set TSC")
        return 0
    with tempfile.TemporaryDirectory() as tmp:
        files = []
        origins: dict[str, tuple[str, int]] = {}
        for i, (path, line, code) in enumerate(ts_blocks):
            name = f"block{i}.ts"
            # One header line, so a reported line minus one is the line inside the block.
            Path(tmp, name).write_text("export async function script() {\n" + code + "}\n", encoding="utf-8")
            files.append(name)
            origins[name] = (path, line)
        Path(tmp, "globals.d.ts").write_text("declare const console: { log(...values: unknown[]): void };\n", encoding="utf-8")
        shutil.copy(ROOT / "catalog" / "evolvix.d.ts", Path(tmp, "evolvix.d.ts"))
        config = {
            "compilerOptions": {
                "strict": True, "noEmit": True, "target": "es2022", "lib": ["es2022"],
                "module": "es2022", "moduleResolution": "bundler", "types": [], "skipLibCheck": False,
                "noUnusedLocals": True,
            },
            "files": ["evolvix.d.ts", "globals.d.ts", *files],
        }
        Path(tmp, "tsconfig.json").write_text(json.dumps(config), encoding="utf-8")
        result = subprocess.run([*command, "-p", "tsconfig.json"], cwd=tmp, capture_output=True, text=True)
        for message in (result.stdout + result.stderr).splitlines():
            match = re.match(r"^(block\d+\.ts)\((\d+),(\d+)\): (.*)$", message)
            if match:
                path, line = origins[match.group(1)]
                errors.append(f"{path}:{line + int(match.group(2)) - 2}: {match.group(4)}")
            elif message.strip() and not message.startswith(" "):
                errors.append(f"tsc: {message}")
            elif message.strip() and errors:
                errors[-1] += " " + message.strip()
        if result.returncode != 0 and not any(e.startswith(("tsc", "plugins")) for e in errors):
            errors.append(f"tsc exited with {result.returncode}")
    return len(ts_blocks)


def main() -> int:
    tools, values, methods = check_catalog()
    report = check_plugins(tools, values, methods)
    check_shared()
    checked = check_ts()
    if "--report" in sys.argv:
        for plugin, skills in report.items():
            print(f"{plugin}")
            for skill, used in skills.items():
                print(f"  {skill} ({len(used)} tools): {', '.join(sorted(used))}")
        used_anywhere = {tool for skills in report.values() for used in skills.values() for tool in used}
        print(f"catalog tools used by a skill: {len(used_anywhere)} of {len(tools)}")
    for message in warnings:
        print(f"warning: {message}")
    for message in errors:
        print(f"error: {message}")
    if errors:
        print(f"{len(errors)} errors")
        return 1
    print(f"ok: {checked} ts blocks type-check against catalog/evolvix.d.ts, {len(shared_blocks)} shared blocks identical")
    return 0


if __name__ == "__main__":
    sys.exit(main())
