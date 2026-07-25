export type ConceptKind = "metric" | "structure" | "experience";
export type ConceptPresentation = "bare" | "full";

export type Concept = {
  id: string;
  title: string;
  collection: string;
  description: string;
  kind: ConceptKind;
  presentation: ConceptPresentation;
  /** Index into `templates/concept-NN.html`. */
  templateIndex: number;
};

type ConceptSeed = readonly [
  id: string,
  title: string,
  collection: string,
  description: string,
  kind: ConceptKind,
  presentation: ConceptPresentation,
];

const CONCEPT_SEEDS = [
  ["core-urge-wave", "Urge Wave", "Core six", "The shape of a typical urge — how long it lasts and when it peaks.", "metric", "bare"],
  ["core-the-gap", "The Gap", "Core six", "How closely your behaviour tracks your stated values — committed action over abstinence.", "metric", "bare"],
  ["core-recovery-capital", "Recovery Capital", "Core six", "A score that only ever grows — the deliberate anti-streak that a lapse can't reset.", "metric", "bare"],
  ["core-the-lever", "The Lever", "Core six", "The single strongest predictor in your data, surfaced as something you can act on.", "metric", "bare"],
  ["core-the-pause", "The Pause", "Core six", "The growing latency between an urge and acting — impulse control made visible.", "metric", "bare"],
  ["core-reforger-recap", "Reforger Recap", "Core six", "Your month, wrapped — the celebratory, shareable signature screen.", "structure", "bare"],
  ["experience-right-now", "Right now", "Experiences", "A calm-urgency intervention that makes space for a choice in the moment.", "experience", "full"],
  ["experience-return-to-steady", "Return to steady", "Experiences", "A soft landing that turns recovery speed into evidence you already know how to come back.", "experience", "full"],
  ["experience-coming-into-focus", "Coming into focus", "Experiences", "Quiet momentum for building a personal baseline without streaks or shame.", "experience", "full"],
  ["experience-skill-gym", "Skill gym", "Experiences", "A practice space for noticing skills getting stronger through repetition.", "experience", "full"],
  ["experience-gates", "Gates", "Experiences", "Self-chosen friction made visible as adjustable environment infrastructure.", "experience", "full"],
  ["experience-future-self", "Future self", "Experiences", "An identity-oriented view of direction, values, and the person the user is becoming.", "experience", "full"],
  ["experience-reserve", "Reserve", "Experiences", "A two-second gesture for noticing today's capacity without filling out a form.", "experience", "full"],
  ["experience-the-instrument", "The instrument", "Experiences", "A clinically precise report that earns trust through transparent uncertainty and methodology.", "experience", "full"],
  ["signals-one-the-rebound", "The Rebound", "Signals · set one", "How quickly you return to baseline after a hard day — recovery speed, not the fall itself.", "metric", "bare"],
  ["signals-one-body-barometer", "Body Barometer", "Signals · set one", "Where in the body urges tend to land — the felt-sense signal that arrives before the thought.", "metric", "bare"],
  ["signals-one-the-tell", "The Tell", "Signals · set one", "Your single earliest warning sign, and how much lead time it gives you before a hard moment.", "metric", "bare"],
  ["signals-one-feeling-vocabulary", "Feeling Vocabulary", "Signals · set one", "How many distinct emotions you can name over time — granularity as a trainable, protective skill.", "metric", "bare"],
  ["signals-one-the-keystone", "The Keystone", "Signals · set one", "The single behaviour that co-occurs with your best days — framed as a lever, not a cause.", "metric", "bare"],
  ["signals-one-if-then-plan", "If-Then Plan", "Signals · set one", "Pre-committed “if this, then that” moves for your real triggers — the plan you wish you had at 11pm.", "structure", "bare"],
  ["signals-one-the-loop", "The Loop", "Signals · set one", "Your personal maintaining-cycle, drawn from your own data — the ABC formulation a clinician would sketch, made yours.", "structure", "bare"],
  ["signals-one-early-warning-ladder", "Early-Warning Ladder", "Signals · set one", "Your own warning signs mapped calm→crisis, each rung paired with a pre-planned move you act on early.", "structure", "bare"],
  ["signals-two-craving-capacity", "Craving vs. Capacity", "Signals · set two", "Your urges plotted against your resources — lapses cluster where demand outruns capacity, not at any fixed urge level.", "metric", "bare"],
  ["signals-two-trigger-beatability", "Trigger Beatability", "Signals · set two", "Each of your triggers scored by how often you beat it — the same map, reframed from threat to track record.", "metric", "bare"],
  ["signals-two-the-projection", "The Projection", "Signals · set two", "Your validated-measure trend, extended forward to when it would cross into a typical healthy range.", "metric", "bare"],
  ["signals-two-quiet-wins", "Quiet Wins", "Signals · set two", "A count of urges ridden out that leave no trace — making the effort you never notice visible and yours.", "metric", "bare"],
  ["signals-two-behavioral-experiment", "Behavioral Experiment", "Signals · set two", "A weekly self-experiment — prediction, then result — that trains the scientific stance instead of taking urges at their word.", "structure", "bare"],
  ["signals-two-craving-decoder", "Craving Decoder", "Signals · set two", "A structure that walks a surface urge down to the real need beneath it, and out to a move that meets that need.", "structure", "bare"],
  ["signals-two-values-compass", "Values Compass", "Signals · set two", "Your ranked values as a compass, with a needle for the direction today's actions actually pointed — orientation, not a grade.", "structure", "bare"],
  ["signals-two-self-compassion-charter", "Self-Compassion Charter", "Signals · set two", "A short charter of the user's own compassionate reminders — a direct counter to the shame spiral that turns a lapse into a collapse.", "structure", "bare"],
  ["newest-peak-self", "Peak Self", "Newest eight", "When you're most resourced and resilient — the strong window, not the danger one.", "metric", "bare"],
  ["newest-connection-dividend", "Connection Dividend", "Newest eight", "How much reaching one person lowers your worst urge — social contact as a measurable buffer.", "metric", "bare"],
  ["newest-the-turnaround", "The Turnaround", "Newest eight", "The specific day your trajectory changed direction — your inflection point, found for you.", "metric", "bare"],
  ["newest-reclaimed-time", "Reclaimed Time", "Newest eight", "Hours returned to your life, framed as a gain that compounds — never as shame about the past.", "metric", "bare"],
  ["newest-trigger-coping-matchup", "Trigger–Coping Matchup", "Newest eight", "A personalised playbook pairing each trigger with the coping move that beats it most often.", "structure", "bare"],
  ["newest-values-to-action-bridge", "Values-to-Action Bridge", "Newest eight", "Turns a chosen value into a single committed action for the week — the ACT move made concrete.", "structure", "bare"],
  ["newest-recovery-roadmap", "Recovery Roadmap", "Newest eight", "An orienting map of the journey with where you are now and what typically comes next.", "structure", "bare"],
  ["newest-decision-fork", "Decision Fork", "Newest eight", "The moment of choice mapped as two diverging roads and where each leads — insight you can feel.", "structure", "bare"],
] as const satisfies readonly ConceptSeed[];

export const CONCEPTS: readonly Concept[] = CONCEPT_SEEDS.map(
  ([id, title, collection, description, kind, presentation], templateIndex) => ({
    id,
    title,
    collection,
    description,
    kind,
    presentation,
    templateIndex,
  }),
);

const conceptById = new Map(CONCEPTS.map((concept) => [concept.id, concept]));
const conceptIndexById = new Map(
  CONCEPTS.map((concept, index) => [concept.id, index]),
);

export function getConcept(conceptId: string): Concept | undefined {
  return conceptById.get(conceptId);
}

export function getConceptIndex(conceptId: string): number {
  return conceptIndexById.get(conceptId) ?? -1;
}

export const COLLECTIONS: readonly string[] = Array.from(
  new Set(CONCEPTS.map((concept) => concept.collection)),
);

export type ConceptCollectionGroup = {
  collection: string;
  concepts: readonly Concept[];
};

/** Pre-grouped for gallery navigation — computed once at module load. */
export const CONCEPTS_BY_COLLECTION: readonly ConceptCollectionGroup[] =
  COLLECTIONS.map((collection) => ({
    collection,
    concepts: CONCEPTS.filter((concept) => concept.collection === collection),
  }));

export const KIND_LABELS: Record<ConceptKind, string> = {
  metric: "Wow value",
  structure: "Wow structure",
  experience: "Experience",
};

export function templateFilename(templateIndex: number): string {
  return `concept-${String(templateIndex).padStart(2, "0")}.html`;
}
