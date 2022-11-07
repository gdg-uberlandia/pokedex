import type { User } from "../users/types";


export interface Profile {
  id: string;
  user: User;
  code: string;
  url: string;
  linkedinUrl: string;
  skills: Array<string>
  regitrationId: string;
  contents: {
    companies: Array<Company>;
    profiles: Array<Partial<Profile>>
  }

}
