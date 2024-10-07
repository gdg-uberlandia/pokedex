import { Profile } from "../profiles/types";

export const MISSIONS_LIST: Array<StoredMission> = [
  {
    id: 1,
    title: "Missão 1",
    description: "Complete a missão 1 e ganhe 10 moedas de ouro",
    icon: {
      src: "gold-coin.svg",
      alt: "Uma moeda de ouro pixelada",
    },
  },
  {
    id: 2,
    title: "Missão 2",
    description: "Complete a missão 2 e ganhe 10 moedas de ouro",
    icon: {
      src: "gold-crown.png",
      alt: "Uma coroa de ouro",
    },
  },
  {
    id: 3,
    title: "Missão 3",
    description: "Complete a missão 3 e ganhe 10 moedas de ouro",
    icon: {
      src: "trophy.png",
      alt: "Um troféu de ouro",
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
  evaluate?: (profile: Profile, profileToAdd: Profile) => boolean;
}
