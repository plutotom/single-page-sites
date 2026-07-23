"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

export type PillLayoutVariant =
  | "baseline"
  | "inline-more"
  | "fade-reveal"
  | "bottom-sheet"
  | "scroll-row"
  | "list-rows"
  | "category-tabs"
  | "recent-sheet";

const variantMeta: {
  id: PillLayoutVariant;
  label: string;
  note: string;
}[] = [
  {
    id: "baseline",
    label: "Baseline",
    note: "Wrap + detached More link — current app pattern.",
  },
  {
    id: "inline-more",
    label: "Inline +N",
    note: "Overflow lives inside the pill row as a chip.",
  },
  {
    id: "fade-reveal",
    label: "Fade reveal",
    note: "Two rows max, gradient hints at more below.",
  },
  {
    id: "bottom-sheet",
    label: "Sheet",
    note: "Few quick picks; full list in a native-feeling sheet.",
  },
  {
    id: "scroll-row",
    label: "Scroll row",
    note: "One swipeable row per section — saves vertical space.",
  },
  {
    id: "list-rows",
    label: "List rows",
    note: "Full-width tappable rows — one option per line, easy to scan.",
  },
  {
    id: "category-tabs",
    label: "Categories",
    note: "Tabbed groups shrink each glance to a few pills.",
  },
  {
    id: "recent-sheet",
    label: "Recent + sheet",
    note: "Recently used up front; everything else in a sheet.",
  },
];

const companionOptions = [
  "Alone",
  "Friends",
  "Family",
  "Spouse",
  "Kids",
  "Pets",
  "Coworkers",
] as const;

const activityOptions = [
  "Working",
  "Studying",
  "Scrolling social media",
  "Browsing internet",
  "Watching TV / movies",
  "Gaming",
  "Listening to music",
  "In bed / lying down",
  "Eating",
  "Commuting",
  "Exercising",
  "Cooking",
] as const;

type OptionCategory = {
  id: string;
  label: string;
  options: readonly string[];
};

const companionCategories: OptionCategory[] = [
  { id: "solo", label: "Solo", options: ["Alone"] },
  {
    id: "together",
    label: "Together",
    options: ["Friends", "Family", "Spouse", "Kids", "Coworkers"],
  },
  { id: "other", label: "Other", options: ["Pets"] },
];

const activityCategories: OptionCategory[] = [
  { id: "work", label: "Work", options: ["Working", "Studying"] },
  {
    id: "screens",
    label: "Screens",
    options: [
      "Scrolling social media",
      "Browsing internet",
      "Watching TV / movies",
      "Gaming",
    ],
  },
  {
    id: "rest",
    label: "Rest",
    options: ["In bed / lying down", "Eating", "Listening to music"],
  },
  {
    id: "active",
    label: "Active",
    options: ["Commuting", "Exercising", "Cooking"],
  },
];

const companionRecents = ["Friends", "Alone", "Family"] as const;
const activityRecents = ["Working", "Listening to music", "In bed / lying down"] as const;

function categoriesForSection(title: string): OptionCategory[] | null {
  if (title.includes("with")) return companionCategories;
  if (title.includes("doing")) return activityCategories;
  return null;
}

function recentsForSection(title: string): readonly string[] {
  if (title.includes("with")) return companionRecents;
  if (title.includes("doing")) return activityRecents;
  return [];
}

type PillSectionProps = {
  variant: PillLayoutVariant;
  title: string;
  subtitle?: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  onStartCreate?: () => void;
  isCreating?: boolean;
  collapsedLimit?: number;
};

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function PillButton({
  label,
  selected,
  onClick,
  className = "",
  ariaLabel,
  style,
}: Readonly<{
  label: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      aria-pressed={selected}
      style={style}
      className={`component-playground-pill shrink-0 ${
        selected ? "component-playground-pill-selected" : ""
      } ${className}`}
    >
      {label}
    </button>
  );
}

function AddPillButton({
  active,
  onClick,
}: Readonly<{ active?: boolean; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add custom option"
      className={`component-playground-pill component-playground-pill-add shrink-0 ${
        active ? "component-playground-pill-active" : ""
      }`}
    >
      <span aria-hidden="true" className="text-base leading-none">
        +
      </span>
    </button>
  );
}

function BaselineSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
  collapsedLimit = 8,
}: PillSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, options.length - collapsedLimit);
  const visible = expanded ? options : options.slice(0, collapsedLimit);

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="pill-explorer-pill-row">
        {onStartCreate ? <AddPillButton active={isCreating} onClick={onStartCreate} /> : null}
        {visible.map((option) => (
          <PillButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
      {hiddenCount > 0 && !expanded ? (
        <button
          type="button"
          className="component-playground-more-link pill-explorer-more-baseline"
          onClick={() => setExpanded(true)}
        >
          More
          <span aria-hidden="true" className="ml-1">
            v
          </span>
        </button>
      ) : null}
      {expanded && hiddenCount > 0 ? (
        <button
          type="button"
          className="component-playground-more-link pill-explorer-more-baseline"
          onClick={() => setExpanded(false)}
        >
          Less
          <span aria-hidden="true" className="ml-1">
            ^
          </span>
        </button>
      ) : null}
    </section>
  );
}

function InlineMoreSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
  collapsedLimit = 6,
}: PillSectionProps) {
  const collapseTimerRef = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [renderOverflow, setRenderOverflow] = useState(false);

  const collapsedOptions = options.slice(0, collapsedLimit);
  const overflowOptions = options.slice(collapsedLimit);
  const hiddenCount = overflowOptions.length;

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
      }
    };
  }, []);

  const handleExpand = () => {
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setRenderOverflow(true);
    requestAnimationFrame(() => setExpanded(true));
  };

  const handleCollapse = () => {
    setExpanded(false);

    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
    }
    collapseTimerRef.current = window.setTimeout(() => {
      setRenderOverflow(false);
      collapseTimerRef.current = null;
    }, 220);
  };

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className={`pill-explorer-pill-row pill-explorer-inline-expand ${
          expanded ? "pill-explorer-inline-expand-open" : ""
        }`}
      >
        {onStartCreate ? <AddPillButton active={isCreating} onClick={onStartCreate} /> : null}
        {collapsedOptions.map((option) => (
          <PillButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
        {renderOverflow
          ? overflowOptions.map((option) => (
              <PillButton
                key={option}
                label={option}
                selected={selected.includes(option)}
                onClick={() => onToggle(option)}
                className="pill-explorer-inline-reveal-pill"
              />
            ))
          : null}
        {hiddenCount > 0 ? (
          <button
            type="button"
            onClick={renderOverflow ? handleCollapse : handleExpand}
            className="component-playground-pill pill-explorer-overflow-pill shrink-0"
            aria-label={
              renderOverflow
                ? "Show fewer options"
                : `Show ${hiddenCount} more options`
            }
            aria-expanded={renderOverflow}
          >
            <span
              key={renderOverflow ? "less" : "more"}
              className="pill-explorer-overflow-label"
            >
              {renderOverflow ? "Show less" : `+${hiddenCount} more`}
            </span>
          </button>
        ) : null}
      </div>
    </section>
  );
}

function FadeRevealSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
}: PillSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className={`pill-explorer-fade-shell ${
          expanded ? "pill-explorer-fade-shell-open" : ""
        }`}
      >
        <div
          id={contentId}
          className={`pill-explorer-fade-body ${
            expanded ? "pill-explorer-fade-body-open" : ""
          }`}
        >
          <div className="pill-explorer-pill-row">
            {onStartCreate ? (
              <AddPillButton active={isCreating} onClick={onStartCreate} />
            ) : null}
            {options.map((option) => (
              <PillButton
                key={option}
                label={option}
                selected={selected.includes(option)}
                onClick={() => onToggle(option)}
              />
            ))}
          </div>
        </div>
        {!expanded ? (
          <button
            type="button"
            className="pill-explorer-fade-trigger"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded(true)}
          >
            <span>Show all</span>
            <span aria-hidden="true">v</span>
          </button>
        ) : (
          <button
            type="button"
            className="pill-explorer-fade-trigger pill-explorer-fade-trigger-collapse"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded(false)}
          >
            <span>Show less</span>
            <span aria-hidden="true">^</span>
          </button>
        )}
      </div>
    </section>
  );
}

function OptionsSheet({
  open,
  onClose,
  sheetId,
  title,
  subtitle,
  options,
  selected,
  onToggle,
}: Readonly<{
  open: boolean;
  onClose: () => void;
  sheetId: string;
  title: string;
  subtitle: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}>) {
  if (!open) return null;

  return (
    <OptionsSheetPanel
      onClose={onClose}
      sheetId={sheetId}
      title={title}
      subtitle={subtitle}
      options={options}
      selected={selected}
      onToggle={onToggle}
    />
  );
}

function OptionsSheetPanel({
  onClose,
  sheetId,
  title,
  subtitle,
  options,
  selected,
  onToggle,
}: Readonly<{
  onClose: () => void;
  sheetId: string;
  title: string;
  subtitle: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}>) {
  const [query, setQuery] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filtered = query.trim()
    ? options.filter((option) =>
        option.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : options;

  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="pill-explorer-sheet-root" role="presentation">
      <button
        type="button"
        className="pill-explorer-sheet-backdrop"
        aria-label="Close options"
        onClick={onClose}
      />
      <div
        id={sheetId}
        role="dialog"
        aria-modal="true"
        aria-label={`All options for ${title}`}
        className="pill-explorer-sheet-panel"
      >
        <div className="pill-explorer-sheet-handle" aria-hidden="true" />
        <div className="pill-explorer-sheet-header">
          <div>
            <p className="pill-explorer-sheet-eyebrow">{subtitle}</p>
            <h3 className="pill-explorer-sheet-title">{title}</h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="pill-explorer-sheet-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search options"
          className="pill-explorer-sheet-search"
          aria-label="Search options"
        />
        <div className="pill-explorer-sheet-pills">
          {filtered.map((option) => (
            <PillButton
              key={option}
              label={option}
              selected={selected.includes(option)}
              onClick={() => onToggle(option)}
            />
          ))}
          {filtered.length === 0 ? (
            <p className="pill-explorer-sheet-empty">No matches for “{query}”.</p>
          ) : null}
        </div>
        <button type="button" className="pill-explorer-sheet-done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

function BottomSheetSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
  collapsedLimit = 5,
}: PillSectionProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetId = useId();

  const quickOptions = options.slice(0, collapsedLimit);

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="pill-explorer-pill-row">
        {onStartCreate ? <AddPillButton active={isCreating} onClick={onStartCreate} /> : null}
        {quickOptions.map((option) => (
          <PillButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
        {selected
          .filter((item) => !quickOptions.includes(item))
          .map((option) => (
            <PillButton
              key={`selected-${option}`}
              label={option}
              selected
              onClick={() => onToggle(option)}
            />
          ))}
      </div>
      {options.length > collapsedLimit ? (
        <button
          type="button"
          className="pill-explorer-sheet-trigger"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          aria-controls={sheetId}
          onClick={() => setSheetOpen(true)}
        >
          Browse all {options.length} options
          <span aria-hidden="true">→</span>
        </button>
      ) : null}

      <OptionsSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sheetId={sheetId}
        title={title}
        subtitle={subtitle}
        options={options}
        selected={selected}
        onToggle={onToggle}
      />
    </section>
  );
}

function ListRowSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
}: PillSectionProps) {
  const listId = useId();

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div id={listId} className="pill-explorer-list" role="group" aria-label={title}>
        {onStartCreate ? (
          <button
            type="button"
            onClick={onStartCreate}
            className={`pill-explorer-list-row pill-explorer-list-row-add ${
              isCreating ? "pill-explorer-list-row-active" : ""
            }`}
          >
            <span>Add custom option</span>
            <span className="pill-explorer-list-add-icon" aria-hidden="true">
              +
            </span>
          </button>
        ) : null}
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={isSelected}
              className={`pill-explorer-list-row ${
                isSelected ? "pill-explorer-list-row-selected" : ""
              }`}
            >
              <span className="pill-explorer-list-label">{option}</span>
              <span
                className={`pill-explorer-list-check ${
                  isSelected ? "pill-explorer-list-check-on" : ""
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CategoryTabsSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
}: PillSectionProps) {
  const categories = categoriesForSection(title) ?? [
    { id: "all", label: "All", options },
  ];
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "all");
  const tablistId = useId();

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  const selectedOutsideActive = selected.filter(
    (item) => !activeCategory.options.includes(item),
  );

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className="pill-explorer-category-tabs"
        role="tablist"
        id={tablistId}
        aria-label={`${title} categories`}
      >
        {categories.map((category) => {
          const categorySelectedCount = selected.filter((item) =>
            category.options.includes(item),
          ).length;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategoryId === category.id}
              aria-controls={`${tablistId}-${category.id}-panel`}
              className={`pill-explorer-category-tab ${
                activeCategoryId === category.id
                  ? "pill-explorer-category-tab-active"
                  : ""
              }`}
              onClick={() => setActiveCategoryId(category.id)}
            >
              {category.label}
              {categorySelectedCount > 0 ? (
                <span className="pill-explorer-category-badge">{categorySelectedCount}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div
        id={`${tablistId}-${activeCategory.id}-panel`}
        role="tabpanel"
        className="pill-explorer-pill-row pill-explorer-category-panel"
      >
        {onStartCreate ? <AddPillButton active={isCreating} onClick={onStartCreate} /> : null}
        {activeCategory.options.map((option) => (
          <PillButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
      {selectedOutsideActive.length > 0 ? (
        <div className="pill-explorer-category-selected-elsewhere">
          <p className="pill-explorer-category-selected-label">Also selected</p>
          <div className="pill-explorer-pill-row">
            {selectedOutsideActive.map((option) => (
              <PillButton
                key={`elsewhere-${option}`}
                label={option}
                selected
                onClick={() => onToggle(option)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function RecentSheetSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
}: PillSectionProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetId = useId();
  const recents = recentsForSection(title);

  const selectedNotRecent = selected.filter((item) => !recents.includes(item));

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <p className="pill-explorer-recent-label">Recently used</p>
      <div className="pill-explorer-pill-row">
        {onStartCreate ? <AddPillButton active={isCreating} onClick={onStartCreate} /> : null}
        {recents.map((option) => (
          <PillButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
        {selectedNotRecent.map((option) => (
          <PillButton
            key={`picked-${option}`}
            label={option}
            selected
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
      <button
        type="button"
        className="pill-explorer-sheet-trigger"
        aria-haspopup="dialog"
        aria-expanded={sheetOpen}
        aria-controls={sheetId}
        onClick={() => setSheetOpen(true)}
      >
        Browse all {options.length} options
        <span aria-hidden="true">→</span>
      </button>

      <OptionsSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sheetId={sheetId}
        title={title}
        subtitle={subtitle}
        options={options}
        selected={selected}
        onToggle={onToggle}
      />
    </section>
  );
}

function ScrollRowSection({
  title,
  subtitle = "Select all that apply",
  options,
  selected,
  onToggle,
  onStartCreate,
  isCreating,
}: PillSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <section className="pill-explorer-section">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="pill-explorer-pill-row">
          {onStartCreate ? (
            <AddPillButton active={isCreating} onClick={onStartCreate} />
          ) : null}
          {options.map((option) => (
            <PillButton
              key={option}
              label={option}
              selected={selected.includes(option)}
              onClick={() => onToggle(option)}
            />
          ))}
        </div>
        <button
          type="button"
          className="pill-explorer-scroll-collapse"
          onClick={() => setExpanded(false)}
        >
          Collapse to row
          <span aria-hidden="true">^</span>
        </button>
      </section>
    );
  }

  return (
    <section className="pill-explorer-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="pill-explorer-scroll-shell">
        <div className="pill-explorer-scroll-track" role="list">
          {onStartCreate ? (
            <div role="listitem">
              <AddPillButton active={isCreating} onClick={onStartCreate} />
            </div>
          ) : null}
          {options.map((option) => (
            <div key={option} role="listitem">
              <PillButton
                label={option}
                selected={selected.includes(option)}
                onClick={() => onToggle(option)}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="pill-explorer-scroll-expand"
          onClick={() => setExpanded(true)}
          aria-label="Expand to show all options"
        >
          <span aria-hidden="true">···</span>
        </button>
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
}: Readonly<{ title: string; subtitle: string }>) {
  return (
    <header className="pill-explorer-section-header">
      <h3 className="pill-explorer-section-title">{title}</h3>
      <p className="pill-explorer-section-subtitle">{subtitle}</p>
    </header>
  );
}

function renderSection(variant: PillLayoutVariant, props: PillSectionProps) {
  switch (variant) {
    case "baseline":
      return <BaselineSection {...props} />;
    case "inline-more":
      return <InlineMoreSection {...props} collapsedLimit={6} />;
    case "fade-reveal":
      return <FadeRevealSection {...props} />;
    case "bottom-sheet":
      return <BottomSheetSection {...props} collapsedLimit={5} />;
    case "scroll-row":
      return <ScrollRowSection {...props} />;
    case "list-rows":
      return <ListRowSection {...props} />;
    case "category-tabs":
      return <CategoryTabsSection {...props} />;
    case "recent-sheet":
      return <RecentSheetSection {...props} />;
    default:
      return <BaselineSection {...props} />;
  }
}

export function PillLayoutExplorer() {
  const [variant, setVariant] = useState<PillLayoutVariant>("inline-more");
  const [companionSelected, setCompanionSelected] = useState<string[]>([]);
  const [activitySelected, setActivitySelected] = useState<string[]>([]);

  const activeMeta = variantMeta.find((item) => item.id === variant)!;

  const sectionProps = {
    variant,
    onStartCreate: () => undefined,
    isCreating: false,
  };

  return (
    <div className="pill-explorer-root mt-6 w-full min-w-0 text-left">
      <p className="pill-explorer-kicker">Layout exploration</p>

      <div
        className="pill-explorer-variant-strip"
        role="tablist"
        aria-label="Pill layout variants"
      >
        {variantMeta.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={variant === item.id}
            className={`pill-explorer-variant-tab ${
              variant === item.id ? "pill-explorer-variant-tab-active" : ""
            }`}
            onClick={() => setVariant(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="pill-explorer-variant-note">{activeMeta.note}</p>

      <div className="pill-explorer-stack" key={variant}>
        {renderSection(variant, {
          ...sectionProps,
          title: "Who are you with?",
          options: companionOptions,
          selected: companionSelected,
          onToggle: (value) =>
            setCompanionSelected((current) => toggleInList(current, value)),
          collapsedLimit: 8,
        })}
        {renderSection(variant, {
          ...sectionProps,
          title: "What are you doing?",
          options: activityOptions,
          selected: activitySelected,
          onToggle: (value) =>
            setActivitySelected((current) => toggleInList(current, value)),
          collapsedLimit: 8,
        })}
      </div>
    </div>
  );
}
