"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";

const accentOptions = [
  {
    name: "Mint",
    value: "#92cbb8",
    strong: "#b6e5d4",
    soft: "rgba(146, 203, 184, 0.18)",
  },
  {
    name: "Sage",
    value: "#a7b99b",
    strong: "#d2dec3",
    soft: "rgba(167, 185, 155, 0.18)",
  },
  {
    name: "Sand",
    value: "#d1b58a",
    strong: "#ead3aa",
    soft: "rgba(209, 181, 138, 0.18)",
  },
] as const;

const formPages = [
  {
    id: "mood",
    eyebrow: "Check-in 01",
    question: "What are you doing?",
    helper: "Pill + create-new input",
  },
  {
    id: "rest",
    eyebrow: "Check-in 02",
    question: "How well rested did you feel today?",
    helper: "Future input: calm slider scale",
  },
  {
    id: "focus",
    eyebrow: "Check-in 03",
    question: "What pulled most of your attention?",
    helper: "Future input: single-choice reflection",
  },
  {
    id: "intention",
    eyebrow: "Check-in 04",
    question: "What do you want to practice next?",
    helper: "Future input: guided intention picker",
  },
  {
    id: "emotions",
    eyebrow: "Check-in 05",
    question: "Which emotions showed up today?",
    helper: "Future input: stacked multi-select cards",
  },
  {
    id: "journal",
    eyebrow: "Check-in 06",
    question: "Want to add notes?",
    helper: "Future input: text box + speech mic",
  },
  {
    id: "glass",
    eyebrow: "Check-in 07",
    question: "How are you feeling right now?",
    helper: "Future input: drag glass fill",
  },
] as const;

const emotionOptions = [
  {
    id: "anger",
    title: "Anger",
    description: "A strong feeling of displeasure or hostility.",
  },
  {
    id: "fear",
    title: "Fear",
    description: "An unpleasant emotion caused by threat or danger.",
  },
  {
    id: "tension",
    title: "Tension",
    description: "Emotional strain or stress.",
  },
  {
    id: "rage",
    title: "Rage",
    description: "Violent, hard-to-control anger.",
  },
  {
    id: "shock",
    title: "Shock",
    description: "A sudden upsetting or surprising disturbance.",
  },
  {
    id: "wrath",
    title: "Wrath",
    description: "Intense, sustained anger aimed at someone or something.",
  },
] as const;

type Accent = (typeof accentOptions)[number];
type PlaygroundStyle = CSSProperties & {
  "--cp-accent": string;
  "--cp-accent-strong": string;
  "--cp-accent-soft": string;
};

export default function ComponentPlaygroundPage() {
  const [accent, setAccent] = useState<Accent>(accentOptions[0]);
  const [pageIndex, setPageIndex] = useState(0);
  const [activityPills, setActivityPills] = useState([
    "Hanging Out",
    "School work",
    "Work",
    "Lifting",
    "Driving",
    "Resting",
    "Coding work",
    "Hobbies",
    "Fitness",
  ]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [newActivityLabel, setNewActivityLabel] = useState("");
  const [sliderA, setSliderA] = useState(3);
  const [sliderB, setSliderB] = useState(5);
  const [sliderC, setSliderC] = useState(6);
  const [sliderD, setSliderD] = useState(4);
  const [sliderE, setSliderE] = useState(5);
  const [sliderF, setSliderF] = useState(3);
  const [sliderG, setSliderG] = useState(3);
  const [sliderH, setSliderH] = useState(7);
  const [sliderI, setSliderI] = useState(4);
  const [sliderJ, setSliderJ] = useState(6);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [journalText, setJournalText] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);
  const [glassLevel, setGlassLevel] = useState(58);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split("T")[0] ?? "";
  });
  const [selectedTime, setSelectedTime] = useState("19:30");

  const currentPage = formPages[pageIndex];
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === formPages.length - 1;

  const playgroundStyle: PlaygroundStyle = {
    "--cp-accent": accent.value,
    "--cp-accent-strong": accent.strong,
    "--cp-accent-soft": accent.soft,
  };

  return (
    <main style={playgroundStyle}>
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] bg-black sm:items-center sm:justify-center sm:p-4">
        <section className="component-playground-phone relative flex w-full flex-col overflow-hidden sm:rounded-[2.2rem]">
          <StatusBar />

          <header className="flex items-center justify-between border-b border-(--cp-line) bg-(--cp-bg-deep)/80 px-5 py-4 backdrop-blur-xl">
            <Link
              href="/"
              className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--cp-muted)"
            >
              Home
            </Link>
            <h1 className="text-lg font-extrabold tracking-[-0.02em] text-(--cp-cream)">
              Test Form
            </h1>
            <button
              type="button"
              className="component-playground-raised grid h-10 w-10 place-items-center rounded-full border border-(--cp-line-strong) text-(--cp-muted)"
              aria-label="Close test form"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="flex flex-1 flex-col px-5 pb-7 pt-5">
            <ControlRow label="Accent">
              {accentOptions.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setAccent(item)}
                  className={`h-9 rounded-full px-3 text-xs font-extrabold transition ${
                    item.name === accent.name
                      ? "text-(--cp-bg-deep)"
                      : "border border-(--cp-line-strong) text-(--cp-muted)"
                  }`}
                  style={{
                    background:
                      item.name === accent.name
                        ? item.strong
                        : "rgba(255, 255, 255, 0.025)",
                  }}
                >
                  {item.name}
                </button>
              ))}
            </ControlRow>

            <section
              key={currentPage.id}
              className="component-playground-form-page flex flex-1 flex-col"
              aria-labelledby="test-form-question"
            >
              <div className="flex items-center justify-between pt-8">
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--cp-muted-soft)">
                  {currentPage.eyebrow}
                </p>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-(--cp-muted-soft)">
                  {pageIndex + 1}/{formPages.length}
                </p>
              </div>

              <div className="flex flex-1 flex-col justify-center pb-20 text-center">
                <p className="mx-auto mb-8 max-w-64 text-[0.82rem] font-extrabold uppercase tracking-[0.18em] text-(--cp-accent-strong)">
                  Test progression only
                </p>
                <h2
                  id="test-form-question"
                  className="mx-auto max-w-80 text-[2.25rem] font-extrabold leading-[1.06] tracking-[-0.07em] text-(--cp-cream)"
                >
                  {currentPage.question}
                </h2>
                {currentPage.id === "mood" ? (
                  <PillCreateInput
                    options={activityPills}
                    selected={selectedActivity}
                    isCreating={isCreatingActivity}
                    newValue={newActivityLabel}
                    onSelect={(value) => {
                      setSelectedActivity(value);
                      setIsCreatingActivity(false);
                    }}
                    onStartCreate={() => {
                      setSelectedActivity(null);
                      setIsCreatingActivity(true);
                    }}
                    onCreateChange={setNewActivityLabel}
                    onCreateSubmit={() => {
                      const normalized = newActivityLabel.trim();
                      if (!normalized) return;
                      const alreadyExists = activityPills.some(
                        (item) => item.toLowerCase() === normalized.toLowerCase(),
                      );
                      if (!alreadyExists) {
                        setActivityPills((existing) => [...existing, normalized]);
                      }
                      setSelectedActivity(normalized);
                      setNewActivityLabel("");
                      setIsCreatingActivity(false);
                    }}
                    onCancelCreate={() => {
                      setNewActivityLabel("");
                      setIsCreatingActivity(false);
                    }}
                  />
                ) : currentPage.id === "rest" ? (
                  <SliderShowcase
                    sliderA={sliderA}
                    sliderB={sliderB}
                    sliderC={sliderC}
                    sliderD={sliderD}
                    sliderE={sliderE}
                    sliderF={sliderF}
                    sliderG={sliderG}
                    sliderH={sliderH}
                    sliderI={sliderI}
                    sliderJ={sliderJ}
                    onSliderAChange={setSliderA}
                    onSliderBChange={setSliderB}
                    onSliderCChange={setSliderC}
                    onSliderDChange={setSliderD}
                    onSliderEChange={setSliderE}
                    onSliderFChange={setSliderF}
                    onSliderGChange={setSliderG}
                    onSliderHChange={setSliderH}
                    onSliderIChange={setSliderI}
                    onSliderJChange={setSliderJ}
                  />
                ) : currentPage.id === "focus" ? (
                  <DateTimeQuickPicker
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                  />
                ) : currentPage.id === "emotions" ? (
                  <EmotionCardMultiSelect
                    items={emotionOptions}
                    selectedIds={selectedEmotions}
                    onToggle={(id) =>
                      setSelectedEmotions((current) =>
                        current.includes(id)
                          ? current.filter((itemId) => itemId !== id)
                          : [...current, id],
                      )
                    }
                  />
                ) : currentPage.id === "journal" ? (
                  <VoiceJournalInput
                    value={journalText}
                    onChange={setJournalText}
                    isMicActive={isMicActive}
                    onMicToggle={() => setIsMicActive((current) => !current)}
                  />
                ) : currentPage.id === "glass" ? (
                  <GlassFillInput level={glassLevel} onLevelChange={setGlassLevel} />
                ) : (
                  <div className="mx-auto mt-12 w-full max-w-72 rounded-[1.7rem] border border-dashed border-(--cp-line-strong) bg-(--cp-card)/62 p-5">
                    <p className="text-sm font-extrabold leading-6 text-(--cp-muted)">
                      {currentPage.helper}
                    </p>
                    <p className="mt-2 text-xs font-bold leading-5 text-(--cp-muted-soft)">
                      Placeholder only. No input is wired up yet.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <footer className="grid gap-5">
              <ProgressDots currentIndex={pageIndex} />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPageIndex((index) => Math.max(index - 1, 0))}
                  disabled={isFirstPage}
                  className="component-playground-nav-button grid h-14 w-14 place-items-center rounded-full border border-(--cp-line-strong) text-(--cp-cream) transition disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Go to previous question"
                >
                  <ArrowIcon direction="left" />
                </button>

                <button
                  type="button"
                  className="text-sm font-extrabold text-(--cp-muted)"
                >
                  {isLastPage ? "Finish later" : "Skip"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPageIndex((index) =>
                      Math.min(index + 1, formPages.length - 1),
                    )
                  }
                  disabled={isLastPage}
                  className="component-playground-nav-button component-playground-nav-button-primary grid h-16 w-16 place-items-center rounded-full text-(--cp-bg-deep) transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Go to next question"
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function DateTimeQuickPicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: Readonly<{
  selectedDate: string;
  selectedTime: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}>) {
  const [wheelDayOffset, setWheelDayOffset] = useState(0);
  const [wheelHour, setWheelHour] = useState(7);
  const [wheelMinute, setWheelMinute] = useState("30");

  const dayStrip = [
    { label: "Yesterday", value: dayOffsetIso(-1) },
    { label: "Today", value: dayOffsetIso(0) },
    { label: "Tomorrow", value: dayOffsetIso(1) },
    { label: "Tue", value: dayOffsetIso(2) },
    { label: "Wed", value: dayOffsetIso(3) },
    { label: "Thu", value: dayOffsetIso(4) },
    { label: "Fri", value: dayOffsetIso(5) },
  ];

  const timelineSlots = [
    { label: "7:00a", value: "07:00" },
    { label: "8:00a", value: "08:00" },
    { label: "9:00a", value: "09:00" },
    { label: "12:00p", value: "12:00" },
    { label: "3:00p", value: "15:00" },
    { label: "6:00p", value: "18:00" },
    { label: "9:00p", value: "21:00" },
  ];

  const wheelDays = [0, 1, 2, 3, 4, 5, 6];
  const wheelHours = [6, 7, 8, 9, 10, 11, 12];
  const wheelMinutes = ["00", "15", "30", "45"];

  const wheelDateIso = dayOffsetIso(wheelDayOffset);
  const wheelTime = `${String(wheelHour).padStart(2, "0")}:${wheelMinute}`;

  const applyWheelToMain = () => {
    onDateChange(wheelDateIso);
    onTimeChange(wheelTime);
  };

  return (
    <section className="component-playground-datetime-wrap mx-auto mt-10 grid w-full max-w-92 gap-4 text-left">
      <div className="component-playground-datetime-card component-playground-datetime-card-alt">
        <p className="component-playground-datetime-title">
          1) Day strip + timeline blocks
        </p>
        <p className="component-playground-datetime-subtitle">
          Swipe-like strip for day, big blocks for time.
        </p>

        <div className="component-playground-day-strip">
          {dayStrip.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => onDateChange(day.value)}
              className={`component-playground-preset-chip ${
                selectedDate === day.value
                  ? "component-playground-preset-chip-active"
                  : ""
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        <div className="component-playground-timeline-grid">
          {timelineSlots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => onTimeChange(slot.value)}
              className={`component-playground-preset-chip ${
                selectedTime === slot.value
                  ? "component-playground-preset-chip-active"
                  : ""
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>

        <div className="component-playground-datetime-summary">
          <span>Selected</span>
          <strong>
            {formatDateHuman(selectedDate)} at {formatTimeHuman(selectedTime)}
          </strong>
        </div>
      </div>

      <div className="component-playground-datetime-card">
        <p className="component-playground-datetime-title">2) Slot-wheel picker</p>
        <p className="component-playground-datetime-subtitle">
          Three wheels. Tap choices. One-thumb fast.
        </p>

        <div className="component-playground-wheel-grid">
          <div className="component-playground-wheel-col">
            <p className="component-playground-input-label mt-0">Day</p>
            {wheelDays.map((offset) => (
              <button
                key={offset}
                type="button"
                onClick={() => setWheelDayOffset(offset)}
                className={`component-playground-wheel-chip ${
                  wheelDayOffset === offset ? "component-playground-wheel-chip-active" : ""
                }`}
              >
                {offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : `+${offset}d`}
              </button>
            ))}
          </div>

          <div className="component-playground-wheel-col">
            <p className="component-playground-input-label mt-0">Hour</p>
            {wheelHours.map((hour) => (
              <button
                key={hour}
                type="button"
                onClick={() => setWheelHour(hour)}
                className={`component-playground-wheel-chip ${
                  wheelHour === hour ? "component-playground-wheel-chip-active" : ""
                }`}
              >
                {formatHourLabel(hour)}
              </button>
            ))}
          </div>

          <div className="component-playground-wheel-col">
            <p className="component-playground-input-label mt-0">Min</p>
            {wheelMinutes.map((minute) => (
              <button
                key={minute}
                type="button"
                onClick={() => setWheelMinute(minute)}
                className={`component-playground-wheel-chip ${
                  wheelMinute === minute ? "component-playground-wheel-chip-active" : ""
                }`}
              >
                :{minute}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="component-playground-apply-button"
          onClick={applyWheelToMain}
        >
          Use {formatDateHuman(wheelDateIso)} at {formatTimeHuman(wheelTime)}
        </button>
      </div>
    </section>
  );
}

function dayOffsetIso(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0] ?? "";
}

function formatDateHuman(dateIso: string): string {
  if (!dateIso) return "No date";
  const date = new Date(`${dateIso}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTimeHuman(time24: string): string {
  if (!time24) return "No time";
  const [hourRaw = "0", minuteRaw = "0"] = time24.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatHourLabel(hour24: number): string {
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12} ${suffix}`;
}

function VoiceJournalInput({
  value,
  onChange,
  isMicActive,
  onMicToggle,
}: Readonly<{
  value: string;
  onChange: (value: string) => void;
  isMicActive: boolean;
  onMicToggle: () => void;
}>) {
  return (
    <section className="component-playground-voice-wrap mx-auto mt-10 w-full max-w-92 text-left">
      <div className="component-playground-voice-card">
        <label htmlFor="journal-input" className="component-playground-datetime-title">
          Voice + text journal
        </label>
        <p className="component-playground-datetime-subtitle">
          Type or tap mic for speech notes.
        </p>
        <textarea
          id="journal-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="What happened today?"
          className="component-playground-journal-input"
          rows={7}
        />

        <div className="component-playground-journal-footer">
          <span>{value.trim().length} chars</span>
          <span>{isMicActive ? "Listening..." : "Mic idle"}</span>
        </div>
      </div>

      <div className="component-playground-mic-dock">
        <button
          type="button"
          className={`component-playground-mic-button ${
            isMicActive ? "component-playground-mic-button-active" : ""
          }`}
          onClick={onMicToggle}
          aria-pressed={isMicActive}
          aria-label="Toggle speech to text"
        >
          <MicIcon />
        </button>
      </div>
    </section>
  );
}

function GlassFillInput({
  level,
  onLevelChange,
}: Readonly<{
  level: number;
  onLevelChange: (next: number) => void;
}>) {
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragStartLevel, setDragStartLevel] = useState(level);

  const clampLevel = (value: number) => Math.max(0, Math.min(100, value));

  const applyDrag = (currentY: number) => {
    if (dragStartY === null) return;
    const delta = dragStartY - currentY;
    const next = clampLevel(dragStartLevel + delta * 0.35);
    onLevelChange(Math.round(next));
  };

  const sceneStyle = {
    "--cp-glass-level": `${level}%`,
    "--cp-glass-bg-strength": `${0.16 + level * 0.0046}`,
  } as CSSProperties;

  return (
    <section
      style={sceneStyle}
      className="component-playground-glass-scene mx-auto mt-8 w-full max-w-92 text-center"
      onPointerMove={(event) => applyDrag(event.clientY)}
      onPointerUp={() => setDragStartY(null)}
      onPointerCancel={() => setDragStartY(null)}
      onWheel={(event) => {
        const next = clampLevel(level - event.deltaY * 0.05);
        onLevelChange(Math.round(next));
      }}
    >
      <p className="component-playground-glass-hint">Swipe up or down</p>

      <button
        type="button"
        className="component-playground-glass-wrap"
        onPointerDown={(event) => {
          setDragStartY(event.clientY);
          setDragStartLevel(level);
        }}
        onPointerUp={() => setDragStartY(null)}
        aria-label="Drag up or down to set fill level"
      >
        <span className="component-playground-glass-shape" aria-hidden="true">
          <span className="component-playground-glass-liquid" />
          <span className="component-playground-glass-glow" />
        </span>
      </button>

      <p className="component-playground-glass-readout">
        Feeling level: <strong>{level}%</strong>
      </p>
    </section>
  );
}

function EmotionCardMultiSelect({
  items,
  selectedIds,
  onToggle,
}: Readonly<{
  items: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
  }>;
  selectedIds: string[];
  onToggle: (id: string) => void;
}>) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  const visibleItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const base = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        if (!query) return true;
        const haystack = `${item.title} ${item.description}`.toLowerCase();
        return haystack.includes(query);
      });

    return [...base]
      .sort((a, b) => {
        const aSelected = selectedIds.includes(a.item.id) ? 1 : 0;
        const bSelected = selectedIds.includes(b.item.id) ? 1 : 0;
        if (aSelected !== bSelected) return bSelected - aSelected;
        return a.index - b.index;
      })
      .map(({ item }) => item);
  }, [items, searchTerm, selectedIds]);

  return (
    <section className="component-playground-emotion-wrap mx-auto mt-9 w-full max-w-92 text-left">
      <label className="component-playground-input-label mt-0" htmlFor="emotion-search-input">
        Search emotions
      </label>
      <input
        id="emotion-search-input"
        ref={searchRef}
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="component-playground-emotion-search"
        placeholder="Type to filter..."
      />

      <div className="component-playground-emotion-scroll">
        {visibleItems.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onToggle(item.id);
                setSearchTerm("");
                requestAnimationFrame(() => searchRef.current?.focus());
              }}
              className={`component-playground-emotion-card ${
                isSelected ? "component-playground-emotion-card-active" : ""
              }`}
              aria-pressed={isSelected}
            >
              <span className="component-playground-emotion-strip" aria-hidden="true" />
              <span className="component-playground-emotion-content">
                <span className="component-playground-emotion-title">{item.title}</span>
                <span className="component-playground-emotion-description">
                  {item.description}
                </span>
              </span>
              <span className="component-playground-emotion-check" aria-hidden="true">
                {isSelected ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
      <p className="component-playground-slider-subtitle mt-3 text-center">
        Selected: <strong>{selectedIds.length}</strong>
      </p>
    </section>
  );
}

function SliderShowcase({
  sliderA,
  sliderB,
  sliderC,
  sliderD,
  sliderE,
  sliderF,
  sliderG,
  sliderH,
  sliderI,
  sliderJ,
  onSliderAChange,
  onSliderBChange,
  onSliderCChange,
  onSliderDChange,
  onSliderEChange,
  onSliderFChange,
  onSliderGChange,
  onSliderHChange,
  onSliderIChange,
  onSliderJChange,
}: Readonly<{
  sliderA: number;
  sliderB: number;
  sliderC: number;
  sliderD: number;
  sliderE: number;
  sliderF: number;
  sliderG: number;
  sliderH: number;
  sliderI: number;
  sliderJ: number;
  onSliderAChange: (value: number) => void;
  onSliderBChange: (value: number) => void;
  onSliderCChange: (value: number) => void;
  onSliderDChange: (value: number) => void;
  onSliderEChange: (value: number) => void;
  onSliderFChange: (value: number) => void;
  onSliderGChange: (value: number) => void;
  onSliderHChange: (value: number) => void;
  onSliderIChange: (value: number) => void;
  onSliderJChange: (value: number) => void;
}>) {
  const marksB = [1, 2, 3, 4, 5, 6, 7];
  const marksC = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const segmentedSteps = [1, 2, 3, 4, 5];
  const ladderSteps = [1, 2, 3, 4, 5, 6, 7];
  const arcSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dialSteps = [1, 2, 3, 4, 5, 6, 7];
  const waveSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="mx-auto mt-10 grid w-full max-w-92 gap-4 text-left">
      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">1) Classic 1-5 mood</p>
        <div className="component-playground-slider-top-row">
          <span className="component-playground-slider-hint">Low</span>
          <span className="component-playground-slider-value">{sliderA}/5</span>
          <span className="component-playground-slider-hint">High</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={sliderA}
          onChange={(event) => onSliderAChange(Number(event.target.value))}
          className="component-playground-range"
          aria-label="Classic 1 to 5 slider"
        />
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">2) Stepped 1-7 sleep quality</p>
        <p className="component-playground-slider-subtitle">
          Best when each point has a clear meaning.
        </p>
        <input
          type="range"
          min={1}
          max={7}
          step={1}
          value={sliderB}
          onChange={(event) => onSliderBChange(Number(event.target.value))}
          className="component-playground-range"
          aria-label="Stepped 1 to 7 slider"
        />
        <div className="component-playground-slider-marks" aria-hidden="true">
          {marksB.map((mark) => (
            <span
              key={mark}
              className={mark === sliderB ? "component-playground-mark-active" : ""}
            >
              {mark}
            </span>
          ))}
        </div>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">3) Dense 1-10 energy scale</p>
        <div className="component-playground-slider-pill">{sliderC} / 10</div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={sliderC}
          onChange={(event) => onSliderCChange(Number(event.target.value))}
          className="component-playground-range"
          aria-label="Dense 1 to 10 slider"
        />
        <div className="component-playground-slider-marks component-playground-slider-marks-tight">
          {marksC.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">4) Sentiment slider (1-7)</p>
        <div className="component-playground-sentiment-row">
          <span>Drained</span>
          <span>Balanced</span>
          <span>Great</span>
        </div>
        <input
          type="range"
          min={1}
          max={7}
          step={1}
          value={sliderD}
          onChange={(event) => onSliderDChange(Number(event.target.value))}
          className="component-playground-range"
          aria-label="Sentiment 1 to 7 slider"
        />
        <p className="component-playground-slider-subtitle">
          Current score: <strong>{sliderD}</strong>
        </p>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">
          5) Vertical thermometer slider (1-10)
        </p>
        <div className="component-playground-thermo-wrap">
          <span className="component-playground-slider-hint">Low</span>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={sliderE}
            onChange={(event) => onSliderEChange(Number(event.target.value))}
            className="component-playground-range-vertical"
            aria-label="Vertical thermometer slider"
          />
          <span className="component-playground-slider-hint">High</span>
          <div className="component-playground-slider-pill">{sliderE} / 10</div>
        </div>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">
          6) Segmented snap slider (1-5)
        </p>
        <p className="component-playground-slider-subtitle">
          Tap any segment or drag the hidden range for larger touch targets.
        </p>
        <div className="component-playground-segmented-shell">
          <div className="component-playground-segmented-row">
            {segmentedSteps.map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => onSliderFChange(step)}
                className={`component-playground-segment ${
                  sliderF === step ? "component-playground-segment-active" : ""
                }`}
                aria-label={`Set segmented slider to ${step}`}
              >
                {step}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={sliderF}
            onChange={(event) => onSliderFChange(Number(event.target.value))}
            className="component-playground-segment-range"
            aria-label="Segmented snap slider"
          />
        </div>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">
          7) Ladder slider with variable heights (1-7)
        </p>
        <p className="component-playground-slider-subtitle">
          Tap a bar height instead of dragging a rail.
        </p>
        <div className="component-playground-ladder-row">
          {ladderSteps.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => onSliderGChange(step)}
              className={`component-playground-ladder-step ${
                step <= sliderG ? "component-playground-ladder-step-active" : ""
              }`}
              style={
                {
                  "--cp-step-height": `${20 + step * 7}px`,
                } as CSSProperties
              }
              aria-label={`Set ladder slider to ${step}`}
            >
              <span>{step}</span>
            </button>
          ))}
        </div>
        <p className="component-playground-slider-subtitle">
          Current value: <strong>{sliderG}</strong> / 7
        </p>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">
          8) Curved notch arc slider (1-10)
        </p>
        <p className="component-playground-slider-subtitle">
          Arc-shaped notch picker for thumb-friendly scrubbing.
        </p>
        <div className="component-playground-arc-row">
          {arcSteps.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => onSliderHChange(step)}
              className={`component-playground-arc-notch ${
                step === sliderH ? "component-playground-arc-notch-active" : ""
              }`}
              style={
                {
                  "--cp-arc-offset": `${Math.abs(step - 5.5) * 4.5}px`,
                } as CSSProperties
              }
              aria-label={`Set arc slider to ${step}`}
            >
              <span>{step}</span>
            </button>
          ))}
        </div>
        <p className="component-playground-slider-subtitle">
          Selected notch: <strong>{sliderH}</strong> / 10
        </p>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">9) Dial knob selector (1-7)</p>
        <p className="component-playground-slider-subtitle">
          Circular picker with tap targets around a center indicator.
        </p>
        <div className="component-playground-dial">
          <div className="component-playground-dial-center">
            <strong>{sliderI}</strong>
            <span>/7</span>
          </div>
          {dialSteps.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => onSliderIChange(step)}
              className={`component-playground-dial-dot ${
                sliderI === step ? "component-playground-dial-dot-active" : ""
              }`}
              style={
                {
                  "--cp-angle": `${-120 + (step - 1) * 40}deg`,
                } as CSSProperties
              }
              aria-label={`Set dial slider to ${step}`}
            >
              {step}
            </button>
          ))}
        </div>
      </section>

      <section className="component-playground-slider-card">
        <p className="component-playground-slider-label">10) Wave step slider (1-10)</p>
        <p className="component-playground-slider-subtitle">
          Wave-shaped peaks; tap peak height to choose value.
        </p>
        <div className="component-playground-wave-row">
          {waveSteps.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => onSliderJChange(step)}
              className={`component-playground-wave-step ${
                step <= sliderJ ? "component-playground-wave-step-active" : ""
              }`}
              style={
                {
                  "--cp-wave-offset": `${Math.abs(step - 5.5) * 3.8}px`,
                  "--cp-wave-height": `${22 + (step % 2 === 0 ? 18 : 8)}px`,
                } as CSSProperties
              }
              aria-label={`Set wave slider to ${step}`}
            >
              <span>{step}</span>
            </button>
          ))}
        </div>
        <p className="component-playground-slider-subtitle">
          Current wave score: <strong>{sliderJ}</strong> / 10
        </p>
      </section>
    </div>
  );
}

function PillCreateInput({
  options,
  selected,
  isCreating,
  newValue,
  onSelect,
  onStartCreate,
  onCreateChange,
  onCreateSubmit,
  onCancelCreate,
}: Readonly<{
  options: string[];
  selected: string | null;
  isCreating: boolean;
  newValue: string;
  onSelect: (value: string) => void;
  onStartCreate: () => void;
  onCreateChange: (value: string) => void;
  onCreateSubmit: () => void;
  onCancelCreate: () => void;
}>) {
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [showSpec, setShowSpec] = useState(false);
  const maxVisibleOptions = 8;
  const hasHiddenOptions = options.length > maxVisibleOptions;
  const visibleOptions = showAllOptions
    ? options
    : options.slice(0, maxVisibleOptions);

  return (
    <div className="component-playground-pill-wrap mx-auto mt-10 w-full max-w-92 text-left">
      <div className="mb-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={onStartCreate}
          className={`component-playground-pill component-playground-pill-add ${
            isCreating ? "component-playground-pill-active" : ""
          }`}
          aria-label="Create a new activity option"
        >
          <span aria-hidden="true" className="text-base leading-none">
            +
          </span>
        </button>
        {visibleOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`component-playground-pill ${
              selected === option ? "component-playground-pill-selected" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {isCreating ? (
        <form
          className="component-playground-create-row"
          onSubmit={(event) => {
            event.preventDefault();
            onCreateSubmit();
          }}
        >
          <input
            autoFocus
            value={newValue}
            onChange={(event) => onCreateChange(event.target.value)}
            placeholder="CREATING A NEW ONE"
            className="component-playground-create-input"
            aria-label="New activity option"
          />
          <button
            type="button"
            onClick={onCancelCreate}
            className="component-playground-create-cancel"
          >
            Cancel
          </button>
        </form>
      ) : hasHiddenOptions && !showAllOptions ? (
        <button
          type="button"
          onClick={() => setShowAllOptions(true)}
          className="component-playground-more-link"
        >
          More
          <span aria-hidden="true" className="ml-1">
            v
          </span>
        </button>
      ) : null}
      {!isCreating && showAllOptions && hasHiddenOptions ? (
        <button
          type="button"
          onClick={() => setShowAllOptions(false)}
          className="component-playground-more-link"
        >
          Less
          <span aria-hidden="true" className="ml-1">
            ^
          </span>
        </button>
      ) : null}

      <div className="component-playground-spec-card mt-5">
        <button
          type="button"
          onClick={() => setShowSpec((current) => !current)}
          className="component-playground-spec-toggle"
          aria-expanded={showSpec}
          aria-controls="pill-create-spec"
        >
          <span>AI rebuild spec</span>
          <span aria-hidden="true">{showSpec ? "^" : "v"}</span>
        </button>
        {showSpec ? (
          <div id="pill-create-spec" className="component-playground-spec-content">
            <p>
              <strong>Layout:</strong> wrap row with rounded pills and a leading
              circular <code>+</code> button.
            </p>
            <p>
              <strong>Selection:</strong> single-select pills; selected pill gets
              accent border + tinted background.
            </p>
            <p>
              <strong>Overflow:</strong> show first 8 options by default, use{" "}
              <code>More</code> to expand all and <code>Less</code> to collapse.
            </p>
            <p>
              <strong>Create flow:</strong> only <code>+</code> enters create mode;
              show uppercase rounded input + cancel button.
            </p>
            <p>
              <strong>Create submit:</strong> trim input, ignore empty, dedupe
              case-insensitively, append if new, then select created value.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 items-end justify-between px-6 pb-2 text-[0.78rem] font-extrabold text-(--cp-cream)">
      <span>2:16</span>
      <div className="h-5 w-28 rounded-b-[1.1rem] bg-black" />
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-4 rounded-sm border border-(--cp-cream)" />
        <span className="h-3 w-6 rounded-sm bg-(--cp-cream)" />
      </div>
    </div>
  );
}

function ControlRow({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[1.35rem] border border-(--cp-line) bg-(--cp-card)/70 p-2 pl-4">
      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-(--cp-muted-soft)">
        {label}
      </p>
      <div className="flex gap-1.5">{children}</div>
    </div>
  );
}

function ProgressDots({ currentIndex }: Readonly<{ currentIndex: number }>) {
  return (
    <div className="flex justify-center gap-2" aria-label="Question progress">
      {formPages.map((page, index) => (
        <span
          key={page.id}
          className={`h-2 rounded-full transition-all ${
            index === currentIndex
              ? "w-8 bg-(--cp-accent-strong)"
              : "w-2 bg-(--cp-line-strong)"
          }`}
        />
      ))}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function ArrowIcon({ direction }: Readonly<{ direction: "left" | "right" }>) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      {direction === "left" ? (
        <path d="M15 5 8 12l7 7" />
      ) : (
        <path d="m9 5 7 7-7 7" />
      )}
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3Z" />
      <path d="M19 11a7 7 0 1 1-14 0" />
      <path d="M12 18v3" />
      <path d="M8 21h8" />
    </svg>
  );
}
