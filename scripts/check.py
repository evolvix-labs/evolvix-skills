#!/usr/bin/env python3
"""Checks the marketplace, the plugins, and every skill against catalog/tools.json.

Run from the repository root: python3 scripts/check.py [--report]
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
IDENT_RE = re.compile(r"^[a-z][a-z0-9]*(_[a-z0-9]+)+$")
CODE_RE = re.compile(r"`([^`\n]+)`")
LINK_RE = re.compile(r"\]\(([^)\s]+)\)")
FRONTMATTER_KEYS = {"name", "description", "license", "compatibility", "metadata"}

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


def check_catalog() -> tuple[set[str], set[str]]:
    data = load_json(ROOT / "catalog" / "tools.json")
    if not data:
        return set(), set()
    tools = {tool["name"] for tool in data["tools"]}
    values = {value for tool in data["tools"] for value in tool.get("values", [])}
    return tools, values


def check_skill(skill_dir: Path, tools: set[str], values: set[str]) -> set[str]:
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

    used: set[str] = set()
    for path in [skill_md, *sorted(skill_dir.glob("references/*.md"))]:
        text = path.read_text(encoding="utf-8")
        for span in CODE_RE.findall(text):
            token = span.strip()
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


def check_plugins(tools: set[str], values: set[str]) -> dict[str, dict[str, set[str]]]:
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
        report[entry["name"]] = {d.name: check_skill(d, tools, values) for d in skill_dirs}
    return report


def main() -> int:
    tools, values = check_catalog()
    report = check_plugins(tools, values)
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
    print("ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())
