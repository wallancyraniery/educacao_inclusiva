import type { Activity, Indicator, Objective, Skill, SuggestionDecision } from "./types";

export const skillsForIndicators = (selected: string[], allSkills: Skill[]) =>
  allSkills.filter((skill) => skill.indicatorIds.some((id) => selected.includes(id)));

export const objectivesForSkills = (selected: string[], allObjectives: Objective[]) =>
  allObjectives.filter((objective) => selected.includes(objective.skillId));

export const toggleObjective = (selected: string[], objectiveId: string) =>
  selected.includes(objectiveId) ? selected.filter((id) => id !== objectiveId) : [...selected, objectiveId];

export const activitiesForObjectives = (selected: string[], allActivities: Activity[]) =>
  allActivities.filter((activity) => selected.includes(activity.objectiveId));

export const indicatorsByArea = (allIndicators: Indicator[]) =>
  Object.groupBy(allIndicators, (indicator) => indicator.area);

export const decideSuggestion = (
  decisions: Record<string, SuggestionDecision>,
  suggestionId: string,
  decision: Exclude<SuggestionDecision, "pending">,
) => ({ ...decisions, [suggestionId]: decision });
