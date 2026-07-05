import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

// Shared device chassis for Hero's mockup and the goal-configurator preview,
// so both "phone" moments on the page read as the same physical object.
export default function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-64 shrink-0 rounded-[2.75rem] bg-[var(--pal-ink)] p-2.5 shadow-[0_35px_60px_-20px_rgba(20,20,18,0.55)] ${className}`}
    >
      <span className="pointer-events-none absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/50" />
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.1rem] bg-white">
        {children}
        <span className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-[var(--pal-ink)]/15" />
      </div>
    </div>
  );
}
