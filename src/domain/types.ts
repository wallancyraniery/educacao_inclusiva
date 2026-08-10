export const areas = ["Linguagem", "Cognição", "Socialização", "Autocuidados", "Desenvolvimento motor"] as const;
export type Area = (typeof areas)[number];

export type Student = { id: string; name: string; initials: string; age: string; context: string; lastUpdate: string };
export type Indicator = { id: string; area: Area; label: string; status: "potencial" | "em-desenvolvimento" | "consolidado" };
export type Skill = { id: string; area: Area; name: string; indicatorIds: string[] };
export type Objective = { id: string; skillId: string; title: string; horizon: string };
export type Activity = {
  id: string; name: string; summary: string; area: Area; skillId: string; objectiveId: string;
  ageRange: string; supportLevel: string; environment: string; materials: string[]; preparation: string;
  steps: string[]; adaptations: string[]; observationCriterion: string; source: string; author: string; reviewStatus: string;
};
