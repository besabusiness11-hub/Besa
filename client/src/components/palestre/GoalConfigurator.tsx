// client/src/components/palestre/GoalConfigurator.tsx
import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { palestreContent } from "@/lib/palestre-content";

export default function GoalConfigurator() {
  const { goals, configurator } = palestreContent;
  const defaultGoal = goals.find((goal) => goal.default) ?? goals[0];
  const [activeId, setActiveId] = useState(defaultGoal.id);
  const reduceMotion = useReducedMotion();
  const active = goals.find((goal) => goal.id === activeId) ?? defaultGoal;

  return (
    <section
      id="configuratore"
      className="bg-white py-16"
      style={{ "--pal-accent": active.color } as CSSProperties}
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="palestre-display text-2xl md:text-3xl">{configurator.title}</h2>
        <p className="mt-2 text-[var(--pal-ink)]/75">{configurator.intro}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div
            role="radiogroup"
            aria-label="Obiettivo del sito"
            className="grid content-start gap-3"
          >
            {goals.map((goal) => {
              const selected = goal.id === activeId;
              return (
                <button
                  key={goal.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveId(goal.id)}
                  className="rounded-xl border-2 p-4 text-left transition-colors"
                  style={{
                    borderColor: selected ? goal.color : "rgba(20,20,18,0.15)",
                    backgroundColor: selected ? `${goal.color}14` : "transparent",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                      style={{ backgroundColor: `${goal.color}22` }}
                    >
                      {goal.icon}
                    </span>
                    <span>
                      <span className="block font-bold">{goal.label}</span>
                      <span className="block text-sm text-[var(--pal-ink)]/70">
                        {goal.description}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-xs rounded-[2rem] border-4 border-[var(--pal-ink)] bg-[var(--pal-bg)] p-4">
            <p className="palestre-display mb-3 text-center text-xs">
              Il tuo sito per: {active.label}
            </p>
            <ul className="space-y-2">
              <AnimatePresence initial={false} mode="popLayout">
                {active.sections.map((sectionLabel) => (
                  <motion.li
                    key={sectionLabel}
                    layout
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                    className="rounded-lg border-l-4 bg-white px-3 py-2 text-sm font-semibold shadow-sm"
                    style={{ borderLeftColor: active.color }}
                  >
                    {sectionLabel}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-[var(--pal-ink)]/70">{configurator.microcopy}</p>
      </div>
    </section>
  );
}
