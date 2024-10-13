import { Company, Profile, Tag } from "../profiles/types";
import { getAllTags } from "../tags/tags.server";

export const PROFILES_QUANTITY = 30;
export const COMPANIES_QUANTITY = 10;
export const COMMON_SKILLS_QUANTITY = 3;

export const MISSIONS_LIST: Array<StoredMission> = [
  {
    id: 1,
    title: "Amigável",
    description: `Escaneie os QR codes de ${PROFILES_QUANTITY} participantes diferentes para completar esta missão.`,
    icon: {
      src: "gold-coin.svg",
      alt: "Uma moeda de ouro pixelada",
    },
    evaluate: async (profile) => {
      return profile.contents.profiles.length === PROFILES_QUANTITY;
    },
  },
  {
    id: 2,
    title: "Caçador de Oportunidades",
    description: `Encontre e escaneie QR codes de pelo menos ${COMPANIES_QUANTITY} empresas diferentes que estão participando do DevFest.`,
    icon: {
      src: "gold-crown.png",
      alt: "Uma coroa de ouro",
    },

    evaluate: async (profile) => {
      return profile.contents.companies.length === COMPANIES_QUANTITY;
    },
  },
  {
    id: 3,
    title: "Especialista em Tecnologia",
    description:
      "Encontre o QR code de todas as tecnologias para concluir esta missão.",
    icon: {
      src: "trophy.png",
      alt: "Um troféu de ouro",
    },
    evaluate: async (profile) => {
      const tags = await getAllTags();
      return profile.contents.tags.length === tags.length;
    },
  },
  {
    id: 4,
    title: "Aliança de Especialistas",
    description: `Você precisa escanear QR codes de pelo menos ${COMMON_SKILLS_QUANTITY} outras pessoas com uma habilidades em comum.`,
    icon: {
      src: "cheese-android.png",
      alt: "Um android feito de queijo",
    },
    evaluate: async (profile) => {
      const mySkills = profile.skills ?? [];
      const profileWithCommonSkills = profile.contents.profiles.filter(
        ({ skills = [] }) => {
          return skills.some((skill) => mySkills.includes(skill));
        }
      );
      return profileWithCommonSkills.length >= COMMON_SKILLS_QUANTITY;
    },
  },
];

interface StoredMission {
  id: number;
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
  /**
   * This function should return true if the mission is completed
   */
  evaluate?: (profile: Profile) => Promise<boolean>;
}
