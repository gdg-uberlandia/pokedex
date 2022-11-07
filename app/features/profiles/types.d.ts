import type { User } from "../users/types";


export interface Profile {
    user: User;
    code: String;
    url: String;
    linkedinUrl: String;
    skills: Array<String>
    regitrationId: String;
    contents: {
        companies: Array<Company>;
        profiles: Array<Partial<Profile>>
    }

}