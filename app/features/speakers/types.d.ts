export interface Speaker {
  company: string;
  content: string;
  miniBio: string;
  name: string;
  photo: string;
  socialMedia: SocialMedia;
  tech: string;
  title: string;
  topic: string;
  speakerSlug: string;
  id: string;
  canBeEvaluated: boolean;
  evaluationStartTime: string;
}

interface SocialMedia {
  instagram?: string;
  linkedin?: string;
}
