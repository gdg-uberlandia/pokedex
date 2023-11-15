import type { Speaker } from "../speakers/types";

export interface Schedule {
    start: string;
    end: string;
    speeches: Array<Speech>;
}

interface Speech {
    duration?: number;
    path?: string;
    speakerSlug?: string;
    speaker?: Speaker;
    topic?: string;
}