/** Escapes copy and wraps every "[TODO: ...]" segment in <mark class="todo"> so the owner can spot gaps. */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const todo = (s: string) =>
  esc(s).replace(/\[TODO:[^\]]*\]/g, (m) => `<mark class="todo">${m}</mark>`);

export const hasTodo = (s: string) => /\[TODO:/.test(s);

export type TodoPart = { text: string; todo: boolean };

/** Splits text into plain and "[TODO: ...]" segments for rendering as <mark class="todo">. */
export const splitTodo = (s: string): TodoPart[] =>
  s
    .split(/(\[TODO:[^\]]*\])/g)
    .filter((t) => t !== "")
    .map((t) => ({ text: t, todo: t.startsWith("[TODO:") }));
