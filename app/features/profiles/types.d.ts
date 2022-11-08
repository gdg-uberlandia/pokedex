import type { User } from "../users/types";

export interface Profile {
  id?: string;
  user: User;
  url?: string;
  skills?: Array<string>
  contents?: {
    companies: Array<Company>;
    profiles: Array<Partial<Profile>>
  }

}
