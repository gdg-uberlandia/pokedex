import type { User } from "../users/types";

export interface Tag {
  id?: string;
  name: string;
  image: string;
}

export interface Company {
  id: string;
  name: string;
  image: string;
  url: string;
}

export interface Award {
  id?: string;
  user_id?: string;
  consumed?: boolean;
}

export interface Profile {
  id?: string;
  user: User;
  url?: string;
  shine: boolean;
  skills?: Array<string>;
  score?: number;
  contents: {
    companies: Array<Company>;
    profiles: Array<Partial<Profile>>;
    tags: Array<Tag>;
    awards: Array<Award>;
    evaluations: Array<EvaluationIds>;
  };
}

export interface EvaluationIds {
  speakerSlug: string;
  scheduleId: string;
}