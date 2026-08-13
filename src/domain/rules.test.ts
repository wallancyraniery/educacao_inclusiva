import { describe, expect, it } from "vitest";
import { activities, institutionalDocuments, objectives, skills } from "../data/demo";
import { activitiesForObjectives, decideSuggestion, filterActivities, hasRequiredEditorialMetadata, objectivesForSkills, publishableActivitySuggestions, skillsForIndicators, toggleObjective } from "./rules";

describe("regras transparentes de associação", () => {
  it("relaciona resultados a habilidades", () => expect(skillsForIndicators(["i1"], skills).map((item) => item.id)).toEqual(["h1"]));
  it("relaciona habilidades a objetivos", () => expect(objectivesForSkills(["h3"], objectives).map((item) => item.id)).toEqual(["o3"]));
  it("filtra atividades pelos objetivos relacionados", () => expect(activitiesForObjectives(["o5"], activities).map((item) => item.id)).toEqual(["a12"]));
});

describe("filtros demonstrativos de atividades", () => {
  it.each([
    [{ skillId: "h5" }, ["a12"]],
    [{ objectiveId: "o5" }, ["a12"]],
    [{ context: "Pequeno grupo" }, ["a4", "a6", "a12"]],
    [{ modality: "Coletiva" as const }, ["a3", "a4", "a5", "a6", "a12"]],
    [{ complexityLevel: "Avançada" as const }, ["a12"]],
    [{ adaptation: "Reduzir o grupo para duas pessoas" }, ["a4"]],
    [{ accessibilityResource: "Leitura fácil" }, ["a2", "a8", "a10"]],
  ])("aplica um filtro sem alterar os demais dados", (filter, expected) => {
    expect(filterActivities(activities, filter).map((item) => item.id)).toEqual(expected);
  });

  it("combina filtros com lógica E", () => {
    expect(filterActivities(activities, { context: "Sala de aula", modality: "Individual", complexityLevel: "Inicial", accessibilityResource: "Sinalização visual" }).map((item) => item.id)).toEqual(["a7", "a9"]);
  });

  it("retorna estado vazio sem relaxar critérios incompatíveis", () => {
    expect(filterActivities(activities, { skillId: "h5", modality: "Individual" })).toEqual([]);
  });
});

describe("integridade da amostra", () => {
  it("contém 12 atividades, três por domínio", () => {
    expect(activities).toHaveLength(12);
    expect(Object.groupBy(activities, (item) => item.domain)).toMatchObject({
      "Comunicação e expressão": { length: 3 },
      "Interação e participação": { length: 3 },
      "Autonomia e rotina": { length: 3 },
      "Habilidades acadêmicas funcionais": { length: 3 },
    });
  });

  it("preserva todos os metadados obrigatórios", () => {
    for (const item of activities) {
      expect(item).toMatchObject({ id: expect.any(String), title: expect.any(String), description: expect.any(String), purpose: expect.any(String), applicationContext: expect.any(String), indicativeAgeOrStage: expect.any(String), modality: expect.any(String), estimatedDuration: expect.any(String), supportLevel: expect.any(String), complexityLevel: expect.any(String), resultRecording: expect.any(String), authorship: expect.any(String), license: expect.any(String), editorialState: expect.any(String), version: expect.any(String), reviewDate: expect.any(String) });
      expect(item.relatedSkillIds.length).toBeGreaterThan(0);
      expect(item.relatedObjectiveIds.length).toBeGreaterThan(0);
      expect(item.materials.length).toBeGreaterThan(0);
      expect(item.possibleAdaptations.length).toBeGreaterThan(0);
      expect(item.accessibilityResources.length).toBeGreaterThan(0);
      expect(item.applicationGuidance.length).toBeGreaterThan(0);
      expect(item.observationElements.length).toBeGreaterThan(0);
      expect(item.possibleNextSteps.length).toBeGreaterThan(0);
    }
  });

  it("oferece duas variações quando uma atividade declara variações", () => {
    const varied = activities.filter((item) => item.complexityVariations.length > 0);
    expect(varied.length).toBeGreaterThan(0);
    expect(varied.every((item) => item.complexityVariations.length === 2)).toBe(true);
  });

  it.each(["authorship", "license", "version", "editorialState"] as const)("impede sugestão sem %s", (field) => {
    const invalid = { ...activities[0], [field]: "" };
    expect(hasRequiredEditorialMetadata(invalid)).toBe(false);
    expect(publishableActivitySuggestions([invalid])).toEqual([]);
  });
});

describe("preservação da decisão profissional", () => {
  it.each([
    ["aguardando → selecionada", {}, "selected", { a1: "selected" }],
    ["aguardando → rejeitada", {}, "rejected", { a1: "rejected" }],
    ["selecionada → rejeitada", { a1: "selected" }, "rejected", { a1: "rejected" }],
    ["rejeitada → selecionada", { a1: "rejected" }, "selected", { a1: "selected" }],
  ] as const)("permite a transição %s", (_label, current, decision, expected) => {
    expect(decideSuggestion(current, "a1", decision)).toEqual(expected);
  });
  it("adiciona e remove objetivos sem perder outras escolhas", () => {
    expect(toggleObjective(["o1"], "o2")).toEqual(["o1", "o2"]);
    expect(toggleObjective(["o1", "o2"], "o1")).toEqual(["o2"]);
  });
  it("mantém PEI, PDI e PAEE distintos", () => expect(institutionalDocuments.map((item) => item.type)).toEqual(["PEI", "PDI", "PAEE"]));
});
