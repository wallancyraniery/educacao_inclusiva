import type { Activity, ActivityFilters, Indicator, Objective, Skill, SuggestionDecision } from "./types";

export const skillsForIndicators = (selected: string[], allSkills: Skill[]) =>
  allSkills.filter((skill) => skill.indicatorIds.some((id) => selected.includes(id)));

export const objectivesForSkills = (selected: string[], allObjectives: Objective[]) =>
  allObjectives.filter((objective) => selected.includes(objective.skillId));

export const toggleObjective = (selected: string[], objectiveId: string) =>
  selected.includes(objectiveId) ? selected.filter((id) => id !== objectiveId) : [...selected, objectiveId];

export const activitiesForObjectives = (selected: string[], allActivities: Activity[]) =>
  allActivities.filter((activity) => activity.relatedObjectiveIds.some((id) => selected.includes(id)));

export const filterActivities = (allActivities: Activity[], filters: ActivityFilters) =>
  allActivities.filter((activity) =>
    (!filters.skillId || activity.relatedSkillIds.includes(filters.skillId)) &&
    (!filters.objectiveId || activity.relatedObjectiveIds.includes(filters.objectiveId)) &&
    (!filters.context || activity.applicationContext === filters.context) &&
    (!filters.modality || activity.modality === filters.modality) &&
    (!filters.complexityLevel || activity.complexityLevel === filters.complexityLevel) &&
    (!filters.adaptation || activity.possibleAdaptations.includes(filters.adaptation)) &&
    (!filters.accessibilityResource || activity.accessibilityResources.includes(filters.accessibilityResource))
  );

export const hasRequiredEditorialMetadata = (activity: Activity) =>
  [activity.authorship, activity.license, activity.version, activity.editorialState].every((value) => value.trim().length > 0);

export const publishableActivitySuggestions = (allActivities: Activity[]) =>
  allActivities.filter(hasRequiredEditorialMetadata);

export const indicatorsByArea = (allIndicators: Indicator[]) =>
  Object.groupBy(allIndicators, (indicator) => indicator.area);

export const decideSuggestion = (
  decisions: Record<string, SuggestionDecision>,
  suggestionId: string,
  decision: Exclude<SuggestionDecision, "pending">,
) => ({ ...decisions, [suggestionId]: decision });
