import { describe, expect, it } from "vitest";
import { activities, institutionalDocuments, objectives, skills } from "../data/demo";
import { activitiesForObjectives, decideSuggestion, objectivesForSkills, skillsForIndicators, toggleObjective } from "./rules";

describe("regras transparentes de associação", () => {
  it("relaciona resultados a habilidades", () => expect(skillsForIndicators(["i1"], skills).map((x) => x.id)).toEqual(["h1"]));
  it("relaciona habilidades a objetivos", () => expect(objectivesForSkills(["h3"], objectives).map((x) => x.id)).toEqual(["o3"]));
  it("filtra atividades pelos objetivos", () => expect(activitiesForObjectives(["o1", "o3"], activities).map((x) => x.id)).toEqual(["a1", "a3"]));
});

describe("seleção de objetivos", () => {
  it("adiciona sem perder escolhas", () => expect(toggleObjective(["o1"], "o2")).toEqual(["o1", "o2"]));
  it("remove um objetivo já selecionado", () => expect(toggleObjective(["o1", "o2"], "o1")).toEqual(["o2"]));
});

describe("decisão profissional sobre sugestões", () => {
  it("registra uma decisão sem alterar as demais", () => {
    expect(decideSuggestion({ o1: "selected" }, "o2", "rejected")).toEqual({ o1: "selected", o2: "rejected" });
  });

  it("mantém PEI, PDI e PAEE como tipos institucionais distintos", () => {
    expect(institutionalDocuments.map((document) => document.type)).toEqual(["PEI", "PDI", "PAEE"]);
    expect(new Set(institutionalDocuments.map((document) => document.description)).size).toBe(3);
  });
});
