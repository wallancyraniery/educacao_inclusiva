import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ActivitySessionProvider, useActivitySession } from "./activity-session";
import { BackToActivitiesLink } from "./back-to-activities-link";

function SessionConsumer({ surface }: { surface: "catálogo" | "detalhes" }) {
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
});
