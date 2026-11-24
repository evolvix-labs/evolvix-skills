// evolvix.d.ts: the typed API behind execute. Call evolvix.<method>(args) with await; every call returns a Promise.
// A failed call throws EvolvixError. clientId is the relationship id from listClients. A trailing ? marks an optional field.
// Read-only calls run for real. A write that takes dryRun runs as a preview; any other write does not run and returns { pending: true, index }. Both join the changeset.

declare class EvolvixError extends Error {
  code: string;
  argument?: string;
  op: string;
}

// Shared types
interface AiPlanLink {
  kind: string;
  title: string;
  url: string;
}
interface AnalyticsBusinessCheckins {
  due: number;
  received: number;
  reviewed: number;
  reviewedOnTime: number;
  reviewedOnTimeOf: number;
  reviewedOnTimeRate?: number | null;
  medianFeedbackHours?: number | null;
  feedbackSample: number;
  waiting: number;
  waitingAgainstPhase: number;
  late: number;
}
interface AnalyticsBusinessClientCounts {
  active: number;
  paused: number;
  archived: number;
  newInPeriod: number;
  lostInPeriod: number;
  atStart: number;
  lostFromStart: number;
  churnRate?: number | null;
  avgLifetimeDays?: number | null;
  lifetimeSample: number;
}
interface AnalyticsBusinessClientMonth {
  month: string;
  new: number;
  lost: number;
  activeAtEnd: number;
}
interface AnalyticsBusinessClients {
  total: AnalyticsBusinessClientCounts;
  perCoach: AnalyticsBusinessCoachClients[];
  months: AnalyticsBusinessClientMonth[];
}
interface AnalyticsBusinessCoach {
  userId: string;
  name: string;
}
interface AnalyticsBusinessCoachClients {
  coachId: string;
  name: string;
  active: number;
  paused: number;
  archived: number;
  newInPeriod: number;
  lostInPeriod: number;
  atStart: number;
  lostFromStart: number;
  churnRate?: number | null;
  avgLifetimeDays?: number | null;
  lifetimeSample: number;
}
interface AnalyticsBusinessCoachOutcome {
  coachId: string;
  withPhase: number;
  onTrack: number;
  flat: number;
  against: number;
  noData: number;
  onTrackShare?: number | null;
  checkinRate: AnalyticsBusinessRate;
  dailyLogRate: AnalyticsBusinessRate;
}
interface AnalyticsBusinessCoachPerformance {
  coachId: string;
  name: string;
  activeClients: number;
  capacity?: number | null;
  checkins: AnalyticsBusinessCheckins;
  messages: AnalyticsBusinessMessages;
  openFollowUps: number;
  weeks: AnalyticsBusinessCoachWeek[];
}
interface AnalyticsBusinessCoachRevenue {
  coachId: string;
  mrrMinor: number;
  activeSubscriptions: number;
}
interface AnalyticsBusinessCoachWeek {
  weekStart: string;
  received: number;
  reviewedOnTime: number;
  onTimeRate?: number | null;
}
interface AnalyticsBusinessLeadMonth {
  month: string;
  joinSignups: number;
  questionnaires: number;
}
interface AnalyticsBusinessLeads {
  months: AnalyticsBusinessLeadMonth[];
  sources: AnalyticsBusinessSource[];
  hasSources: boolean;
  funnel?: LeadFunnel | null;
}
interface AnalyticsBusinessMessages {
  unreadMessages: number;
  unreadConversations: number;
  medianFirstReplyMinutes?: number | null;
  replySample: number;
  unanswered: number;
  within24hRate?: number | null;
  within24hOf: number;
}
interface AnalyticsBusinessOutcome {
  withPhase: number;
  onTrack: number;
  flat: number;
  against: number;
  noData: number;
  onTrackShare?: number | null;
  checkinRate: AnalyticsBusinessRate;
  dailyLogRate: AnalyticsBusinessRate;
}
interface AnalyticsBusinessOutcomes {
  total: AnalyticsBusinessOutcome;
  perCoach: AnalyticsBusinessCoachOutcome[];
  weightFlagOff: boolean;
}
interface AnalyticsBusinessPeriod {
  key: string;
  from: string;
  to: string;
  timeZone: string;
}
interface AnalyticsBusinessRate {
  due: number;
  submitted: number;
  rate?: number | null;
}
interface AnalyticsBusinessRevenue {
  connected: boolean;
  currency: string;
  mrrMinor: number;
  activeSubscriptions: number;
  trialingSubscriptions: number;
  skippedOtherCurrency: number;
  perCoach: AnalyticsBusinessCoachRevenue[];
  paidInPeriodMinor: number;
  failedPayments: number;
  failedAmountMinor: number;
}
interface AnalyticsBusinessSource {
  joinLinkId: string;
  label: string;
  signups: number;
  becameClients: number;
}
interface AnalyticsBusinessStats {
  period: AnalyticsBusinessPeriod;
  scope: string;
  coachId?: string | null;
  coaches: AnalyticsBusinessCoach[];
  clients: AnalyticsBusinessClients;
  coachPerformance: AnalyticsBusinessCoachPerformance[];
  outcomes: AnalyticsBusinessOutcomes;
  revenue?: AnalyticsBusinessRevenue | null;
  leads?: AnalyticsBusinessLeads | null;
}
interface AutomationAction {
  type: string;
  params: AutomationActionParams;
}
interface AutomationActionCatalog {
  actions: AutomationCatalogEntry[];
}
interface AutomationActionInput {
  params: AutomationActionParamsInput;
  type?: string;
}
interface AutomationActionParams {
  body?: string;
  subject?: string;
  sender?: string;
  coachUserId?: string;
  title?: string;
  description?: string;
  assignee?: string;
  dueInDays?: number;
  priority?: string;
  deepLink?: string;
  formId?: string;
  frequency?: string;
  weekday?: number;
  contentType?: string;
  contentId?: string;
  habitTemplateId?: string;
  tagId?: string;
  private?: boolean;
  module?: string;
  enabled?: boolean;
  milestone?: string;
}
interface AutomationActionParamsInput {
  assignee?: string;
  body?: string;
  coachUserId?: string /*uuid*/;
  contentId?: string /*uuid*/;
  contentType?: string;
  deepLink?: string;
  description?: string;
  dueInDays?: number;
  enabled?: boolean;
  formId?: string /*uuid*/;
  frequency?: string;
  habitTemplateId?: string /*uuid*/;
  milestone?: string;
  module?: string;
  priority?: string;
  private?: boolean;
  sender?: string;
  subject?: string;
  tagId?: string /*uuid*/;
  title?: string;
  weekday?: number;
}
interface AutomationApplyResult {
  dryRun: boolean;
  status: string;
  runs: number;
  enrollmentId?: string;
  preview: AutomationRun[];
  note?: string;
  version?: number;
  draftWaiting?: boolean;
}
interface AutomationCatalogEntry {
  type: string;
  label: string;
  detail: string;
}
interface AutomationCondition {
  type: string;
  params: AutomationConditionParams;
}
interface AutomationConditionInput {
  params?: AutomationConditionParamsInput;
  type?: string;
}
interface AutomationConditionParams {
  tag?: string;
  days?: number;
  week?: number;
}
interface AutomationConditionParamsInput {
  days?: number;
  tag?: string;
  week?: number;
}
interface AutomationEdge {
  from: string;
  to: string;
  port: string;
}
interface AutomationEdgeInput {
  from?: string;
  port?: string;
  to?: string;
}
interface AutomationEnrollment {
  id: string;
  ruleId: string;
  ruleName: string;
  relationshipId: string;
  status: string;
  version: number;
  anchorAt: string;
  startedAt: string;
}
interface AutomationEnrollmentPage {
  items: AutomationEnrollment[];
  active?: number;
  paused?: number;
}
interface AutomationGraph {
  schema: number;
  nodes: unknown[];
  edges: AutomationEdge[];
}
interface AutomationGraphInput {
  edges?: AutomationEdgeInput[];
  nodes?: unknown[];
  schema?: number;
}
interface AutomationOffset {
  days?: number;
  minutes?: number;
  hoursAfter?: number;
}
interface AutomationOffsetInput {
  days?: number;
  hoursAfter?: number;
  minutes?: number;
}
interface AutomationPathStep {
  nodeId: string;
  kind: string;
  at: string;
  outcome?: string;
  why?: string;
}
interface AutomationRepeat {
  everyDays?: number;
  everyWeeks?: number;
  weekdays?: number[];
  count?: number;
  untilDay?: number;
}
interface AutomationRepeatInput {
  count?: number;
  everyDays?: number;
  everyWeeks?: number;
  untilDay?: number;
  weekdays?: number[];
}
interface AutomationRule {
  id: string;
  companyId: string;
  kind: string;
  name: string;
  description?: string;
  status: string;
  version: number;
  revision: number;
  trigger: AutomationTrigger;
  anchor: string;
  settings: AutomationSettings;
  steps: AutomationStep[];
  graph: AutomationGraph;
  templateKey?: string;
  summary: string[];
  unpublishedChanges?: boolean;
  createdAt: string;
  updatedAt: string;
}
interface AutomationRulePage {
  items: AutomationRule[];
}
interface AutomationRun {
  id: string;
  enrollmentId: string;
  stepId?: string;
  nodeId?: string;
  occurrence: number;
  dueAt: string;
  status: string;
  action: string;
  summary: string;
  subject?: string;
  text?: string;
  lastError?: string;
  resultType?: string;
  resultId?: string;
  executedAt?: string;
}
interface AutomationSettings {
  quietHours?: boolean;
  stopOnEnd?: boolean;
  stopOnArchive?: boolean;
  reenroll?: string;
  lengthDays?: number;
}
interface AutomationSettingsInput {
  lengthDays?: number;
  quietHours?: boolean;
  reenroll?: string;
  stopOnArchive?: boolean;
  stopOnEnd?: boolean;
}
interface AutomationStep {
  id: string;
  summary: string;
  offset: AutomationOffset;
  repeat?: AutomationRepeat;
  action: AutomationAction;
  conditions?: AutomationCondition[];
  onConditionFail?: string;
  retryDays?: number;
}
interface AutomationStepInput {
  action: AutomationActionInput;
  offset: AutomationOffsetInput;
  conditions?: AutomationConditionInput[];
  onConditionFail?: string;
  repeat?: AutomationRepeatInput;
  retryDays?: number;
}
interface AutomationTemplateCard {
  key: string;
  name: string;
  kind: string;
  detail: string;
  lengthDays?: number;
  graph?: AutomationGraph;
  trigger?: AutomationTrigger;
  anchor?: string;
}
interface AutomationTemplateList {
  items: AutomationTemplateCard[];
}
interface AutomationTestRunResult {
  ok: boolean;
  errors: OpsFieldError[];
  summary: string[];
  preview: AutomationRun[];
  path: AutomationPathStep[];
  note?: string;
  startsAt?: string;
}
interface AutomationTrigger {
  type: string;
  filter: AutomationTriggerFilter;
}
interface AutomationTriggerCatalog {
  triggers: AutomationCatalogEntry[];
}
interface AutomationTriggerFilter {
  consecutive?: number;
  days?: number;
  formId?: string;
  packageIds?: string[];
  tagIds?: string[];
  daysBefore?: number;
  metric?: string;
  operator?: string;
  value?: number;
  cron?: string;
  weekday?: number;
  percent?: number;
  frequencies?: string[];
  formIds?: string[];
  daysAfter?: number;
  time?: string;
  name?: string;
  winType?: string;
}
interface AutomationTriggerFilterInput {
  consecutive?: number;
  cron?: string;
  days?: number;
  daysAfter?: number;
  daysBefore?: number;
  formId?: string /*uuid*/;
  formIds?: string[] /*uuid*/;
  frequencies?: string[];
  metric?: string;
  name?: string;
  operator?: string;
  packageIds?: string[] /*uuid*/;
  percent?: number;
  tagIds?: string[] /*uuid*/;
  time?: string;
  value?: number;
  weekday?: number;
  winType?: string;
}
interface AutomationTriggerInput {
  filter?: AutomationTriggerFilterInput;
  type?: string;
}
interface AutopilotDraft {
  state: string;
  summary: string;
  feedback: string;
  dosesRemoved: boolean;
  links: AiPlanLink[];
  linksText: string;
}
interface AutopilotPreparedCheckin {
  checkinId: string;
  reviewed: boolean;
  draft: AutopilotDraft;
  proposal?: AutopilotProposal | null;
  noProposal: string;
  followUp?: string | null;
  changeApplied: boolean;
}
interface AutopilotProposal {
  rule: string;
  macro: string;
  grams: number;
  dayTypeKeys: string[];
  reason: string;
  preview: PlansNutritionPlanChangePreview;
  bases: PlansNutritionPlanChangeBase[];
  fingerprint: string;
}
interface AutopilotSpokenMove {
  macro: "protein" | "carbs" | "fat";
  dayTypeKeys?: string[];
  grams?: number;
  token?: string;
}
interface BloodworkCycleSpan {
  phase: string;
  startsOn: string;
  endsOn?: string | null;
}
interface BloodworkDocumentRef {
  id: string;
  name: string;
}
interface BloodworkDue {
  on: string;
  daysOut: number;
  reason: string;
  phase?: string | null;
}
interface BloodworkList {
  panels: BloodworkPanel[];
  markers: BloodworkMarker[];
  canEnter: boolean;
  schedule?: BloodworkSchedule | null;
  due?: BloodworkDue | null;
  hasMore: boolean;
}
interface BloodworkMarker {
  key: string;
  name: string;
  unit: string;
  custom: boolean;
}
interface BloodworkPanel {
  id: string;
  takenOn: string;
  labName: string;
  notes: string;
  results: BloodworkResult[];
  document?: BloodworkDocumentRef | null;
  enteredBy: string;
  canEdit: boolean;
  createdAt: string;
}
interface BloodworkPanelResult {
  dryRun: boolean;
  panel: BloodworkPanel;
}
interface BloodworkPhaseSpan {
  kind: string;
  name: string;
  startsOn: string;
  endsOn?: string | null;
}
interface BloodworkPoint {
  panelId: string;
  date: string;
  value: number;
  refLow?: number | null;
  refHigh?: number | null;
  flag?: string | null;
}
interface BloodworkReportInput {
  uploadId: string /*uuid*/;
  name?: string;
  visibleToClient?: boolean;
}
interface BloodworkResult {
  marker: string;
  name: string;
  value: number;
  unit: string;
  refLow?: number | null;
  refHigh?: number | null;
  flag?: string | null;
}
interface BloodworkResultInput {
  marker?: string;
  refHigh?: number;
  refLow?: number;
  unit?: string;
  value?: number;
}
interface BloodworkSchedule {
  everyWeeks?: number | null;
  beforePhaseEndWeeks?: number | null;
  remindClient: boolean;
}
interface BloodworkScheduleResult {
  dryRun: boolean;
  schedule?: BloodworkSchedule | null;
  due?: BloodworkDue | null;
}
interface BloodworkTrend {
  marker: BloodworkMarker;
  unit: string;
  points: BloodworkPoint[];
  otherUnit: number;
  phases: BloodworkPhaseSpan[];
  cycle: BloodworkCycleSpan[];
}
interface Brief {
  checkinId: string;
  header: BriefHeader;
  weights: BriefWeights;
  changes: BriefChange[];
  lastKcalChange?: BriefKcalChange | null;
  energy: BriefEnergy;
  thisWeek: BriefRow[];
  context: BriefContext;
  waitingForOk: BriefWaiting[];
  questions: BriefQuestions;
  flags: Flag[];
  outliers: SubmitOutlier[];
  muted: FlagsMute[];
  mutedCount: number;
  lifeMode?: FlagsModeNote | null;
  duringMode: Flag[];
  remembered: BriefRemembered[];
  recovery?: BriefRecovery | null;
  followUps: FollowupsCheckinFollowUp[];
}
interface BriefBloodworkDue {
  date: string;
  daysOut: number;
}
interface BriefChange {
  date: string;
  planWeek?: number | null;
  source: string;
  what: string;
  from?: string | null;
  to?: string | null;
  unit?: string | null;
}
interface BriefContest {
  name: string;
  date: string;
  weeksOut: number;
  daysOut: number;
}
interface BriefContext {
  phaseWeeksLeft?: number | null;
  nextPhase?: BriefNextPhase | null;
  contest?: BriefContest | null;
  bloodworkDue?: BriefBloodworkDue | null;
  bloodwork: string;
}
interface BriefDecision {
  date: string;
  source: string;
  text: string;
}
interface BriefEnergy {
  label?: string | null;
  percent?: number | null;
  intakePerDay?: number | null;
  maintenancePerDay?: number | null;
  maintenanceWeek?: number | null;
  maintenanceFrom?: string | null;
  tdPerWeek?: number | null;
  skip: string;
  reason: string;
}
interface BriefHeader {
  week?: number | null;
  start: string;
  end: string;
  phase?: BriefPhaseNow | null;
  lastChange?: BriefLastChange | null;
  contest?: BriefContest | null;
  cyclePhase?: string | null;
}
interface BriefKcalChange {
  date: string;
  weeksAgo: number;
}
interface BriefLastChange {
  date: string;
  weeksAgo: number;
  source: string;
  text: string;
}
interface BriefNextPhase {
  kind: string;
  name: string;
  startsOn: string;
}
interface BriefPhaseNow {
  kind: string;
  name: string;
  week: number;
  totalWeeks?: number | null;
}
interface BriefQuestion {
  source: string;
  at: string;
  text: string;
  voiceMs?: number | null;
  label?: string | null;
}
interface BriefQuestions {
  items: BriefQuestion[];
  total: number;
}
interface BriefRecovery {
  title: string;
  source: string;
  rows: BriefRecoveryRow[];
}
interface BriefRecoveryRow {
  key: string;
  label: string;
  status: string;
  value?: string | null;
  unit: string;
  usual?: string | null;
  target?: string | null;
  note: string;
  days: number;
  flagged: boolean;
}
interface BriefRemembered {
  kind: string;
  id: string;
  title: string;
  text: string;
  code?: string | null;
}
interface BriefRow {
  key: string;
  label: string;
  value: string;
  target?: string | null;
  unit?: string | null;
  note?: string | null;
}
interface BriefStartWeight {
  date: string;
  value: string;
}
interface BriefWaiting {
  id: string;
  text: string;
}
interface BriefWeightWeek {
  start: string;
  end: string;
  planWeek?: number | null;
  average?: string | null;
  low?: string | null;
  high?: string | null;
  weighIns: number;
  current: boolean;
}
interface BriefWeights {
  unit: string;
  weeks: BriefWeightWeek[];
  start?: BriefStartWeight | null;
}
interface CallAgreement {
  id: string;
  text: string;
  taskId?: string | null;
  done: boolean;
  doneAt?: string | null;
}
interface CallAgreementInput {
  text: string;
}
interface CallBrief {
  relationshipId: string;
  mode: string;
  header: CallsBriefHeader;
  call?: CallsClientCall | null;
  sinceLastCall: CallsBriefSince;
  checkin?: CallsBriefCheckin | null;
  adherence: CallsBriefAdherence;
  openQuestions: CallsBriefQuestions;
  flagged: CallsDiscussionItem[];
  lastAgreements?: CallsBriefLastCall | null;
}
interface CallSummary {
  state: string;
  body?: string | null;
  messageId?: string | null;
}
interface CallSummaryInput {
  body: string;
  send?: boolean;
}
interface CallsBriefAdherence {
  from: string;
  to: string;
  training?: CallsBriefTraining | null;
  food?: CallsBriefFood | null;
  habits?: CallsBriefHabits | null;
  cardio: HabitsCardioStanding[];
}
interface CallsBriefAnswer {
  key: string;
  label: string;
  type: string;
  unit?: string | null;
  value: string;
  previous?: string | null;
  delta?: string | null;
  change: string;
  scaleMax?: number;
  metricKey?: string;
}
interface CallsBriefAverage {
  average?: string | null;
  entries: number;
}
interface CallsBriefCheckin {
  id: string;
  formName: string;
  checkinDate: string;
  submittedAt?: string | null;
  reviewed: boolean;
  waiting: boolean;
  new: boolean;
  previousId?: string | null;
  previousDate?: string | null;
  answers: CallsBriefAnswer[];
  freeText: CallsBriefFreeText[];
}
interface CallsBriefFood {
  days: number;
  daysLogged: number;
  daysOnTarget: number;
  tolerancePercent: number;
  proteinAvgG?: number;
  proteinTargetG?: number;
}
interface CallsBriefFreeText {
  key: string;
  label: string;
  text: string;
  new: boolean;
}
interface CallsBriefHabits {
  done: number;
  scheduled: number;
  rate?: number | null;
}
interface CallsBriefHeader {
  firstName: string;
  lastName: string;
  program?: CallsBriefProgram | null;
  phase: PhasesCurrent;
  plannedEndDate?: string | null;
  daysToEnd?: number | null;
}
interface CallsBriefLastCall {
  callId: string;
  endedAt: string;
  agreements: CallAgreement[];
}
interface CallsBriefMeasurement {
  key: string;
  name: string;
  unit: string;
  direction: string;
  basis: string;
  now: string;
  nowOn?: string | null;
  before?: string | null;
  beforeOn?: string | null;
  change?: string | null;
}
interface CallsBriefMessage {
  id: string;
  sentAt: string;
  body: string;
  voiceMs?: number | null;
}
interface CallsBriefPhoto {
  id: string;
  poseKind: string;
  poseLabel?: string | null;
  thumbUrl: string;
  displayUrl: string;
}
interface CallsBriefPhotoSet {
  recordedOn: string;
  photos: CallsBriefPhoto[];
}
interface CallsBriefProgram {
  name: string;
  week?: number | null;
  totalWeeks?: number | null;
}
interface CallsBriefQuestions {
  messages: CallsBriefMessage[];
  messageCount: number;
  tasks: CallsBriefTask[];
}
interface CallsBriefSince {
  lastCallAt?: string | null;
  since: string;
  weight?: CallsBriefWeight | null;
  measurements: CallsBriefMeasurement[];
  photos: CallsBriefPhotoSet[];
}
interface CallsBriefTask {
  id: string;
  title: string;
  dueOn?: string | null;
  assignee?: SubmitPerson | null;
}
interface CallsBriefTraining {
  planned: number;
  done: number;
  skipped: number;
  sessions: number;
}
interface CallsBriefWeight {
  unit: string;
  now: CallsBriefAverage;
  atLastCall: CallsBriefAverage;
  change?: string | null;
}
interface CallsClientCall {
  id: string;
  relationshipId: string;
  mode: string;
  startedAt: string;
  endedAt?: string | null;
  notes: string;
  createdBy?: SubmitPerson | null;
  noteId?: string | null;
  summary: CallSummary;
  agreements: CallAgreement[];
}
interface CallsDiscussionItem {
  id: string;
  sourceType: string;
  sourceId?: string | null;
  text: string;
  createdBy?: SubmitPerson | null;
  createdAt: string;
}
interface CelebrateDetail {
  exercise?: string;
  value?: number;
  previous?: number;
  weeks?: number;
  moved?: number;
  toward?: string;
  phase?: string;
  main?: boolean;
  milestone?: boolean;
}
interface CelebrateSendResult {
  dryRun: boolean;
  message: string;
  win: CelebrateWin;
}
interface CelebrateSettings {
  celebrateMode: string;
  rescueEnabled: boolean;
  rescueAfterHours: number;
  rescueChat: boolean;
}
interface CelebrateWin {
  id: string;
  relationshipId: string;
  clientName: string;
  winType: string;
  title: string;
  detail: CelebrateDetail;
  achievedOn: string;
  status: string;
  message: string;
  sentHow?: string | null;
  handledAt?: string | null;
  count: number;
  others: string[];
}
interface CelebrateWinList {
  items: CelebrateWin[];
}
interface ClientAssignResult {
  assignment?: ClientProgramAssignment | null;
  created: number;
  conflicts: number;
  firstDate?: string | null;
  endDate?: string | null;
  dayTypeChanges: DayChange[];
  nutrition?: NutritionDateNutrition[];
  dryRun: boolean;
}
interface ClientAssignSettings {
  clientCanAddExercises?: boolean;
  clientCanReschedule?: boolean;
  clientCanSkip?: boolean;
  clientCanSwap?: boolean;
  visibilityWeeks?: number;
}
interface ClientAssignmentList {
  assignments: ClientProgramAssignment[];
}
interface ClientCalendarDay {
  date: string;
  dayType: DayView;
  workouts: ClientWorkoutSummary[];
  sessions: ClientSessionSummary[];
}
interface ClientFixedItem {
  position: number;
  state: string;
  doneOn?: string | null;
  workout: ClientWorkoutSummary;
}
interface ClientFixedProgram {
  items: ClientFixedItem[];
  nextUp?: string | null;
  completedOutsideList: ClientSessionSummary[];
  tracked?: boolean;
}
interface ClientModeSwitch {
  startDate?: string;
  weekdays?: number[];
}
interface ClientNewWorkout {
  dayTypeId?: string /*uuid*/;
  name?: string;
}
interface ClientProgramAssignment {
  id: string;
  programId?: string | null;
  programName: string;
  type: string;
  startDate?: string | null;
  endDate?: string | null;
  startWeek: number;
  repeat: boolean;
  status: string;
  removedFrom?: string | null;
  workoutCount: number;
  doneCount: number;
  createdAt: string;
}
interface ClientProgression {
  deloadEveryWeeks?: number;
  deloadSetsFactor?: number;
  deloadWeightFactor?: number;
  repsCap?: number;
  repsPerWeek?: number;
  roundToKg?: number;
  rpePerWeek?: number;
  setsEveryWeeks?: number;
  setsMax?: number;
  weightKgPerWeek?: number;
  weightPercentPerWeek?: number;
}
interface ClientRemoveAssignmentResult {
  assignment: ClientProgramAssignment;
  removed: number;
  dayTypeChanges: DayChange[];
  nutrition?: NutritionDateNutrition[];
  dryRun: boolean;
}
interface ClientRepeatRule {
  everyWeeks?: number;
  until?: string;
}
interface ClientSessionSummary {
  id: string;
  name: string;
  performedOn: string;
  status: string;
  clientWorkoutId?: string | null;
  durationSeconds?: number | null;
  difficulty?: number | null;
  setCount: number;
  prCount: number;
  adHoc: boolean;
}
interface ClientTrainingCalendar {
  timeZone: string;
  mode: string;
  days: ClientCalendarDay[];
  tracked?: boolean;
}
interface ClientTrainingSettings {
  mode: string;
  visibilityWeeks?: number | null;
  clientCanReschedule: boolean;
  clientCanSkip: boolean;
  clientCanSwap: boolean;
  clientCanAddExercises: boolean;
  defaultRestSeconds: number;
  updatedAt: string;
  switched: number;
  dayTypeChanges: DayChange[];
  nutrition?: NutritionDateNutrition[];
  dryRun: boolean;
}
interface ClientWorkout {
  id: string;
  assignmentId?: string | null;
  templateId: string;
  name: string;
  exerciseCount: number;
  scheduledOn?: string | null;
  originalScheduledOn?: string | null;
  position?: number | null;
  weekNumber?: number | null;
  dayIndex?: number | null;
  dayTypeKey: string;
  dayTypeLabel: string;
  status: string;
  skipReason?: string | null;
  hidden: boolean;
  hiddenReason?: string;
  customised: boolean;
  sessionId?: string | null;
  performedOn?: string | null;
  movedAt?: string | null;
  movedByUserId?: string | null;
  movedByName?: string | null;
  workout: WorkoutsDocument;
}
interface ClientWorkoutChange {
  workouts: ClientWorkoutSummary[];
  dayTypeChanges: DayChange[];
  nutrition?: NutritionDateNutrition[];
  dryRun: boolean;
}
interface ClientWorkoutSource {
  new?: ClientNewWorkout;
  templateId?: string /*uuid*/;
}
interface ClientWorkoutSummary {
  id: string;
  assignmentId?: string | null;
  templateId: string;
  name: string;
  exerciseCount: number;
  scheduledOn?: string | null;
  originalScheduledOn?: string | null;
  position?: number | null;
  weekNumber?: number | null;
  dayIndex?: number | null;
  dayTypeKey: string;
  dayTypeLabel: string;
  status: string;
  skipReason?: string | null;
  hidden: boolean;
  hiddenReason?: string;
  customised: boolean;
  sessionId?: string | null;
  performedOn?: string | null;
  movedAt?: string | null;
  movedByUserId?: string | null;
  movedByName?: string | null;
}
interface ClientfinderAnswer {
  rows: ClientfinderRow[];
  total: number;
  truncated: boolean;
  checked: number;
}
interface ClientfinderFilter {
  metric: "weight_change_per_week" | "sleep_avg_hours" | "steps_avg" | "checkins_missed" | "checkins_submitted" | "sessions_done" | "food_log_days" | "days_since_message" | "days_since_active" | "phase" | "life_mode";
  op: "lt" | "lte" | "gt" | "gte" | "eq" | "ne";
  number?: number;
  text?: string;
  unit?: "kg" | "lb" | "h" | "min";
  window?: number;
}
interface ClientfinderHit {
  metric: string;
  window: number;
  number?: number | null;
  text?: string;
  unit?: string;
}
interface ClientfinderRow {
  relationshipId: string;
  firstName: string;
  lastName: string;
  hits: ClientfinderHit[];
  lifeMode?: string | null;
  coachIds: string[];
}
interface ClientsCoach {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isPrimary: boolean;
}
interface ClientsCounts {
  openTasks: number;
  photos: number;
  messages: number;
}
interface ClientsDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  practiceKey: string;
  practiceName: string;
  startDate: string;
  plannedEndDate?: string | null;
  lastActiveAt?: string | null;
  lastCheckinAt?: string | null;
  week: ClientsWeek;
  tags: ClientsTag[];
  coaches: ClientsCoach[];
  attention: string[];
  invitation?: ClientsInvitation | null;
  signals?: ClientsSignals | null;
  pendingCheckinIds?: string[];
  profile: ClientsProfile;
  modules: ClientsModuleState[];
  counts: ClientsCounts;
  avatarUrl?: string | null;
  today?: string | null;
  peakWeekRunning: boolean;
  checkinsKept?: string;
}
interface ClientsEmailCheck {
  state: string;
  relationshipId?: string;
  firstName?: string;
  lastName?: string;
}
interface ClientsImportDefaults {
  access?: string;
  coachUserIds?: string[] /*uuid*/;
  onboardingFlowId?: string;
  packageId?: string /*uuid*/;
  plannedEndDate?: string;
  practiceId?: string /*uuid*/;
  primaryCoachUserId?: string /*uuid*/;
  startDate?: string;
  welcomeMessage?: string;
}
interface ClientsImportRow {
  email?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}
interface ClientsInvitation {
  id: string;
  email: string;
  expiresAt: string;
}
interface ClientsModuleState {
  module: string;
  enabled: boolean;
  source: string;
}
interface ClientsPage {
  items: ClientsRow[];
  nextCursor?: string | null;
  total: number;
  counts: ClientsTabCounts;
}
interface ClientsPhaseSignal {
  kind: string;
  name: string;
}
interface ClientsPreviewRow {
  index: number;
  state: string;
  message: string;
}
interface ClientsProfile {
  sex?: string | null;
  birthDate?: string | null;
  birthDatePrecision?: string | null;
  heightCm?: string | null;
  unitSystem?: string | null;
  companyUnitSystem: string;
  goal?: string | null;
  onboardedAt?: string | null;
  timeZone?: string | null;
  weekStart?: number | null;
}
interface ClientsRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  practiceKey: string;
  practiceName: string;
  startDate: string;
  plannedEndDate?: string | null;
  lastActiveAt?: string | null;
  lastCheckinAt?: string | null;
  week: ClientsWeek;
  tags: ClientsTag[];
  coaches: ClientsCoach[];
  attention: string[];
  invitation?: ClientsInvitation | null;
  signals?: ClientsSignals | null;
  pendingCheckinIds?: string[];
}
interface ClientsSignals {
  program: string;
  phase?: ClientsPhaseSignal | null;
  training: ClientsTrainingSignal;
  nutritionPercent?: number | null;
  weight: ClientsWeightReading[];
}
interface ClientsTabCounts {
  current: number;
  invited: number;
  paused: number;
  archived: number;
}
interface ClientsTag {
  id: string;
  name: string;
  color: string;
}
interface ClientsTagItem {
  id: string;
  name: string;
  color: string;
  clientCount: number;
}
interface ClientsTrainingSignal {
  done: number;
  planned: number;
  weekFrom: string;
  days: string[];
}
interface ClientsWeek {
  current: number;
  total?: number | null;
  state: string;
  label: string;
}
interface ClientsWeightReading {
  on: string;
  kg: number;
}
interface CoachQuestion {
  id: string;
  relationshipId: string;
  clientName: string;
  checkinId?: string | null;
  askedBy: CoachquestionsPerson;
  askedTo: CoachquestionsPerson;
  body: string;
  taskId?: string | null;
  createdAt: string;
  resolvedAt?: string | null;
  replies: CoachquestionsReply[];
}
interface CoachquestionsPerson {
  id: string;
  name: string;
}
interface CoachquestionsReply {
  id: string;
  author: CoachquestionsPerson;
  body: string;
  createdAt: string;
}
interface CoachstyleGuide {
  coachId: string;
  sections: CoachstyleSections;
  exists: boolean;
  updatedAt?: string | null;
  editable: boolean;
  starter: CoachstyleSections;
  proposalsOn: boolean;
}
interface CoachstyleProposal {
  id: string;
  section: string;
  rule: string;
  reason: string;
  edits: number;
  status: string;
  createdAt: string;
  decidedAt?: string | null;
}
interface CoachstyleProposals {
  proposals: CoachstyleProposal[];
  waiting: number;
  available: boolean;
}
interface CoachstyleSections {
  language: string;
  structure: string;
  doWords: string;
  dontWords: string;
  goodExamples: string;
  badExamples: string;
}
interface CoachstyleSectionsInput {
  badExamples?: string;
  doWords?: string;
  dontWords?: string;
  goodExamples?: string;
  language?: string;
  structure?: string;
}
interface ContentTheme {
  id: string;
  title: string;
  clientsAtLeast: number;
  example: string;
  coachAnswer: string;
}
interface ContentThemesRun {
  status: string;
  themeCount: number;
  createdAt: string;
}
interface ContentThemesView {
  weekStart: string;
  themes: ContentTheme[];
  run?: ContentThemesRun | null;
  minWriters: number;
}
interface ContentthemesContentCalendar {
  items: ContentthemesContentItem[];
}
interface ContentthemesContentItem {
  id: string;
  themeId?: string | null;
  themeTitle?: string | null;
  format: string;
  title: string;
  body: string;
  scheduledOn?: string | null;
  status: string;
  origin: string;
  createdAt: string;
  updatedAt: string;
}
interface CyclePhaseView {
  phase?: string | null;
  bloodworkDueOn?: string | null;
}
interface CycleWeekMark {
  phase?: string | null;
  clen: boolean;
  bloodwork?: string | null;
}
interface DayChange {
  date: string;
  before: DaySummary;
  after: DaySummary;
}
interface DayCheckinDay {
  date: string;
  counts: DayCheckinDayCounts;
  today: DayCheckinDayRow[];
  late: DayCheckinDayRow[];
  next?: DayCheckinDayNext | null;
  done: boolean;
}
interface DayCheckinDayCounts {
  waiting: number;
  received: number;
  reviewed: number;
  sent: number;
  late: number;
}
interface DayCheckinDayFollowUp {
  id: string;
  body: string;
}
interface DayCheckinDayNext {
  relationshipId: string;
  checkinId: string;
}
interface DayCheckinDayRecap {
  date: string;
  reviewed: number;
  sent: number;
  clients: DayCheckinDayRecapEntry[];
}
interface DayCheckinDayRecapEntry {
  relationshipId: string;
  client: SubmitInboxClient;
  checkinId: string;
  checkinOn: string;
  reviewedAt: string;
  feedbackSent: boolean;
  decisions: BriefDecision[];
  opened: DayCheckinDayFollowUp[];
  closed: DayCheckinDayFollowUp[];
}
interface DayCheckinDayRow {
  relationshipId: string;
  client: SubmitInboxClient;
  status: string;
  checkinId?: string | null;
  formName: string;
  dueOn: string;
  submittedAt?: string | null;
  reviewedAt?: string | null;
  daysLate: number;
  openFollowUps: number;
}
interface DayContributor {
  kind: string;
  id?: string;
  name?: string;
  dayTypeKey: string;
  status?: string;
  hidden: boolean;
  note?: string;
  setBy?: string;
}
interface DayRuleInput {
  dayTypeKey?: string;
  onDate?: string;
  weekday?: number;
}
interface DayRuleView {
  id?: string;
  weekday?: number | null;
  onDate?: string | null;
  dayTypeKey: string;
}
interface DayRules {
  rules: DayRuleView[];
  dayTypeChanges: DayChange[];
}
interface DaySummary {
  primary: string;
  chain: string[];
}
interface DayType {
  id: string;
  companyId?: string | null;
  key: string;
  label: string;
  kind: string;
  fallbackDayTypeId?: string | null;
  priority: number;
  icon: string;
  paletteSlot: number;
  sort: number;
  builtIn: boolean;
  archivedAt?: string | null;
}
interface DayView {
  date: string;
  primary: string;
  chain: string[];
  label: string;
  kind: string;
  icon: string;
  paletteSlot: number;
  source: string;
  contributors: DayContributor[];
  overridable: boolean;
  frozen: boolean;
  beforeStart: boolean;
  nutrition?: unknown;
}
interface DropoutCandidate {
  relationshipId: string;
  firstName: string;
  lastName: string;
  status: string;
  stoppedOn: string;
  window: number;
  weeksCoached: number;
  channel: string;
  email?: string | null;
  coachIds: string[];
}
interface DropoutDetail {
  risk: DropoutRow;
  history: DropoutPoint[];
}
interface DropoutPoint {
  day: string;
  score: number;
  level: string;
}
interface DropoutReasonView {
  code: string;
  points: number;
  text: string;
}
interface DropoutRiskBoard {
  clients: DropoutRow[];
  calculating: boolean;
}
interface DropoutRow {
  relationshipId: string;
  firstName: string;
  lastName: string;
  score: number;
  level: string;
  reasons: DropoutReasonView[];
  computedAt: string;
  levelSince: string;
  lastActiveAt?: string | null;
  lastMessageAt?: string | null;
  snoozed?: DropoutSnooze | null;
  coachIds: string[];
}
interface DropoutSnooze {
  until: string;
  reason: string;
}
interface EnergyWeekBalance {
  start: string;
  end: string;
  tdPerWeek?: number | null;
  tdSource: string;
  tdKcal?: number | null;
  ntdKcal?: number | null;
  intake?: number | null;
  intakePerDay?: number | null;
  weight: EnergyWeightWindow;
  deltaKg?: number | null;
  maintenance?: number | null;
  maintenancePerDay?: number | null;
  skip: string;
  clamped: boolean;
  label: string;
  percent: number;
}
interface EnergyWeekMark {
  weekStart: string;
  reason: string;
  note?: string | null;
}
interface EnergyWeightWindow {
  average?: number | null;
  low?: number | null;
  high?: number | null;
  count: number;
}
interface Exercise {
  id: string;
  companyId?: string | null;
  name: string;
  description: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
  images: ExercisesImage[];
  muscles: ExercisesMuscleRef[];
  type: string;
  level?: string | null;
  equipment?: string | null;
  mechanic?: string | null;
  force?: string | null;
  tracking: string;
  unilateral: boolean;
  countsFor1rm: boolean;
  custom: boolean;
  readOnly: boolean;
  archivedAt?: string | null;
  usedIn: ExercisesUsage;
  createdAt: string;
  updatedAt: string;
}
interface ExercisesFacetCount {
  value: string;
  count: number;
}
interface ExercisesFacets {
  total: number;
  types: ExercisesFacetCount[];
  levels: ExercisesFacetCount[];
  equipment: ExercisesFacetCount[];
  muscles: ExercisesFacetCount[];
  custom: number;
  hasVideo: number;
}
interface ExercisesImage {
  id: string;
  uploadId?: string | null;
  url?: string | null;
  sort: number;
}
interface ExercisesItem {
  id: string;
  companyId?: string | null;
  name: string;
  imageUrl?: string | null;
  imageUploadId?: string | null;
  type: string;
  level?: string | null;
  equipment?: string | null;
  tracking: string;
  primaryMuscles: ExercisesMuscleRef[];
  secondaryMuscles: ExercisesMuscleRef[];
  custom: boolean;
  hasVideo: boolean;
  archivedAt?: string | null;
}
interface ExercisesMuscleRef {
  key: string;
  name?: string;
  role?: string;
}
interface ExercisesMuscleRefInput {
  key?: string;
  name?: string;
  role?: string;
}
interface ExercisesPage {
  items: ExercisesItem[];
  total: number;
}
interface ExercisesUsage {
  libraryWorkouts: number;
  programs: number;
  clientWorkouts: number;
}
interface FeatureItem {
  key: string;
  group: string;
  state: string;
  mode?: string;
  changeBy: string;
  canChange: boolean;
  sendsToClients: boolean;
  sendsToAi: boolean;
  blockedBy?: string;
  on?: number;
  total?: number;
  parts?: FeaturePart[];
}
interface FeatureList {
  role: string;
  canManage: boolean;
  aiEnabled: boolean;
  items: FeatureItem[];
  notice: FeaturesWhatsNewNotice;
}
interface FeaturePart {
  key: string;
  on: boolean;
}
interface FeaturesWhatsNewNotice {
  id: string;
  dismissed: boolean;
}
interface Flag {
  code: string;
  kind: string;
  severity: string;
  reason: string;
  numbers: FlagNumber[];
  key?: string | null;
}
interface FlagNumber {
  label: string;
  value: string;
  unit?: string | null;
}
interface FlagsModeNote {
  kind: string;
  startsOn: string;
  endsOn: string;
  text: string;
  during: string;
}
interface FlagsMute {
  id: string;
  code: string;
  reason: string;
  createdBy: string;
  createdAt: string;
}
interface FollowupsCheckinFollowUp {
  id: string;
  body: string;
  openedCheckinId?: string | null;
  openedOn?: string | null;
  dueOn?: string | null;
  overdue: boolean;
  createdBy: string;
  createdAt: string;
  closed?: FollowupsCheckinFollowUpClosed | null;
}
interface FollowupsCheckinFollowUpClosed {
  at: string;
  by: string;
  checkinId?: string | null;
  checkinOn?: string | null;
}
interface Food {
  id: string;
  companyId?: string | null;
  categoryId?: string | null;
  name: string;
  brand?: string | null;
  servingAmount: string;
  servingUnit: string;
  nutrients: FoodsNutrient[];
  source: string;
  readOnly: boolean;
  hidden: boolean;
  isPantryStaple: boolean;
  archivedAt?: string | null;
  portions: FoodsPortion[];
  barcodes: string[];
  flags: string[];
  offCode?: string;
  micronutrientProfile?: boolean;
}
interface FoodlogChoice {
  date: string;
  mealId: string;
  optionId?: string | null;
  recipeId?: string | null;
  servings?: number | null;
}
interface FoodlogConfirmLine {
  foodId: string /*uuid*/;
  amount?: string;
  portionId?: string /*uuid*/;
  servings?: string;
}
interface FoodlogDay {
  date: string;
  entries: FoodlogEntry[];
  totals: FoodlogDayTotals;
  target?: FoodlogTarget | null;
  remaining?: FoodlogMacros | null;
  byMeal: FoodlogMealGroup[];
  note?: string | null;
  completedAt?: string | null;
  skips: string[];
  choices: FoodlogChoice[];
  editable: boolean;
}
interface FoodlogDayTotals {
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
  entries: number;
}
interface FoodlogEntry {
  id: string;
  date: string;
  loggedAt: string;
  mealKey: string;
  mealId?: string | null;
  mealOptionId?: string | null;
  foodId?: string | null;
  recipeId?: string | null;
  name: string;
  amount?: number | null;
  unit?: string | null;
  portionId?: string | null;
  servings?: number | null;
  source: string;
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
  createdBy?: string | null;
  addedByCoach: boolean;
  edited: boolean;
  offCode?: string | null;
  photoUploadId?: string | null;
}
interface FoodlogLogItem {
  amount?: string;
  carbohydrateG?: string;
  fatG?: string;
  fiberG?: string;
  foodId?: string /*uuid*/;
  kcal?: string;
  name?: string;
  offCode?: string;
  portionId?: string /*uuid*/;
  proteinG?: string;
  recipeId?: string /*uuid*/;
  servings?: string;
}
interface FoodlogMacros {
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
}
interface FoodlogMealGroup {
  mealKey: string;
  mealId?: string | null;
  totals: FoodlogDayTotals;
  entryIds: string[];
}
interface FoodlogTarget {
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
  dayTypeLabel: string;
  planId?: string | null;
  frozen: boolean;
}
interface FoodsNutrient {
  key: string;
  amountPerServing: string;
}
interface FoodsPortion {
  id: string;
  name: string;
  amount: string;
  sort: number;
}
interface FormsApplied {
  dryRun: boolean;
  updated: number;
  skipped: number;
}
interface FormsClientNames {
  total: number;
  names: string[];
}
interface FormsCondition {
  op: "equals" | "any_of" | "gte" | "lte";
  options?: string[];
  profile?: "sex";
  question?: string;
  value?: number;
  yes?: boolean;
}
interface FormsDetail {
  id: string;
  name: string;
  kind: string;
  description: string;
  coverUploadId?: string | null;
  coverUrl?: string | null;
  archived: boolean;
  platform: boolean;
  revision: number;
  editLock: number;
  questionCount: number;
  linkedQuestionCount: number;
  inUse: number;
  inUseClients: FormsClientNames;
  schedule: FormsSchedule;
  sheetPreset?: string | null;
  createdBy?: string | null;
  updatedByName?: string | null;
  createdAt: string;
  updatedAt: string;
  questions: FormsQuestion[];
  isCurrent: boolean;
  answers: number;
  applied?: FormsApplied | null;
}
interface FormsMetricRef {
  id: string;
  key: string;
  name: string;
  unit: string;
  dimension: string;
  decimals: number;
  min?: number;
  max?: number;
}
interface FormsMetricRefInput {
  id: string /*uuid*/;
  decimals?: number;
  dimension?: string;
  key?: string;
  max?: number;
  min?: number;
  name?: string;
  unit?: string;
}
interface FormsOption {
  key?: string;
  label: string;
}
interface FormsOptionInput {
  key?: string;
  label?: string;
}
interface FormsPose {
  pose: string;
  required: boolean;
}
interface FormsPoseInput {
  pose?: string;
  required?: boolean;
}
interface FormsQuestion {
  key?: string;
  label: string;
  type: string;
  required: boolean;
  helpText: string;
  showLastValue?: boolean;
  textLength?: string;
  minChars?: number;
  numberUnit?: string;
  numberDecimals?: number;
  numberMin?: number;
  numberMax?: number;
  allowMultiple?: boolean;
  maxChoices?: number;
  options?: FormsOption[];
  yesLabel?: string;
  noLabel?: string;
  dateLimit?: string;
  scaleLowLabel?: string;
  scaleHighLabel?: string;
  scaleDirection?: string;
  scaleMin?: number;
  scaleMax?: number;
  durationMin?: number;
  durationMax?: number;
  durationStep?: number;
  goodMin?: number;
  goodMax?: number;
  badBelow?: number;
  badAbove?: number;
  flagAnswers?: string[];
  mediaAccept?: string;
  mediaMaxFiles?: number;
  signatureStatement?: string;
  signatureTypedName?: boolean;
  metricId?: string;
  metric?: FormsMetricRef;
  poses?: FormsPose[];
  showIf?: unknown;
}
interface FormsQuestionInput {
  type: "text" | "number" | "choice" | "yes_no" | "date" | "scale" | "stars" | "media" | "signature" | "progress_photos" | "metric" | "duration";
  allowMultiple?: boolean;
  badAbove?: number;
  badBelow?: number;
  dateLimit?: string;
  durationMax?: number;
  durationMin?: number;
  durationStep?: number;
  flagAnswers?: string[];
  goodMax?: number;
  goodMin?: number;
  helpText?: string;
  key?: string;
  label?: string;
  maxChoices?: number;
  mediaAccept?: string;
  mediaMaxFiles?: number;
  metric?: FormsMetricRefInput;
  metricId?: string /*uuid*/;
  minChars?: number;
  noLabel?: string;
  numberDecimals?: number;
  numberMax?: number;
  numberMin?: number;
  numberUnit?: string;
  options?: FormsOptionInput[];
  poses?: FormsPoseInput[];
  required?: boolean;
  scaleDirection?: "higher" | "lower" | "neutral";
  scaleHighLabel?: string;
  scaleLowLabel?: string;
  scaleMax?: number;
  scaleMin?: number;
  showIf?: FormsCondition;
  showLastValue?: boolean;
  signatureStatement?: string;
  signatureTypedName?: boolean;
  textLength?: string;
  yesLabel?: string;
}
interface FormsSchedule {
  frequency?: string | null;
  weekday?: number | null;
  monthDay?: number | null;
  openDaysBefore: number;
  closeAfterDays?: number | null;
  reminderTime?: string | null;
  nudgeTime?: string | null;
  allowExtra: boolean;
  reviewMode?: string;
}
interface FormsScheduleInput {
  allowExtra?: boolean;
  closeAfterDays?: number;
  frequency?: string;
  monthDay?: number;
  nudgeTime?: string;
  openDaysBefore?: number;
  reminderTime?: string;
  reviewMode?: "review" | "log";
  weekday?: number;
}
interface FormsSummary {
  id: string;
  name: string;
  kind: string;
  description: string;
  coverUploadId?: string | null;
  coverUrl?: string | null;
  archived: boolean;
  platform: boolean;
  revision: number;
  editLock: number;
  questionCount: number;
  linkedQuestionCount: number;
  inUse: number;
  inUseClients: FormsClientNames;
  schedule: FormsSchedule;
  sheetPreset?: string | null;
  createdBy?: string | null;
  updatedByName?: string | null;
  createdAt: string;
  updatedAt: string;
}
interface FormsTemplate {
  id: string;
  name: string;
  kind: string;
  description: string;
  coverUploadId?: string | null;
  coverUrl?: string | null;
  archived: boolean;
  platform: boolean;
  revision: number;
  editLock: number;
  questionCount: number;
  linkedQuestionCount: number;
  inUse: number;
  inUseClients: FormsClientNames;
  schedule: FormsSchedule;
  sheetPreset?: string | null;
  createdBy?: string | null;
  updatedByName?: string | null;
  createdAt: string;
  updatedAt: string;
  preview: FormsTemplateQuestion[];
}
interface FormsTemplateQuestion {
  label: string;
  type: string;
}
interface GroceryCustomItem {
  id: string;
  text: string;
  sort: number;
  checked: boolean;
}
interface GroceryGroup {
  key: string;
  label: string;
  pantry: boolean;
  items: GroceryItem[];
}
interface GroceryItem {
  foodId: string;
  name: string;
  brand?: string | null;
  amount: number;
  unit: string;
  displayAmount: string;
  portionText?: string | null;
  uses: GroceryUse[];
  checked: boolean;
}
interface GroceryList {
  from: string;
  to: string;
  choices: string;
  groups: GroceryGroup[];
  customItems: GroceryCustomItem[];
  noLongerNeeded: GroceryItem[];
  daysWithoutMeals: string[];
  itemCount: number;
  checkedCount: number;
}
interface GroceryUse {
  date: string;
  mealName: string;
  amount: number;
}
interface Habit {
  id: string;
  relationshipId: string;
  templateId?: string | null;
  emoji: string;
  name: string;
  description: string;
  goal: HabitGoal;
  reminderTime?: string | null;
  reminderMuted: boolean;
  startedOn: string;
  endedOn?: string | null;
  paused: boolean;
  sort: number;
  stats: HabitStats;
  last7: HabitDay[];
  cardio?: HabitCardio | null;
}
interface HabitCardio {
  period: string;
  start: string;
  end: string;
  amount: number;
  target: number;
  done: boolean;
  weeks: HabitsCardioWeek[];
  activities: HabitsCardioActivity[];
}
interface HabitCompletion {
  relationshipId: string;
  firstName: string;
  lastName: string;
  done: number;
  scheduled: number;
  rate: number;
}
interface HabitCompletionList {
  days: number;
  below: number;
  clients: HabitCompletion[];
}
interface HabitDay {
  date: string;
  state: string;
  amount?: number | null;
  target?: number | null;
}
interface HabitGoal {
  kind: string;
  targetAmount?: number | null;
  unit?: string | null;
  period: string;
  scheduleDays: number[];
  timesPerWeek?: number | null;
  measure?: string | null;
  minMinutes?: number | null;
  activityTypes: string[];
}
interface HabitGoalInput {
  activityTypes?: string[];
  kind?: "check" | "amount" | "cardio";
  measure?: "minutes" | "sessions";
  minMinutes?: number;
  period?: "daily" | "weekly";
  scheduleDays?: number[];
  targetAmount?: string;
  timesPerWeek?: number;
  unit?: string;
}
interface HabitInput {
  description?: string;
  emoji?: string;
  goal?: HabitGoalInput;
  name?: string;
  reminderTime?: string;
  startedOn?: string;
  templateId?: string /*uuid*/;
}
interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  unit: string;
}
interface HabitSummary {
  weekStart: string;
  days: string[];
  rows: HabitSummaryRow[];
  average: HabitSummaryAverage;
}
interface HabitSummaryAverage {
  perDay: HabitSummaryDay[];
  done: number;
  scheduled: number;
  rate?: number | null;
}
interface HabitSummaryDay {
  date: string;
  done: number;
  scheduled: number;
}
interface HabitSummaryRow {
  habit: Habit;
  cells: HabitDay[];
  done: number;
  scheduled: number;
  rate?: number | null;
}
interface HabitTemplate {
  id: string;
  emoji: string;
  name: string;
  description: string;
  goal: HabitGoal;
  reminderTime?: string | null;
  source: string;
  usedBy: number;
  archived: boolean;
}
interface HabitToday {
  date: string;
  done: number;
  scheduled: number;
  items: HabitTodayItem[];
}
interface HabitTodayItem {
  habit: Habit;
  state: string;
  amount?: number | null;
  target?: number | null;
  streak: number;
}
interface HabitUser {
  id: string;
  firstName: string;
}
interface HabitsCardioActivity {
  id: string;
  source: string;
  type: string;
  date: string;
  startedAt?: string | null;
  minutes: number;
  counted: boolean;
  note: string;
  addedBy?: HabitUser | null;
}
interface HabitsCardioStanding {
  habitId: string;
  name: string;
  measure: string;
  period: string;
  thisWeek: HabitsCardioWeek;
  lastWeek: HabitsCardioWeek;
}
interface HabitsCardioWeek {
  start: string;
  end: string;
  amount: number;
  target: number;
  done: boolean;
}
interface HealthCardioWeekTotals {
  start: string;
  end: string;
  minutes: number;
  sessions: number;
}
interface HealthPoint {
  date: string;
  value: number;
  source: string;
  method?: string;
}
interface HealthSourceStatus {
  platform: string;
  connected: boolean;
  lastSyncAt?: string | null;
}
interface HealthSummary {
  period: string;
  start: string;
  end: string;
  previousStart: string;
  connected: boolean;
  lastSyncAt?: string | null;
  sources: HealthSourceStatus[];
  shared: string[];
  tiles: HealthTile[];
  days: HealthSummaryDay[];
  workouts: HealthWorkoutTotals;
  workoutList: HealthWorkout[];
  cardio: HealthCardioWeekTotals[];
}
interface HealthSummaryDay {
  date: string;
  steps?: number | null;
  activeEnergyKcal?: number | null;
  sleepMinutes?: number | null;
  restingHeartRate?: number | null;
  hrvMs?: number;
  hrvMethod?: string;
  sleepAwakeMinutes?: number;
  sleepRemMinutes?: number;
  sleepCoreMinutes?: number;
  sleepDeepMinutes?: number;
  bedTime?: number;
  wakeTime?: number;
  respiratoryRate?: number;
  bloodOxygenPct?: number;
  vo2Max?: number;
}
interface HealthTile {
  type: string;
  unit: string;
  days: number;
  total?: number | null;
  average?: number | null;
  previousAverage?: number | null;
  changePct?: number | null;
  peak?: HealthPoint | null;
}
interface HealthWorkout {
  id: string;
  type: string;
  startedAt: string;
  endedAt: string;
  energyKcal?: number;
  distanceM?: number;
}
interface HealthWorkoutTotals {
  count: number;
  minutes: number;
  energyKcal?: number | null;
  previousCount: number;
}
interface HttpserverAttachmentResponse {
  id: string;
  uploadId: string;
  fileName: string;
  kind: string;
  contentType: string;
  byteSize: number;
  width?: number | null;
  height?: number | null;
  durationMs?: number | null;
  hasPoster: boolean;
  waveform: number[];
}
interface HttpserverChatReferenceItem {
  type: string;
  id: string;
  title: string;
  shared: boolean;
  shareable: boolean;
}
interface HttpserverChatReferencesResponse {
  items: HttpserverChatReferenceItem[];
}
interface HttpserverConversationListResponse {
  items: HttpserverConversationResponse[];
  nextCursor?: string | null;
}
interface HttpserverConversationResponse {
  relationshipId: string;
  asClient: boolean;
  title: string;
  peerFirstName: string;
  peerLastName: string;
  peerAvatarUrl?: string | null;
  peerAvatarUploadId?: string | null;
  clientStatus: string;
  lastMessage?: HttpserverPreviewResponse | null;
  unreadCount: number;
  lastReadByPeerAt?: string | null;
  muted: boolean;
}
interface HttpserverDayCalendarNutrition {
  timeZone: string;
  followTraining: boolean;
  days: HttpserverDayViewNutrition[];
}
interface HttpserverDayRulesNutrition {
  rules: DayRuleView[];
  dayTypeChanges: DayChange[];
  nutrition?: NutritionDateNutrition[];
  dryRun: boolean;
}
interface HttpserverDayViewNutrition {
  date: string;
  primary: string;
  chain: string[];
  label: string;
  kind: string;
  icon: string;
  paletteSlot: number;
  source: string;
  contributors: DayContributor[];
  overridable: boolean;
  frozen: boolean;
  beforeStart: boolean;
  nutrition?: NutritionDayNutrition;
}
interface HttpserverDayWriteNutrition {
  day: HttpserverDayViewNutrition;
  dayTypeChanges: DayChange[];
  dryRun: boolean;
  nutrition?: NutritionDateNutrition[];
}
interface HttpserverMeResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  active: boolean;
  platformAdmin?: boolean;
  timeZone?: string | null;
  weekStart?: number | null;
  locale: string;
  localePreference?: string | null;
  appOnboardedAt?: string | null;
}
interface HttpserverMessageReference {
  type: string;
  id: string;
  title: string;
  available: boolean;
}
interface HttpserverMessageReferenceInput {
  id: string /*uuid*/;
  type: "document" | "resource" | "program" | "nutrition_plan" | "form" | "habit" | "recipe" | "collection";
}
interface HttpserverMessageResponse {
  id: string;
  senderUserId: string;
  senderFirstName: string;
  senderLastName: string;
  senderRole: string;
  senderAvatarUploadId?: string | null;
  body: string;
  kind: string;
  refId?: string | null;
  sentAt: string;
  playedAt?: string | null;
  attachments: HttpserverAttachmentResponse[];
  references: HttpserverMessageReference[];
  video?: VideolinkLink;
  replyTo?: HttpserverQuoteResponse;
}
interface HttpserverMessagesResponse {
  messages: HttpserverMessageResponse[];
  hasMore: boolean;
}
interface HttpserverMyRelationship {
  id: string;
  companyId: string;
  asClient: boolean;
  modules: string[];
  startDate: string;
}
interface HttpserverPreviewResponse {
  id: string;
  senderUserId: string;
  senderFirstName: string;
  senderLastName: string;
  senderRole: string;
  body: string;
  photoCount: number;
  videoCount: number;
  voiceCount: number;
  voiceDurationMs?: number | null;
  referenceCount: number;
  sentAt: string;
}
interface HttpserverQuoteResponse {
  id: string;
  senderUserId: string;
  senderRole: string;
  senderFirstName?: string;
  kind: string;
  excerpt?: string;
  durationMs?: number;
  photoCount?: number;
}
interface HttpserverSavedReplyResponse {
  id: string;
  title: string;
  body: string;
  shared: boolean;
  createdAt: string;
  updatedAt: string;
}
interface HttpserverStyleDecision {
  proposal: CoachstyleProposal;
  dryRun: boolean;
}
interface HttpserverStyleGuideSaved {
  guide: CoachstyleGuide;
  dryRun: boolean;
  changed: string[];
}
interface InvitationsJoinRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  linkLabel?: string | null;
  tagName?: string | null;
  checkinId?: string | null;
  onboardingDraft?: OpsOnboardingDraftBadge | null;
}
interface InvitationsJoinRequests {
  items: InvitationsJoinRequest[];
  count: number;
}
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  source: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
  landingPath: string;
  firstTouchAt: string;
  lastTouchAt: string;
  status: string;
  lostReason: string;
  assignedCoach?: LeadCoach | null;
  notes: string;
  tags: string[];
  magnet: string;
  answers: Record<string, string>;
  marketingConsentAt?: string | null;
  relationshipId?: string | null;
  contactedAt?: string | null;
  callBookedAt?: string | null;
  wonAt?: string | null;
  lostAt?: string | null;
  createdAt: string;
}
interface LeadCoach {
  id: string;
  firstName: string;
  lastName: string;
}
interface LeadDetail {
  lead: Lead;
  events: LeadEvent[];
  coaches: LeadCoach[];
  dryRun?: boolean;
}
interface LeadEvent {
  id: string;
  kind: string;
  fromStatus?: string | null;
  toStatus?: string | null;
  body: string;
  actorName: string;
  createdAt: string;
}
interface LeadFunnel {
  days: number;
  from: string;
  to: string;
  currency: string;
  total: LeadsFunnelCounts;
  sources: LeadsFunnelSource[];
  coaches: LeadsFunnelCoach[];
  magnets: LeadsFunnelMagnet[];
}
interface LeadList {
  items: Lead[];
  counts: LeadStatusCount[];
  coaches: LeadCoach[];
}
interface LeadStatusCount {
  status: string;
  count: number;
}
interface LeadsFunnelCoach {
  coachId?: string | null;
  firstName: string;
  lastName: string;
  leads: number;
  contacted: number;
  calls: number;
  won: number;
  lost: number;
  churned: number;
  revenueMinor: number;
}
interface LeadsFunnelCounts {
  leads: number;
  contacted: number;
  calls: number;
  won: number;
  lost: number;
  churned: number;
  revenueMinor: number;
}
interface LeadsFunnelMagnet {
  source: string;
  magnet: string;
  title: string;
  leads: number;
  contacted: number;
  calls: number;
  won: number;
}
interface LeadsFunnelSource {
  source: string;
  leads: number;
  contacted: number;
  calls: number;
  won: number;
  lost: number;
  churned: number;
  revenueMinor: number;
}
interface LifemodesMode {
  id: string;
  kind: string;
  note: string;
  startsOn: string;
  endsOn: string;
  pauseReminders: boolean;
  source: string;
  active: boolean;
}
interface MagnetsAnswer {
  id: string;
  text: string;
  points: Record<string, number>;
}
interface MagnetsAnswerInput {
  id?: string;
  points?: Record<string, number>;
  text?: string;
}
interface MagnetsOutcome {
  id: string;
  title: string;
  text: string;
  cta: string;
  ctaLabel: string;
  ctaUrl: string;
}
interface MagnetsOutcomeInput {
  cta: "apply" | "call" | "none";
  ctaLabel?: string;
  ctaUrl?: string;
  id?: string;
  text?: string;
  title?: string;
}
interface MagnetsOutcomeStat {
  id: string;
  title: string;
  completions: number;
  leads: number;
}
interface MagnetsOverview {
  companySlug: string;
  tools: MagnetsToolStat[];
  quizzes: MagnetsQuizStat[];
}
interface MagnetsQuestion {
  id: string;
  text: string;
  answers: MagnetsAnswer[];
}
interface MagnetsQuestionInput {
  answers?: MagnetsAnswerInput[];
  id?: string;
  text?: string;
}
interface MagnetsQuiz {
  id: string;
  slug: string;
  title: string;
  enabled: boolean;
  intro: string;
  gateEmail: boolean;
  questions: MagnetsQuestion[];
  outcomes: MagnetsOutcome[];
  dryRun?: boolean;
}
interface MagnetsQuizResults {
  id: string;
  slug: string;
  title: string;
  visits: number;
  completions: number;
  leads: number;
  outcomes: MagnetsOutcomeStat[];
}
interface MagnetsQuizStat {
  id: string;
  slug: string;
  title: string;
  enabled: boolean;
  questions: number;
  visits: number;
  completions: number;
  leads: number;
}
interface MagnetsToolStat {
  key: string;
  enabled: boolean;
  visits: number;
  leads: number;
}
interface MetricDef {
  id: string;
  key: string;
  name: string;
  unit: string;
  canonicalUnit: string;
  dimension: string;
  decimals: number;
  direction: string;
  description: string;
  pair?: MetricPair;
}
interface MetricGoal {
  targetValue: number;
  display: string;
  startDate: string;
  goalDate?: string | null;
  endDate?: string | null;
}
interface MetricImportConflict {
  index: number;
  date: string;
  key: string;
  existing: string;
  incoming: string;
  unit: string;
}
interface MetricImportInvalid {
  index: number;
  field: string;
  message: string;
}
interface MetricImportResult {
  dryRun: boolean;
  onConflict: string;
  accepted: number;
  written: number;
  conflicts: MetricImportConflict[];
  conflictCount: number;
  invalid: MetricImportInvalid[];
  invalidCount: number;
  rows?: MetricImportRowCheck[];
  warnings?: MetricImportWarning[];
}
interface MetricImportRow {
  date?: string;
  key?: string;
  unit?: string;
  value?: string;
}
interface MetricImportRowCheck {
  index: number;
  date: string;
  key: string;
  value: string;
  unit: string;
  conflict?: boolean;
  flagged?: boolean;
  neighbourMedian?: string;
}
interface MetricImportWarning {
  kind: string;
  key: string;
  incoming: string;
  saved: string;
  unit: string;
}
interface MetricPair {
  group: string;
  partner: string;
  first: boolean;
}
interface MetricReading {
  date: string;
  value: number;
  display: string;
}
interface MetricTrend {
  metric: MetricDef;
  entries: MetricsLoggedEntry[];
  target?: MetricGoal | null;
  summary: MetricsTrendSummary;
}
interface MetricWeek {
  weekStart: string;
  days: string[];
  rows: MetricWeekRow[];
}
interface MetricWeekCell {
  date: string;
  value?: number | null;
  display?: string | null;
}
interface MetricWeekRow {
  metric: MetricDef;
  cells: MetricWeekCell[];
  average?: string | null;
  previousAverage?: string | null;
  change?: string | null;
}
interface MetricsBatchEntry {
  key?: string;
  mealContext?: string;
  note?: string;
  unit?: string;
  value?: string;
}
interface MetricsLoggedEntry {
  date: string;
  value: number;
  display: string;
  note: string;
  source: string;
  mealContext?: string;
}
interface MetricsTrackedMetric {
  id: string;
  key: string;
  name: string;
  unit: string;
  canonicalUnit: string;
  dimension: string;
  decimals: number;
  direction: string;
  directionOverride?: string | null;
  description: string;
  visibleToClient: boolean;
  sort: number;
  latest?: MetricReading | null;
  target?: MetricGoal | null;
  pair?: MetricPair;
}
interface MetricsTrendSummary {
  entries: number;
  unit: string;
  first?: string | null;
  last?: string | null;
  change?: string | null;
  changePct?: string | null;
  average?: string | null;
  previousAverage?: string | null;
  direction: string;
  towardGoal?: boolean | null;
}
interface MicrosCounts {
  met: number;
  low: number;
  over: number;
  incomplete: number;
}
interface MicrosDay {
  date: string;
  visible: boolean;
  reference: string;
  source: string;
  profile: MicrosProfile;
  dayKcal?: number | null;
  eatenKcal: number;
  entries: number;
  minCoverage: number;
  counts: MicrosCounts;
  nutrients: MicrosNutrientDay[];
}
interface MicrosNutrientDay {
  key: string;
  group: string;
  unit: string;
  intake: number;
  target?: number | null;
  referenceTarget?: number | null;
  upperLimit?: number | null;
  percent?: number | null;
  coverage: number;
  status: string;
  perMegajoule: boolean;
  missing?: string | null;
  override?: MicrosOverride | null;
}
interface MicrosNutrientRange {
  key: string;
  group: string;
  unit: string;
  averageIntake: number;
  averageTarget?: number | null;
  averagePercent?: number | null;
  upperLimit?: number | null;
  days: MicrosCounts;
  statuses: string[];
  override?: MicrosOverride | null;
}
interface MicrosOverride {
  amount: number;
  setBy: string;
  setByName?: string | null;
  updatedAt: string;
}
interface MicrosProfile {
  sex?: string | null;
  age?: number | null;
  missing: string[];
}
interface MicrosRange {
  from: string;
  to: string;
  visible: boolean;
  reference: string;
  source: string;
  profile: MicrosProfile;
  dates: string[];
  loggedDays: number;
  minCoverage: number;
  dataSince?: string | null;
  nutrients: MicrosNutrientRange[];
}
interface MinicheckinAnswer {
  key: string;
  kind: string;
  value: string;
}
interface MinicheckinBrief {
  id: string;
  leadId: string;
  name: string;
  email: string;
  language: string;
  createdAt: string;
  answeredAt?: string | null;
  answerBefore: string;
  answers: MinicheckinAnswer[];
  photos: string[];
  photoConsent: boolean;
  leadExisted: boolean;
}
interface MinicheckinItem {
  id: string;
  leadId: string;
  name: string;
  email: string;
  goal: string;
  createdAt: string;
  answeredAt?: string | null;
  photoCount: number;
  leadExisted: boolean;
}
interface MinicheckinList {
  items: MinicheckinItem[];
  open: number;
}
interface NutritionDateNutrition {
  date: string;
  planName?: string | null;
  kcal?: number | null;
  before: NutritionSide;
  after: NutritionSide;
}
interface NutritionDay {
  date: string;
  day: DayView;
  mode?: string | null;
  requestedKey: string;
  matchedKey?: string | null;
  slotDayTypeKey?: string | null;
  fallbackUsed: boolean;
  reason?: string | null;
  plan?: NutritionPlanRef | null;
  target?: unknown;
  targetSource?: string | null;
  mealTargets: NutritionMealTarget[];
  meals: NutritionMeal[];
  frozen: boolean;
  snapshot?: NutritionSnapshotInfo | null;
  adjustment?: NutritionDayChangeG;
}
interface NutritionDayChangeG {
  source: string;
  proteinG: number;
  carbohydrateG: number;
  fatG: number;
}
interface NutritionDayLabel {
  key: string;
  label: string;
  sort: number;
}
interface NutritionDayLabelInput {
  key?: string;
  label?: string;
  sort?: number;
}
interface NutritionDayNutrition {
  requestedKey: string;
  matchedKey?: string | null;
  fallbackUsed: boolean;
  planName?: string | null;
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  targetSource?: string | null;
  frozen: boolean;
}
interface NutritionDocument {
  name: string;
  mode: string;
  cycleLength?: number | null;
  startDate: string;
  labels: NutritionDayLabel[];
  slots: NutritionSlot[];
  rules: NutritionLabelRule[];
}
interface NutritionEverydayWrite {
  mode: string;
  target: unknown;
  dayTypeChanges: DayChange[];
  nutrition: NutritionDateNutrition[];
  dryRun: boolean;
}
interface NutritionLabelRule {
  dayTypeKey?: string;
  dayLabelKey: string;
  onDate?: string | null;
  weekday?: number | null;
}
interface NutritionLabelRuleInput {
  dayLabelKey?: string;
  dayTypeKey?: string;
  onDate?: string;
  weekday?: number;
}
interface NutritionMeal {
  id: string;
  name: string;
  sort: number;
  foods: NutritionMealFood[];
  nutrients: NutritionNutrientAmount[];
  options: NutritionMealOption[];
  defaultOptionId?: string | null;
}
interface NutritionMealFood {
  foodId: string;
  name: string;
  amount: string;
  unit?: string;
  sort: number;
  nutrients: NutritionNutrientAmount[];
  changedInCurrentVersion: boolean;
  previousAmount?: string;
}
interface NutritionMealOption {
  id: string;
  label: string;
  name: string;
  description?: string | null;
  sort: number;
  default: boolean;
  foods?: NutritionMealFood[];
  nutrients?: NutritionNutrientAmount[];
}
interface NutritionMealTarget {
  mealId: string;
  name: string;
  proteinG: number;
  carbohydrateG: number;
  fatG: number;
  kcal: number;
}
interface NutritionNutrientAmount {
  key: string;
  amount: string;
}
interface NutritionPlanRef {
  id: string;
  name: string;
  kind: string;
  revision: number;
}
interface NutritionSettings {
  loggingStyle: string;
  showTargets: boolean;
  canSwapOptions: boolean;
  canReplaceFromBooks: boolean;
  groceryEnabled: boolean;
  logEditWindowDays: number;
  showMicronutrients: boolean;
}
interface NutritionSide {
  planName?: string | null;
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
}
interface NutritionSlot {
  dayTypeKey?: string;
  dayLabelKey?: string | null;
  weekday?: number | null;
  position?: number | null;
  target?: unknown;
  mealPlanId?: string | null;
  mealPlanName?: string;
}
interface NutritionSlotInput {
  dayLabelKey?: string;
  dayTypeKey?: string;
  mealPlanId?: string /*uuid*/;
  mealPlanName?: string;
  position?: number;
  target?: unknown;
  weekday?: number;
}
interface NutritionSlotWrite {
  name: string;
  mode: string;
  cycleLength?: number | null;
  startDate: string;
  labels: NutritionDayLabel[];
  slots: NutritionSlot[];
  rules: NutritionLabelRule[];
  dayTypeChanges: DayChange[];
  nutrition: NutritionDateNutrition[];
  dryRun: boolean;
}
interface NutritionSnapshotInfo {
  dayTypeKey: string;
  dayTypeLabel: string;
  icon: string;
  source: string;
  frozenAt?: string | null;
}
interface NutritionSummary {
  days: NutritionSummaryDay[];
  averages: NutritionSummaryAverages;
}
interface NutritionSummaryAverages {
  days: number;
  loggedDays: number;
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  targetKcal?: number | null;
}
interface NutritionSummaryDay {
  date: string;
  dayTypeKey: string;
  dayTypeLabel: string;
  icon: string;
  planName?: string | null;
  target?: unknown;
  logged?: unknown;
  frozen: boolean;
}
interface OpsFieldError {
  path: string;
  code: string;
  message: string;
}
interface OpsMacros {
  kcal: number;
  proteinG: number;
  carbohydrateG: number;
  fatG: number;
}
interface OpsOnboardingDraftBadge {
  id: string;
  status: string;
}
interface OpsPractice {
  id: string;
  key: string;
  name: string;
}
interface OwnerbriefAction {
  code: string;
  params: Record<string, string>;
  coachId?: string | null;
  relationshipId?: string | null;
  text: string;
}
interface OwnerbriefBrief {
  weekStart: string;
  from: string;
  to: string;
  timeZone: string;
  clients: OwnerbriefClients;
  revenue?: OwnerbriefRevenue | null;
  coaches: OwnerbriefCoach[];
  needCall: OwnerbriefCall[];
  leads?: OwnerbriefLeads | null;
  actions: OwnerbriefAction[];
}
interface OwnerbriefCall {
  relationshipId: string;
  name: string;
  coaches: string[];
  missedCheckins: number;
  silentDays: number;
  reasons: string[];
  score: number;
}
interface OwnerbriefClients {
  active: number;
  new: number;
  newPrev: number;
  ended: number;
  endedPrev: number;
}
interface OwnerbriefCoach {
  coachId: string;
  name: string;
  activeClients: number;
  received: number;
  reviewedOnTime: number;
  onTimeRate?: number | null;
  waiting: number;
  waitingOld: number;
  openFollowUps: number;
}
interface OwnerbriefLeads {
  signups: number;
  signupsPrev: number;
  questionnaires: number;
}
interface OwnerbriefRevenue {
  currency: string;
  paidMinor: number;
  paidPrevMinor: number;
  mrrMinor: number;
  failedPayments: number;
}
interface OwnerbriefView {
  weekStart: string;
  generatedAt: string;
  dismissed: boolean;
  brief: OwnerbriefBrief;
}
interface OwnerbriefWeek {
  weekStart: string;
  dismissed: boolean;
}
interface OwnerbriefWeeks {
  current: string;
  weeks: OwnerbriefWeek[];
}
interface PatternradarIdea {
  id: string;
  kind: string;
  hook: string;
  outline: string[];
  caption: string;
  why: string;
  locale: string;
  status: string;
  metrics: PatternradarMetrics;
  contentItemId?: string | null;
  createdAt: string;
}
interface PatternradarIdeas {
  enabled: boolean;
  aiDrafts: boolean;
  ideas: PatternradarIdea[];
}
interface PatternradarMetrics {
  clientsAtLeast: number;
  ratePct: number;
  windowDays: number;
  topic?: string;
}
interface PeakWeek {
  id: string;
  templateId?: string | null;
  name: string;
  showDate: string;
  startsOn: string;
  endsOn: string;
  daysUntilShow?: number | null;
  cancelled: boolean;
  phaseId?: string | null;
  eventId?: string | null;
  appliedAt: string;
  days: PeakweekClientDay[];
  changes: PeakweekChange[];
}
interface PeakweekActual {
  waterL?: number | null;
  sodiumMg?: number | null;
  waterDone: boolean;
  sodiumDone: boolean;
  look?: string | null;
  note: string;
  checkedInAt?: string | null;
  weight?: PeakweekWeight | null;
  photos: PeakweekPhotoRef[];
}
interface PeakweekApplyResult {
  peakWeek: PeakWeek;
  dayTypeChanges: DayChange[];
  keptDates: string[];
  keptAdjustments: number;
  shortenedPhases: PeakweekShortenedPhase[];
  dryRun: boolean;
}
interface PeakweekChange {
  id: string;
  date?: string | null;
  kind: string;
  fields: PeakweekFieldChange[];
  note: string;
  by?: string | null;
  via: string;
  at: string;
}
interface PeakweekClientDay {
  date: string;
  offset: number;
  past: boolean;
  today: boolean;
  plan: PeakweekDayPlan;
  dayType?: PeakweekDayTypeAt | null;
  actual: PeakweekActual;
}
interface PeakweekDayPlan {
  offset: number;
  dayTypeKey?: string;
  proteinDeltaG?: number;
  carbohydrateDeltaG?: number;
  fatDeltaG?: number;
  waterL?: number;
  sodiumMg?: number;
  potassiumMg?: number;
  fiberG?: number;
  trainingFocus?: string;
  cardio?: string;
  posingMinutes?: number;
  notes?: string;
  supplements?: PeakweekSupplementNote[];
}
interface PeakweekDayPlanInput {
  carbohydrateDeltaG?: number;
  cardio?: string;
  dayTypeKey?: string;
  fatDeltaG?: number;
  fiberG?: number;
  notes?: string;
  offset?: number;
  posingMinutes?: number;
  potassiumMg?: number;
  proteinDeltaG?: number;
  sodiumMg?: number;
  supplements?: PeakweekSupplementNoteInput[];
  trainingFocus?: "depletion" | "pump" | "rest";
  waterL?: number;
}
interface PeakweekDayTypeAt {
  key: string;
  label: string;
  source: string;
}
interface PeakweekFieldChange {
  field: string;
  before?: string | null;
  after?: string | null;
}
interface PeakweekPhotoRef {
  id: string;
  poseKind: string;
  url: string;
}
interface PeakweekShortenedPhase {
  id: string;
  kind: string;
  name: string;
  endsOn: string;
}
interface PeakweekSupplementNote {
  timing: string;
  text: string;
}
interface PeakweekSupplementNoteInput {
  timing: "morning" | "pre_workout" | "intra_workout" | "post_workout" | "with_meal" | "evening" | "bedtime";
  text?: string;
}
interface PeakweekTemplate {
  id: string;
  name: string;
  description: string;
  days: PeakweekDayPlan[];
  revision: number;
  updatedAt: string;
}
interface PeakweekView {
  available: boolean;
  enabled: boolean;
  today: string;
  peakWeek?: PeakWeek | null;
}
interface PeakweekWeight {
  value: string;
  unit: string;
}
interface Phase {
  id: string;
  kind: string;
  name: string;
  startsOn: string;
  endsOn?: string | null;
  goal: string;
  weightMinKg?: number | null;
  weightMaxKg?: number | null;
  note?: string | null;
}
interface PhasesCurrent {
  phase?: Phase | null;
  week?: number | null;
  totalWeeks?: number | null;
  daysLeft?: number | null;
  nextEvent?: PhasesNextEvent | null;
}
interface PhasesEvent {
  id: string;
  date: string;
  name: string;
}
interface PhasesNextEvent {
  name: string;
  date: string;
  daysUntil: number;
}
interface PhasesTimeline {
  today: string;
  from: string;
  to: string;
  phases: Phase[];
  events: PhasesEvent[];
  current: PhasesCurrent;
}
interface PlanSet {
  id: string;
  name: string;
  description?: string | null;
  tags: string[];
  items: PlanSetItem[];
  rules: PlanSetRule[];
  archivedAt?: string | null;
  updatedAt: string;
}
interface PlanSetAssignSlot {
  dayTypeKey: string;
  planId?: string | null;
  target?: PlansNutritionPlanMacros | null;
}
interface PlanSetAssigned {
  setId: string;
  plans: PlansNutritionPlanSummary[];
  slots: PlanSetAssignSlot[];
  rules: number;
  dayTypeChanges: DayChange[];
  nutrition: NutritionDateNutrition[];
  dryRun: boolean;
}
interface PlanSetItem {
  id: string;
  dayTypeKey: string;
  dayTypeLabel: string;
  priority: number;
  planId?: string | null;
  planName?: string | null;
  targetMode: string;
  kcal?: number | null;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
  relativeBaseDayTypeKey?: string | null;
  relativeKcalPct?: number | null;
  relativeCarbohydrateG?: number | null;
  sort: number;
}
interface PlanSetRule {
  weekday: number;
  dayTypeKey: string;
}
interface PlansNutritionPlanChangeBase {
  planId: string;
  revision: number;
}
interface PlansNutritionPlanChangeBaseInput {
  planId: string /*uuid*/;
  revision?: number;
}
interface PlansNutritionPlanChangeDay {
  planId: string;
  planName: string;
  revision: number;
  newRevision?: number | null;
  dayTypes: PlansNutritionPlanChangeDayType[];
  lines: PlansNutritionPlanChangeLine[];
  before: PlansNutritionPlanMacros;
  after: PlansNutritionPlanMacros;
  moved: number;
  onlyIntendedMoved: boolean;
  notes: PlansNutritionPlanChangeNote[];
}
interface PlansNutritionPlanChangeDayType {
  key: string;
  label: string;
  kind: string;
}
interface PlansNutritionPlanChangeLine {
  mealId: string;
  mealName: string;
  foodId: string;
  name: string;
  unit: string;
  from: number;
  to: number;
}
interface PlansNutritionPlanChangeNote {
  level: string;
  code: string;
  text: string;
}
interface PlansNutritionPlanChangePreview {
  macro: string;
  grams: number;
  summary: string;
  dryRun: boolean;
  applied: boolean;
  days: PlansNutritionPlanChangeDay[];
}
interface PlansNutritionPlanFoodInput {
  foodId: string /*uuid*/;
  amount?: string;
  groupLabel?: string;
  portionId?: string /*uuid*/;
}
interface PlansNutritionPlanMacros {
  kcal: number;
  proteinG: number;
  carbohydrateG: number;
  fatG: number;
  fiberG?: number | null;
}
interface PlansNutritionPlanMacrosInput {
  carbohydrateG?: string;
  fatG?: string;
  fiberG?: string;
  kcal?: string;
  proteinG?: string;
}
interface PlansNutritionPlanRange {
  minKcal: number;
  maxKcal: number;
}
interface PlansNutritionPlanStepInput {
  body?: string;
}
interface PlansNutritionPlanSummary {
  id: string;
  relationshipId?: string | null;
  name: string;
  description?: string | null;
  kind: string;
  macroMode?: string | null;
  revision: number;
  tags: string[];
  suggestedDayTypeKey?: string | null;
  sourcePlanId?: string | null;
  archivedAt?: string | null;
  updatedAt: string;
  usedOn: PlansNutritionPlanUsage[];
  totals: PlansNutritionPlanMacros;
  optionsRange?: PlansNutritionPlanRange | null;
  copies: number;
}
interface PlansNutritionPlanUsage {
  dayTypeKey: string;
  label: string;
  ownTarget: boolean;
}
interface PreptimelineBand {
  low: number;
  high: number;
}
interface PreptimelineCountdown {
  weeksOut: number;
  daysOut: number;
}
interface PreptimelineProjPoint {
  date: string;
  current?: number | null;
  needed?: number | null;
}
interface PreptimelineProjection {
  verdict: string;
  startWeight: number;
  peakStart: string;
  peakWeeksOut: number;
  activeWeeks: number;
  skipWeeks: number;
  rateWeekly?: number | null;
  requiredWeekly?: number | null;
  requiredPct?: number | null;
  projectedWeight?: number | null;
  gap?: number | null;
  extraWeekly?: number | null;
  extraKcalPerDay?: number | null;
  weeks: PreptimelineWeekAvg[];
  points: PreptimelineProjPoint[];
  band?: PreptimelineBand | null;
}
interface PreptimelineSetResult {
  dryRun: boolean;
  timeline: PreptimelineView;
}
interface PreptimelineShow {
  name: string;
  date: string;
  weeksOut: number;
  daysOut: number;
}
interface PreptimelineStage {
  targetWeight?: number | null;
  skipDates: string[];
  showInApp: boolean;
  saved: boolean;
}
interface PreptimelineView {
  today: string;
  unit: string;
  state: string;
  show?: PreptimelineShow | null;
  countdown?: PreptimelineCountdown | null;
  stage?: PreptimelineStage | null;
  projection?: PreptimelineProjection | null;
}
interface PreptimelineWeekAvg {
  start: string;
  end: string;
  average?: number | null;
  skipped: boolean;
  sparse: boolean;
}
interface ProgramsCopy {
  clientWorkoutId: string;
  relationshipId: string;
  clientName: string;
  workoutName: string;
  scheduledOn?: string | null;
  position?: number | null;
  weekNumber?: number | null;
  dayTypeId?: string | null;
  status: string;
  customised: boolean;
  hasSession: boolean;
  eligible: boolean;
}
interface ProgramsDeloadRule {
  every?: number;
  setsFactor?: number;
  weightFactor?: number;
}
interface ProgramsDocument {
  id: string;
  companyId?: string | null;
  name: string;
  description: string;
  type: string;
  coverUploadId?: string | null;
  tags: WorkoutsTag[];
  settings: ProgramsSettings;
  revision: number;
  weeks: ProgramsWeek[];
  assignedCount: number;
  readOnly: boolean;
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
interface ProgramsEffortRule {
  mode?: string;
  step?: number;
}
interface ProgramsItem {
  id: string;
  name: string;
  description: string;
  type: string;
  coverUploadId?: string | null;
  tags: WorkoutsTag[];
  weekCount: number;
  workoutCount: number;
  assignedCount: number;
  revision: number;
  shared: boolean;
  archivedAt?: string | null;
  updatedAt: string;
}
interface ProgramsNewWorkout {
  dayTypeId?: string /*uuid*/;
  description?: string;
  name?: string;
}
interface ProgramsPage {
  items: ProgramsItem[];
  total: number;
}
interface ProgramsPeriodiseResult {
  dryRun: boolean;
  created: number;
  replaced: number;
  weeksCreated: number;
  preview: ProgramsPreviewRow[];
  undoToken?: string | null;
  program?: ProgramsDocument | null;
}
interface ProgramsPlacement {
  id: string;
  weekId: string;
  weekNumber: number;
  dayIndex?: number | null;
  sort: number;
  workout: ProgramsWorkoutSummary;
}
interface ProgramsPreviewRow {
  placementId: string;
  workout: string;
  exercise: string;
  weeks: ProgramsPreviewWeek[];
}
interface ProgramsPreviewWeek {
  weekNumber: number;
  prescription: string;
}
interface ProgramsRepsRule {
  cap?: number;
  mode?: string;
  resetTo?: number;
  step?: number;
}
interface ProgramsSetsRule {
  add?: number;
  every?: number;
  max?: number;
}
interface ProgramsSettings {
  visibilityWeeks?: number | null;
  clientCanReschedule: boolean;
  clientCanSkip: boolean;
  clientCanSwap: boolean;
  clientCanAddExercises: boolean;
  repeat: boolean;
  defaultDayTypeId?: string | null;
}
interface ProgramsWeek {
  id: string;
  weekNumber: number;
  name?: string | null;
  placements: ProgramsPlacement[];
}
interface ProgramsWeightRule {
  amount?: number;
  mode?: string;
}
interface ProgramsWorkoutSource {
  new?: ProgramsNewWorkout;
  templateId?: string /*uuid*/;
}
interface ProgramsWorkoutSummary {
  id: string;
  lineageId: string;
  name: string;
  dayTypeId?: string | null;
  exerciseCount: number;
  setCount: number;
  estimatedSeconds: number;
}
interface RecoveryBand {
  low: number;
  high: number;
}
interface RecoveryMetric {
  key: string;
  unit: string;
  status: string;
  days: number;
  average?: number | null;
  baselineDays: number;
  baseline?: number | null;
  band?: RecoveryBand | null;
  delta?: number | null;
  deltaPct?: number | null;
  qualifying: number;
  target?: number | null;
  method?: string;
  points: RecoveryPoint[];
}
interface RecoveryPoint {
  date: string;
  value: number;
}
interface RecoveryResult {
  asOf: string;
  from: string;
  source: string;
  metrics: RecoveryMetric[];
  signals: RecoverySignal[];
}
interface RecoverySignal {
  code: string;
  metric: string;
  days: number;
  value: number;
  dayAverage: number;
  baseline?: number | null;
}
interface ReferralsMine {
  enabled: boolean;
  reward: string;
  url: string;
  code: string;
  visits: number;
  leads: number;
  won: number;
}
interface ReferralsPage {
  settings: ReferralsSettings;
  rows: ReferralsRow[];
}
interface ReferralsReferred {
  leadId: string;
  name: string;
  status: string;
  createdAt: string;
  wonAt?: string | null;
  rewardGivenAt?: string | null;
}
interface ReferralsRow {
  relationshipId: string;
  firstName: string;
  lastName: string;
  active: boolean;
  visits: number;
  leads: number;
  won: number;
  rewardsToGive: number;
  referred: ReferralsReferred[];
}
interface ReferralsSettings {
  enabled: boolean;
  reward: string;
}
interface Schedule {
  frequency: string;
  weekday?: number | null;
  monthDay?: number | null;
  startDate: string;
  endDate?: string | null;
  maxCount?: number | null;
  openDaysBefore: number;
  closeAfterDays?: number | null;
  reminderTime?: string | null;
  nudgeTime?: string | null;
  allowExtra: boolean;
  reviewMode: string;
}
interface ScheduleAssignment {
  id: string;
  relationshipId: string;
  form: ScheduleFormRef;
  schedule: Schedule;
  state: string;
  pausedUntil?: string | null;
  nextDue?: ScheduleDueRef | null;
  compliance: ScheduleCompliance;
  createdAt: string;
}
interface ScheduleCompliance {
  sent: number;
  due: number;
}
interface ScheduleDueRef {
  id: string;
  dueOn: string;
  opensAt: string;
  closesAt: string;
  state: string;
}
interface ScheduleFormRef {
  id: string;
  name: string;
  kind: string;
  questionCount: number;
}
interface ScheduleInput {
  allowExtra?: boolean;
  closeAfterDays?: number;
  endDate?: string;
  frequency?: string;
  maxCount?: number;
  monthDay?: number;
  nudgeTime?: string;
  openDaysBefore?: number;
  reminderTime?: string;
  reviewMode?: "review" | "log";
  startDate?: string;
  weekday?: number;
}
interface SchedulePatch {
  allowExtra?: boolean;
  closeAfterDays?: number;
  endDate?: string;
  frequency?: string;
  maxCount?: number;
  monthDay?: number;
  nudgeTime?: string;
  openDaysBefore?: number;
  reminderTime?: string;
  reviewMode?: "review" | "log";
  startDate?: string;
  weekday?: number;
}
interface Session {
  id: string;
  relationshipId: string;
  name: string;
  performedOn: string;
  status: string;
  startedAt: string;
  completedAt?: string | null;
  durationSeconds?: number | null;
  difficulty?: number | null;
  note: string;
  source: string;
  clientWorkoutId?: string | null;
  studioItemId?: string | null;
  workoutTemplateId?: string | null;
  dayTypeId?: string | null;
  reviewedAt?: string | null;
  exercises: SessionExercise[];
  records: SessionsRecord[];
  dayTypeChanges: DayChange[];
  plannedMatch?: SessionsPlannedMatch | null;
}
interface SessionExercise {
  id: string;
  exerciseId: string;
  name: string;
  imageUrl?: string | null;
  tracking: string;
  unilateral: boolean;
  lineId?: string | null;
  lineNote: string;
  optionalMetric?: string | null;
  secondMetric?: string | null;
  alternativeOfExerciseId?: string | null;
  replaced: boolean;
  status: string;
  note: string;
  stickyNote: string;
  sort: number;
  groupId?: string | null;
  groupKind?: string | null;
  restSeconds?: number | null;
  restRemembered: boolean;
  unit: string;
  sets: SessionSet[];
  previous: SessionsPreviousSet[];
  alternatives: SessionsAlternative[];
  bests: SessionsBest[];
  volumeKg: number;
  bestEst1RmKg?: number | null;
  progression?: SessionsProgressionSuggestion | null;
}
interface SessionItem {
  id: string;
  relationshipId: string;
  name: string;
  performedOn: string;
  status: string;
  startedAt: string;
  completedAt?: string | null;
  durationSeconds?: number | null;
  difficulty?: number | null;
  note: string;
  source: string;
  clientWorkoutId?: string | null;
  studioItemId?: string | null;
  workoutTemplateId?: string | null;
  dayTypeId?: string | null;
  reviewedAt?: string | null;
  programName: string;
  adHoc: boolean;
  setCount: number;
  volumeKg: string;
  recordCount: number;
  unreviewed: boolean;
}
interface SessionPage {
  items: SessionItem[];
  nextCursor: string;
}
interface SessionSet {
  id: string;
  setNumber: number;
  setKind: string;
  reps?: number | null;
  repsLeft?: number | null;
  repsRight?: number | null;
  partialReps?: number | null;
  weightKg?: number | null;
  durationSeconds?: number | null;
  distanceM?: number | null;
  rpe?: number | null;
  rir?: number | null;
  rpm?: number | null;
  tempo?: string | null;
  completed: boolean;
  completedAt?: string | null;
  target: SessionsTarget;
  pr: string[];
}
interface SessionsAlternative {
  exerciseId: string;
  name: string;
}
interface SessionsBest {
  kind: string;
  reps?: number | null;
  value: number;
}
interface SessionsCalendarDay {
  date: string;
  status: string;
}
interface SessionsDailySets {
  date: string;
  upper: number;
  lower: number;
  core: number;
}
interface SessionsExerciseHistory {
  exerciseId: string;
  name: string;
  tracking: string;
  from: string;
  to: string;
  tiles: SessionsTiles;
  series: SessionsSeriesPoint[];
  sessions: SessionsHistorySession[];
  page: number;
  pageSize: number;
  totalSessions: number;
}
interface SessionsHistorySession {
  sessionId: string;
  name: string;
  performedOn: string;
  note: string;
  startedAt: string;
  finishedAt?: string | null;
  volumeKg: number;
  bestEst1RmKg?: number | null;
  sets: SessionsHistorySet[];
}
interface SessionsHistorySet {
  id: string;
  setNumber: number;
  setKind: string;
  reps?: number | null;
  repsLeft?: number | null;
  repsRight?: number | null;
  partialReps?: number | null;
  weightKg?: number | null;
  durationSeconds?: number | null;
  distanceM?: number | null;
  rpe?: number | null;
  rir?: number | null;
}
interface SessionsKpiCount {
  value: number;
  previous: number;
  changePercent?: number | null;
}
interface SessionsKpiDecimal {
  value: number;
  previous: number;
  changePercent?: number | null;
}
interface SessionsKpis {
  workouts: SessionsKpiCount;
  planned: number;
  skipped: number;
  adherencePercent?: number | null;
  sets: SessionsKpiCount;
  volumeKg: SessionsKpiDecimal;
  durationSeconds: SessionsKpiCount;
}
interface SessionsLogExercise {
  exerciseId: string /*uuid*/;
  note?: string;
  sets?: SessionsSetWrite[];
}
interface SessionsLogbook {
  from: string;
  to: string;
  weeks: string[];
  workouts: SessionsLogbookWorkout[];
}
interface SessionsLogbookEntry {
  weekOf: string;
  sessionId: string;
  performedOn: string;
  note: string;
  sets: SessionsHistorySet[];
  volumeKg: number;
  topSetKg?: number | null;
  trend?: string | null;
}
interface SessionsLogbookExercise {
  exerciseId: string;
  name: string;
  tracking: string;
  entries: SessionsLogbookEntry[];
}
interface SessionsLogbookWorkout {
  name: string;
  exercises: SessionsLogbookExercise[];
}
interface SessionsMuscleSets {
  key: string;
  name: string;
  region?: string | null;
  view?: string | null;
  svgRegion?: string | null;
  sets: number;
  primarySets: number;
  secondarySets: number;
  previousSets: number;
  change?: number | null;
}
interface SessionsPerformedExercise {
  exerciseId: string;
  name: string;
  lastPerformedOn: string;
  sessions: number;
}
interface SessionsPersonalRecords {
  current: SessionsRecord[];
  history: SessionsRecord[];
}
interface SessionsPlannedMatch {
  clientWorkoutId: string;
  name: string;
  plannedLines: number;
  coveredLines: number;
}
interface SessionsPrCard {
  exerciseId: string;
  exerciseName: string;
  latestOn: string;
  est1Rm?: SessionsPrMetric | null;
  maxWeight?: SessionsPrMetric | null;
  maxVolume?: SessionsPrMetric | null;
}
interface SessionsPrMetric {
  value: number;
  previousBest?: number | null;
  changePercent?: number | null;
  isNew: boolean;
  setInRange: boolean;
  achievedOn?: string | null;
}
interface SessionsPreviousSet {
  setNumber: number;
  setKind: string;
  reps?: number | null;
  repsLeft?: number | null;
  repsRight?: number | null;
  partialReps?: number | null;
  weightKg?: number | null;
  durationSeconds?: number | null;
  distanceM?: number | null;
  rpe?: number | null;
}
interface SessionsProgressionSuggestion {
  increment: number;
  unit: string;
  sets: SessionsSuggestedLoad[];
}
interface SessionsRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  kind: string;
  reps?: number | null;
  value: number;
  previousValue?: number | null;
  sessionId: string;
  setId?: string | null;
  achievedOn: string;
}
interface SessionsSeriesPoint {
  date: string;
  maxWeight?: number | null;
  bestReps?: number | null;
  est1Rm?: number | null;
  volume?: number | null;
  topSetKg?: number | null;
  pr: string[];
}
interface SessionsSetWrite {
  completed?: boolean;
  distanceM?: number;
  durationSeconds?: number;
  partialReps?: number;
  reps?: number;
  repsLeft?: number;
  repsRight?: number;
  rir?: number;
  rpe?: string;
  rpm?: number;
  setKind?: string;
  tempo?: string;
  weightKg?: string;
}
interface SessionsStats {
  from: string;
  to: string;
  previousFrom: string;
  previousTo: string;
  kpis: SessionsKpis;
  muscles: SessionsMuscleSets[];
  dailySets: SessionsDailySets[];
  calendar: SessionsCalendarDay[];
  prs: SessionsPrCard[];
}
interface SessionsSuggestedLoad {
  setId: string;
  setNumber: number;
  fromWeightKg: number;
  weightKg: number;
}
interface SessionsTarget {
  repsMin?: number | null;
  repsMax?: number | null;
  amrap: boolean;
  weightKg?: number | null;
  restSeconds?: number | null;
  rpe?: number | null;
  rir?: number | null;
  durationSeconds?: number | null;
  distanceM?: number | null;
  tempo?: string | null;
  backoffPct?: number | null;
}
interface SessionsTile {
  value: number;
  on: string;
  sessionId: string;
  reps?: number | null;
  weightKg?: number | null;
}
interface SessionsTiles {
  maxWeight?: SessionsTile | null;
  bestEst1Rm?: SessionsTile | null;
  bestVolume?: SessionsTile | null;
  bestReps?: SessionsTile | null;
  longestTimeSeconds?: SessionsTile | null;
  sessions: number;
}
interface SlimCatalog {
  foods: SlimFood[];
  products: SlimOffProduct[];
  productsIncluded: boolean;
  credit?: string | null;
}
interface SlimComparison {
  source: string;
  dayTypeKey?: string | null;
  label: string;
  target: SlimMacros;
  delta: SlimMacros;
}
interface SlimDay {
  target: string;
  total: string;
  meals: string[];
}
interface SlimFood {
  id: string;
  name: string;
  brand?: string | null;
  servingAmount: string;
  servingUnit: string;
  kcal: string;
  proteinG: string;
  carbohydrateG: string;
  fatG: string;
  portions: SlimPortion[];
  offCode?: string;
}
interface SlimMacros {
  kcal: number;
  proteinG: number;
  carbohydrateG: number;
  fatG: number;
  fiberG?: number | null;
}
interface SlimMeal {
  id: string;
  name: string;
  time?: string | null;
  note?: string;
  totals: SlimMacros;
  options: SlimOption[];
}
interface SlimMealTarget {
  id: string;
  name: string;
  time?: string | null;
  kcal: number;
  proteinG: number;
  carbohydrateG: number;
  fatG: number;
}
interface SlimNutrition {
  needsCoach?: boolean;
  reason?: string;
  split?: string;
  trainingDay: SlimDay;
  restDay: SlimDay;
  notes?: string[];
}
interface SlimOffProduct {
  kind: string;
  code: string;
  name: string;
  brand?: string | null;
  quantity?: string | null;
  unit: string;
  servingSize?: string | null;
  kcalPer100: string;
  proteinGPer100?: string | null;
  carbohydrateGPer100?: string | null;
  fatGPer100?: string | null;
  url: string;
}
interface SlimOnboarding {
  status: string;
  partlyReleased?: boolean;
  blockReasons?: string[];
  errorCode?: string;
  sections: Record<string, SlimSection>;
  phase?: string;
  nutrition?: SlimNutrition;
  supplements?: string[];
  program?: unknown;
  loomPoints?: string[];
  welcome?: string;
  preview?: string[];
}
interface SlimOption {
  id: string;
  name: string;
  label?: string | null;
  description?: string;
  servings: number;
  source: string;
  recipeId?: string | null;
  manual?: SlimMacros | null;
  totals: SlimMacros;
  foods: SlimPlanFood[];
}
interface SlimPlanDoc {
  id: string;
  name: string;
  kind: string;
  revision: number;
  currentRevision: number;
  live: boolean;
  totals: SlimMacros;
  usedOn: SlimUsage[];
  comparisons: SlimComparison[];
  mealTargets: SlimMealTarget[];
  meals: SlimMeal[];
}
interface SlimPlanFood {
  foodId: string;
  name: string;
  amount: number;
  unit: string;
  portionText?: string | null;
}
interface SlimPortion {
  id: string;
  name: string;
  amount: string;
}
interface SlimProducts {
  products: SlimOffProduct[];
  credit: string;
}
interface SlimRecipe {
  id: string;
  name: string;
  yieldServings: string;
  kcalPerServing: string;
  proteinPerServing: string;
}
interface SlimRecipePage {
  items: SlimRecipe[];
  nextCursor?: string | null;
}
interface SlimSection {
  state: string;
  error?: string;
}
interface SlimUsage {
  dayTypeKey: string;
  label: string;
  ownTarget: boolean;
}
interface SubmitAnswer {
  key: string;
  type: string;
  skipped: boolean;
  text?: string | null;
  number?: string | null;
  yes?: boolean | null;
  date?: string | null;
  scale?: number | null;
  stars?: number | null;
  typedName?: string | null;
  options: SubmitOptionRef[];
  files: SubmitFileRef[];
  photos: SubmitPhotoRef[];
  metric?: SubmitMetricValue | null;
  comments: SubmitComment[];
}
interface SubmitChange {
  kind: string;
  delta?: string | null;
}
interface SubmitCheckinWeek {
  forms: SubmitCheckinWeekForm[];
  form?: SubmitCheckinWeekForm | null;
  start: string;
  end: string;
  days: string[];
  answered: SubmitCheckinWeekSubmission[];
  rows: SubmitCheckinWeekRow[];
  highlights?: string[];
  stable?: number;
}
interface SubmitCheckinWeekCell {
  date: string;
  value: unknown;
  display?: string | null;
  tone?: string;
  flagged?: boolean;
}
interface SubmitCheckinWeekForm {
  id: string;
  name: string;
}
interface SubmitCheckinWeekRow {
  key: string;
  metricKey?: string;
  label: string;
  type: string;
  unit?: string | null;
  direction?: string;
  target?: string;
  onTarget?: number;
  trend?: string;
  peak?: string;
  cells: SubmitCheckinWeekCell[];
  summary: SubmitCheckinWeekSummary;
}
interface SubmitCheckinWeekStat {
  days: number;
  avg?: string | null;
  count?: number | null;
  mode?: string | null;
}
interface SubmitCheckinWeekSubmission {
  date: string;
  checkinId: string;
}
interface SubmitCheckinWeekSummary {
  week: SubmitCheckinWeekStat;
  previous: SubmitCheckinWeekStat;
  change?: string | null;
}
interface SubmitComment {
  id: string;
  author: SubmitPerson;
  body: string;
  createdAt: string;
  editedAt?: string | null;
}
interface SubmitCompareColumn {
  id: string;
  form: SubmitFormRef;
  checkinDate: string;
  revision: number;
}
interface SubmitCompareRow {
  key: string;
  label: string;
  olderLabels: string[];
  type: string;
  unit?: string | null;
  values: (SubmitAnswer | null)[];
  change?: SubmitChange | null;
}
interface SubmitComparison {
  columns: SubmitCompareColumn[];
  rows: SubmitCompareRow[];
  photos: SubmitPosePhotos[];
}
interface SubmitDayValue {
  date: string;
  value: string;
}
interface SubmitExistingEntry {
  key: string;
  value: string;
  unit: string;
}
interface SubmitFeedback {
  id: string;
  author: SubmitPerson;
  body: string;
  video?: VideolinkLink | null;
  status: string;
  origin?: string | null;
  mine: boolean;
  sentAt?: string | null;
  editedAt?: string | null;
  readAt?: string | null;
  createdAt: string;
}
interface SubmitFileRef {
  uploadId: string;
  url: string;
  contentType: string;
  width?: number | null;
  height?: number | null;
  durationMs?: number | null;
}
interface SubmitFillContext {
  lastValues: SubmitLastValue[];
  existingEntries: SubmitExistingEntry[];
  lastPhotos: SubmitLastPhoto[];
  synced?: SubmitSyncedValue[];
}
interface SubmitFormRef {
  id: string;
  name: string;
  kind: string;
}
interface SubmitInbox {
  items: SubmitInboxRow[];
  nextCursor?: string | null;
}
interface SubmitInboxClient {
  id: string;
  firstName: string;
  lastName: string;
  practiceName: string;
}
interface SubmitInboxRow {
  checkinId: string;
  relationshipId: string;
  client: SubmitInboxClient;
  form: SubmitFormRef;
  revision: number;
  checkinDate: string;
  submittedAt?: string | null;
  editedAt?: string | null;
  late: boolean;
  extra: boolean;
  flags: string[];
  reviewState: string;
  reviewedAt?: string | null;
  reviewedBy?: SubmitPerson | null;
  replied: boolean;
  outlierCount: number;
}
interface SubmitItem {
  id: string;
  form: SubmitFormRef;
  revision: number;
  checkinDate: string;
  dueId?: string | null;
  extra: boolean;
  late: boolean;
  status: string;
  reviewState: string;
  reviewMode: string;
  submittedAt?: string | null;
  editedAt?: string | null;
  loggedBy: string;
  reviewedAt?: string | null;
  reviewedBy?: SubmitPerson | null;
  feedbackCount: number;
  unreadFeedback: number;
}
interface SubmitLastPhoto {
  pose: string;
  url: string;
}
interface SubmitLastValue {
  key: string;
  value: string;
  unit?: string | null;
  recordedOn: string;
}
interface SubmitList {
  items: SubmitItem[];
  nextCursor?: string | null;
}
interface SubmitMetricValue {
  key: string;
  name: string;
  unit: string;
  value?: string | null;
  recordedOn: string;
  pending: boolean;
  removed: boolean;
  linked: boolean;
  source?: string;
  notShared?: boolean;
}
interface SubmitMissedList {
  items: SubmitMissedRow[];
}
interface SubmitMissedRow {
  dueId: string;
  relationshipId: string;
  client: SubmitInboxClient;
  form: SubmitFormRef;
  dueOn: string;
  closedAt: string;
  skipReason?: string | null;
}
interface SubmitMyDue {
  id: string;
  assignmentId: string;
  relationshipId: string;
  form: SubmitFormRef;
  dueOn: string;
  origin: string;
  opensAt: string;
  closesAt: string;
  state: string;
  checkinId?: string | null;
  checkinStatus?: string | null;
  coachName: string;
  allowExtra: boolean;
  questionCount: number;
  estimatedMinutes: number;
}
interface SubmitOptionRef {
  key: string;
  label: string;
}
interface SubmitOutlier {
  key: string;
  label: string;
  kind: string;
  display: string;
  unit?: string | null;
  direction?: string | null;
  limit?: string;
  normalLow?: string;
  normalHigh?: string;
  samples?: number;
}
interface SubmitPerson {
  id: string;
  firstName: string;
  lastName: string;
}
interface SubmitPhotoRef {
  pose: string;
  photoId?: string | null;
  uploadId?: string | null;
  url: string;
  thumbUrl: string;
  recordedOn?: string | null;
}
interface SubmitPosePhotos {
  pose: string;
  values: (SubmitPhotoRef | null)[];
}
interface SubmitProfile {
  sex?: string | null;
}
interface SubmitRef {
  id: string;
  checkinDate: string;
}
interface SubmitSeries {
  key: string;
  label: string;
  type: string;
  unit?: string | null;
  points: SubmitSeriesPoint[];
  metricSeries: SubmitDayValue[];
}
interface SubmitSeriesPoint {
  checkinId: string;
  date: string;
  value?: string | null;
}
interface SubmitSubmission {
  id: string;
  relationshipId: string;
  form: SubmitFormRef;
  revision: number;
  checkinDate: string;
  dueId?: string | null;
  extra: boolean;
  status: string;
  reviewState: string;
  reviewMode: string;
  startedAt?: string | null;
  submittedAt?: string | null;
  editedAt?: string | null;
  loggedBy: string;
  submittedBy?: SubmitPerson | null;
  timeZone?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: SubmitPerson | null;
  questions: FormsQuestion[];
  answers: SubmitAnswer[];
  feedback: SubmitFeedback[];
  previous?: SubmitRef | null;
  first?: SubmitRef;
  context?: SubmitFillContext | null;
  outliers?: SubmitOutlier[];
  profile: SubmitProfile;
}
interface SubmitSyncedValue {
  key: string;
  value: string;
  unit: string;
  source: string;
  date: string;
}
interface Supplement {
  id: string;
  name: string;
  brand: string;
  defaultUnit: string;
  category: string;
  notes: string;
  discountCode: string;
  links: SupplementsLink[];
  archived: boolean;
  usedBy: number;
  createdAt: string;
  updatedAt: string;
}
interface SupplementRef {
  id: string;
  name: string;
  brand: string;
  category: string;
  defaultUnit: string;
  archived: boolean;
}
interface SupplementsAdherence {
  from: string;
  to: string;
  scheduled: number;
  taken: number;
  skipped: number;
  open: number;
  takenShare?: number | null;
  days: SupplementsAdherenceDay[];
  lines: SupplementsAdherenceLine[];
}
interface SupplementsAdherenceDay {
  date: string;
  dayKind: string;
  today: boolean;
  scheduled: number;
  taken: number;
  skipped: number;
  open: number;
}
interface SupplementsAdherenceLine {
  lineId: string;
  name: string;
  scheduled: number;
  taken: number;
  skipped: number;
  open: number;
  takenShare?: number | null;
}
interface SupplementsDay {
  date: string;
  dayKind: string;
  dayLabel: string;
  revision?: number | null;
  trainingTime: string;
  groups: SupplementsDayGroup[];
  planNotes: SupplementsDayNote[];
  taken: number;
  skipped: number;
  total: number;
  editable: boolean;
}
interface SupplementsDayGroup {
  key: string;
  moment: string;
  meal?: number | null;
  mealName?: string | null;
  time?: string | null;
  offsetMin?: number | null;
  offsetMax?: number | null;
  items: SupplementsDayItem[];
}
interface SupplementsDayItem {
  lineId: string;
  timingId: string;
  sectionLabel: string;
  supplement: SupplementRef;
  amount?: number | null;
  amountMax?: number | null;
  unit: string;
  note: string;
  productLinks: SupplementsLink[];
  productCode: string;
  status: string;
  loggedAt?: string | null;
  source?: string | null;
}
interface SupplementsDayNote {
  lineId: string;
  sectionLabel: string;
  supplement: SupplementRef;
  amount?: number | null;
  amountMax?: number | null;
  unit: string;
  note: string;
  productLinks: SupplementsLink[];
  productCode: string;
}
interface SupplementsLine {
  id: string;
  supplement: SupplementRef;
  amount?: number | null;
  amountMax?: number | null;
  unit: string;
  note: string;
  timings: SupplementsTiming[];
  resourceIds?: string[] | null;
  discountCode?: string | null;
  productLinks: SupplementsLink[];
  productCode: string;
}
interface SupplementsLineInput {
  supplementId: string /*uuid*/;
  amount?: number;
  amountMax?: number;
  discountCode?: string;
  id?: string /*uuid*/;
  note?: string;
  resourceIds?: string[] /*uuid*/;
  timings?: SupplementsTimingInput[];
  unit?: string;
}
interface SupplementsLink {
  id: string;
  title: string;
  url: string;
  provider: string;
  isAffiliate: boolean;
  archived: boolean;
}
interface SupplementsPlan {
  id?: string | null;
  relationshipId: string;
  today: string;
  revision: number;
  headRevision: number;
  effectiveOn?: string | null;
  trainingTime: string;
  note: string;
  sections: SupplementsSection[];
  source: string;
  savedAt?: string | null;
  savedBy?: SupplementsSavedBy | null;
  upcoming?: SupplementsUpcoming | null;
}
interface SupplementsSavedBy {
  firstName: string;
  lastName: string;
}
interface SupplementsSection {
  id: string;
  label: string;
  lines: SupplementsLine[];
}
interface SupplementsSectionInput {
  id?: string /*uuid*/;
  label?: string;
  lines?: SupplementsLineInput[];
}
interface SupplementsTiming {
  id: string;
  moment: string;
  meal?: number | null;
  time?: string | null;
  offsetMin?: number | null;
  offsetMax?: number | null;
  days: string;
  amount?: number | null;
  amountMax?: number | null;
}
interface SupplementsTimingInput {
  moment: "waking" | "morning" | "meal" | "every_meal" | "afternoon" | "pre_workout" | "intra_workout" | "post_workout" | "evening" | "bed" | "time";
  amount?: number;
  amountMax?: number;
  days?: "every" | "training" | "rest";
  id?: string /*uuid*/;
  meal?: number;
  offsetMax?: number;
  offsetMin?: number;
  time?: string;
}
interface SupplementsUpcoming {
  revision: number;
  effectiveOn: string;
}
interface SwitchimportImportItem {
  id: string;
  source: string;
  fileName: string;
  status: string;
  progressDone: number;
  progressTotal: number;
  report?: SwitchimportReport | null;
  canUndo: boolean;
  undoUntil?: string | null;
  createdAt: string;
  finishedAt?: string | null;
}
interface SwitchimportImportView {
  id: string;
  source: string;
  fileName: string;
  status: string;
  tables: SwitchimportTableView[];
  mapping: SwitchimportMapping;
  options: SwitchimportOptions;
  fields: string[];
  preview?: SwitchimportPreview | null;
  progressDone: number;
  progressTotal: number;
  report?: SwitchimportReport | null;
  errorCode?: string;
  canUndo: boolean;
  undoUntil?: string | null;
  createdAt: string;
  finishedAt?: string | null;
}
interface SwitchimportMapping {
  tables: SwitchimportTableMapping[];
}
interface SwitchimportMappingInput {
  tables?: SwitchimportTableMappingInput[];
}
interface SwitchimportOptions {
  weightUnit?: string;
  lengthUnit?: string;
  dateOrder?: string;
}
interface SwitchimportOptionsInput {
  dateOrder?: "dmy" | "mdy";
  lengthUnit?: "auto" | "cm" | "in";
  weightUnit?: "auto" | "kg" | "lb";
}
interface SwitchimportPlannedClient {
  email: string;
  firstName: string;
  lastName: string;
  state: string;
  startDate?: string;
  tags?: string[];
  entries: number;
}
interface SwitchimportPreview {
  summary: SwitchimportSummary;
  units: SwitchimportUnitsUsed;
  clients: SwitchimportPlannedClient[];
  clientsMore: number;
  skips: SwitchimportSkip[];
  skipsMore: number;
  skipReasons: Record<string, number>;
  sameFileAs?: string | null;
  warnings: string[];
  entriesByMetric: Record<string, number>;
}
interface SwitchimportReport {
  clientsCreated: number;
  clientsUpdated: number;
  clientsSkipped: number;
  entriesWritten: number;
  entriesAlreadyThere: number;
  entriesRejected: number;
  entriesSkipped: number;
  skips: SwitchimportSkip[];
  skipsMore: number;
  undo?: SwitchimportUndoReport;
}
interface SwitchimportSkip {
  table: string;
  row: number;
  reason: string;
  message: string;
}
interface SwitchimportSummary {
  clientsNew: number;
  clientsExisting: number;
  clientsSkipped: number;
  entries: number;
  entriesSkipped: number;
  duplicates: number;
  rowsRead: number;
  clientsWithEntries: number;
}
interface SwitchimportTableMapping {
  table: string;
  kind: string;
  fields: string[];
}
interface SwitchimportTableMappingInput {
  kind: "clients" | "measurements" | "skip";
  fields?: string[];
  table?: string;
}
interface SwitchimportTableView {
  name: string;
  headers: string[];
  rowCount: number;
  sample: string[][];
}
interface SwitchimportUndoReport {
  clientsRemoved: number;
  clientsKept: number;
  entriesRemoved: number;
  entriesKept: number;
  keptReasons: string[];
}
interface SwitchimportUnitsUsed {
  weight: string;
  length: string;
  weightDetected: boolean;
  lengthDetected: boolean;
  converted: number;
}
interface Task {
  id: string;
  title: string;
  notes?: string | null;
  client?: TaskClient | null;
  dueOn?: string | null;
  dueTime?: string | null;
  assignee?: TaskPerson | null;
  source: string;
  sourceLabel: string;
  remindAt?: string | null;
  completedAt?: string | null;
  completedBy?: TaskPerson | null;
  createdBy?: TaskPerson | null;
  createdAt: string;
}
interface TaskClient {
  relationshipId: string;
  firstName: string;
  lastName: string;
}
interface TaskCounts {
  overdue: number;
  today: number;
  upcoming: number;
  noDate: number;
}
interface TaskList {
  items: Task[];
  nextCursor?: string | null;
  counts: TaskCounts;
}
interface TaskPerson {
  id: string;
  firstName: string;
  lastName: string;
}
interface TeamActivity {
  actions: number;
  messages: number;
}
interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  clientCount: number;
  lastActiveAt?: string | null;
  activity7d: TeamActivity;
  invitationId?: string | null;
}
interface TransformPhotoRef {
  id: string;
  recordedOn: string;
  poseKind: string;
}
interface TransformResult {
  dryRun: boolean;
  available: boolean;
  template: string;
  photos: TransformPhotoRef[];
  weeks: number;
  formats: string[];
  reel: boolean;
  hide?: string;
  showsName: boolean;
  forcedAnonymous: boolean;
  itemId?: string | null;
  status?: string | null;
}
interface VideolinkLink {
  url: string;
  provider: string;
  host: string;
  embedUrl?: string | null;
  thumbnailUrl?: string;
  title?: string;
  durationSeconds?: number;
}
interface WeekTimeline {
  today: string;
  weightUnit: string;
  weeks: WeektimelineTimelineWeek[];
  customColumns: WeektimelineCustomColumnRef[];
}
interface WeektimelineCustomColumnRef {
  id: string;
  field: string;
  name: string;
  source: string;
  weekly?: string | null;
  unit?: string | null;
  shareable: boolean;
}
interface WeektimelineTimelineCell {
  auto?: string | null;
  override?: string | null;
}
interface WeektimelineTimelineCells {
  bodyweight: WeektimelineTimelineCell;
  phase: WeektimelineTimelineCell;
  training: WeektimelineTimelineCell;
  output: WeektimelineTimelineCell;
  cardio: WeektimelineTimelineCell;
  td_kcal: WeektimelineTimelineCell;
  td_protein: WeektimelineTimelineCell;
  td_carbs: WeektimelineTimelineCell;
  td_fat: WeektimelineTimelineCell;
  ntd_kcal: WeektimelineTimelineCell;
  ntd_protein: WeektimelineTimelineCell;
  ntd_carbs: WeektimelineTimelineCell;
  ntd_fat: WeektimelineTimelineCell;
  aas: WeektimelineTimelineCell;
}
interface WeektimelineTimelinePhase {
  kind: string;
  name: string;
}
interface WeektimelineTimelineWeek {
  weekStart: string;
  weekEnd: string;
  month: string;
  weekInMonth: number;
  planWeek?: number | null;
  current: boolean;
  sessions?: number | null;
  phase?: WeektimelineTimelinePhase | null;
  cells: WeektimelineTimelineCells;
  energy?: EnergyWeekBalance | null;
  offPlan?: EnergyWeekMark | null;
  custom: Record<string, WeektimelineTimelineCell>;
  cycle?: CycleWeekMark | null;
}
interface WorkoutsBlock {
  id: string;
  kind: string;
  name?: string | null;
  description: string;
  rounds: number;
  restBetweenRoundsSeconds?: number | null;
  sourceSectionId?: string | null;
  lines: WorkoutsLine[];
}
interface WorkoutsBlockWrite {
  kind: string;
  name?: string | null;
  description: string;
  rounds: number;
  restBetweenRoundsSeconds?: number | null;
  sourceSectionId?: string | null;
  lines: WorkoutsLineWrite[];
}
interface WorkoutsBlockWriteInput {
  kind: "single" | "section" | "superset" | "circuit";
  description?: string;
  lines?: WorkoutsLineWriteInput[];
  name?: string;
  restBetweenRoundsSeconds?: number;
  rounds?: number;
  sourceSectionId?: string /*uuid*/;
}
interface WorkoutsDocument {
  id: string;
  lineageId: string;
  revision: number;
  current: boolean;
  ownerKind: string;
  companyId?: string | null;
  programId?: string | null;
  relationshipId?: string | null;
  name: string;
  description: string;
  coverUploadId?: string | null;
  dayTypeId?: string | null;
  tags: WorkoutsTag[];
  sourceTemplateId?: string | null;
  customised: boolean;
  readOnly: boolean;
  blocks: WorkoutsBlock[];
  includedBlocks: WorkoutsIncludedBlock[];
  exerciseCount: number;
  setCount: number;
  estimatedSeconds: number;
  archivedAt?: string | null;
  createdAt: string;
}
interface WorkoutsExerciseRef {
  id: string;
  name: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
  muscles?: ExercisesMuscleRef[];
}
interface WorkoutsIncludedBlock {
  ruleId: string;
  position: string;
  sectionLineageId: string;
  sectionId: string;
  block: WorkoutsBlock;
}
interface WorkoutsIncludedRule {
  id: string;
  sectionLineageId: string;
  sectionId?: string | null;
  sectionName: string;
  sectionArchived: boolean;
  dayTypeId?: string | null;
  tagId?: string | null;
  position: string;
  sort: number;
  createdAt: string;
}
interface WorkoutsItem {
  id: string;
  lineageId: string;
  revision: number;
  ownerKind: string;
  name: string;
  description: string;
  coverUploadId?: string | null;
  dayTypeId?: string | null;
  tags: WorkoutsTag[];
  exerciseCount: number;
  setCount: number;
  estimatedSeconds: number;
  shared: boolean;
  archivedAt?: string | null;
  createdAt: string;
}
interface WorkoutsLine {
  id: string;
  exercise: WorkoutsExerciseRef;
  note: string;
  tracking: string;
  optionalMetric?: string | null;
  secondMetric?: string | null;
  sets: WorkoutsSet[];
  alternatives: WorkoutsExerciseRef[];
  progression?: WorkoutsProgression | null;
}
interface WorkoutsLineWrite {
  exerciseId: string;
  note: string;
  tracking: string;
  optionalMetric?: string | null;
  secondMetric?: string | null;
  sets: WorkoutsSetWrite[];
  alternativeExerciseIds: string[];
  progression?: WorkoutsProgression;
}
interface WorkoutsLineWriteInput {
  exerciseId: string /*uuid*/;
  alternativeExerciseIds?: string[] /*uuid*/;
  note?: string;
  optionalMetric?: string;
  progression?: WorkoutsProgressionInput;
  secondMetric?: string;
  sets?: WorkoutsSetWriteInput[];
  tracking?: "weight_reps" | "reps" | "time" | "distance_time" | "time_only";
}
interface WorkoutsPage {
  items: WorkoutsItem[];
  total: number;
}
interface WorkoutsParsed {
  lines: WorkoutsParsedLine[];
  unmatched: number;
  blocks: WorkoutsBlockWrite[];
}
interface WorkoutsParsedLine {
  line: number;
  raw: string;
  name: string;
  match: string;
  exercise?: WorkoutsExerciseRef | null;
  candidates: WorkoutsExerciseRef[];
  sets: WorkoutsSetWrite[];
  optionalMetric?: string | null;
  secondMetric?: string | null;
  note: string;
  warnings: string[];
}
interface WorkoutsProgression {
  increment: number;
  unit: string;
}
interface WorkoutsProgressionInput {
  unit: "kg" | "pct";
  increment?: number;
}
interface WorkoutsSet {
  number: number;
  kind: string;
  repsMin?: number | null;
  repsMax?: number | null;
  repsAmrap: boolean;
  weightKg?: number | null;
  restSeconds?: number | null;
  durationSeconds?: number | null;
  distanceM?: number | null;
  tempo?: string | null;
  rpe?: number | null;
  rir?: number | null;
  rpm?: number | null;
  pct1rm?: number | null;
  backoffPct?: number | null;
}
interface WorkoutsSetWrite {
  kind: string;
  repsMin?: number | null;
  repsMax?: number | null;
  repsAmrap: boolean;
  weightKg?: number | null;
  restSeconds?: number | null;
  durationSeconds?: number | null;
  distanceM?: number | null;
  tempo?: string | null;
  rpe?: number | null;
  rir?: number | null;
  rpm?: number | null;
  pct1rm?: number | null;
  backoffPct?: number;
}
interface WorkoutsSetWriteInput {
  backoffPct?: number;
  distanceM?: number;
  durationSeconds?: number;
  kind?: "working" | "warmup" | "top_set" | "back_off" | "drop" | "failure" | "rest_pause" | "myo_reps" | "loaded_stretch" | "bfr";
  pct1rm?: number;
  repsAmrap?: boolean;
  repsMax?: number;
  repsMin?: number;
  restSeconds?: number;
  rir?: number;
  rpe?: number;
  rpm?: number;
  tempo?: string;
  weightKg?: number;
}
interface WorkoutsTag {
  id: string;
  name: string;
}
interface WorkspaceActivityItem {
  id: string;
  occurredAt: string;
  action: string;
  summary: string;
  actorRole: string;
  actorFirstName: string;
  actorLastName: string;
  targetType: string;
  targetId?: string | null;
}
interface WorkspaceAttentionDetail {
  value: string;
  unit: string;
  on: string;
}
interface WorkspaceAttentionItem {
  relationshipId: string;
  firstName: string;
  lastName: string;
  reason: string;
  label: string;
  snoozedUntil?: string | null;
  since?: string | null;
  detail?: WorkspaceAttentionDetail | null;
  week?: WorkspaceWeek | null;
}
interface WorkspaceAttentionReason {
  reason: string;
  label: string;
}
interface WorkspaceCoachToday {
  date: string;
  counts: WorkspaceTodayCounts;
  attention: WorkspaceAttentionItem[];
  squad: WorkspaceSquad;
  tasksDue: WorkspaceTaskDue[];
  recentConversations: WorkspaceConversationPreview[];
  starting: WorkspaceMilestone[];
  ending: WorkspaceMilestone[];
  whatsNew: boolean;
}
interface WorkspaceConversationPreview {
  relationshipId: string;
  title: string;
  peerFirstName: string;
  peerLastName: string;
  lastBody: string;
  lastSentAt?: string | null;
  unreadCount: number;
  lastVoiceMs?: number | null;
}
interface WorkspaceGoalWeight {
  value: string;
  unit: string;
  goalDate?: string | null;
}
interface WorkspaceHabitItem {
  name: string;
  done: boolean;
}
interface WorkspaceHabitsToday {
  done: number;
  total: number;
  items: WorkspaceHabitItem[];
}
interface WorkspaceIntakeDay {
  kcal?: string | null;
  proteinG?: string | null;
  carbohydrateG?: string | null;
  fatG?: string | null;
}
interface WorkspaceMacroAvg {
  kcal?: string | null;
  proteinG?: string | null;
  carbohydrateG?: string | null;
  fatG?: string | null;
  days: number;
}
interface WorkspaceMacroTarget {
  kcal: string;
  proteinG: string;
  carbohydrateG: string;
  fatG: string;
}
interface WorkspaceMessageCard {
  id: string;
  senderUserId: string;
  firstName: string;
  lastName: string;
  body: string;
  sentAt: string;
  fromClient: boolean;
  voiceMs?: number | null;
}
interface WorkspaceMetricCard {
  key: string;
  name: string;
  unit: string;
  latest?: WorkspaceMetricPoint | null;
  first?: WorkspaceMetricPoint | null;
  target?: string | null;
  goalDate?: string | null;
  series: WorkspaceMetricPoint[];
}
interface WorkspaceMetricPoint {
  date: string;
  value: string;
}
interface WorkspaceMilestone {
  relationshipId: string;
  firstName: string;
  lastName: string;
  date: string;
}
interface WorkspaceNextItem {
  kind: string;
  id?: string | null;
  title: string;
  dueOn?: string | null;
}
interface WorkspaceNote {
  id: string;
  relationshipId: string;
  authorUserId: string;
  authorFirstName: string;
  authorLastName: string;
  title: string;
  body: string;
  visibility: string;
  pinned: boolean;
  pinnedAt?: string | null;
  coachingContext: boolean;
  createdAt: string;
  updatedAt: string;
}
interface WorkspaceNutritionToday {
  target?: WorkspaceMacroTarget | null;
  intake?: WorkspaceIntakeDay | null;
}
interface WorkspaceNutritionWeek {
  days: WorkspaceNutritionWeekDay[];
  avg: WorkspaceMacroAvg;
}
interface WorkspaceNutritionWeekDay {
  date: string;
  dayLabel: string;
  targetKcal?: string | null;
  intake?: WorkspaceIntakeDay | null;
  beforeStart: boolean;
}
interface WorkspaceOverview {
  profile: WorkspaceProfile;
  today: WorkspaceTodayCard;
  nutritionWeek?: WorkspaceNutritionWeek | null;
  metrics: WorkspaceMetricCard[];
  trainingWeek?: WorkspaceTrainingWeek | null;
  habitsToday?: WorkspaceHabitsToday | null;
  activity: WorkspaceActivityItem[];
  nextUp: WorkspaceNextItem[];
  photos?: WorkspacePhotoSet | null;
  latestMessage?: WorkspaceMessageCard | null;
  attention: WorkspaceAttentionReason[];
  setup: WorkspaceSetupStep[];
  onboardingDraft?: OpsOnboardingDraftBadge | null;
}
interface WorkspacePhoto {
  id: string;
  recordedOn: string;
  pose?: string | null;
}
interface WorkspacePhotoSet {
  latestSet: WorkspacePhoto[];
}
interface WorkspaceProfile {
  firstName: string;
  lastName: string;
  status: string;
  age?: number | null;
  sex?: string | null;
  heightCm?: string | null;
  lastCheckinAt?: string | null;
  lastActiveAt?: string | null;
  week: WorkspaceWeek;
  clientSince: string;
  goalWeight?: WorkspaceGoalWeight | null;
}
interface WorkspaceSetupStep {
  key: string;
  label: string;
  done: boolean;
}
interface WorkspaceSquad {
  total: number;
  active: number;
  members: WorkspaceSquadMember[];
}
interface WorkspaceSquadMember {
  relationshipId: string;
  firstName: string;
  lastName: string;
  state: string;
}
interface WorkspaceTaskDue {
  id: string;
  title: string;
  dueOn?: string | null;
  relationshipId?: string | null;
  clientFirstName: string;
  clientLastName: string;
}
interface WorkspaceTodayCard {
  date: string;
  dayLabel: string;
  dayLabelKey?: string | null;
  training?: WorkspaceTrainingToday | null;
  nutrition?: WorkspaceNutritionToday | null;
}
interface WorkspaceTodayCounts {
  clients: number;
  attention: number;
  checkinsToReview: number;
  tasksDue: number;
  unreadMessages: number;
  joinRequests: number;
}
interface WorkspaceTrainingLast {
  date: string;
  workoutName?: string | null;
  completedAt: string;
}
interface WorkspaceTrainingToday {
  planned?: boolean | null;
  done?: boolean | null;
  workoutName?: string | null;
  completedAt?: string | null;
  exerciseCount?: number | null;
}
interface WorkspaceTrainingWeek {
  days: WorkspaceTrainingWeekDay[];
  planned: number;
  done: number;
  last?: WorkspaceTrainingLast | null;
  tracked?: boolean;
}
interface WorkspaceTrainingWeekDay {
  date: string;
  state: string;
  workoutName?: string | null;
}
interface WorkspaceWeek {
  current?: number | null;
  total?: number | null;
  state: string;
}

// Tool inputs and outputs
interface AcceptCheckinProposalInput {
  cid: string;
  clientId: string;
  bases?: PlansNutritionPlanChangeBaseInput[];
  companyId?: string;
  dryRun?: boolean;
  fingerprint?: string;
  spoken?: AutopilotSpokenMove;
}
type AcceptCheckinProposalOutput = PlansNutritionPlanChangePreview;
interface AcceptJoinRequestInput {
  id: string;
  companyId?: string;
  invite?: boolean;
}
type AcceptJoinRequestOutput = { pending: true; index: number };
interface AddBloodworkInput {
  clientId: string;
  companyId?: string;
  documentId?: string /*uuid*/;
  dryRun?: boolean;
  labName?: string;
  notes?: string;
  report?: BloodworkReportInput;
  results?: BloodworkResultInput[];
  takenOn?: string;
}
type AddBloodworkOutput = BloodworkPanelResult;
interface AddCardioEntryInput {
  activityType: "running" | "cycling" | "walking" | "rowing" | "elliptical" | "swimming" | "hiit" | "stairs" | "other";
  clientId: string;
  companyId?: string;
  date?: string;
  idempotencyKey?: string;
  minutes?: number;
  note?: string;
}
type AddCardioEntryOutput = { pending: true; index: number };
interface AddClientEventInput {
  clientId: string;
  name: string;
  companyId?: string;
  date?: string;
  idempotencyKey?: string;
}
type AddClientEventOutput = { pending: true; index: number };
interface AddClientNoteInput {
  body: string;
  clientId: string;
  title: string;
  companyId?: string;
  idempotencyKey?: string;
  pinned?: boolean;
  visibility?: string;
}
type AddClientNoteOutput = { pending: true; index: number };
interface AddFollowUpInput {
  clientId: string;
  body?: string;
  checkinId?: string /*uuid*/;
  companyId?: string;
  dueOn?: string;
}
type AddFollowUpOutput = { pending: true; index: number };
interface AddFormQuestionInput {
  id: string;
  question: FormsQuestionInput;
  baseRevision?: number;
  companyId?: string;
  editLock?: number;
  idempotencyKey?: string;
  position?: number;
}
type AddFormQuestionOutput = { pending: true; index: number };
interface AddMealInput {
  clientId: string;
  planId: string;
  afterMealId?: string /*uuid*/;
  baseRevision?: number;
  companyId?: string;
  copyFromMealId?: string /*uuid*/;
  idempotencyKey?: string;
  name?: string;
  note?: string;
  time?: string;
}
type AddMealOutput = { pending: true; index: number };
interface AddMealOptionInput {
  clientId: string;
  mealId: string;
  planId: string;
  baseRevision?: number;
  companyId?: string;
  description?: string;
  foods?: PlansNutritionPlanFoodInput[];
  idempotencyKey?: string;
  label?: string;
  makeDefault?: boolean;
  manual?: PlansNutritionPlanMacrosInput;
  name?: string;
  photoUploadId?: string /*uuid*/;
  recipeId?: string /*uuid*/;
  scaleIngredients?: boolean;
  servings?: string;
  source?: string;
  steps?: PlansNutritionPlanStepInput[];
}
type AddMealOptionOutput = { pending: true; index: number };
interface AddSupplementToPlanInput {
  clientId: string;
  line: SupplementsLineInput;
  baseRevision?: number;
  companyId?: string;
  effectiveOn?: string;
  idempotencyKey?: string;
  replaceFuture?: boolean;
  sectionId?: string /*uuid*/;
  sectionLabel?: string;
}
type AddSupplementToPlanOutput = { pending: true; index: number };
interface AddWorkoutToProgramInput {
  baseRevision: number;
  from: ProgramsWorkoutSource;
  id: string;
  weekId: string /*uuid*/;
  companyId?: string;
  dayIndex?: number;
  idempotencyKey?: string;
  sort?: number;
}
type AddWorkoutToProgramOutput = { pending: true; index: number };
interface AdjustPeakWeekDayInput {
  clientId: string;
  date: string;
  carbohydrateG?: number;
  companyId?: string;
  dayTypeKey?: string;
  fatG?: number;
  note?: string;
  potassiumMg?: number;
  proteinG?: number;
  sodiumMg?: number;
  waterL?: number;
}
type AdjustPeakWeekDayOutput = { pending: true; index: number };
interface AnswerCoachQuestionInput {
  qid: string;
  body?: string;
  companyId?: string;
  resolve?: boolean;
}
type AnswerCoachQuestionOutput = { pending: true; index: number };
interface ApplyPeakWeekInput {
  clientId: string;
  companyId?: string;
  days?: PeakweekDayPlanInput[];
  dryRun?: boolean;
  showDate?: string;
  showName?: string;
  templateId?: string /*uuid*/;
}
type ApplyPeakWeekOutput = PeakweekApplyResult;
interface ApplyPlanChangeInput {
  clientId: string;
  macro: "protein" | "carbs" | "fat";
  bases?: PlansNutritionPlanChangeBaseInput[];
  companyId?: string;
  dayTypeKeys?: string[];
  dryRun?: boolean;
  grams?: string;
  kcal?: string;
  notifyClient?: boolean;
  trainingTime?: string;
}
type ApplyPlanChangeOutput = PlansNutritionPlanChangePreview;
interface ApplySequenceInput {
  id: string;
  relationshipId: string /*uuid*/;
  companyId?: string;
  conflict?: string;
  dryRun?: boolean;
  startFrom?: string;
}
type ApplySequenceOutput = AutomationApplyResult;
interface ArchiveAutomationRuleInput {
  id: string;
  companyId?: string;
}
type ArchiveAutomationRuleOutput = { pending: true; index: number };
interface ArchiveClientInput {
  clientId: string;
  companyId?: string;
  goodbyeMessage?: string;
}
type ArchiveClientOutput = { pending: true; index: number };
interface ArchiveExerciseInput {
  id: string;
  companyId?: string;
}
type ArchiveExerciseOutput = { pending: true; index: number };
interface ArchiveFormInput {
  id: string;
  companyId?: string;
}
type ArchiveFormOutput = { pending: true; index: number };
interface ArchiveWorkoutInput {
  id: string;
  companyId?: string;
}
type ArchiveWorkoutOutput = { pending: true; index: number };
interface AskCoachInput {
  askedTo: string /*uuid*/;
  clientId: string;
  body?: string;
  checkinId?: string /*uuid*/;
  companyId?: string;
}
type AskCoachOutput = { pending: true; index: number };
interface AssignFormToClientsInput {
  id: string;
  schedule: ScheduleInput;
  companyId?: string;
  idempotencyKey?: string;
  relationshipIds?: string[] /*uuid*/;
}
type AssignFormToClientsOutput = { pending: true; index: number };
interface AssignHabitsInput {
  clientId: string;
  companyId?: string;
  idempotencyKey?: string;
  items?: HabitInput[];
}
type AssignHabitsOutput = { pending: true; index: number };
interface AssignPlanSetInput {
  clientId: string;
  setId: string;
  companyId?: string;
  dryRun?: boolean;
  scaleToRestKcal?: string;
}
type AssignPlanSetOutput = PlanSetAssigned;
interface AssignProgramInput {
  clientId: string;
  programId: string /*uuid*/;
  companyId?: string;
  conflict?: "keep" | "replace";
  dryRun?: boolean;
  idempotencyKey?: string;
  importAnyway?: boolean;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  repeat?: boolean;
  settings?: ClientAssignSettings;
  startDate?: string;
  startWeek?: number;
}
type AssignProgramOutput = ClientAssignResult;
interface BulkUpdateTasksInput {
  action?: string;
  assigneeUserId?: string /*uuid*/;
  companyId?: string;
  dueOn?: string;
  taskIds?: string[] /*uuid*/;
}
type BulkUpdateTasksOutput = { pending: true; index: number };
interface CheckClientEmailInput {
  companyId?: string;
  /** Email address to check. */
  email?: string;
}
type CheckClientEmailOutput = ClientsEmailCheck;
interface ChooseMealOptionInput {
  clientId: string;
  date: string;
  mealId: string;
  companyId?: string;
  optionId?: string /*uuid*/;
  recipeId?: string /*uuid*/;
  servings?: string;
  wholeWeek?: boolean;
}
type ChooseMealOptionOutput = { pending: true; index: number };
interface ClearDayOverrideInput {
  clientId: string;
  date: string;
  companyId?: string;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
}
type ClearDayOverrideOutput = { pending: true; index: number };
interface ClearMicronutrientTargetInput {
  clientId: string;
  key: string;
  companyId?: string;
}
type ClearMicronutrientTargetOutput = { pending: true; index: number };
interface CloseFollowUpInput {
  clientId: string;
  fid: string;
  checkinId?: string /*uuid*/;
  companyId?: string;
}
type CloseFollowUpOutput = { pending: true; index: number };
interface CompareCheckinsInput {
  clientId: string;
  companyId?: string;
  /** Comma list of 2 to 4 check-in ids of this client. */
  ids?: string;
}
type CompareCheckinsOutput = SubmitComparison;
interface CompleteTaskInput {
  id: string;
  companyId?: string;
}
type CompleteTaskOutput = { pending: true; index: number };
interface ConfirmFoodLogDraftInput {
  clientId: string;
  draftId: string;
  companyId?: string;
  idempotencyKey?: string;
  lines?: FoodlogConfirmLine[];
  mealKey?: string;
}
type ConfirmFoodLogDraftOutput = { pending: true; index: number };
interface CopyFoodLogInput {
  clientId: string;
  companyId?: string;
  fromDate?: string;
  idempotencyKey?: string;
  mealKeys?: string[];
  toDate?: string;
}
type CopyFoodLogOutput = { pending: true; index: number };
interface CopyOffProductInput {
  code: string;
  companyId?: string;
  idempotencyKey?: string;
}
type CopyOffProductOutput = { pending: true; index: number };
interface CreateAutomationRuleInput {
  anchor?: string;
  baseRevision?: number;
  companyId?: string;
  description?: string;
  graph?: AutomationGraphInput;
  idempotencyKey?: string;
  kind?: string;
  name?: string;
  settings?: AutomationSettingsInput;
  steps?: AutomationStepInput[];
  templateKey?: string;
  trigger?: AutomationTriggerInput;
}
type CreateAutomationRuleOutput = { pending: true; index: number };
interface CreateClientInput {
  email: string;
  firstName: string;
  lastName: string;
  access?: string;
  coachUserIds?: string[] /*uuid*/;
  companyId?: string;
  idempotencyKey?: string;
  onboardingFlowId?: string;
  packageId?: string /*uuid*/;
  plannedEndDate?: string;
  practiceId?: string /*uuid*/;
  primaryCoachUserId?: string /*uuid*/;
  showDuration?: boolean;
  startDate?: string;
  tagIds?: string[] /*uuid*/;
  welcomeMessage?: string;
}
type CreateClientOutput = { pending: true; index: number };
interface CreateDayTypeInput {
  companyId?: string;
  fallbackDayTypeId?: string /*uuid*/;
  icon?: string;
  idempotencyKey?: string;
  key?: string;
  kind?: string;
  label?: string;
  paletteSlot?: number;
  priority?: number;
  sort?: number;
}
type CreateDayTypeOutput = { pending: true; index: number };
interface CreateExerciseInput {
  name: string;
  companyId?: string;
  countsFor1rm?: boolean;
  description?: string;
  equipment?: string;
  force?: string;
  idempotencyKey?: string;
  imageUploadIds?: string[] /*uuid*/;
  level?: string;
  mechanic?: string;
  muscles?: ExercisesMuscleRefInput[];
  tracking?: string;
  type?: string;
  unilateral?: boolean;
  videoUrl?: string;
}
type CreateExerciseOutput = { pending: true; index: number };
interface CreateFormInput {
  kind: string;
  name: string;
  companyId?: string;
  coverUploadId?: string /*uuid*/;
  description?: string;
  idempotencyKey?: string;
  questions?: FormsQuestionInput[];
}
type CreateFormOutput = { pending: true; index: number };
interface CreateIncludedBlockInput {
  sectionId: string /*uuid*/;
  companyId?: string;
  dayTypeId?: string /*uuid*/;
  idempotencyKey?: string;
  position?: "start" | "end";
  sort?: number;
  tagId?: string /*uuid*/;
}
type CreateIncludedBlockOutput = { pending: true; index: number };
interface CreateLeadInput {
  assignedCoachId?: string /*uuid*/;
  companyId?: string;
  email?: string;
  name?: string;
  notes?: string;
  phone?: string;
  source?: string;
}
type CreateLeadOutput = { pending: true; index: number };
interface CreateNutritionPlanInput {
  clientId: string;
  companyId?: string;
  copyFromPlanId?: string /*uuid*/;
  description?: string;
  idempotencyKey?: string;
  kind?: string;
  macroMode?: string;
  name?: string;
  suggestedDayTypeKey?: string;
  tags?: string[];
}
type CreateNutritionPlanOutput = { pending: true; index: number };
interface CreateProgramInput {
  companyId?: string;
  description?: string;
  idempotencyKey?: string;
  name?: string;
  tags?: string[];
  type?: string;
}
type CreateProgramOutput = { pending: true; index: number };
interface CreateQuizInput {
  companyId?: string;
  dryRun?: boolean;
  enabled?: boolean;
  gateEmail?: boolean;
  intro?: string;
  outcomes?: MagnetsOutcomeInput[];
  questions?: MagnetsQuestionInput[];
  slug?: string;
  title?: string;
}
type CreateQuizOutput = MagnetsQuiz;
interface CreateSupplementInput {
  defaultUnit: string;
  name: string;
  brand?: string;
  category?: string;
  companyId?: string;
  discountCode?: string;
  idempotencyKey?: string;
  notes?: string;
  resourceIds?: string[] /*uuid*/;
}
type CreateSupplementOutput = { pending: true; index: number };
interface CreateSwitchImportInput {
  source: "kahunas" | "trainerize" | "hubfit" | "truecoach" | "everfit" | "ptdistinction" | "sheets" | "other";
  companyId?: string;
  contentBase64?: string;
  fileName?: string;
  text?: string;
}
type CreateSwitchImportOutput = { pending: true; index: number };
interface CreateTaskInput {
  title: string;
  assigneeUserId?: string /*uuid*/;
  companyId?: string;
  dueOn?: string;
  dueTime?: string;
  idempotencyKey?: string;
  notes?: string;
  relationshipId?: string /*uuid*/;
  remindAt?: string /*date-time*/;
}
type CreateTaskOutput = { pending: true; index: number };
interface CreateWorkoutInput {
  name: string;
  baseRevision?: number;
  blocks?: WorkoutsBlockWriteInput[];
  companyId?: string;
  coverUploadId?: string /*uuid*/;
  dayTypeId?: string /*uuid*/;
  description?: string;
  idempotencyKey?: string;
  ownerKind?: "library" | "section";
  tags?: string[];
}
type CreateWorkoutOutput = { pending: true; index: number };
interface DecideStyleProposalInput {
  decision: "accept" | "reject";
  id: string;
  companyId?: string;
  dryRun?: boolean;
  rule?: string;
}
type DecideStyleProposalOutput = HttpserverStyleDecision;
interface DeclineJoinRequestInput {
  id: string;
  companyId?: string;
}
type DeclineJoinRequestOutput = { pending: true; index: number };
interface DeleteFoodLogEntryInput {
  clientId: string;
  entryId: string;
  companyId?: string;
}
type DeleteFoodLogEntryOutput = { pending: true; index: number };
interface DeleteIncludedBlockInput {
  id: string;
  companyId?: string;
}
type DeleteIncludedBlockOutput = { pending: true; index: number };
interface DeleteMetricEntryInput {
  clientId: string;
  date: string;
  key: string;
  companyId?: string;
}
type DeleteMetricEntryOutput = { pending: true; index: number };
interface DeleteSessionInput {
  clientId: string;
  sessionId: string;
  companyId?: string;
}
type DeleteSessionOutput = { pending: true; index: number };
interface DraftCheckinFeedbackInput {
  cid: string;
  clientId: string;
  body?: string;
  companyId?: string;
  idempotencyKey?: string;
  origin?: string;
  videoUrl?: string;
}
type DraftCheckinFeedbackOutput = { pending: true; index: number };
interface DraftContentInput {
  format: "caption" | "reel" | "carousel" | "newsletter_section" | "myth" | "newsletter";
  companyId?: string;
  scheduledOn?: string;
  themeId?: string /*uuid*/;
}
type DraftContentOutput = { pending: true; index: number };
interface DraftSaveMessageInput {
  clientId: string;
  companyId?: string;
}
type DraftSaveMessageOutput = { pending: true; index: number };
interface DuplicateExerciseInput {
  id: string;
  companyId?: string;
  idempotencyKey?: string;
}
type DuplicateExerciseOutput = { pending: true; index: number };
interface DuplicateFormInput {
  id: string;
  companyId?: string;
  idempotencyKey?: string;
  name?: string;
}
type DuplicateFormOutput = { pending: true; index: number };
interface EditClientWorkoutInput {
  baseRevision: number;
  clientId: string;
  cwId: string;
  name: string;
  blocks?: WorkoutsBlockWriteInput[];
  companyId?: string;
  coverUploadId?: string /*uuid*/;
  dayTypeId?: string /*uuid*/;
  description?: string;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  ownerKind?: "library" | "section";
  tags?: string[];
}
type EditClientWorkoutOutput = { pending: true; index: number };
interface EndLifeModeInput {
  clientId: string;
  modeId: string;
  companyId?: string;
}
type EndLifeModeOutput = { pending: true; index: number };
interface FindClientsInput {
  coachId?: string /*uuid*/;
  companyId?: string;
  filters?: ClientfinderFilter[];
  limit?: number;
}
type FindClientsOutput = ClientfinderAnswer;
interface FindClientsMissingHabitsInput {
  /** Percentage from 1 to 100. Clients under it are listed. Defaults to 50. */
  below?: number;
  companyId?: string;
  /** Window in days from 1 to 90. Defaults to 7. */
  days?: number;
}
type FindClientsMissingHabitsOutput = HabitCompletionList;
interface FinishCallInput {
  id: string;
  agreements?: CallAgreementInput[];
  companyId?: string;
  createTasks?: boolean;
  idempotencyKey?: string;
  markReviewed?: boolean;
  notes?: string;
  summary?: CallSummaryInput;
}
type FinishCallOutput = { pending: true; index: number };
interface FlagForCallInput {
  clientId: string;
  sourceType: "checkin_answer" | "message" | "metric_entry" | "food_day" | "note" | "other";
  text: string;
  companyId?: string;
  idempotencyKey?: string;
  sourceId?: string;
}
type FlagForCallOutput = { pending: true; index: number };
interface GetActivitySummaryInput {
  clientId: string;
  companyId?: string;
  /** week or month. Defaults to week. */
  period?: "week" | "month";
  /** Any day in the period, YYYY-MM-DD. Defaults to the current one. */
  start?: string /*date*/;
}
type GetActivitySummaryOutput = HealthSummary;
interface GetAutomationInput {
  id: string;
  companyId?: string;
}
type GetAutomationOutput = AutomationRule;
interface GetBusinessStatsInput {
  /** Narrow the numbers to this coach. Owners and admins only; a coach may pass their own id. */
  coachId?: string /*uuid*/;
  companyId?: string;
  /** Rolling window ending today: 4w (28 days, default), quarter (91 days) or year (365 days). */
  period?: "4w" | "quarter" | "year";
}
type GetBusinessStatsOutput = AnalyticsBusinessStats;
interface GetCallBriefInput {
  clientId: string;
  /** The check-in to show, when it is one of the client's. A review defaults to the newest one still waiting. */
  checkin?: string /*uuid*/;
  companyId?: string;
  /** call (default) or review. It picks the open call, the last call and the agreements the brief shows. */
  mode?: "call" | "review";
}
type GetCallBriefOutput = CallBrief;
interface GetCheckinInput {
  cid: string;
  clientId: string;
  companyId?: string;
}
type GetCheckinOutput = SubmitSubmission;
interface GetCheckinBriefInput {
  cid: string;
  clientId: string;
  companyId?: string;
}
type GetCheckinBriefOutput = Brief;
interface GetCheckinDayInput {
  companyId?: string;
  /** The day, YYYY-MM-DD. Defaults to today in timeZone. */
  date?: string /*date*/;
  /** IANA zone that decides today, like Europe/Amsterdam. Pass the coach's zone; defaults to the zone in their profile, then the company's. */
  timeZone?: string;
}
type GetCheckinDayOutput = DayCheckinDay;
interface GetCheckinDaySummaryInput {
  companyId?: string;
  /** The day, YYYY-MM-DD. Defaults to today in timeZone. */
  date?: string /*date*/;
  /** IANA zone the day runs in, like Europe/Amsterdam. Pass the coach's zone; defaults to the zone in their profile, then the company's. */
  timeZone?: string;
}
type GetCheckinDaySummaryOutput = DayCheckinDayRecap;
interface GetCheckinQuestionTrendInput {
  clientId: string;
  /** The form the question belongs to. */
  formId: string /*uuid*/;
  key: string;
  companyId?: string;
  /** First check-in date, YYYY-MM-DD. */
  from?: string /*date*/;
  /** Last check-in date, YYYY-MM-DD. */
  to?: string /*date*/;
}
type GetCheckinQuestionTrendOutput = SubmitSeries;
interface GetCheckinWeekInput {
  clientId: string;
  companyId?: string;
  /** One of the client's daily check-in forms, from forms in the answer. Defaults to the one with the most answers that week. */
  formId?: string /*uuid*/;
  /** Any day in the week, YYYY-MM-DD. The week starts on the client's week start. Defaults to this week. */
  start?: string /*date*/;
}
type GetCheckinWeekOutput = SubmitCheckinWeek;
interface GetClientInput {
  clientId: string;
  companyId?: string;
}
type GetClientOutput = ClientsDetail;
interface GetClientCyclePhaseInput {
  clientId: string;
  companyId?: string;
}
type GetClientCyclePhaseOutput = CyclePhaseView;
interface GetClientOverviewInput {
  clientId: string;
  companyId?: string;
  /** Anchor day, YYYY-MM-DD. Defaults to the client's local today. */
  date?: string /*date*/;
  /** First day of the window, YYYY-MM-DD. */
  from?: string /*date*/;
  /** Last day of the window, YYYY-MM-DD. */
  to?: string /*date*/;
}
type GetClientOverviewOutput = WorkspaceOverview;
interface GetClientPeakWeekInput {
  clientId: string;
  companyId?: string;
}
type GetClientPeakWeekOutput = PeakweekView;
interface GetClientRiskInput {
  clientId: string;
  companyId?: string;
}
type GetClientRiskOutput = DropoutDetail;
interface GetClientTimelineInput {
  clientId: string;
  companyId?: string;
  /** First day of the range, YYYY-MM-DD. Defaults to 6 months before the client's today. */
  from?: string /*date*/;
  /** Last day of the range, YYYY-MM-DD. Defaults to 12 months after the client's today. At most 10 years after from. */
  to?: string /*date*/;
}
type GetClientTimelineOutput = PhasesTimeline;
interface GetClientWeekTimelineInput {
  clientId: string;
  companyId?: string;
  /** coach (the default) is the full table; shared leaves out what the client must not see on a shared screen. */
  view?: "coach" | "shared";
}
type GetClientWeekTimelineOutput = WeekTimeline;
interface GetClientWorkoutInput {
  clientId: string;
  cwId: string;
  companyId?: string;
}
type GetClientWorkoutOutput = ClientWorkout;
interface GetCoachTodayInput {
  companyId?: string;
  /** Calendar day, YYYY-MM-DD. Defaults to the staff member's local today. */
  date?: string /*date*/;
  /** all (default) or mine. For an owner or admin, mine keeps only the clients they coach. */
  scope?: "all" | "mine";
}
type GetCoachTodayOutput = WorkspaceCoachToday;
interface GetCompanyFeaturesInput {
  companyId?: string;
}
type GetCompanyFeaturesOutput = FeatureList;
interface GetDayCalendarInput {
  clientId: string;
  companyId?: string;
  /** First day, YYYY-MM-DD, client-local. Defaults to the client's today. */
  from?: string /*date*/;
  /** nutrition adds each day's plan and target, or null when no plan matches. */
  include?: "nutrition";
  /** Last day, YYYY-MM-DD. Defaults to six days after from. At most 92 days in total. */
  to?: string /*date*/;
}
type GetDayCalendarOutput = HttpserverDayCalendarNutrition;
interface GetDayRulesInput {
  clientId: string;
  companyId?: string;
}
type GetDayRulesOutput = DayRules;
interface GetExerciseInput {
  id: string;
  companyId?: string;
}
type GetExerciseOutput = Exercise;
interface GetExerciseFacetsInput {
  companyId?: string;
}
type GetExerciseFacetsOutput = ExercisesFacets;
interface GetExerciseHistoryInput {
  clientId: string;
  exerciseId: string;
  companyId?: string;
  /** First day, YYYY-MM-DD. Defaults to all time. */
  from?: string /*date*/;
  /** Page of 20 sessions from 1. Defaults to 1. */
  page?: number;
  /** Last day, YYYY-MM-DD. Defaults to the client's today. */
  to?: string /*date*/;
}
type GetExerciseHistoryOutput = SessionsExerciseHistory;
interface GetFixedProgramInput {
  clientId: string;
  companyId?: string;
}
type GetFixedProgramOutput = ClientFixedProgram;
interface GetFoodLogInput {
  clientId: string;
  companyId?: string;
  /** Day, YYYY-MM-DD, client-local. Defaults to the client's today. */
  date?: string /*date*/;
}
type GetFoodLogOutput = FoodlogDay;
interface GetFormInput {
  id: string;
  companyId?: string;
  /** A past revision number to read. Defaults to the current revision. */
  revision?: number;
}
type GetFormOutput = FormsDetail;
interface GetGroceryListInput {
  clientId: string;
  /** picks uses the client's meal choices, else default options. default ignores choices. Defaults to picks. */
  choices?: "picks" | "default";
  companyId?: string;
  /** First day, YYYY-MM-DD. Defaults to the client's today. */
  from?: string /*date*/;
  /** Last day, YYYY-MM-DD. Defaults to six days after from. At most 31 days in total. */
  to?: string /*date*/;
}
type GetGroceryListOutput = GroceryList;
interface GetHabitSummaryInput {
  clientId: string;
  companyId?: string;
  /** Any date in the week, YYYY-MM-DD. Defaults to this week. */
  week?: string /*date*/;
}
type GetHabitSummaryOutput = HabitSummary;
interface GetImportStatusInput {
  id: string;
  companyId?: string;
}
type GetImportStatusOutput = SwitchimportImportView;
interface GetLeadInput {
  id: string;
  companyId?: string;
}
type GetLeadOutput = LeadDetail;
interface GetLeadFunnelInput {
  /** Narrow to this coach. Owners and admins only. */
  coachId?: string /*uuid*/;
  companyId?: string;
  /** 30 (default) or 90. */
  days?: number;
}
type GetLeadFunnelOutput = LeadFunnel;
interface GetMarkerTrendInput {
  clientId: string;
  marker: string;
  companyId?: string;
}
type GetMarkerTrendOutput = BloodworkTrend;
interface GetMeInput {
  companyId?: string;
}
type GetMeOutput = HttpserverMeResponse;
interface GetMessagesInput {
  clientId: string;
  /** Returns messages after this message id. */
  after?: string /*uuid*/;
  /** Returns messages before this message id. */
  before?: string /*uuid*/;
  companyId?: string;
  /** Page size from 1 to 200. Defaults to 50. */
  limit?: number;
}
type GetMessagesOutput = HttpserverMessagesResponse;
interface GetMetricTrendInput {
  clientId: string;
  key: string;
  companyId?: string;
  /** Anchor day, YYYY-MM-DD. Defaults to today. */
  date?: string /*date*/;
  /** First day, YYYY-MM-DD. Defaults to 90 days before the anchor. */
  from?: string /*date*/;
  /** Last day, YYYY-MM-DD. Defaults to the anchor. */
  to?: string /*date*/;
  /** Display unit: kg or lb for mass, cm or in for length. Defaults to the client's unit system. */
  unit?: string;
}
type GetMetricTrendOutput = MetricTrend;
interface GetMetricWeekInput {
  clientId: string;
  companyId?: string;
  /** Any day in the week, YYYY-MM-DD. Defaults to this week. The week starts on the viewer's chosen weekday. */
  week?: string /*date*/;
}
type GetMetricWeekOutput = MetricWeek;
interface GetMicronutrientDayInput {
  clientId: string;
  companyId?: string;
  /** Day, YYYY-MM-DD, client-local. Defaults to the client's today. */
  date?: string /*date*/;
}
type GetMicronutrientDayOutput = MicrosDay;
interface GetMicronutrientSummaryInput {
  clientId: string;
  companyId?: string;
  /** First day, YYYY-MM-DD. Defaults to six days before to. */
  from?: string /*date*/;
  /** Last day, YYYY-MM-DD. Defaults to the client's today. At most 31 days in total. */
  to?: string /*date*/;
}
type GetMicronutrientSummaryOutput = MicrosRange;
interface GetMiniCheckinInput {
  id: string;
  companyId?: string;
}
type GetMiniCheckinOutput = MinicheckinBrief;
interface GetNutritionDayInput {
  clientId: string;
  companyId?: string;
  /** Day, YYYY-MM-DD, client-local. Defaults to the client's today. */
  date?: string /*date*/;
}
type GetNutritionDayOutput = NutritionDay;
interface GetNutritionPlanInput {
  clientId: string;
  planId: string;
  companyId?: string;
  /** Returns the revision in effect on this date, YYYY-MM-DD, with the nutrients frozen then. */
  on?: string /*date*/;
}
type GetNutritionPlanOutput = SlimPlanDoc;
interface GetNutritionSettingsInput {
  clientId: string;
  companyId?: string;
}
type GetNutritionSettingsOutput = NutritionSettings;
interface GetNutritionSetupInput {
  clientId: string;
  companyId?: string;
}
type GetNutritionSetupOutput = NutritionDocument;
interface GetNutritionSummaryInput {
  clientId: string;
  companyId?: string;
  /** How many days up to today, 1 to 92. Defaults to 7. */
  days?: number;
}
type GetNutritionSummaryOutput = NutritionSummary;
interface GetOnboardingDraftInput {
  clientId: string;
  companyId?: string;
}
type GetOnboardingDraftOutput = SlimOnboarding;
interface GetOwnerBriefInput {
  companyId?: string;
  /** The Monday the brief was issued, YYYY-MM-DD. Defaults to this week's Monday in the company's zone. */
  week?: string /*date*/;
}
type GetOwnerBriefOutput = OwnerbriefView;
interface GetPrepTimelineInput {
  clientId: string;
  companyId?: string;
}
type GetPrepTimelineOutput = PreptimelineView;
interface GetPreparedCheckinInput {
  cid: string;
  clientId: string;
  companyId?: string;
}
type GetPreparedCheckinOutput = AutopilotPreparedCheckin;
interface GetProgramInput {
  id: string;
  companyId?: string;
}
type GetProgramOutput = ProgramsDocument;
interface GetQuizResultsInput {
  id: string;
  companyId?: string;
}
type GetQuizResultsOutput = MagnetsQuizResults;
interface GetRecoveryTrendInput {
  clientId: string;
  companyId?: string;
  /** Last day of the week, YYYY-MM-DD. Defaults to today. */
  date?: string /*date*/;
}
type GetRecoveryTrendOutput = RecoveryResult;
interface GetReferralLinkInput {
  clientId: string;
  companyId?: string;
}
type GetReferralLinkOutput = ReferralsMine;
interface GetRescueSettingsInput {
  companyId?: string;
}
type GetRescueSettingsOutput = CelebrateSettings;
interface GetSessionInput {
  clientId: string;
  sessionId: string;
  companyId?: string;
}
type GetSessionOutput = Session;
interface GetStyleGuideInput {
  /** The coach whose guide to read. Only an owner or admin may name someone else. */
  coachId?: string /*uuid*/;
  companyId?: string;
}
type GetStyleGuideOutput = CoachstyleGuide;
interface GetSupplementAdherenceInput {
  clientId: string;
  companyId?: string;
  /** First day, YYYY-MM-DD. Defaults to six days before to. */
  from?: string /*date*/;
  /** Last day, YYYY-MM-DD. Defaults to and is capped at the client's today. At most 92 days in total. */
  to?: string /*date*/;
}
type GetSupplementAdherenceOutput = SupplementsAdherence;
interface GetSupplementDayInput {
  clientId: string;
  companyId?: string;
  /** Day, YYYY-MM-DD, client-local. Defaults to the client's today. */
  date?: string /*date*/;
}
type GetSupplementDayOutput = SupplementsDay;
interface GetSupplementPlanInput {
  clientId: string;
  companyId?: string;
  /** Day, YYYY-MM-DD. The version in effect on that day. */
  date?: string /*date*/;
}
type GetSupplementPlanOutput = SupplementsPlan;
interface GetTodaysHabitsInput {
  clientId: string;
  companyId?: string;
  /** Day to evaluate, YYYY-MM-DD. Defaults to the client's today. */
  date?: string /*date*/;
}
type GetTodaysHabitsOutput = HabitToday;
interface GetTrainingCalendarInput {
  clientId: string;
  companyId?: string;
  /** First day, YYYY-MM-DD, client-local. Defaults to the client's today. */
  from?: string /*date*/;
  /** Last day, YYYY-MM-DD. Defaults to six days after from. At most 62 days in total. */
  to?: string /*date*/;
}
type GetTrainingCalendarOutput = ClientTrainingCalendar;
interface GetTrainingLogbookInput {
  clientId: string;
  companyId?: string;
  /** Only this exercise. */
  exerciseId?: string /*uuid*/;
  /** First day, YYYY-MM-DD. Defaults to 8 weeks before to. */
  from?: string /*date*/;
  /** Last day, YYYY-MM-DD. Defaults to the client's today. */
  to?: string /*date*/;
}
type GetTrainingLogbookOutput = SessionsLogbook;
interface GetTrainingSettingsInput {
  clientId: string;
  companyId?: string;
}
type GetTrainingSettingsOutput = ClientTrainingSettings;
interface GetTrainingStatsInput {
  clientId: string;
  companyId?: string;
  /** First day, YYYY-MM-DD, with to. At most 366 days. */
  from?: string /*date*/;
  /** 7d, 30d, 90d, 12m, or custom. Defaults to 30d. */
  range?: "7d" | "30d" | "90d" | "12m" | "custom";
  /** Last day, YYYY-MM-DD. Defaults to the client's today. */
  to?: string /*date*/;
}
type GetTrainingStatsOutput = SessionsStats;
interface GetWorkoutTemplateInput {
  id: string;
  companyId?: string;
  /** Read this saved revision instead of the current one. */
  revision?: number;
}
type GetWorkoutTemplateOutput = WorkoutsDocument;
interface ImportClientsInput {
  defaults: ClientsImportDefaults;
  companyId?: string;
  idempotencyKey?: string;
  rows?: ClientsImportRow[];
}
type ImportClientsOutput = { pending: true; index: number };
interface ImportMetricHistoryInput {
  clientId: string;
  companyId?: string;
  dryRun?: boolean;
  onConflict?: "skip" | "replace";
  rows?: MetricImportRow[];
}
type ImportMetricHistoryOutput = MetricImportResult;
interface InterpretReviewNoteInput {
  cid: string;
  clientId: string;
  companyId?: string;
  language?: "en" | "nl";
  transcript?: string;
}
type InterpretReviewNoteOutput = { pending: true; index: number };
interface LinkSessionToWorkoutInput {
  clientId: string;
  sessionId: string;
  clientWorkoutId?: string /*uuid*/;
  companyId?: string;
  dismiss?: boolean;
}
type LinkSessionToWorkoutOutput = { pending: true; index: number };
interface ListAtRiskClientsInput {
  /** Only clients of this coach. */
  coachId?: string /*uuid*/;
  companyId?: string;
  /** true includes clients snoozed for now; false, the default, leaves them out. */
  includeSnoozed?: "true" | "false";
  /** watch, at_risk or all. Defaults to watch and at_risk. */
  level?: "watch" | "at_risk" | "all";
}
type ListAtRiskClientsOutput = DropoutRiskBoard;
interface ListAutomationActionsInput {
  companyId?: string;
}
type ListAutomationActionsOutput = AutomationActionCatalog;
interface ListAutomationTemplatesInput {
  companyId?: string;
}
type ListAutomationTemplatesOutput = AutomationTemplateList;
interface ListAutomationTriggersInput {
  companyId?: string;
}
type ListAutomationTriggersOutput = AutomationTriggerCatalog;
interface ListAutomationsInput {
  companyId?: string;
  /** sequence, onboarding, event_rule, or manual. */
  kind?: "sequence" | "onboarding" | "event_rule" | "manual";
  /** draft, active, or archived. */
  status?: "draft" | "active" | "archived";
}
type ListAutomationsOutput = AutomationRulePage;
interface ListBloodworkInput {
  clientId: string;
  companyId?: string;
  /** Panels to return, 1 to 100. Defaults to 25. */
  limit?: number;
  /** Panels to skip, for the next page. hasMore says when older panels remain. */
  offset?: number;
}
type ListBloodworkOutput = BloodworkList;
interface ListChatReferencesInput {
  clientId: string;
  /** document, resource, program, nutrition_plan, form, habit, recipe, or collection. */
  type: "document" | "resource" | "program" | "nutrition_plan" | "form" | "habit" | "recipe" | "collection";
  companyId?: string;
  /** Page size from 1 to 50. Defaults to 30. */
  limit?: number;
  /** Text matched against the title. */
  q?: string;
}
type ListChatReferencesOutput = HttpserverChatReferencesResponse;
interface ListCheckinAssignmentsInput {
  clientId: string;
  companyId?: string;
  /** Comma list of active, paused, ended, finished, or all. Defaults to active and paused. */
  state?: string;
}
type ListCheckinAssignmentsOutput = ScheduleAssignment[];
interface ListCheckinInboxInput {
  /** Only clients of this coach. */
  coachId?: string /*uuid*/;
  companyId?: string;
  /** The nextCursor of the previous page. */
  cursor?: string;
  /** Only check-ins of this form. */
  formId?: string /*uuid*/;
  /** First submit date, YYYY-MM-DD. */
  from?: string /*date*/;
  /** Only check-ins with at least one outlier (outlierCount above 0). A page can hold fewer than 25 rows and still have a nextCursor: keep asking until it is null. */
  hasOutliers?: boolean;
  /** Only check-ins with progress photos. */
  hasPhotos?: boolean;
  /** Text matched against the client's name. */
  q?: string;
  /** pending (default) or reviewed. */
  review?: "pending" | "reviewed";
  /** Last submit date, YYYY-MM-DD. */
  to?: string /*date*/;
}
type ListCheckinInboxOutput = SubmitInbox;
interface ListClientCheckinsInput {
  clientId: string;
  companyId?: string;
  /** The nextCursor of the previous page. */
  cursor?: string;
  /** Only check-ins of this form. */
  formId?: string /*uuid*/;
  /** First check-in date, YYYY-MM-DD. */
  from?: string /*date*/;
  /** Page size from 1 to 100. Defaults to 100. */
  limit?: number;
  /** When true, only check-ins that hold a progress photo. */
  photos?: boolean;
  /** pending or reviewed. */
  review?: "pending" | "reviewed";
  /** draft or submitted. */
  status?: "draft" | "submitted";
  /** Last check-in date, YYYY-MM-DD. */
  to?: string /*date*/;
}
type ListClientCheckinsOutput = SubmitList;
interface ListClientEnrollmentsInput {
  clientId: string;
  companyId?: string;
}
type ListClientEnrollmentsOutput = AutomationEnrollmentPage;
interface ListClientMetricsInput {
  clientId: string;
  companyId?: string;
}
type ListClientMetricsOutput = MetricsTrackedMetric[];
interface ListClientNotesInput {
  clientId: string;
  companyId?: string;
  /** Matches the note title or body. */
  q?: string;
  /** staff or shared. Omit to list both. */
  visibility?: "staff" | "shared";
}
type ListClientNotesOutput = WorkspaceNote[];
interface ListClientTagsInput {
  companyId?: string;
}
type ListClientTagsOutput = ClientsTagItem[];
interface ListClientWinsInput {
  companyId?: string;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Only the wins of this client. */
  relationshipId?: string /*uuid*/;
  /** open (default), sent, dismissed or all. */
  status?: "open" | "sent" | "dismissed" | "all";
}
type ListClientWinsOutput = CelebrateWinList;
interface ListClientsInput {
  /** any, checkin-pending, checkin-overdue, weigh-in, protein, inactive, message-unanswered, past-end, coaching-low, or bloodwork-due. Repeat to combine. */
  attention?: "any" | "checkin-pending" | "checkin-overdue" | "weigh-in" | "protein" | "inactive" | "message-unanswered" | "past-end" | "coaching-low" | "bloodwork-due" | ("any" | "checkin-pending" | "checkin-overdue" | "weigh-in" | "protein" | "inactive" | "message-unanswered" | "past-end" | "coaching-low" | "bloodwork-due")[];
  /** Coach user id. Repeat to combine. */
  coach?: string | string[];
  companyId?: string;
  /** Opaque page cursor. */
  cursor?: string;
  /** Page size from 1 to 100. Default 25. */
  limit?: number;
  /** any, none, or an onboarding flow id. */
  onboarding?: string;
  /** Package id. */
  package?: string;
  /** Practice key. Repeat to combine. */
  practice?: string | string[];
  /** Search name or email. */
  q?: string;
  /** mine or all. Coaches always see mine. */
  scope?: "mine" | "all";
  /** true adds each row's training week, nutrition figure and weight line; false leaves them out. */
  signals?: "true" | "false";
  /** name, lastActive, lastCheckin, week, or started. Prefix - to reverse. */
  sort?: "name" | "-name" | "lastActive" | "-lastActive" | "lastCheckin" | "-lastCheckin" | "week" | "-week" | "started" | "-started";
  /** current, all, archived, invited, onboarding, active, paused, or cancelled. */
  status?: "current" | "all" | "archived" | "invited" | "onboarding" | "active" | "paused" | "cancelled";
  /** Tag id. Repeat to combine. */
  tag?: string | string[];
}
type ListClientsOutput = ClientsPage;
interface ListCoachQuestionsInput {
  /** asked: questions the caller asked; received: questions put to the caller; all (default). */
  box?: "asked" | "received" | "all";
  companyId?: string;
  /** Only the questions about this client. */
  relationshipId?: string /*uuid*/;
  /** open (default), resolved or all. */
  state?: "open" | "resolved" | "all";
}
type ListCoachQuestionsOutput = CoachQuestion[];
interface ListContentCalendarInput {
  companyId?: string;
  /** First day. Defaults to the first of this month. */
  from?: string /*date*/;
  /** idea, draft, approved or posted. Only items with this status. */
  status?: "idea" | "draft" | "approved" | "posted";
  /** Last day. Defaults to the last of this month. */
  to?: string /*date*/;
  /** true or false. false leaves out items without a date. Defaults to true. */
  undated?: "true" | "false";
}
type ListContentCalendarOutput = ContentthemesContentCalendar;
interface ListContentThemesInput {
  companyId?: string;
  /** Any day of the week to read. Defaults to this week. */
  week?: string /*date*/;
}
type ListContentThemesOutput = ContentThemesView;
interface ListConversationsInput {
  companyId?: string;
  /** page_key from the previous page. Omit it for the first page. */
  cursor?: string;
  /** Page size from 1 to 100. Defaults to 30. */
  limit?: number;
  /** Matches the conversation title. */
  q?: string;
  /** mine or all. all includes every client an owner or admin can open. */
  scope?: "mine" | "all";
  /** When true, only conversations with unread messages. */
  unread?: boolean;
}
type ListConversationsOutput = HttpserverConversationListResponse;
interface ListDayTypesInput {
  companyId?: string;
  /** Also list archived day types. Defaults to false. */
  includeArchived?: boolean;
}
type ListDayTypesOutput = DayType[];
interface ListEnrollmentsInput {
  id: string;
  companyId?: string;
  /** active, paused, completed, or stopped. */
  status?: "active" | "paused" | "completed" | "stopped";
}
type ListEnrollmentsOutput = AutomationEnrollmentPage;
interface ListFollowUpsInput {
  clientId: string;
  companyId?: string;
  /** Also return the last 20 closed follow-ups. */
  withClosed?: boolean;
}
type ListFollowUpsOutput = FollowupsCheckinFollowUp[];
interface ListFormTemplatesInput {
  companyId?: string;
}
type ListFormTemplatesOutput = FormsTemplate[];
interface ListFormsInput {
  /** Include archived forms when true. */
  archived?: boolean;
  companyId?: string;
  /** checkin or questionnaire. Defaults to both. */
  kind?: "checkin" | "questionnaire";
  /** Text matched against the name. */
  q?: string;
}
type ListFormsOutput = FormsSummary[];
interface ListHabitTemplatesInput {
  companyId?: string;
  /** Also list archived templates. Defaults to false. */
  includeArchived?: boolean;
  /** Text matched against the template name. */
  q?: string;
}
type ListHabitTemplatesOutput = HabitTemplate[];
interface ListIncludedBlocksInput {
  companyId?: string;
}
type ListIncludedBlocksOutput = WorkoutsIncludedRule[];
interface ListJoinRequestsInput {
  companyId?: string;
}
type ListJoinRequestsOutput = InvitationsJoinRequests;
interface ListLeadMagnetsInput {
  companyId?: string;
}
type ListLeadMagnetsOutput = MagnetsOverview;
interface ListLeadsInput {
  /** Only leads assigned to this coach. Owners and admins only. */
  coachId?: string /*uuid*/;
  companyId?: string;
  /** How many leads to return, from 1 to 200. Defaults to 200. */
  limit?: number;
  /** Part of a name or email address. */
  q?: string;
  /** Only leads from this source: ad, post, magnet, quiz, calculator, referral, landing, waitlist, manual, other or mini_checkin. */
  source?: "ad" | "post" | "magnet" | "quiz" | "calculator" | "referral" | "landing" | "waitlist" | "manual" | "other" | "mini_checkin";
  /** Only leads in this status: new, contacted, call_booked, won, lost or waitlist. */
  status?: "new" | "contacted" | "call_booked" | "won" | "lost" | "waitlist";
}
type ListLeadsOutput = LeadList;
interface ListLifeModesInput {
  clientId: string;
  companyId?: string;
}
type ListLifeModesOutput = LifemodesMode[];
interface ListMetricsInput {
  companyId?: string;
}
type ListMetricsOutput = MetricDef[];
interface ListMiniCheckinsInput {
  companyId?: string;
  /** How many to return, from 1 to 200. Defaults to 200. */
  limit?: number;
  /** open (default) for those waiting for an answer, or all. */
  status?: "open" | "all";
}
type ListMiniCheckinsOutput = MinicheckinList;
interface ListMissedCheckinsInput {
  /** Only clients of this coach. */
  coachId?: string /*uuid*/;
  companyId?: string;
  /** Only check-ins of this form. */
  formId?: string /*uuid*/;
  /** Text matched against the client's name. */
  q?: string;
}
type ListMissedCheckinsOutput = SubmitMissedList;
interface ListMyDueCheckinsInput {
  companyId?: string;
  /** Comma list of upcoming, open, submitted, missed, or skipped. Defaults to open and upcoming. */
  state?: string;
}
type ListMyDueCheckinsOutput = SubmitMyDue[];
interface ListMyRelationshipsInput {
  companyId?: string;
}
type ListMyRelationshipsOutput = HttpserverMyRelationship[];
interface ListNutritionPlansInput {
  clientId: string;
  /** true lists only archived plans. Defaults to false. */
  archived?: boolean;
  companyId?: string;
  /** meal or macros. Empty lists both. */
  kind?: "meal" | "macros";
  /** Text matched against the plan name. */
  q?: string;
  /** Only plans with this tag. */
  tag?: string;
}
type ListNutritionPlansOutput = PlansNutritionPlanSummary[];
interface ListOwnerBriefsInput {
  companyId?: string;
}
type ListOwnerBriefsOutput = OwnerbriefWeeks;
interface ListPeakWeekTemplatesInput {
  companyId?: string;
}
type ListPeakWeekTemplatesOutput = PeakweekTemplate[];
interface ListPerformedExercisesInput {
  clientId: string;
  companyId?: string;
  /** Text matched against the exercise name. */
  q?: string;
}
type ListPerformedExercisesOutput = SessionsPerformedExercise[];
interface ListPersonalRecordsInput {
  clientId: string;
  companyId?: string;
  /** Only this exercise. Also returns its record history. */
  exerciseId?: string /*uuid*/;
  /** Most rows to return per list, default 30. The answer says how many were left out. */
  limit?: number;
  /** Only records achieved on or after this day, YYYY-MM-DD. */
  since?: string /*date*/;
}
type ListPersonalRecordsOutput = SessionsPersonalRecords;
interface ListPlanSetsInput {
  /** true lists only archived sets. Defaults to false. */
  archived?: boolean;
  companyId?: string;
}
type ListPlanSetsOutput = PlanSet[];
interface ListPostIdeasInput {
  companyId?: string;
}
type ListPostIdeasOutput = PatternradarIdeas;
interface ListPracticesInput {
  companyId?: string;
}
type ListPracticesOutput = OpsPractice[];
interface ListProgramAssignmentsInput {
  clientId: string;
  companyId?: string;
}
type ListProgramAssignmentsOutput = ClientAssignmentList;
interface ListProgramCopiesInput {
  id: string;
  companyId?: string;
  /** Only copies of this placed workout. */
  placementId?: string /*uuid*/;
}
type ListProgramCopiesOutput = ProgramsCopy[];
interface ListProgramsInput {
  companyId?: string;
  /** Also list archived programs. Defaults to false. */
  includeArchived?: boolean;
  /** Also list the shared sample programs. Defaults to false. */
  includeSamples?: boolean;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Page number from 1. Defaults to 1. */
  page?: number;
  /** Text matched against the program name. */
  q?: string;
  /** Training tag id. Repeat the parameter or use tag[] for several. */
  tag?: string | string[];
  /** calendar or fixed. */
  type?: "calendar" | "fixed";
}
type ListProgramsOutput = ProgramsPage;
interface ListQuestionColleaguesInput {
  clientId: string;
  companyId?: string;
}
type ListQuestionColleaguesOutput = CoachquestionsPerson[];
interface ListReferralsInput {
  companyId?: string;
}
type ListReferralsOutput = ReferralsPage;
interface ListSavedRepliesInput {
  companyId?: string;
}
type ListSavedRepliesOutput = HttpserverSavedReplyResponse[];
interface ListSessionsInput {
  clientId: string;
  companyId?: string;
  /** Opaque cursor from the previous page's nextCursor. */
  cursor?: string;
  /** First day, YYYY-MM-DD, client-local. */
  from?: string /*date*/;
  /** Page size from 1 to 100. Defaults to 20. */
  limit?: number;
  /** Last day, YYYY-MM-DD. */
  to?: string /*date*/;
  /** When true, only sessions with a client note. */
  withNotes?: boolean;
  /** When true, only sessions that set a record. */
  withPrs?: boolean;
  /** Only sessions of this workout lineage id. */
  workoutLineage?: string /*uuid*/;
}
type ListSessionsOutput = SessionPage;
interface ListStyleProposalsInput {
  companyId?: string;
}
type ListStyleProposalsOutput = CoachstyleProposals;
interface ListSupplementsInput {
  /** Include archived supplements when true. */
  archived?: boolean;
  companyId?: string;
  /** Text matched against the name and the brand. */
  q?: string;
}
type ListSupplementsOutput = Supplement[];
interface ListSwitchImportsInput {
  companyId?: string;
}
type ListSwitchImportsOutput = SwitchimportImportItem[];
interface ListTasksInput {
  /** Repeat for me, none, or a member id. */
  assignee?: string | string[];
  companyId?: string;
  /** Page cursor from the previous response. */
  cursor?: string;
  /** First due date, YYYY-MM-DD. */
  dueFrom?: string /*date*/;
  /** Last due date, YYYY-MM-DD. */
  dueTo?: string /*date*/;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Text matched against the title and notes. */
  q?: string;
  /** Only tasks linked to this client. */
  relationshipId?: string /*uuid*/;
  /** mine or all. all is owner or admin. Defaults to mine. */
  scope?: "mine" | "all";
  /** Repeat for manual, automation, or system. */
  source?: "manual" | "automation" | "system" | ("manual" | "automation" | "system")[];
  /** open, done, or all. Defaults to open. */
  status?: "open" | "done" | "all";
  /** Viewer's local date, YYYY-MM-DD. Used to group open tasks. */
  today?: string /*date*/;
}
type ListTasksOutput = TaskList;
interface ListTeamInput {
  companyId?: string;
}
type ListTeamOutput = TeamMember[];
interface ListWinBackCandidatesInput {
  /** Only clients of this coach. */
  coachId?: string /*uuid*/;
  companyId?: string;
}
type ListWinBackCandidatesOutput = DropoutCandidate[];
interface ListWorkoutsInput {
  companyId?: string;
  /** Only workouts that use this exercise id. */
  containsExercise?: string /*uuid*/;
  /** Only workouts with this day type id. */
  dayType?: string /*uuid*/;
  /** Also list archived workouts. Defaults to false. */
  includeArchived?: boolean;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** library (default) or section. */
  ownerKind?: "library" | "section";
  /** Page number from 1. Defaults to 1. */
  page?: number;
  /** Text matched against the workout name. */
  q?: string;
  /** Training tag id. Repeat the parameter or use tag[] for several. */
  tag?: string | string[];
}
type ListWorkoutsOutput = WorkoutsPage;
interface LogFoodInput {
  clientId: string;
  companyId?: string;
  date?: string;
  idempotencyKey?: string;
  items?: FoodlogLogItem[];
  mealId?: string /*uuid*/;
  mealKey?: string;
  source?: string;
}
type LogFoodOutput = { pending: true; index: number };
interface LogFoodFromTextInput {
  clientId: string;
  companyId?: string;
  date?: string;
  idempotencyKey?: string;
  mealKey?: string;
  text?: string;
}
type LogFoodFromTextOutput = { pending: true; index: number };
interface LogHabitInput {
  clientId: string;
  date: string;
  habitId: string;
  amount?: string;
  companyId?: string;
  note?: string;
}
type LogHabitOutput = { pending: true; index: number };
interface LogMetricsInput {
  clientId: string;
  companyId?: string;
  idempotencyKey?: string;
  items?: MetricsBatchEntry[];
  recordedOn?: string;
}
type LogMetricsOutput = { pending: true; index: number };
interface LogPlannedMealInput {
  clientId: string;
  mealId: string /*uuid*/;
  companyId?: string;
  date?: string;
  draftId?: string /*uuid*/;
  idempotencyKey?: string;
  optionId?: string /*uuid*/;
  portion?: string;
}
type LogPlannedMealOutput = { pending: true; index: number };
interface LogSupplementIntakeInput {
  clientId: string;
  date: string;
  lineId: string /*uuid*/;
  status: "open" | "taken" | "skipped";
  timingId: string /*uuid*/;
  companyId?: string;
}
type LogSupplementIntakeOutput = { pending: true; index: number };
interface LogWorkoutInput {
  clientId: string;
  performedOn: string;
  clientWorkoutId?: string /*uuid*/;
  companyId?: string;
  difficulty?: number;
  durationSeconds?: number;
  exercises?: SessionsLogExercise[];
  idempotencyKey?: string;
  name?: string;
  note?: string;
  source?: string;
}
type LogWorkoutOutput = { pending: true; index: number };
interface MakeTransformationPostInput {
  clientId: string;
  template: "side" | "stack" | "split" | "bignumber" | "grid" | "minimal";
  accent?: string;
  caption?: string;
  companyId?: string;
  dates?: string[];
  dryRun?: boolean;
  faceBand?: number;
  hide?: "blur" | "crop";
  idempotencyKey?: string;
  lang?: "nl" | "en";
  light?: boolean;
  line?: string;
  photoIds?: string[] /*uuid*/;
  pose?: "front" | "side" | "back" | "other";
  reel?: boolean;
  showName?: boolean;
  showWeight?: boolean;
}
type MakeTransformationPostOutput = TransformResult;
interface MarkCheckinsReviewedInput {
  checkinIds?: string[] /*uuid*/;
  companyId?: string;
  reviewed?: boolean;
}
type MarkCheckinsReviewedOutput = { pending: true; index: number };
interface MarkCoachingContextInput {
  clientId: string;
  noteId: string;
  companyId?: string;
  on?: boolean;
}
type MarkCoachingContextOutput = { pending: true; index: number };
interface MarkConversationReadInput {
  clientId: string;
  lastReadMessageId: string /*uuid*/;
  companyId?: string;
}
type MarkConversationReadOutput = { pending: true; index: number };
interface MessageClientsInput {
  body: string;
  companyId?: string;
  idempotencyKey?: string;
  relationshipIds?: string[] /*uuid*/;
}
type MessageClientsOutput = { pending: true; index: number };
interface MoveWorkoutInput {
  clientId: string;
  cwId: string;
  companyId?: string;
  dryRun?: boolean;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  position?: number;
  to?: string;
}
type MoveWorkoutOutput = ClientWorkoutChange;
interface ParseWorkoutTextInput {
  companyId?: string;
  text?: string;
}
type ParseWorkoutTextOutput = WorkoutsParsed;
interface PauseClientInput {
  clientId: string;
  companyId?: string;
  resumeOn?: string;
}
type PauseClientOutput = { pending: true; index: number };
interface PeriodiseClientWorkoutsInput {
  clientId: string;
  progression: ClientProgression;
  clientWorkoutIds?: string[] /*uuid*/;
  companyId?: string;
  conflict?: string;
  dryRun?: boolean;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  weeks?: number;
}
type PeriodiseClientWorkoutsOutput = ClientWorkoutChange;
interface PeriodiseProgramInput {
  id: string;
  baseRevision?: number;
  companyId?: string;
  conflict?: string;
  copyWeeks?: number;
  deload?: ProgramsDeloadRule;
  dryRun?: boolean;
  idempotencyKey?: string;
  placementIds?: string[] /*uuid*/;
  reps?: ProgramsRepsRule;
  rounding?: number;
  rpe?: ProgramsEffortRule;
  sets?: ProgramsSetsRule;
  weight?: ProgramsWeightRule;
}
type PeriodiseProgramOutput = ProgramsPeriodiseResult;
interface PreviewClientImportInput {
  defaults: ClientsImportDefaults;
  companyId?: string;
  rows?: ClientsImportRow[];
}
type PreviewClientImportOutput = ClientsPreviewRow[];
interface PreviewPlanChangeInput {
  clientId: string;
  macro: "protein" | "carbs" | "fat";
  bases?: PlansNutritionPlanChangeBaseInput[];
  companyId?: string;
  dayTypeKeys?: string[];
  dryRun?: boolean;
  grams?: string;
  kcal?: string;
  notifyClient?: boolean;
  trainingTime?: string;
}
type PreviewPlanChangeOutput = PlansNutritionPlanChangePreview;
interface PublishAutomationRuleInput {
  id: string;
  baseRevision?: number;
  companyId?: string;
  mode?: string;
}
type PublishAutomationRuleOutput = { pending: true; index: number };
interface PushProgramChangesInput {
  id: string;
  placementId: string /*uuid*/;
  clientWorkoutIds?: string[] /*uuid*/;
  companyId?: string;
}
type PushProgramChangesOutput = { pending: true; index: number };
interface ReleaseOnboardingDraftInput {
  clientId: string;
  all?: boolean;
  companyId?: string;
  dryRun?: boolean;
  sections?: "phase" | "nutrition" | "supplements" | "program" | "welcome";
}
type ReleaseOnboardingDraftOutput = SlimOnboarding;
interface RemoveFormQuestionInput {
  id: string;
  key: string;
  /** The revision the caller edited. A different current revision answers 409 stale_revision. */
  baseRevision?: number;
  companyId?: string;
  /** Optional: send editLock from get_form to catch edits made in another tab since you loaded it. */
  editLock?: number;
}
type RemoveFormQuestionOutput = { pending: true; index: number };
interface RemoveProgramFromClientInput {
  aid: string;
  clientId: string;
  companyId?: string;
  dryRun?: boolean;
  from?: string;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
}
type RemoveProgramFromClientOutput = ClientRemoveAssignmentResult;
interface RemoveProgramWorkoutInput {
  /** The program revision you loaded. A stale one returns 409 stale_revision. */
  baseRevision: number;
  id: string;
  placementId: string;
  companyId?: string;
}
type RemoveProgramWorkoutOutput = { pending: true; index: number };
interface ReopenCheckinDueInput {
  clientId: string;
  dueId: string;
  closesOn?: string;
  companyId?: string;
}
type ReopenCheckinDueOutput = { pending: true; index: number };
interface ReorderFormQuestionsInput {
  id: string;
  baseRevision?: number;
  companyId?: string;
  editLock?: number;
  keys?: string[];
}
type ReorderFormQuestionsOutput = { pending: true; index: number };
interface ResendInvitationInput {
  id: string;
  companyId?: string;
}
type ResendInvitationOutput = { pending: true; index: number };
interface RestoreClientInput {
  clientId: string;
  companyId?: string;
}
type RestoreClientOutput = { pending: true; index: number };
interface ResumeClientInput {
  clientId: string;
  companyId?: string;
}
type ResumeClientOutput = { pending: true; index: number };
interface SaveCheckinAnswersInput {
  cid: string;
  clientId: string;
  answers?: unknown[];
  companyId?: string;
}
type SaveCheckinAnswersOutput = { pending: true; index: number };
interface ScheduleWorkoutInput {
  clientId: string;
  from: ClientWorkoutSource;
  companyId?: string;
  dryRun?: boolean;
  idempotencyKey?: string;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  position?: number;
  repeat?: ClientRepeatRule;
  scheduledOn?: string;
}
type ScheduleWorkoutOutput = ClientWorkoutChange;
interface SearchExercisesInput {
  companyId?: string;
  /** When true, only your company's own exercises. */
  custom?: boolean;
  /** One of barbell, dumbbell, kettlebell, cable, machine, bands, body_only, medicine_ball, exercise_ball, foam_roll, ez_curl_bar, or other. One value. */
  equipment?: "barbell" | "dumbbell" | "kettlebell" | "cable" | "machine" | "bands" | "body_only" | "medicine_ball" | "exercise_ball" | "foam_roll" | "ez_curl_bar" | "other";
  /** When true, only exercises with a video. */
  hasVideo?: boolean;
  /** Also list archived exercises. Defaults to false. */
  includeArchived?: boolean;
  /** One of beginner, intermediate, or expert. One value. */
  level?: "beginner" | "intermediate" | "expert";
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Primary muscle key. One value. */
  muscle?: string;
  /** Page number from 1. Defaults to 1. */
  page?: number;
  /** Text matched against the exercise name. */
  q?: string;
  /** name, type, or level. Defaults to name. */
  sort?: "name" | "type" | "level";
  /** One of strength, cardio, stretching, plyometrics, powerlifting, olympic_weightlifting, or strongman. One value. */
  type?: "strength" | "cardio" | "stretching" | "plyometrics" | "powerlifting" | "olympic_weightlifting" | "strongman";
}
type SearchExercisesOutput = ExercisesPage;
interface SearchFoodsInput {
  /** Id of the last food on the previous page. */
  after?: string /*uuid*/;
  /** When set, only foods in this category. */
  categoryId?: string /*uuid*/;
  companyId?: string;
  /** Comma-separated flags to leave out, such as milk,gluten. */
  excludeFlags?: string;
  /** Comma-separated flags every food must have, such as vegan. */
  flags?: string;
  /** Also list archived company foods. Defaults to false. */
  includeArchived?: boolean;
  /** Also list foods your company hid. Defaults to false. */
  includeHidden?: boolean;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Text matched against the name and brand, or an exact barcode. */
  q?: string;
  /** all, shared, company, or client. Defaults to all. */
  source?: "all" | "shared" | "company" | "client";
}
type SearchFoodsOutput = SlimFood[];
interface SearchLogCatalogInput {
  clientId: string;
  companyId?: string;
  /** Page size of each list from 1 to 50. Defaults to 20. */
  limit?: number;
  /** Text matched against the name and brand. Products need three letters or digits in a row. */
  q?: string;
}
type SearchLogCatalogOutput = SlimCatalog;
interface SearchLogFoodsInput {
  clientId: string;
  companyId?: string;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Text matched against the name and brand. */
  q?: string;
}
type SearchLogFoodsOutput = Food[];
interface SearchOffProductsInput {
  companyId?: string;
  /** Page size from 1 to 50. Defaults to 20. */
  limit?: number;
  /** Text matched against the name and brand. Needs three letters or digits in a row. */
  q?: string;
}
type SearchOffProductsOutput = SlimProducts;
interface SearchRecipesInput {
  /** When set, only recipes in this category. */
  categoryId?: string /*uuid*/;
  companyId?: string;
  /** Page cursor from the previous response. */
  cursor?: string;
  /** Comma-separated flags to leave out, such as nuts. */
  excludeFlags?: string;
  /** Comma-separated flags every recipe must have, such as vegan. */
  flags?: string;
  /** Also list archived recipes. Defaults to false. */
  includeArchived?: boolean;
  /** Page size from 1 to 100. Defaults to 50. */
  limit?: number;
  /** Highest kcal per serving. */
  maxKcal?: number;
  /** Lowest protein per serving, in grams. */
  minProtein?: number;
  /** Text matched against the recipe name. */
  q?: string;
  /** all, company, or platform. Defaults to all. */
  scope?: "all" | "company" | "platform";
  /** name, updated, kcal, or protein. Defaults to name. */
  sort?: "name" | "updated" | "kcal" | "protein";
  /** Comma-separated tags; a recipe matches when it has any of them. */
  tags?: string;
}
type SearchRecipesOutput = SlimRecipePage;
interface SendClientInvitationInput {
  clientId: string;
  companyId?: string;
}
type SendClientInvitationOutput = { pending: true; index: number };
interface SendMessageInput {
  clientId: string;
  body?: string;
  companyId?: string;
  idempotencyKey?: string;
  kind?: string;
  refId?: string /*uuid*/;
  references?: HttpserverMessageReferenceInput[];
  replyToMessageId?: string /*uuid*/;
  shareIfNeeded?: boolean;
  uploadIds?: string[] /*uuid*/;
}
type SendMessageOutput = { pending: true; index: number };
interface SendWinMessageInput {
  wid: string;
  companyId?: string;
  dryRun?: boolean;
  message?: string;
}
type SendWinMessageOutput = CelebrateSendResult;
interface SetBloodworkScheduleInput {
  clientId: string;
  beforePhaseEndWeeks?: number;
  companyId?: string;
  dryRun?: boolean;
  everyWeeks?: number;
  remindClient?: boolean;
}
type SetBloodworkScheduleOutput = BloodworkScheduleResult;
interface SetClientPhaseInput {
  clientId: string;
  companyId?: string;
  endsOn?: string;
  goal?: string;
  idempotencyKey?: string;
  kind?: "cut" | "maintenance" | "reverse" | "bulk" | "peak_week" | "recovery" | "other";
  name?: string;
  note?: string;
  phaseId?: string /*uuid*/;
  startsOn?: string;
  weightMaxKg?: number;
  weightMinKg?: number;
}
type SetClientPhaseOutput = { pending: true; index: number };
interface SetClientWeekTimelineCellInput {
  clientId: string;
  field: string;
  weekStart: string;
  companyId?: string;
  value?: string;
}
type SetClientWeekTimelineCellOutput = { pending: true; index: number };
interface SetDailyTargetsInput {
  clientId: string;
  dayTypeKey: string;
  carbohydrateG?: string;
  companyId?: string;
  dryRun?: boolean;
  fatG?: string;
  fiberG?: string;
  kcal?: string;
  mealPlanId?: string /*uuid*/;
  proteinG?: string;
}
type SetDailyTargetsOutput = NutritionSlotWrite;
interface SetDayOverrideInput {
  clientId: string;
  date: string;
  companyId?: string;
  dayTypeKey?: string;
  dryRun?: boolean;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  note?: string;
}
type SetDayOverrideOutput = HttpserverDayWriteNutrition;
interface SetDayRulesInput {
  clientId: string;
  companyId?: string;
  dryRun?: boolean;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  rules?: DayRuleInput[];
}
type SetDayRulesOutput = HttpserverDayRulesNutrition;
interface SetEverydayTargetsInput {
  clientId: string;
  carbohydrateG?: string;
  companyId?: string;
  /** Day the targets apply, YYYY-MM-DD. Defaults to today. */
  date?: string /*date*/;
  dryRun?: boolean;
  fatG?: string;
  fiberG?: string;
  kcal?: string;
  proteinG?: string;
}
type SetEverydayTargetsOutput = NutritionEverydayWrite;
interface SetLifeModeInput {
  clientId: string;
  kind: "travel" | "sick" | "holiday" | "competition" | "other";
  companyId?: string;
  endsOn?: string;
  note?: string;
  pauseReminders?: boolean;
  startsOn?: string;
}
type SetLifeModeOutput = { pending: true; index: number };
interface SetMetricGoalInput {
  clientId: string;
  key: string;
  companyId?: string;
  goalDate?: string;
  startDate?: string;
  targetValue?: string;
  unit?: string;
}
type SetMetricGoalOutput = { pending: true; index: number };
interface SetMicronutrientTargetInput {
  clientId: string;
  key: string;
  amount?: string;
  companyId?: string;
}
type SetMicronutrientTargetOutput = { pending: true; index: number };
interface SetNutritionSetupInput {
  clientId: string;
  companyId?: string;
  cycleLength?: number;
  labels?: NutritionDayLabelInput[];
  mode?: string;
  name?: string;
  rules?: NutritionLabelRuleInput[];
  slots?: NutritionSlotInput[];
  startDate?: string;
}
type SetNutritionSetupOutput = { pending: true; index: number };
interface SetStageTargetInput {
  clientId: string;
  companyId?: string;
  dryRun?: boolean;
  removeShow?: boolean;
  showDate?: string;
  showInApp?: boolean;
  skipDates?: string[];
  targetWeight?: number;
}
type SetStageTargetOutput = PreptimelineSetResult;
interface SetSupplementPlanInput {
  clientId: string;
  baseRevision?: number;
  companyId?: string;
  effectiveOn?: string;
  note?: string;
  replaceFuture?: boolean;
  sections?: SupplementsSectionInput[];
  trainingTime?: "morning" | "midday" | "afternoon" | "evening";
}
type SetSupplementPlanOutput = { pending: true; index: number };
interface SetTrainingModeInput {
  clientId: string;
  clientCanAddExercises?: boolean;
  clientCanReschedule?: boolean;
  clientCanSkip?: boolean;
  clientCanSwap?: boolean;
  companyId?: string;
  defaultRestSeconds?: number;
  dryRun?: boolean;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  mode?: string;
  switch?: ClientModeSwitch;
  visibilityWeeks?: number;
}
type SetTrainingModeOutput = ClientTrainingSettings;
interface SkipCheckinDueInput {
  clientId: string;
  dueId: string;
  companyId?: string;
  reason?: string;
}
type SkipCheckinDueOutput = { pending: true; index: number };
interface SkipWorkoutInput {
  clientId: string;
  cwId: string;
  companyId?: string;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  reason?: string;
}
type SkipWorkoutOutput = { pending: true; index: number };
interface SnoozeAttentionInput {
  clientId: string;
  days: number;
  reason: string;
  companyId?: string;
}
type SnoozeAttentionOutput = { pending: true; index: number };
interface StartCallInput {
  clientId: string;
  mode: "call" | "review";
  companyId?: string;
}
type StartCallOutput = { pending: true; index: number };
interface StartCheckinInput {
  clientId: string;
  companyId?: string;
  dueId?: string /*uuid*/;
  formId?: string /*uuid*/;
  idempotencyKey?: string;
}
type StartCheckinOutput = { pending: true; index: number };
interface StartSwitchImportInput {
  id: string;
  companyId?: string;
  dryRun?: boolean;
}
type StartSwitchImportOutput = SwitchimportImportView;
interface StopEnrollmentInput {
  id: string;
  companyId?: string;
}
type StopEnrollmentOutput = { pending: true; index: number };
interface SubmitCheckinInput {
  cid: string;
  clientId: string;
  companyId?: string;
  confirmOverwrite?: boolean;
  idempotencyKey?: string;
}
type SubmitCheckinOutput = { pending: true; index: number };
interface SuggestTargetsInput {
  activity: string;
  clientId: string;
  goal: string;
  bodyweightKg?: string;
  companyId?: string;
}
type SuggestTargetsOutput = OpsMacros;
interface TagClientsInput {
  add?: string[] /*uuid*/;
  companyId?: string;
  relationshipIds?: string[] /*uuid*/;
  remove?: string[] /*uuid*/;
}
type TagClientsOutput = { pending: true; index: number };
interface TestAutomationRuleInput {
  id: string;
  choices?: Record<string, string>;
  companyId?: string;
  from?: string;
  relationshipId?: string /*uuid*/;
}
type TestAutomationRuleOutput = AutomationTestRunResult;
interface UnarchiveExerciseInput {
  id: string;
  companyId?: string;
}
type UnarchiveExerciseOutput = { pending: true; index: number };
interface UnarchiveFormInput {
  id: string;
  companyId?: string;
}
type UnarchiveFormOutput = { pending: true; index: number };
interface UnarchiveWorkoutInput {
  id: string;
  companyId?: string;
}
type UnarchiveWorkoutOutput = { pending: true; index: number };
interface UndoSwitchImportInput {
  id: string;
  companyId?: string;
}
type UndoSwitchImportOutput = { pending: true; index: number };
interface UnlogHabitInput {
  clientId: string;
  date: string;
  habitId: string;
  companyId?: string;
}
type UnlogHabitOutput = { pending: true; index: number };
interface UnskipWorkoutInput {
  clientId: string;
  cwId: string;
  companyId?: string;
  /** nutrition adds each changed date's plan name and kcal and macros, before and after. */
  include?: "nutrition";
  reason?: string;
}
type UnskipWorkoutOutput = { pending: true; index: number };
interface UpdateAutomationRuleInput {
  id: string;
  anchor?: string;
  baseRevision?: number;
  companyId?: string;
  description?: string;
  graph?: AutomationGraphInput;
  kind?: string;
  name?: string;
  settings?: AutomationSettingsInput;
  steps?: AutomationStepInput[];
  templateKey?: string;
  trigger?: AutomationTriggerInput;
}
type UpdateAutomationRuleOutput = { pending: true; index: number };
interface UpdateCheckinScheduleInput {
  aid: string;
  clientId: string;
  schedule: SchedulePatch;
  companyId?: string;
}
type UpdateCheckinScheduleOutput = { pending: true; index: number };
interface UpdateClientInput {
  clientId: string;
  companyId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  moveCheckins?: boolean;
  plannedEndDate?: string;
  practiceId?: string /*uuid*/;
  showDuration?: boolean;
  startDate?: string;
}
type UpdateClientOutput = { pending: true; index: number };
interface UpdateContentItemInput {
  id: string;
  body?: string;
  clearDate?: boolean;
  companyId?: string;
  scheduledOn?: string;
  status?: "idea" | "draft" | "approved" | "posted";
  title?: string;
}
type UpdateContentItemOutput = { pending: true; index: number };
interface UpdateExerciseInput {
  id: string;
  name: string;
  companyId?: string;
  countsFor1rm?: boolean;
  description?: string;
  equipment?: string;
  force?: string;
  imageUploadIds?: string[] /*uuid*/;
  level?: string;
  mechanic?: string;
  muscles?: ExercisesMuscleRefInput[];
  tracking?: string;
  type?: string;
  unilateral?: boolean;
  videoUrl?: string;
}
type UpdateExerciseOutput = { pending: true; index: number };
interface UpdateFoodLogEntryInput {
  clientId: string;
  entryId: string;
  amount?: string;
  carbohydrateG?: string;
  companyId?: string;
  date?: string;
  fatG?: string;
  fiberG?: string;
  kcal?: string;
  mealKey?: string;
  name?: string;
  portionId?: string /*uuid*/;
  proteinG?: string;
  servings?: string;
}
type UpdateFoodLogEntryOutput = { pending: true; index: number };
interface UpdateFormInput {
  id: string;
  applyToExisting?: boolean;
  companyId?: string;
  coverUploadId?: string /*uuid*/;
  description?: string;
  dryRun?: boolean;
  name?: string;
  removeCover?: boolean;
  schedule?: FormsScheduleInput;
  sheetPreset?: string;
}
type UpdateFormOutput = FormsDetail;
interface UpdateFormQuestionInput {
  id: string;
  key: string;
  allowMultiple?: boolean;
  badAbove?: number;
  badBelow?: number;
  baseRevision?: number;
  companyId?: string;
  dateLimit?: string;
  durationMax?: number;
  durationMin?: number;
  durationStep?: number;
  editLock?: number;
  flagAnswers?: string[];
  goodMax?: number;
  goodMin?: number;
  helpText?: string;
  label?: string;
  maxChoices?: number;
  mediaAccept?: string;
  mediaMaxFiles?: number;
  metricId?: string /*uuid*/;
  minChars?: number;
  noLabel?: string;
  numberDecimals?: number;
  numberMax?: number;
  numberMin?: number;
  numberUnit?: string;
  options?: FormsOptionInput[];
  poses?: FormsPoseInput[];
  removeShowIf?: boolean;
  required?: boolean;
  scaleDirection?: "higher" | "lower" | "neutral";
  scaleHighLabel?: string;
  scaleLowLabel?: string;
  scaleMax?: number;
  scaleMin?: number;
  showIf?: FormsCondition;
  showLastValue?: boolean;
  signatureStatement?: string;
  signatureTypedName?: boolean;
  textLength?: string;
  type?: "text" | "number" | "choice" | "yes_no" | "date" | "scale" | "stars" | "media" | "signature" | "progress_photos" | "metric" | "duration";
  yesLabel?: string;
}
type UpdateFormQuestionOutput = { pending: true; index: number };
interface UpdateHabitInput {
  clientId: string;
  habitId: string;
  companyId?: string;
  description?: string;
  effectiveOn?: string;
  emoji?: string;
  goal?: HabitGoalInput;
  name?: string;
  reminderTime?: string;
  startedOn?: string;
}
type UpdateHabitOutput = { pending: true; index: number };
interface UpdateLeadInput {
  id: string;
  assignedCoachId?: string /*uuid*/;
  companyId?: string;
  dryRun?: boolean;
  lostReason?: string;
  name?: string;
  note?: string;
  notes?: string;
  phone?: string;
  source?: string;
  status?: "new" | "contacted" | "call_booked" | "won" | "lost" | "waitlist";
  tags?: string[];
  unassign?: boolean;
}
type UpdateLeadOutput = LeadDetail;
interface UpdateMealInput {
  clientId: string;
  mealId: string;
  planId: string;
  baseRevision?: number;
  companyId?: string;
  name?: string;
  note?: string;
  time?: string;
}
type UpdateMealOutput = { pending: true; index: number };
interface UpdateMealOptionInput {
  clientId: string;
  optionId: string;
  planId: string;
  baseRevision?: number;
  clearManual?: boolean;
  companyId?: string;
  description?: string;
  foods?: PlansNutritionPlanFoodInput[];
  label?: string;
  manual?: PlansNutritionPlanMacrosInput;
  name?: string;
  photoUploadId?: string /*uuid*/;
  scaleIngredients?: boolean;
  servings?: string;
  steps?: PlansNutritionPlanStepInput[];
}
type UpdateMealOptionOutput = { pending: true; index: number };
interface UpdateProgramDetailsInput {
  id: string;
  baseRevision?: number;
  companyId?: string;
  coverUploadId?: string /*uuid*/;
  description?: string;
  name?: string;
  removeCover?: boolean;
  tags?: string[];
  type?: string;
}
type UpdateProgramDetailsOutput = { pending: true; index: number };
interface UpdateStyleGuideInput {
  sections: CoachstyleSectionsInput;
  companyId?: string;
  dryRun?: boolean;
}
type UpdateStyleGuideOutput = HttpserverStyleGuideSaved;
interface UpdateSupplementInput {
  defaultUnit: string;
  id: string;
  name: string;
  brand?: string;
  category?: string;
  companyId?: string;
  discountCode?: string;
  notes?: string;
  resourceIds?: string[] /*uuid*/;
}
type UpdateSupplementOutput = { pending: true; index: number };
interface UpdateSwitchImportMappingInput {
  id: string;
  mapping: SwitchimportMappingInput;
  options: SwitchimportOptionsInput;
  companyId?: string;
}
type UpdateSwitchImportMappingOutput = { pending: true; index: number };
interface UpdateTaskInput {
  id: string;
  assigneeUserId?: string /*uuid*/;
  companyId?: string;
  dueOn?: string;
  dueTime?: string;
  notes?: string;
  relationshipId?: string /*uuid*/;
  remindAt?: string /*date-time*/;
  title?: string;
}
type UpdateTaskOutput = { pending: true; index: number };
interface UpdateWorkoutInput {
  baseRevision: number;
  id: string;
  name: string;
  blocks?: WorkoutsBlockWriteInput[];
  companyId?: string;
  coverUploadId?: string /*uuid*/;
  dayTypeId?: string /*uuid*/;
  description?: string;
  ownerKind?: "library" | "section";
  tags?: string[];
}
type UpdateWorkoutOutput = { pending: true; index: number };
interface UseFormTemplateInput {
  id: string;
  companyId?: string;
  idempotencyKey?: string;
  name?: string;
}
type UseFormTemplateOutput = { pending: true; index: number };

declare const evolvix: {
  /** Applies the plan change autopilot proposed for a check-in as a new revision of each plan behind the day types, without sending feedback. Write: runs as a dry-run preview in execute and is added to the changeset. */
  acceptCheckinProposal(args: AcceptCheckinProposalInput): Promise<AcceptCheckinProposalOutput>;
  /** Accepts a join request: the person becomes a client with status invited. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  acceptJoinRequest(args: AcceptJoinRequestInput): Promise<AcceptJoinRequestOutput>;
  /** Adds a dated bloodwork panel to a client: takenOn (the day the blood was drawn, not in the future), optional labName and notes, optional documentId of the lab report among the client's documents, and results: per marker (a key from list_bloodwork markers) the value as printed, the unit (default the marker's usual unit) and the lab's reference range refLow and refHigh. Write: runs as a dry-run preview in execute and is added to the changeset. */
  addBloodwork(args: AddBloodworkInput): Promise<AddBloodworkOutput>;
  /** Records cardio done without a watch: a day, minutes and an activity type. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addCardioEntry(args: AddCardioEntryInput): Promise<AddCardioEntryOutput>;
  /** Adds a date to a client's timeline, such as a show, a photoshoot or a holiday. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addClientEvent(args: AddClientEventInput): Promise<AddClientEventOutput>;
  /** Adds a note on a client. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addClientNote(args: AddClientNoteInput): Promise<AddClientNoteOutput>;
  /** Writes a follow-up for this client, for instance "check next week: response to +50 g carbs". Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addFollowUp(args: AddFollowUpInput): Promise<AddFollowUpOutput>;
  /** Adds one question at the end or at a position. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addFormQuestion(args: AddFormQuestionInput): Promise<AddFormQuestionOutput>;
  /** Adds a meal to a meal plan. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addMeal(args: AddMealInput): Promise<AddMealOutput>;
  /** Adds a dish to a meal: a copy of a recipe scaled to servings, foods, or numbers entered by hand. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addMealOption(args: AddMealOptionInput): Promise<AddMealOptionOutput>;
  /** Adds one supplement to a client's plan as a new version from effectiveOn (same default and future_version rule as set_supplement_plan), keeping every other line. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addSupplementToPlan(args: AddSupplementToPlanInput): Promise<AddSupplementToPlanOutput>;
  /** Puts a copy of a library workout, or a new empty workout, on a day of a week. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  addWorkoutToProgram(args: AddWorkoutToProgramInput): Promise<AddWorkoutToProgramOutput>;
  /** Adjusts one peak week day from today on, such as carbs +50 g or water -0.5 L: numbers are added to the plan and negative takes away; dayTypeKey replaces the day type. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  adjustPeakWeekDay(args: AdjustPeakWeekDayInput): Promise<AdjustPeakWeekDayOutput>;
  /** Adds an answer (or a follow-up from the asker) to a question thread and notifies the other person. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  answerCoachQuestion(args: AnswerCoachQuestionInput): Promise<AnswerCoachQuestionOutput>;
  /** Plans the client's peak week for a show date from a template or from days sent here. Write: runs as a dry-run preview in execute and is added to the changeset. */
  applyPeakWeek(args: ApplyPeakWeekInput): Promise<ApplyPeakWeekOutput>;
  /** Applies a move such as +25 g carbs to the meal plans behind the chosen day types, as a new revision of each with a one-line summary. Write: runs as a dry-run preview in execute and is added to the changeset. */
  applyPlanChange(args: ApplyPlanChangeInput): Promise<ApplyPlanChangeOutput>;
  /** Enrolls a client in the published version. Write: runs as a dry-run preview in execute and is added to the changeset. */
  applySequence(args: ApplySequenceInput): Promise<ApplySequenceOutput>;
  /** Archives an automation and stops its enrollments. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  archiveAutomationRule(args: ArchiveAutomationRuleInput): Promise<ArchiveAutomationRuleOutput>;
  /** Archives a client. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  archiveClient(args: ArchiveClientInput): Promise<ArchiveClientOutput>;
  /** Archives a company exercise. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  archiveExercise(args: ArchiveExerciseInput): Promise<ArchiveExerciseOutput>;
  /** Archives a form so it cannot be assigned. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  archiveForm(args: ArchiveFormInput): Promise<ArchiveFormOutput>;
  /** Archives a company workout. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  archiveWorkout(args: ArchiveWorkoutInput): Promise<ArchiveWorkoutOutput>;
  /** Asks a colleague or the owner for input on this client, for instance "what do you think of +50 g carbs here?". Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  askCoach(args: AskCoachInput): Promise<AskCoachOutput>;
  /** Assigns one form to up to 100 clients on the same schedule and notifies each. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  assignFormToClients(args: AssignFormToClientsInput): Promise<AssignFormToClientsOutput>;
  /** Gives a client up to 20 habits at once. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  assignHabits(args: AssignHabitsInput): Promise<AssignHabitsOutput>;
  /** Copies a plan set's plans into a client and replaces the client's day-type setup. Write: runs as a dry-run preview in execute and is added to the changeset. */
  assignPlanSet(args: AssignPlanSetInput): Promise<AssignPlanSetOutput>;
  /** Puts a program on the client: copies its workouts onto dates (Calendar, day 1 of the chosen week falls on startDate) or onto the end of the list (Fixed). Write: runs as a dry-run preview in execute and is added to the changeset. */
  assignProgram(args: AssignProgramInput): Promise<AssignProgramOutput>;
  /** Updates many tasks at once. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  bulkUpdateTasks(args?: BulkUpdateTasksInput): Promise<BulkUpdateTasksOutput>;
  /** Reports whether an email is new, a client here, or already on the team. Read-only. */
  checkClientEmail(args?: CheckClientEmailInput): Promise<CheckClientEmailOutput>;
  /** Picks an option, or a recipe with servings, for a meal on one date. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  chooseMealOption(args: ChooseMealOptionInput): Promise<ChooseMealOptionOutput>;
  /** Removes the override on one date so training and rules decide again. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  clearDayOverride(args: ClearDayOverrideInput): Promise<ClearDayOverrideOutput>;
  /** Clears this client's own target for one nutrient, so the reference target applies again. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  clearMicronutrientTarget(args: ClearMicronutrientTargetInput): Promise<ClearMicronutrientTargetOutput>;
  /** Closes a follow-up and records when, by whom and on which check-in (checkinId, the one being reviewed). Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  closeFollowUp(args: CloseFollowUpInput): Promise<CloseFollowUpOutput>;
  /** Puts 2 to 4 sent check-ins side by side by question key, with the change from first to last and the photos per pose. Read-only. */
  compareCheckins(args: CompareCheckinsInput): Promise<CompareCheckinsOutput>;
  /** Marks a task done. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  completeTask(args: CompleteTaskInput): Promise<CompleteTaskOutput>;
  /** Saves a text draft as entries. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  confirmFoodLogDraft(args: ConfirmFoodLogDraftInput): Promise<ConfirmFoodLogDraftOutput>;
  /** Copies a day's entries, or only the listed meals, to another date as new entries. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  copyFoodLog(args: CopyFoodLogInput): Promise<CopyFoodLogOutput>;
  /** Copies an Open Food Facts product into your food library per 100 g or ml, with its barcode and serving, and returns the food. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  copyOffProduct(args: CopyOffProductInput): Promise<CopyOffProductOutput>;
  /** Saves an automation as a draft. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createAutomationRule(args?: CreateAutomationRuleInput): Promise<CreateAutomationRuleOutput>;
  /** Adds a client with access invite or later. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createClient(args: CreateClientInput): Promise<CreateClientOutput>;
  /** Creates a company day type such as Legs or High carb. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createDayType(args?: CreateDayTypeInput): Promise<CreateDayTypeOutput>;
  /** Creates a company exercise with at least one primary muscle. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createExercise(args: CreateExerciseInput): Promise<CreateExerciseOutput>;
  /** Creates a form at revision 1, optionally with questions. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createForm(args: CreateFormInput): Promise<CreateFormOutput>;
  /** Includes a section template (sectionId, any revision) automatically in every workout of a day type (dayTypeId) or with a training tag (tagId), at the start or the end. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createIncludedBlock(args: CreateIncludedBlockInput): Promise<CreateIncludedBlockOutput>;
  /** Adds a lead by hand, for example after a call or a message. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createLead(args?: CreateLeadInput): Promise<CreateLeadOutput>;
  /** Creates a meal or macros plan for a client, empty or as a copy of another of their plans. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createNutritionPlan(args: CreateNutritionPlanInput): Promise<CreateNutritionPlanOutput>;
  /** Creates a Calendar or Fixed program with one empty first week. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createProgram(args?: CreateProgramInput): Promise<CreateProgramOutput>;
  /** Creates a quiz for the company's public pages: 3 to 8 multiple-choice questions whose answers give points to 2 to 4 outcomes, each outcome with a result text and a next step (apply, call or none). Write: runs as a dry-run preview in execute and is added to the changeset. */
  createQuiz(args?: CreateQuizInput): Promise<CreateQuizOutput>;
  /** Adds a supplement to the company library. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createSupplement(args: CreateSupplementInput): Promise<CreateSupplementOutput>;
  /** Uploads an export from another coaching tool (Kahunas, Trainerize, HubFit, TrueCoach, Everfit, PT Distinction, Google Sheets or any CSV, XLSX, JSON or ZIP of CSVs) and reads it. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createSwitchImport(args: CreateSwitchImportInput): Promise<CreateSwitchImportOutput>;
  /** Creates a task for the company. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createTask(args: CreateTaskInput): Promise<CreateTaskOutput>;
  /** Creates a library workout (or a section template with ownerKind section) from blocks of lines and sets. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  createWorkout(args: CreateWorkoutInput): Promise<CreateWorkoutOutput>;
  /** Accepts or rejects one of the caller's own proposals. Write: runs as a dry-run preview in execute and is added to the changeset. */
  decideStyleProposal(args: DecideStyleProposalInput): Promise<DecideStyleProposalOutput>;
  /** Declines a join request: it is closed as cancelled and the person is not emailed. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  declineJoinRequest(args: DeclineJoinRequestInput): Promise<DeclineJoinRequestOutput>;
  /** Deletes one entry. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  deleteFoodLogEntry(args: DeleteFoodLogEntryInput): Promise<DeleteFoodLogEntryOutput>;
  /** Stops including a reusable block. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  deleteIncludedBlock(args: DeleteIncludedBlockInput): Promise<DeleteIncludedBlockOutput>;
  /** Deletes one day's entry. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  deleteMetricEntry(args: DeleteMetricEntryInput): Promise<DeleteMetricEntryOutput>;
  /** Deletes a session and recomputes the records it affected. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  deleteSession(args: DeleteSessionInput): Promise<DeleteSessionOutput>;
  /** Saves feedback on a sent check-in as a draft for the coach. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  draftCheckinFeedback(args: DraftCheckinFeedbackInput): Promise<DraftCheckinFeedbackOutput>;
  /** Writes a text for a theme in the coach's voice and files it as a draft on the content calendar: caption, reel script, carousel outline, newsletter section or myth of the week. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  draftContent(args: DraftContentInput): Promise<DraftContentOutput>;
  /** Drafts a short chat message that checks in on a client at risk, in the coach's own voice and the client's language. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  draftSaveMessage(args: DraftSaveMessageInput): Promise<DraftSaveMessageOutput>;
  /** Saves a shared or company exercise as a new company exercise you can edit. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  duplicateExercise(args: DuplicateExerciseInput): Promise<DuplicateExerciseOutput>;
  /** Copies a form's current revision under a new name. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  duplicateForm(args: DuplicateFormInput): Promise<DuplicateFormOutput>;
  /** Saves this client's copy of a workout as a new revision and marks it customised. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  editClientWorkout(args: EditClientWorkoutInput): Promise<EditClientWorkoutOutput>;
  /** Ends a life mode now: numbers are judged again from today. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  endLifeMode(args: EndLifeModeInput): Promise<EndLifeModeOutput>;
  /** Finds clients by figures we hold, from a typed list of filters that must all hold. Read-only. */
  findClients(args?: FindClientsInput): Promise<FindClientsOutput>;
  /** Lists clients whose habit completion over the last days is below a percentage, lowest first. Read-only. */
  findClientsMissingHabits(args?: FindClientsMissingHabitsInput): Promise<FindClientsMissingHabitsOutput>;
  /** Finishes a call. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  finishCall(args: FinishCallInput): Promise<FinishCallOutput>;
  /** Adds something to the client's next call: a check-in answer, a message, a chart point, a food day or a note. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  flagForCall(args: FlagForCallInput): Promise<FlagForCallOutput>;
  /** Returns a client's steps, active energy, sleep, resting heart rate and workouts for a week or month, each compared with the period before, the recovery values per day (HRV, sleep stages, bed and wake time, respiratory rate, blood oxygen, VO2 max), and the cardio minutes and sessions per week from watch workouts, Evolvix training and entries. Read-only. */
  getActivitySummary(args: GetActivitySummaryInput): Promise<GetActivitySummaryOutput>;
  /** Returns one automation and its steps. Read-only. */
  getAutomation(args: GetAutomationInput): Promise<GetAutomationOutput>;
  /** Reads the numbers that run a coaching business for one company, over a rolling period in the company's time zone: clients (active, paused, archived, new and lost, churn, lifetime, twelve months), coach performance (check-ins due, received, reviewed on time, feedback speed, waiting and late; unread chat and first-reply speed), client outcomes against their phase (cut or bulk) with check-in and daily-log rates, revenue (monthly recurring revenue of paying subscriptions with trials counted apart, paid and failed payments; null for a connected app without the payments:read scope) and leads (join-link sign-ups, questionnaires, sources). Read-only. */
  getBusinessStats(args?: GetBusinessStatsInput): Promise<GetBusinessStatsOutput>;
  /** Returns the agenda of a call with a client as data: the header, what changed since the last call, the latest check-in with the answers that moved most, adherence, open questions, flagged items and the last call's agreements. Read-only. */
  getCallBrief(args: GetCallBriefInput): Promise<GetCallBriefOutput>;
  /** Returns one check-in with the questions of its revision, the answers, comments and feedback. Read-only. */
  getCheckin(args: GetCheckinInput): Promise<GetCheckinOutput>;
  /** Returns the first read of one sent check-in for the coach: plan week and phase, weights, last plan changes, energy balance, this week's numbers, what is coming, the client's open questions and the flags worth a look. Read-only. */
  getCheckinBrief(args: GetCheckinBriefInput): Promise<GetCheckinBriefOutput>;
  /** Returns the coach's check-in day: the clients whose check-in is due on the date with their status (waiting for the client, received, reviewed, or sent with feedback), the counts on top, the check-ins from the last 14 days that still wait for review in their own late list (longest late first), and next, the first check-in to review (late ones before today's). Read-only. */
  getCheckinDay(args?: GetCheckinDayInput): Promise<GetCheckinDayOutput>;
  /** Summarises a check-in day: for each active client whose check-in was reviewed on the date, whether feedback went out, the plan changes dated from the check-in on (calories, program, training rhythm, steps, cardio, phase) and the follow-ups opened and closed that day. Read-only. */
  getCheckinDaySummary(args?: GetCheckinDaySummaryInput): Promise<GetCheckinDaySummaryOutput>;
  /** Returns one question's answers across a form's sent check-ins, oldest first. Read-only. */
  getCheckinQuestionTrend(args: GetCheckinQuestionTrendInput): Promise<GetCheckinQuestionTrendOutput>;
  /** Returns a daily check-in form as a week grid: a row per question, a cell per day, and per question the week's average, most common answer or count set against the week before. Read-only. */
  getCheckinWeek(args: GetCheckinWeekInput): Promise<GetCheckinWeekOutput>;
  /** Returns one client, including status, coaches, profile, and week. Read-only. */
  getClient(args: GetClientInput): Promise<GetClientOutput>;
  /** Returns only the phase word of a client's current cycle block (BLAST, CRUISE, TRT, OFF, PCT, PREP, or null) and the date the next bloodwork is planned. Read-only. */
  getClientCyclePhase(args: GetClientCyclePhaseInput): Promise<GetClientCyclePhaseOutput>;
  /** Reads one client's overview for a date and a week. Read-only. */
  getClientOverview(args: GetClientOverviewInput): Promise<GetClientOverviewOutput>;
  /** Returns the client's peak week: the one running today, else the next, else the last. Read-only. */
  getClientPeakWeek(args: GetClientPeakWeekInput): Promise<GetClientPeakWeekOutput>;
  /** Returns one client's dropout risk: the score, the level, a reason line for each signal that counted with its points, any snooze, and the last 30 days of scores. Read-only. */
  getClientRisk(args: GetClientRiskInput): Promise<GetClientRiskOutput>;
  /** Returns a client's timeline: the phases that touch the range and the events inside it, and where the client stands today. Read-only. */
  getClientTimeline(args: GetClientTimelineInput): Promise<GetClientTimelineOutput>;
  /** Returns a client's weeks of the last 12 months, oldest first, from the first week with data to the current one, as a coach keeps them in a sheet. Read-only. Cycle markers are left out. */
  getClientWeekTimeline(args: GetClientWeekTimelineInput): Promise<GetClientWeekTimelineOutput>;
  /** Returns one client workout with its full document: blocks, lines, sets, and alternatives. Read-only. */
  getClientWorkout(args: GetClientWorkoutInput): Promise<GetClientWorkoutOutput>;
  /** Reads the coach's today page for one company. Read-only. */
  getCoachToday(args?: GetCoachTodayInput): Promise<GetCoachTodayOutput>;
  /** Lists every feature switch of the active company in plain groups (check-ins and coaching, AI, growth and marketing, client app, Claude and privacy): whether it is on, off, always on or chosen per coach, per client, per Claude app or per browser, who may change it, whether it sends something to clients or to the AI service, and which switch it waits for (blockedBy). Read-only. */
  getCompanyFeatures(args?: GetCompanyFeaturesInput): Promise<GetCompanyFeaturesOutput>;
  /** Returns the client's resolved day types for a date range: the type, the fallback chain nutrition uses, and why. Read-only. */
  getDayCalendar(args: GetDayCalendarInput): Promise<GetDayCalendarOutput>;
  /** Returns the weekday and date rules used on days training does not decide. Read-only. */
  getDayRules(args: GetDayRulesInput): Promise<GetDayRulesOutput>;
  /** Returns one exercise with muscles, images, and where it is used. Read-only. */
  getExercise(args: GetExerciseInput): Promise<GetExerciseOutput>;
  /** Counts the filter choices (type, level, equipment, primary muscle) over the exercises you can use. Read-only. */
  getExerciseFacets(args?: GetExerciseFacetsInput): Promise<GetExerciseFacetsOutput>;
  /** Returns one exercise's history: best weight, estimated 1RM, volume and session tiles, a chart series per day with record markers, and the set log per session. Read-only. */
  getExerciseHistory(args: GetExerciseHistoryInput): Promise<GetExerciseHistoryOutput>;
  /** Returns a Fixed client's workouts in order with done, next, upcoming, or skipped, which one is next up, and sessions done outside the list. Read-only. */
  getFixedProgram(args: GetFixedProgramInput): Promise<GetFixedProgramOutput>;
  /** Returns one day's food log: entries, totals, per-meal groups, the day's snapshot target, the note, skips, and choices. Read-only. */
  getFoodLog(args: GetFoodLogInput): Promise<GetFoodLogOutput>;
  /** Returns a form with the questions of its current revision, or of a past revision when revision is given. Read-only. */
  getForm(args: GetFormInput): Promise<GetFormOutput>;
  /** Returns the grocery list for a date range: foods from each day's meal plan summed with units, grouped by shop category, with ticks and the client's own items. Read-only. */
  getGroceryList(args: GetGroceryListInput): Promise<GetGroceryListOutput>;
  /** Returns the week table: one row per habit, one cell per day, plus the average. Read-only. */
  getHabitSummary(args: GetHabitSummaryInput): Promise<GetHabitSummaryOutput>;
  /** Returns one import: its status (draft, queued, running, done, failed, undone), progress, the mapping, the preview while it is a draft, and the report once it has finished. Read-only. */
  getImportStatus(args: GetImportStatusInput): Promise<GetImportStatusOutput>;
  /** Returns one lead with its timeline (status changes, assignments and notes, newest first). Read-only. */
  getLead(args: GetLeadInput): Promise<GetLeadOutput>;
  /** Follows the leads created in the last 30 or 90 days: per source and per coach, how many leads, contacted, calls booked, won (signed up), lost, churned since, and the revenue paid so far by the clients they became (minor units of the company currency). Read-only. */
  getLeadFunnel(args?: GetLeadFunnelInput): Promise<GetLeadFunnelOutput>;
  /** Returns one marker over time for a client: every value with the lab's reference range at that draw (flag above or below only against that range), in the unit of the newest value (earlier values in another unit are counted in otherUnit and left out), plus the plan's phases (cut, bulk and so on) and, for the coach in a company with the cycle tracker on, the cycle phase words (BLAST, CRUISE, TRT, OFF, PCT, PREP) and never a compound or a dose. Read-only. */
  getMarkerTrend(args: GetMarkerTrendInput): Promise<GetMarkerTrendOutput>;
  /** Returns the signed-in profile. Read-only. */
  getMe(args?: GetMeInput): Promise<GetMeOutput>;
  /** Lists a page of messages in a relationship, oldest first within the page. Read-only. */
  getMessages(args: GetMessagesInput): Promise<GetMessagesOutput>;
  /** Returns one metric's entries, open goal, and summary: first, last, change, percent change, average, and previousAverage. Read-only. */
  getMetricTrend(args: GetMetricTrendInput): Promise<GetMetricTrendOutput>;
  /** Returns the week table: every tracked metric by day, the week's average, and the change from the week before. Read-only. */
  getMetricWeek(args: GetMetricWeekInput): Promise<GetMetricWeekOutput>;
  /** Returns one day's 26 vitamins and minerals: intake from the food log, the daily target from the company's EFSA or USDA table by the client's sex and age (B1 and B3 per MJ of the day's calorie target under EFSA), the upper limit, and a status. Read-only. Source and group are left out and null fields are omitted. */
  getMicronutrientDay(args: GetMicronutrientDayInput): Promise<GetMicronutrientDayOutput>;
  /** Returns each vitamin and mineral over up to 31 days: how many logged days it was met, low, over the upper limit or incomplete, the average intake and percentage, and a status per day. Read-only. */
  getMicronutrientSummary(args: GetMicronutrientSummaryInput): Promise<GetMicronutrientSummaryOutput>;
  /** Returns one mini check-in laid out as a brief: who, when it must be answered by, every answer in the order of the template and the ids of the photos the visitor allowed. Read-only. */
  getMiniCheckin(args: GetMiniCheckinInput): Promise<GetMiniCheckinOutput>;
  /** Returns one day's nutrition: the day type, which plan applies after fallback, the target, and the meals. Read-only. */
  getNutritionDay(args: GetNutritionDayInput): Promise<GetNutritionDayOutput>;
  /** Returns a plan with every food, unit, and nutrient per line, dish, meal, and day, compared with the client's targets. Read-only. */
  getNutritionPlan(args: GetNutritionPlanInput): Promise<GetNutritionPlanOutput>;
  /** Returns how the client logs food and what nutrition features they see. Read-only. */
  getNutritionSettings(args: GetNutritionSettingsInput): Promise<GetNutritionSettingsOutput>;
  /** Returns the nutrition pattern for a relationship. Read-only. */
  getNutritionSetup(args: GetNutritionSetupInput): Promise<GetNutritionSetupOutput>;
  /** Returns the last days up to today with the day type, the target the client saw, and what was logged, plus averages over logged days. Read-only. */
  getNutritionSummary(args: GetNutritionSummaryInput): Promise<GetNutritionSummaryOutput>;
  /** Returns the AI draft of a new client's starting setup, or null when there is none: its status (queued, running, ready, blocked, failed, released), why it is blocked, which sections are accepted or released, and the proposal with every food, supplement, exercise and program named and every total worked out. Read-only. */
  getOnboardingDraft(args: GetOnboardingDraftInput): Promise<GetOnboardingDraftOutput>;
  /** Reads the Monday brief for the company's owners, one stored brief per Monday (week). Read-only. */
  getOwnerBrief(args?: GetOwnerBriefInput): Promise<GetOwnerBriefOutput>;
  /** Returns the prep timeline of a client with a show ahead (a peak week, a peak_week phase, or a show date set with set_stage_target): the weeks out, and for staff the projection of the 7-day average weight to the show at the current rate (the last four weeks) and at the rate the stage weight needs. Read-only. */
  getPrepTimeline(args: GetPrepTimelineInput): Promise<GetPrepTimelineOutput>;
  /** Returns what autopilot prepared for one sent check-in, for the coach only: the AI draft of the feedback when the coach switched drafts on (state says why there is none), the plan change the fixed rules propose with its preview on the plans as they stand now (macro, grams, day types, the one-sentence reason, the changed food lines, the day totals before and after, and the plan revisions to pass as bases), the follow-up that goes with it, and noProposal, the reason when nothing is proposed. Read-only. */
  getPreparedCheckin(args: GetPreparedCheckinInput): Promise<GetPreparedCheckinOutput>;
  /** Returns a program with its settings, weeks, and placed workouts (name, counts, day type, estimated duration) and the revision to send back. Read-only. */
  getProgram(args: GetProgramInput): Promise<GetProgramOutput>;
  /** Returns what one quiz brought in: visitors, finished quizzes, leads, and per outcome how often it came up and how many of those people left an email address. Read-only. */
  getQuizResults(args: GetQuizResultsInput): Promise<GetQuizResultsOutput>;
  /** Returns a client's recovery from the health app: sleep, resting heart rate, HRV and steps for the 7 days ending on date, each against the client's own average of the 4 weeks before (baseline and usual range), with the daily points of both periods and the recovery signals that are on: resting heart rate 5 bpm or more above baseline on 5 or more days, HRV 15% or more below baseline on 5 or more days, sleep under 6 hours on average over 5 or more nights. Read-only. */
  getRecoveryTrend(args: GetRecoveryTrendInput): Promise<GetRecoveryTrendOutput>;
  /** Returns the client's personal referral link with its visits, leads and won count and the reward the company promises. Read-only. */
  getReferralLink(args: GetReferralLinkInput): Promise<GetReferralLinkOutput>;
  /** Reads the company's settings for celebrating wins (celebrateMode: off, suggest or auto) and for the missed check-in rescue (rescueEnabled, rescueAfterHours, and rescueChat for an extra chat message). Read-only. */
  getRescueSettings(args?: GetRescueSettingsInput): Promise<GetRescueSettingsOutput>;
  /** Returns one session with its exercises, sets, previous performance, current records, and the records it set. Read-only. */
  getSession(args: GetSessionInput): Promise<GetSessionOutput>;
  /** Reads a coach's style guide: language, structure, words to use and avoid, and good and bad examples. Read-only. */
  getStyleGuide(args?: GetStyleGuideInput): Promise<GetStyleGuideOutput>;
  /** Returns how many scheduled intakes a client took, skipped or left open per day and per supplement over a range up to today. Read-only. */
  getSupplementAdherence(args: GetSupplementAdherenceInput): Promise<GetSupplementAdherenceOutput>;
  /** Returns what a client takes on one day, grouped by moment in day order and resolved for that day's day type: training days include the workout moments. Read-only. */
  getSupplementDay(args: GetSupplementDayInput): Promise<GetSupplementDayOutput>;
  /** Returns a client's supplement plan: sections of lines, each a library supplement with an amount (or a range with amountMax), a unit, a note, product links and discount code, and the moments to take it (on waking, morning, a meal, every meal, afternoon, pre, intra or post workout, evening, before bed with minutes before, or a clock time) on every day, training days or rest days. Read-only. */
  getSupplementPlan(args: GetSupplementPlanInput): Promise<GetSupplementPlanOutput>;
  /** Returns the habits due today in the client's time zone, with state, amount and streak. Read-only. */
  getTodaysHabits(args: GetTodaysHabitsInput): Promise<GetTodaysHabitsOutput>;
  /** Returns each date of a range (at most 62 days) with its day type, its client workouts, and the sessions performed. Read-only. */
  getTrainingCalendar(args: GetTrainingCalendarInput): Promise<GetTrainingCalendarOutput>;
  /** Returns the client's log book, newest week first: per workout name, each exercise with its sessions week by week (load x reps per set, the top set, volume, and a trend against the session before). Read-only. */
  getTrainingLogbook(args: GetTrainingLogbookInput): Promise<GetTrainingLogbookOutput>;
  /** Returns the client's training mode and what they may do: how far ahead they see, and whether they may move, skip, or swap. Read-only. */
  getTrainingSettings(args: GetTrainingSettingsInput): Promise<GetTrainingSettingsOutput>;
  /** Returns training statistics for a period against the equal period before: KPIs, weighted sets per muscle, daily upper, lower, and core sets, a trained-day calendar, and record cards. Read-only. */
  getTrainingStats(args: GetTrainingStatsInput): Promise<GetTrainingStatsOutput>;
  /** Returns the current revision of a workout with blocks, lines, sets, alternatives, and estimates. Read-only. */
  getWorkoutTemplate(args: GetWorkoutTemplateInput): Promise<GetWorkoutTemplateOutput>;
  /** Adds up to 200 clients. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  importClients(args: ImportClientsInput): Promise<ImportClientsOutput>;
  /** Imports up to 2000 dated measurements for one client, such as daily weights from a spreadsheet. Write: runs as a dry-run preview in execute and is added to the changeset. rows lists the flagged rows only. */
  importMetricHistory(args: ImportMetricHistoryInput): Promise<ImportMetricHistoryOutput>;
  /** Turns what the coach said about a sent check-in into typed actions, without applying or sending anything: the plan change they asked for (macro, grams, day types) with its preview on the plans as they stand now and a fingerprint, a follow-up, points to praise or mention in the message, whether they said to send, and problems naming what was not understood or cannot be done. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  interpretReviewNote(args: InterpretReviewNoteInput): Promise<InterpretReviewNoteOutput>;
  /** Answers a finished ad hoc session's plannedMatch: clientWorkoutId counts it as that planned workout (done, and the day takes its day type) after the client or coach says yes; dismiss true records a no and stops asking. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  linkSessionToWorkout(args: LinkSessionToWorkoutInput): Promise<LinkSessionToWorkoutOutput>;
  /** Lists the clients most likely to quit, highest score first, each with the reasons behind the score in the caller's language. Read-only. */
  listAtRiskClients(args?: ListAtRiskClientsInput): Promise<ListAtRiskClientsOutput>;
  /** Lists the actions an automation can run. Read-only. */
  listAutomationActions(args?: ListAutomationActionsInput): Promise<ListAutomationActionsOutput>;
  /** Lists sequence templates a coach can start from. Read-only. */
  listAutomationTemplates(args?: ListAutomationTemplatesInput): Promise<ListAutomationTemplatesOutput>;
  /** Lists the events that can start an automation. Read-only. */
  listAutomationTriggers(args?: ListAutomationTriggersInput): Promise<ListAutomationTriggersOutput>;
  /** Lists automations in the company. Read-only. */
  listAutomations(args?: ListAutomationsInput): Promise<ListAutomationsOutput>;
  /** Lists a client's bloodwork panels, newest first: the date of the draw, the lab, notes, and per marker the value, unit and the reference range the lab printed, with flag above or below when the value is outside that range (the lab's range only; there is no other judgement). Read-only. */
  listBloodwork(args: ListBloodworkInput): Promise<ListBloodworkOutput>;
  /** Lists what a message can point at, one type at a time. Read-only. */
  listChatReferences(args: ListChatReferencesInput): Promise<ListChatReferencesOutput>;
  /** Lists the forms assigned to a client with their schedule, next due check-in and compliance (sent and due; a missed check-in before the client's start date does not count, nor does a skipped one). Read-only. */
  listCheckinAssignments(args: ListCheckinAssignmentsInput): Promise<ListCheckinAssignmentsOutput>;
  /** Lists sent check-ins to review across the clients the caller may review: pending oldest first, reviewed newest first. Read-only. */
  listCheckinInbox(args?: ListCheckinInboxInput): Promise<ListCheckinInboxOutput>;
  /** Lists a client's check-ins newest first. Read-only. */
  listClientCheckins(args: ListClientCheckinsInput): Promise<ListClientCheckinsOutput>;
  /** Lists automations enrolled for one client. Read-only. */
  listClientEnrollments(args: ListClientEnrollmentsInput): Promise<ListClientEnrollmentsOutput>;
  /** Lists the metrics a client tracks with the latest value and open goal. Read-only. */
  listClientMetrics(args: ListClientMetricsInput): Promise<ListClientMetricsOutput>;
  /** Lists staff notes on a client, including private ones. Read-only. */
  listClientNotes(args: ListClientNotesInput): Promise<ListClientNotesOutput>;
  /** Lists the company's client tags and how many clients use each. Read-only. */
  listClientTags(args?: ListClientTagsInput): Promise<ListClientTagsOutput>;
  /** Lists the wins of the caller's clients that are worth a congratulation: a PR on a lift, a logging streak of weeks, a weight milestone toward the goal, 12/26/52 weeks coached, a finished phase, a first week fully on plan. Read-only. */
  listClientWins(args?: ListClientWinsInput): Promise<ListClientWinsOutput>;
  /** Lists clients in the caller's company, with status, tags, and week labels. Read-only. */
  listClients(args?: ListClientsInput): Promise<ListClientsOutput>;
  /** Lists the questions between staff that the caller asked or was asked, newest first, with the replies. Read-only. */
  listCoachQuestions(args?: ListCoachQuestionsInput): Promise<ListCoachQuestionsOutput>;
  /** Lists the content calendar: items dated within from and to (at most about a year apart), plus the undated ideas and drafts unless undated is false. Read-only. */
  listContentCalendar(args?: ListContentCalendarInput): Promise<ListContentCalendarOutput>;
  /** Lists what clients struggle with in a week: anonymous themes found in the week's check-in answers (and chat when the company allowed it), each shared by at least three clients and shown as a band (clientsAtLeast 3, 5 or 10, never an exact count), with a paraphrased example and how the coach answered. Read-only. */
  listContentThemes(args?: ListContentThemesInput): Promise<ListContentThemesOutput>;
  /** Lists conversations with unread counts for the signed-in person. Read-only. */
  listConversations(args?: ListConversationsInput): Promise<ListConversationsOutput>;
  /** Lists day types: the built-in training and rest plus the company's own. Read-only. */
  listDayTypes(args?: ListDayTypesInput): Promise<ListDayTypesOutput>;
  /** Lists clients enrolled in one automation. Read-only. */
  listEnrollments(args: ListEnrollmentsInput): Promise<ListEnrollmentsOutput>;
  /** Lists the follow-ups a coach wrote for this client to look at in a later check-in: open ones first, oldest first (overdue ones stay), then the newest closed ones when withClosed is true. Read-only. */
  listFollowUps(args: ListFollowUpsInput): Promise<ListFollowUpsOutput>;
  /** Lists the platform check-in and questionnaire templates with their question labels. Read-only. */
  listFormTemplates(args?: ListFormTemplatesInput): Promise<ListFormTemplatesOutput>;
  /** Lists the company's check-in and questionnaire forms with question count and active assignments. Read-only. */
  listForms(args?: ListFormsInput): Promise<ListFormsOutput>;
  /** Lists habit templates: the company's own and the platform's, with how many clients use each. Read-only. */
  listHabitTemplates(args?: ListHabitTemplatesInput): Promise<ListHabitTemplatesOutput>;
  /** Lists the reusable blocks of your company: section templates included automatically at the start or end of every workout with a day type or a training tag. Read-only. */
  listIncludedBlocks(args?: ListIncludedBlocksInput): Promise<ListIncludedBlocksOutput>;
  /** Lists the people who signed up through a join link and wait for a coach to accept them, newest first, with the check-in that holds their questionnaire answers. Read-only. */
  listJoinRequests(args?: ListJoinRequestsInput): Promise<ListJoinRequestsOutput>;
  /** Lists the free calculators (maintenance calories, macros, protein, weeks to show) and quizzes the company has on its public pages, which are on, and per magnet how many visitors came, how many finished a quiz and how many left an email address (leads). Read-only. */
  listLeadMagnets(args?: ListLeadMagnetsInput): Promise<ListLeadMagnetsOutput>;
  /** Lists the leads: people who asked about coaching but are not clients yet, newest first (the waitlist oldest first). Read-only. */
  listLeads(args?: ListLeadsInput): Promise<ListLeadsOutput>;
  /** Lists a client's life modes: periods of travel, illness, holiday, competition week or other time off in which their numbers are not judged. Read-only. */
  listLifeModes(args: ListLifeModesInput): Promise<ListLifeModesOutput>;
  /** Lists the company's metric catalog: built-in metrics and the company's own. Read-only. */
  listMetrics(args?: ListMetricsInput): Promise<ListMetricsOutput>;
  /** Lists the free mini check-ins that visitors filled in, newest first, with the stated goal and whether the coach already answered. Read-only. */
  listMiniCheckins(args?: ListMiniCheckinsInput): Promise<ListMiniCheckinsOutput>;
  /** Lists check-ins whose window closed unsent in the last 30 days, most overdue first. Read-only. */
  listMissedCheckins(args?: ListMissedCheckinsInput): Promise<ListMissedCheckinsOutput>;
  /** Lists the signed-in client's open and upcoming check-ins across their open coaching relationships, soonest first. Read-only. */
  listMyDueCheckins(args?: ListMyDueCheckinsInput): Promise<ListMyDueCheckinsOutput>;
  /** Lists the open coaching relationships of the signed-in person, with the enabled modules of each. Read-only. */
  listMyRelationships(args?: ListMyRelationshipsInput): Promise<ListMyRelationshipsOutput>;
  /** Lists a client's nutrition plans with planned totals, option ranges, and the day types that use each. Read-only. */
  listNutritionPlans(args: ListNutritionPlansInput): Promise<ListNutritionPlansOutput>;
  /** Lists the Mondays that have a stored brief, newest first, with whether the caller dismissed that brief from their Today, and this week's Monday. Read-only. */
  listOwnerBriefs(args?: ListOwnerBriefsInput): Promise<ListOwnerBriefsOutput>;
  /** Lists the company's peak week templates: the plan of each day relative to the show (offset 0 is the show day, -7 a week before): day type, macro changes in grams, water, sodium, potassium, fibre, training focus, cardio, posing and notes. Read-only. */
  listPeakWeekTemplates(args?: ListPeakWeekTemplatesInput): Promise<ListPeakWeekTemplatesOutput>;
  /** Lists the exercises the client has logged, most recent first, with the last date and the number of sessions. Read-only. */
  listPerformedExercises(args: ListPerformedExercisesInput): Promise<ListPerformedExercisesOutput>;
  /** Returns the current record of each kind per exercise, and with exerciseId every record event too. Read-only. */
  listPersonalRecords(args: ListPersonalRecordsInput): Promise<ListPersonalRecordsOutput>;
  /** Lists plan sets: library plans and targets per day type, assigned together. Read-only. */
  listPlanSets(args?: ListPlanSetsInput): Promise<ListPlanSetsOutput>;
  /** Lists the caller's open post ideas made from patterns across their own active clients (logging, habits, check-in streaks, personal records, common topics, calorie hit-rate). Read-only. */
  listPostIdeas(args?: ListPostIdeasInput): Promise<ListPostIdeasOutput>;
  /** Lists practices in the caller's company. Read-only. */
  listPractices(args?: ListPracticesInput): Promise<ListPracticesOutput>;
  /** Lists the programs on the client with their dates, status, and how many of their workouts are done. Read-only. */
  listProgramAssignments(args: ListProgramAssignmentsInput): Promise<ListProgramAssignmentsOutput>;
  /** Lists client copies of the program's workouts with whether each is performed, customised, or eligible for a push. Read-only. */
  listProgramCopies(args: ListProgramCopiesInput): Promise<ListProgramCopiesOutput>;
  /** Lists the programs of your company with week, workout, and assigned-client counts, plus shared samples when asked. Read-only. */
  listPrograms(args?: ListProgramsInput): Promise<ListProgramsOutput>;
  /** Lists the colleagues the caller can ask about this client: the staff who coach this client plus the company's owners and admins, without the caller. Read-only. */
  listQuestionColleagues(args: ListQuestionColleaguesInput): Promise<ListQuestionColleaguesOutput>;
  /** Lists the clients who have a personal referral link, with the visits, leads and won clients each one brought and the number of rewards still to hand over, plus the reward the company promises. Read-only. */
  listReferrals(args?: ListReferralsInput): Promise<ListReferralsOutput>;
  /** Lists personal and shared saved replies for the caller. Read-only. */
  listSavedReplies(args?: ListSavedRepliesInput): Promise<ListSavedRepliesOutput>;
  /** Lists the client's workout sessions, newest first, with sets, volume, difficulty, and the number of records each set. Read-only. */
  listSessions(args: ListSessionsInput): Promise<ListSessionsOutput>;
  /** Lists the caller's waiting style-guide proposals: one rule each, with the reason and how many edited drafts it comes from. Read-only. */
  listStyleProposals(args?: ListStyleProposalsInput): Promise<ListStyleProposalsOutput>;
  /** Lists the company's supplement library: name, brand, default unit, category, discount code and product links, with how many clients' plans list each. Read-only. */
  listSupplements(args?: ListSupplementsInput): Promise<ListSupplementsOutput>;
  /** Lists earlier imports with their status and report. Read-only. */
  listSwitchImports(args?: ListSwitchImportsInput): Promise<ListSwitchImportsOutput>;
  /** Lists tasks the caller can see, with overdue, today, upcoming, and no-date counts. Read-only. */
  listTasks(args?: ListTasksInput): Promise<ListTasksOutput>;
  /** Lists teammates with status, client count, last activity, and pending invitations. Read-only. */
  listTeam(args?: ListTeamInput): Promise<ListTeamOutput>;
  /** Lists past clients whose coaching stopped 3 to 9 months ago (paused, ended or archived) and who have not been written to for that window. Read-only. */
  listWinBackCandidates(args?: ListWinBackCandidatesInput): Promise<ListWinBackCandidatesOutput>;
  /** Lists library workouts (or section templates) of your company and the shared samples, with filters and a total. Read-only. */
  listWorkouts(args?: ListWorkoutsInput): Promise<ListWorkoutsOutput>;
  /** Logs foods, recipes, or quick adds to one meal. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logFood(args: LogFoodInput): Promise<LogFoodOutput>;
  /** Turns a description such as "2 eggs, toast and coffee" into a draft of matched foods. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logFoodFromText(args: LogFoodFromTextInput): Promise<LogFoodFromTextOutput>;
  /** Logs a habit for one day. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logHabit(args: LogHabitInput): Promise<LogHabitOutput>;
  /** Logs several metrics for one day in one call. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logMetrics(args: LogMetricsInput): Promise<LogMetricsOutput>;
  /** Logs a plan meal as eaten: every line of the day's chosen option, or the default option when none was chosen, scaled by portion from 0.25 to 2. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logPlannedMeal(args: LogPlannedMealInput): Promise<LogPlannedMealOutput>;
  /** Ticks one scheduled intake of a day as taken or skipped, or clears it with open. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logSupplementIntake(args: LogSupplementIntakeInput): Promise<LogSupplementIntakeOutput>;
  /** Logs a finished workout after the fact in one call: exercises with the sets as performed, all counted as done (a set may carry partialReps, part-range reps after its full reps; they never count in reps, volume or records). Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  logWorkout(args: LogWorkoutInput): Promise<LogWorkoutOutput>;
  /** Makes a branded before and after post from a client's progress photos: one picture per format (square, feed, story) and, with reel true, a short video, all with the company logo. Write: runs as a dry-run preview in execute and is added to the changeset. */
  makeTransformationPost(args: MakeTransformationPostInput): Promise<MakeTransformationPostOutput>;
  /** Marks up to 100 sent check-ins as reviewed, or back to pending with reviewed false. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  markCheckinsReviewed(args?: MarkCheckinsReviewedInput): Promise<MarkCheckinsReviewedOutput>;
  /** Marks a client note as coaching context (on true) or takes the mark off (on false). Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  markCoachingContext(args: MarkCoachingContextInput): Promise<MarkCoachingContextOutput>;
  /** Moves the caller's read marker forward to a message in this conversation and lifts the caller's unread mark. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  markConversationRead(args: MarkConversationReadInput): Promise<MarkConversationReadOutput>;
  /** Sends one message from the caller into each client's conversation and notifies the client like a chat message. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  messageClients(args: MessageClientsInput): Promise<MessageClientsOutput>;
  /** Moves a workout to another date (Calendar) or place (Fixed). Write: runs as a dry-run preview in execute and is added to the changeset. */
  moveWorkout(args: MoveWorkoutInput): Promise<MoveWorkoutOutput>;
  /** Reads pasted workout text, one exercise per line like "Back squat 4x6 92.5kg, rest 120s" or "Bench press 3x8-10 @ RIR 2, tempo 3010", and matches each line to the exercise library. Read-only. */
  parseWorkoutText(args?: ParseWorkoutTextInput): Promise<ParseWorkoutTextOutput>;
  /** Pauses a client. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  pauseClient(args: PauseClientInput): Promise<PauseClientOutput>;
  /** Repeats the chosen workouts on the same weekday for the next weeks, each week a step further: more weight, reps, sets, or RPE, with an optional deload week. Write: runs as a dry-run preview in execute and is added to the changeset. */
  periodiseClientWorkouts(args: PeriodiseClientWorkoutsInput): Promise<PeriodiseClientWorkoutsOutput>;
  /** Copies selected workouts forward week by week, progressing weight, reps, sets, effort, and deloads. Write: runs as a dry-run preview in execute and is added to the changeset. */
  periodiseProgram(args: PeriodiseProgramInput): Promise<PeriodiseProgramOutput>;
  /** Classifies import rows without writing them. Read-only. */
  previewClientImport(args: PreviewClientImportInput): Promise<PreviewClientImportOutput>;
  /** Previews a move such as +25 g carbs on the training and rest days: every food line that changes (old to new amount), the day totals before and after, and what could not be done. Read-only. */
  previewPlanChange(args: PreviewPlanChangeInput): Promise<PreviewPlanChangeOutput>;
  /** Publishes an automation so it can enroll clients. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  publishAutomationRule(args: PublishAutomationRuleInput): Promise<PublishAutomationRuleOutput>;
  /** Replaces client copies of one placed workout with the program's current version and recomputes their day types. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  pushProgramChanges(args: PushProgramChangesInput): Promise<PushProgramChangesOutput>;
  /** Writes sections of the draft to the client, as the releasing coach and through the same services as the coach's own screens: the phase, the meal plans linked to the training and rest day with their numbers and the training rhythm, the supplement lines (added to any plan the client has), the program, and the welcome message in chat. Write: runs as a dry-run preview in execute and is added to the changeset. */
  releaseOnboardingDraft(args: ReleaseOnboardingDraftInput): Promise<ReleaseOnboardingDraftOutput>;
  /** Removes a question from new check-ins. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  removeFormQuestion(args: RemoveFormQuestionInput): Promise<RemoveFormQuestionOutput>;
  /** Takes a program off the client from a date on. Write: runs as a dry-run preview in execute and is added to the changeset. */
  removeProgramFromClient(args: RemoveProgramFromClientInput): Promise<RemoveProgramFromClientOutput>;
  /** Takes a workout off the program. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  removeProgramWorkout(args: RemoveProgramWorkoutInput): Promise<RemoveProgramWorkoutOutput>;
  /** Opens a missed or skipped check-in again until the end of closesOn. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  reopenCheckinDue(args: ReopenCheckinDueInput): Promise<ReopenCheckinDueOutput>;
  /** Sets the question order. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  reorderFormQuestions(args: ReorderFormQuestionsInput): Promise<ReorderFormQuestionsOutput>;
  /** Sends an invitation again with a fresh link. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  resendInvitation(args: ResendInvitationInput): Promise<ResendInvitationOutput>;
  /** Restores an archived client. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  restoreClient(args: RestoreClientInput): Promise<RestoreClientOutput>;
  /** Resumes a paused client back to active. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  resumeClient(args: ResumeClientInput): Promise<ResumeClientOutput>;
  /** Saves several answers of a draft in one call, or of a sent check-in the client may still change. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  saveCheckinAnswers(args: SaveCheckinAnswersInput): Promise<SaveCheckinAnswersOutput>;
  /** Adds one workout to the client: a copy of a library or program workout, or an empty one, on a date (Calendar) or place (Fixed). Write: runs as a dry-run preview in execute and is added to the changeset. */
  scheduleWorkout(args: ScheduleWorkoutInput): Promise<ScheduleWorkoutOutput>;
  /** Searches the shared Evolvix exercises and your company's own by a substring of the name, sorted A to Z, with no relevance ranking. Read-only. */
  searchExercises(args?: SearchExercisesInput): Promise<SearchExercisesOutput>;
  /** Searches the food catalog: shared foods plus your company's. Read-only. */
  searchFoods(args?: SearchFoodsInput): Promise<SearchFoodsOutput>;
  /** Searches what this client can log: foods first, then Open Food Facts products, as the company's food access allows. Read-only. */
  searchLogCatalog(args: SearchLogCatalogInput): Promise<SearchLogCatalogOutput>;
  /** Searches the foods this client can log: shared foods plus the company's, or only the company's when food access says so. Read-only. */
  searchLogFoods(args: SearchLogFoodsInput): Promise<SearchLogFoodsOutput>;
  /** Searches Open Food Facts products by name and brand, best match first. Read-only. */
  searchOffProducts(args?: SearchOffProductsInput): Promise<SearchOffProductsOutput>;
  /** Searches recipes: your company's and the shared Evolvix set, with kcal and protein per serving. Read-only. */
  searchRecipes(args?: SearchRecipesInput): Promise<SearchRecipesOutput>;
  /** Emails an invitation to an invited client who has none, such as one added with access later. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  sendClientInvitation(args: SendClientInvitationInput): Promise<SendClientInvitationOutput>;
  /** Sends a chat message. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  sendMessage(args: SendMessageInput): Promise<SendMessageOutput>;
  /** Congratulates the client on a win (a card from list_client_wins; the whole week is then handled) with a chat message from the coach. Write: runs as a dry-run preview in execute and is added to the changeset. */
  sendWinMessage(args: SendWinMessageInput): Promise<SendWinMessageOutput>;
  /** Sets when bloodwork is due for a client: everyWeeks (1 to 52) counts from the last panel, beforePhaseEndWeeks (1 to 26) asks for a panel that many weeks before a phase of their plan ends; with both, the earlier date counts. Write: runs as a dry-run preview in execute and is added to the changeset. */
  setBloodworkSchedule(args: SetBloodworkScheduleInput): Promise<SetBloodworkScheduleOutput>;
  /** Adds a phase to a client's timeline, or with phaseId changes that phase. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setClientPhase(args: SetClientPhaseInput): Promise<SetClientPhaseOutput>;
  /** Sets what the coach typed in one cell of a client's week timeline, or clears it with an empty value so the derived value shows again. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setClientWeekTimelineCell(args: SetClientWeekTimelineCellInput): Promise<SetClientWeekTimelineCellOutput>;
  /** Sets one day type's calories and macros, or attaches mealPlanId, and keeps the other day types, their plans, and the weekday rules. Write: runs as a dry-run preview in execute and is added to the changeset. */
  setDailyTargets(args: SetDailyTargetsInput): Promise<SetDailyTargetsOutput>;
  /** Sets the day type of one date, overriding training and rules. Write: runs as a dry-run preview in execute and is added to the changeset. */
  setDayOverride(args: SetDayOverrideInput): Promise<SetDayOverrideOutput>;
  /** Replaces all weekday and date rules. Write: runs as a dry-run preview in execute and is added to the changeset. */
  setDayRules(args: SetDayRulesInput): Promise<SetDayRulesOutput>;
  /** Sets the same targets for every day. Write: runs as a dry-run preview in execute and is added to the changeset. */
  setEverydayTargets(args: SetEverydayTargetsInput): Promise<SetEverydayTargetsOutput>;
  /** Starts a life mode for a client: kind travel, sick, holiday, competition or other (other needs a note), from startsOn (default today) to endsOn, both days included, at most 120 days. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setLifeMode(args: SetLifeModeInput): Promise<SetLifeModeOutput>;
  /** Sets the goal for one metric with a start and goal date. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setMetricGoal(args: SetMetricGoalInput): Promise<SetMetricGoalOutput>;
  /** Sets this client's own daily target for one nutrient, by catalog key such as iron_mg, in the unit get_micronutrient_day shows (vitamin D in µg). Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setMicronutrientTarget(args: SetMicronutrientTargetInput): Promise<SetMicronutrientTargetOutput>;
  /** Replaces the nutrition pattern for a relationship. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setNutritionSetup(args: SetNutritionSetupInput): Promise<SetNutritionSetupOutput>;
  /** Sets the weight the coach wants on stage for the client's next show (or for showDate, which also makes that date a show), the weeks to leave out of the projection (skipDates: any day in a diet break or refeed calendar week; replaces the list) and whether the client sees the countdown card (showInApp). Write: runs as a dry-run preview in execute and is added to the changeset. */
  setStageTarget(args: SetStageTargetInput): Promise<SetStageTargetOutput>;
  /** Replaces a client's supplement plan from effectiveOn as a new version; earlier days keep the plan they had. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  setSupplementPlan(args: SetSupplementPlanInput): Promise<SetSupplementPlanOutput>;
  /** Sets the client's training mode (calendar or fixed) and permissions, as the Training settings page does. Write: runs as a dry-run preview in execute and is added to the changeset. */
  setTrainingMode(args: SetTrainingModeInput): Promise<SetTrainingModeOutput>;
  /** Skips one upcoming or open check-in and schedules the next, or excuses a missed one so it stops counting against compliance. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  skipCheckinDue(args: SkipCheckinDueInput): Promise<SkipCheckinDueOutput>;
  /** Marks a workout skipped. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  skipWorkout(args: SkipWorkoutInput): Promise<SkipWorkoutOutput>;
  /** Snoozes one attention reason for 1, 3, or 7 days. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  snoozeAttention(args: SnoozeAttentionInput): Promise<SnoozeAttentionOutput>;
  /** Starts a call with a client, or a check-in review with mode review, and returns it. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  startCall(args: StartCallInput): Promise<StartCallOutput>;
  /** Opens a draft for a due check-in, or an extra one on a form that allows it. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  startCheckin(args: StartCheckinInput): Promise<StartCheckinOutput>;
  /** Starts the import. Write: runs as a dry-run preview in execute and is added to the changeset. */
  startSwitchImport(args: StartSwitchImportInput): Promise<StartSwitchImportOutput>;
  /** Stops one client's automation and cancels what is still scheduled. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  stopEnrollment(args: StopEnrollmentInput): Promise<StopEnrollmentOutput>;
  /** Sends the check-in to the coach. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  submitCheckin(args: SubmitCheckinInput): Promise<SubmitCheckinOutput>;
  /** Suggests daily targets from bodyweight, goal, and activity. Read-only. */
  suggestTargets(args: SuggestTargetsInput): Promise<SuggestTargetsOutput>;
  /** Adds and removes tags on many clients. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  tagClients(args?: TagClientsInput): Promise<TagClientsOutput>;
  /** Previews runs due in the next 14 days and the path through the flow. Read-only. */
  testAutomationRule(args: TestAutomationRuleInput): Promise<TestAutomationRuleOutput>;
  /** Brings an archived company exercise back. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  unarchiveExercise(args: UnarchiveExerciseInput): Promise<UnarchiveExerciseOutput>;
  /** Makes an archived form editable and assignable again. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  unarchiveForm(args: UnarchiveFormInput): Promise<UnarchiveFormOutput>;
  /** Brings an archived company workout back. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  unarchiveWorkout(args: UnarchiveWorkoutInput): Promise<UnarchiveWorkoutOutput>;
  /** Takes a finished import back within 24 hours: deletes the clients it added and the measurements it wrote, unless the client has signed in, was invited, has activity, or a value was edited since. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  undoSwitchImport(args: UndoSwitchImportInput): Promise<UndoSwitchImportOutput>;
  /** Removes the log of one day. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  unlogHabit(args: UnlogHabitInput): Promise<UnlogHabitOutput>;
  /** Puts a skipped workout back on the calendar. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  unskipWorkout(args: UnskipWorkoutInput): Promise<UnskipWorkoutOutput>;
  /** Replaces an automation that is not archived, and leaving out the trigger, anchor, or settings resets them. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateAutomationRule(args: UpdateAutomationRuleInput): Promise<UpdateAutomationRuleOutput>;
  /** Changes an assignment's schedule. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateCheckinSchedule(args: UpdateCheckinScheduleInput): Promise<UpdateCheckinScheduleOutput>;
  /** Updates a client's names, dates, practice, or email. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateClient(args: UpdateClientInput): Promise<UpdateClientOutput>;
  /** Edits a calendar item in place: the text, the title, the date (clearDate removes it) or the status (idea, draft, approved, posted). Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateContentItem(args: UpdateContentItemInput): Promise<UpdateContentItemOutput>;
  /** Replaces a company exercise. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateExercise(args: UpdateExerciseInput): Promise<UpdateExerciseOutput>;
  /** Changes one entry. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateFoodLogEntry(args: UpdateFoodLogEntryInput): Promise<UpdateFoodLogEntryOutput>;
  /** Changes the name, description, cover, default schedule, or sheetPreset (the Google Sheets tracker layout a check-in form syncs into; an empty string turns it off). Write: runs as a dry-run preview in execute and is added to the changeset. */
  updateForm(args: UpdateFormInput): Promise<UpdateFormOutput>;
  /** Changes some fields of one question. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateFormQuestion(args: UpdateFormQuestionInput): Promise<UpdateFormQuestionOutput>;
  /** Updates a habit. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateHabit(args: UpdateHabitInput): Promise<UpdateHabitOutput>;
  /** Changes a lead: status (a new status writes a timeline line; lost takes a lostReason), details, tags, a note for the timeline, and the coach (assignedCoachId or unassign, owners and admins only). Write: runs as a dry-run preview in execute and is added to the changeset. */
  updateLead(args: UpdateLeadInput): Promise<UpdateLeadOutput>;
  /** Renames a meal or changes its time or note. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateMeal(args: UpdateMealInput): Promise<UpdateMealOutput>;
  /** Edits a dish: name, servings, foods, steps, or numbers by hand. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateMealOption(args: UpdateMealOptionInput): Promise<UpdateMealOptionOutput>;
  /** Renames a program or changes its description, cover, tags, or type; send only the fields to change, with baseRevision from get_program. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateProgramDetails(args: UpdateProgramDetailsInput): Promise<UpdateProgramDetailsOutput>;
  /** Replaces all six parts of the caller's own style guide (each up to 2,500 characters, 8,000 in all). Write: runs as a dry-run preview in execute and is added to the changeset. */
  updateStyleGuide(args: UpdateStyleGuideInput): Promise<UpdateStyleGuideOutput>;
  /** Replaces a supplement of the library, its product links and discount code included. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateSupplement(args: UpdateSupplementInput): Promise<UpdateSupplementOutput>;
  /** Replaces the column mapping and options (weightUnit kg or lb, lengthUnit cm or in, dateOrder dmy or mdy) of a draft and answers the new preview. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateSwitchImportMapping(args: UpdateSwitchImportMappingInput): Promise<UpdateSwitchImportMappingOutput>;
  /** Updates a task. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateTask(args: UpdateTaskInput): Promise<UpdateTaskOutput>;
  /** Replaces the whole workout as a new revision. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  updateWorkout(args: UpdateWorkoutInput): Promise<UpdateWorkoutOutput>;
  /** Copies a platform template into the company as a form at revision 1. Write: does not run in execute; returns {pending:true,index} and is added to the changeset. */
  useFormTemplate(args: UseFormTemplateInput): Promise<UseFormTemplateOutput>;
};
