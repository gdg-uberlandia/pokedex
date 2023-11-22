import type { Speaker } from "../speakers/types";

export interface Schedule {
  id: string;
  start: string;
  end: string;
  speeches: Array<Speech>;
}

interface Speech {
  id: string;
  duration?: number;
  path?: string;
  speakerSlugs?: Array<string>;
  speakers?: Array<Speaker>;
  topic?: string;
  canBeEvaluated?: boolean;
}

export { Schedule, Speech };
