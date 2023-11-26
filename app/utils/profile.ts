import { random } from "lodash";
import type { Profile } from "~/features/profiles/types";

const createBrandNewProfile = (user: Profile["user"]) => ({
  user: {
    isAdmin: false,
    ...user,
  },
  score: 0,
  shine: random(0, 1000) < 150,
  contents: {
    profiles: [],
    companies: [],
    tags: [],
    awards: [],
    evaluations: [],
  },
  skills: [],
});

export { createBrandNewProfile };
