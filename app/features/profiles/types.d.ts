import type { User } from "../users/types";


export interface Profile {
    id: string;
    user: User;
    code: String;
    url: String;
    linkedinUrl: String;
    skills: Array<String>
    registrationId: String;
    contents: {
        companies: Array<Company>;
        profiles: Array<Partial<Profile>>
    }

}