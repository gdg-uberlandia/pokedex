import type { User } from "../users/types";


export interface Tag {
  name: string,
  image: string,
}

export interface Company {
  name: string,
  image: string,
  url: string,
}

export interface Profile {
  id?: string;
  user: User;
  url?: string;
  shine: boolean;
  skills?: Array<string>
  score?: number
  contents: {
    companies: Array<Company>;
    profiles: Array<Partial<Profile>>
    tags: Array<Tag>
  }

}
