// The Keystatic admin UI as a React component. Lives in its own module because Astro can only
// hydrate (client:only) a component it imports from a file.
import { makePage } from "@keystatic/astro/ui";
import config from "../../keystatic.config";

export const Keystatic = makePage(config);
