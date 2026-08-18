import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ActivitySessionProvider, createActivitySessionState, useActivitySession } from "./activity-session";
import { ActivityBankPage, PeiPage } from "./activity-pages";
import { previousSteps } from "./app-shell";
import { PreviousStepLink } from "./ui";
import { BackToActivitiesLink } from "./back-to-activities-link";
import { SummaryPage } from "./pages";

function SessionConsumer({ surface }: { surface: "catálogo" | "detalhes" | "documento" | "resumo" }) {
  const { decisions, filters } = useActivitySession();
  return <span data-surface={surface}>{decisions.a1 ?? "pending"}:{Object.keys(filters).length}</span>;
}

describe("sessão compartilhada de atividades", () => {
  it("oferece a mesma fonte inicial, sem decisão automática, ao catálogo e aos detalhes", () => {
    const markup = renderToStaticMarkup(<ActivitySessionProvider><SessionConsumer surface="catálogo" /><SessionConsumer surface="detalhes" /></ActivitySessionProvider>);
    expect(markup).toContain('data-surface="catálogo">pending:0');
    expect(markup).toContain('data-surface="detalhes">pending:0');
  });

  it("renderiza um retorno acessível para o catálogo", () => {
    const markup = renderToStaticMarkup(<BackToActivitiesLink />);
    expect(markup).toContain('href="/atividades"');
    expect(markup).toContain("Voltar às atividades");
  });

  it("compartilha decisões e filtros entre catálogo, detalhes, documento e resumo", () => {
    const initialState = { decisions: { a1: "selected" as const, a2: "rejected" as const }, filters: { context: "Sala de aula" } };
    const markup = renderToStaticMarkup(<ActivitySessionProvider initialState={initialState}><SessionConsumer surface="catálogo" /><SessionConsumer surface="detalhes" /><SessionConsumer surface="documento" /><SessionConsumer surface="resumo" /></ActivitySessionProvider>);
    expect(markup.match(/selected:1/g)).toHaveLength(4);
  });

  it("reinicia intencionalmente decisões e filtros ao recriar o provider", () => {
    expect(createActivitySessionState()).toEqual({ decisions: {}, filters: {} });
    expect(createActivitySessionState()).not.toBe(createActivitySessionState());
  });
});

describe("navegação do percurso", () => {
  it.each([
    ["/indicadores", "/avaliacao", "Voltar para avaliação"],
    ["/habilidades", "/indicadores", "Voltar para indicadores"],
    ["/objetivos", "/habilidades", "Voltar para habilidades"],
    ["/atividades", "/objetivos", "Voltar para objetivos"],
    ["/pei", "/atividades", "Voltar para atividades"],
  ])("liga %s à etapa anterior com nome acessível", (route, href, label) => {
    const markup = renderToStaticMarkup(<PreviousStepLink {...previousSteps[route]} />);
    expect(markup).toContain(`href="${href}"`);
    expect(markup).toContain(label);
  });

  it("não cria retorno inválido na primeira etapa", () => expect(previousSteps["/avaliacao"]).toBeUndefined());
});

describe("avanço e composição do documento", () => {
  it("bloqueia o avanço e não toma decisão automática sem seleção", () => {
    const markup = renderToStaticMarkup(<ActivitySessionProvider><ActivityBankPage /></ActivitySessionProvider>);
    expect(markup).toContain("Selecione pelo menos uma atividade para continuar");
    expect(markup).toMatch(/<button[^>]*disabled[^>]*>Continuar para documento/);
    expect(markup).not.toContain('href="/pei"');
  });

  it("libera o avanço com uma seleção, apesar de pendências e rejeições", () => {
    const state = { decisions: { a1: "selected" as const, a2: "rejected" as const }, filters: {} };
    const markup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><ActivityBankPage /></ActivitySessionProvider>);
    expect(markup).toContain('href="/pei"');
    expect(markup).toContain("Pendências e rejeições não impedem o avanço");
  });

  it("incorpora somente atividades selecionadas ao documento", () => {
    const state = { decisions: { a1: "selected" as const, a2: "rejected" as const }, filters: {} };
    const markup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><PeiPage /></ActivitySessionProvider>);
    expect(markup).toContain("Três cenas, uma história");
    expect(markup).not.toContain("Mapa de ideias falado ou visual");
    expect(markup).toContain("Atividades sugeridas</span><strong>1</strong>");
  });

  it.each([
    [{ a1: "selected" as const }, 1],
    [{ a1: "selected" as const, a4: "selected" as const }, 2],
  ])("mantém a contagem de %s seleção(ões) no documento e no resumo", (decisions, count) => {
    const state = { decisions, filters: {} };
    const documentMarkup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><PeiPage /></ActivitySessionProvider>);
    const summaryMarkup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><SummaryPage /></ActivitySessionProvider>);
    expect(documentMarkup).toContain(`Atividades sugeridas</span><strong>${count}</strong>`);
    expect(summaryMarkup).toContain(count === 1 ? "1 atividade selecionada" : "2 atividades selecionadas");
  });

  it("exclui decisões rejeitadas e pendentes da contagem e não escolhe automaticamente", () => {
    const state = { decisions: { a1: "rejected" as const, a2: "pending" as const }, filters: {} };
    const documentMarkup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><PeiPage /></ActivitySessionProvider>);
    const summaryMarkup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><SummaryPage /></ActivitySessionProvider>);
    expect(documentMarkup).toContain("Atividades sugeridas</span><strong>0</strong>");
    expect(documentMarkup).toContain("Nenhuma atividade foi selecionada nesta sessão");
    expect(summaryMarkup).toContain("Nenhuma atividade selecionada nesta sessão");
    expect(summaryMarkup).not.toContain("1 atividade selecionada");
  });

  it("reflete uma decisão alterada no documento e no resumo durante a mesma sessão lógica", () => {
    const before = { decisions: { a1: "selected" as const, a4: "selected" as const }, filters: {} };
    const after = { decisions: { a1: "selected" as const, a4: "rejected" as const }, filters: {} };
    for (const [state, count] of [[before, 2], [after, 1]] as const) {
      const markup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><PeiPage /><SummaryPage /></ActivitySessionProvider>);
      expect(markup).toContain(`Atividades sugeridas</span><strong>${count}</strong>`);
      expect(markup).toContain(count === 1 ? "1 atividade selecionada" : "2 atividades selecionadas");
    }
  });

  it("preserva os três objetivos no documento e no resumo", () => {
    const state = { decisions: { a1: "selected" as const }, filters: {} };
    const markup = renderToStaticMarkup(<ActivitySessionProvider initialState={state}><PeiPage /><SummaryPage /></ActivitySessionProvider>);
    expect(markup).toContain("Objetivos analisados</span><strong>3</strong>");
    expect(markup).toContain("3 prioridades selecionadas");
  });
});
