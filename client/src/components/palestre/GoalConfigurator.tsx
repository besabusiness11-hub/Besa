// client/src/components/palestre/GoalConfigurator.tsx
import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { palestreContent } from "@/lib/palestre-content";
import PhoneFrame from "@/components/palestre/PhoneFrame";

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

        <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-12">
          <div className="flex flex-col items-center gap-4">
            <div
              role="radiogroup"
              aria-label="Obiettivo del sito"
              aria-describedby="configurator-active-description"
              className="flex flex-wrap justify-center gap-4"
            >
              {goals.map((goal) => {
                const selected = goal.id === activeId;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={goal.label}
                    onClick={() => setActiveId(goal.id)}
                    className="flex w-20 flex-col items-center gap-2"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] text-2xl transition-[transform,box-shadow,background-color] duration-300"
                      style={{
                        borderColor: selected ? "var(--pal-ink)" : "rgba(20,20,18,0.15)",
                        backgroundColor: selected ? goal.color : "#ffffff",
                        transform: selected ? "translateY(-4px) scale(1.06)" : "scale(1)",
                        boxShadow: selected
                          ? `0 14px 28px -12px ${goal.color}b3`
                          : "0 1px 2px rgba(20,20,18,0.08)",
                      }}
                    >
                      {goal.icon}
                    </span>
                    <span className="text-center text-sm font-bold leading-tight">
                      {goal.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active.id}
                id="configurator-active-description"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="max-w-xs text-center text-sm text-[var(--pal-ink)]/70"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <PhoneFrame>
            <div className="flex flex-1 flex-col gap-2 px-3 pb-8 pt-8">
              <div
                className="mb-1 flex items-center gap-2 rounded-xl px-2.5 py-2"
                style={{ backgroundColor: `${active.color}1f` }}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {active.icon}
                </span>
                <p className="palestre-display text-[10px] leading-tight">
                  Il tuo sito per: {active.label}
                </p>
              </div>
              <ul className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
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
                      className="flex items-center gap-2 rounded-lg bg-[var(--pal-bg)] px-3 py-2 text-xs font-semibold"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: active.color }}
                      />
                      {sectionLabel}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </PhoneFrame>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--pal-ink)]/70">
          {configurator.microcopy}
        </p>
      </div>
    </section>
  );
}
