"use client";

import Link from "next/link";
import { activities, institutionalDocuments, objectives, skills } from "../data/demo";
import { filterActivities, publishableActivitySuggestions } from "../domain/rules";
import { activityModalities, complexityLevels, type ActivityFilters, type DocumentType } from "../domain/types";
import { useState } from "react";
import { useActivitySession } from "./activity-session";
import { BackToActivitiesLink } from "./back-to-activities-link";
import { Icon } from "./icons";
import { NextButton, Notice, PageHead } from "./ui";

const options = {
  contexts: [...new Set(activities.map((item) => item.applicationContext))],
  adaptations: [...new Set(activities.flatMap((item) => item.possibleAdaptations))],
  accessibility: [...new Set(activities.flatMap((item) => item.accessibilityResources))],
};

function Filter({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <label className="text-xs font-bold text-[#586861]">{label}<select className="mt-1 block min-h-11 w-full rounded-xl border border-[#dce2dc] bg-white px-3 text-sm font-normal text-[#20322d]" value={value} onChange={(event) => onChange(event.target.value)}><option value="">Todos</option>{children}</select></label>;
}

export function ActivityBankPage() {
  const { decisions, decide, filters, setFilters } = useActivitySession();
  const matched = filterActivities(publishableActivitySuggestions(activities), filters);
  const activeCount = Object.values(filters).filter(Boolean).length;
  const selectedCount = Object.values(decisions).filter((decision) => decision === "selected").length;
  const setFilter = (key: keyof ActivityFilters, value: string) => setFilters((current) => ({ ...current, [key]: value || undefined }));

  return <><PageHead eyebrow="Etapa 5 de 6" title="Banco demonstrativo de atividades" description="12 sugestões originais para análise profissional. Os filtros são combinados exatamente como escolhidos; diagnóstico nunca é usado como regra automática." action={<span className="pill bg-[#fff0c9] text-[#765b15]">Nenhuma decisão automática</span>} /><Notice />
    <section className="card mb-6 p-5" aria-label="Filtros de atividades"><div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="font-bold">Filtros demonstrativos</h2><p className="mt-1 text-xs text-[#687871]">{activeCount} critério(s) ativo(s) · {matched.length} resultado(s)</p></div><button className="btn btn-ghost" disabled={!activeCount} onClick={() => setFilters({})}>Limpar filtros</button></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Filter label="Habilidade" value={filters.skillId ?? ""} onChange={(value) => setFilter("skillId", value)}>{skills.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Filter>
      <Filter label="Objetivo" value={filters.objectiveId ?? ""} onChange={(value) => setFilter("objectiveId", value)}>{objectives.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</Filter>
      <Filter label="Contexto" value={filters.context ?? ""} onChange={(value) => setFilter("context", value)}>{options.contexts.map((item) => <option key={item}>{item}</option>)}</Filter>
      <Filter label="Modalidade" value={filters.modality ?? ""} onChange={(value) => setFilter("modality", value)}>{activityModalities.map((item) => <option key={item}>{item}</option>)}</Filter>
      <Filter label="Complexidade" value={filters.complexityLevel ?? ""} onChange={(value) => setFilter("complexityLevel", value)}>{complexityLevels.map((item) => <option key={item}>{item}</option>)}</Filter>
      <Filter label="Adaptação" value={filters.adaptation ?? ""} onChange={(value) => setFilter("adaptation", value)}>{options.adaptations.map((item) => <option key={item}>{item}</option>)}</Filter>
      <Filter label="Acessibilidade" value={filters.accessibilityResource ?? ""} onChange={(value) => setFilter("accessibilityResource", value)}>{options.accessibility.map((item) => <option key={item}>{item}</option>)}</Filter>
    </div></section>
    {matched.length ? <div className="grid gap-5 md:grid-cols-2">{matched.map((item, index) => { const decision = decisions[item.id] ?? "pending"; return <article className={`card flex flex-col overflow-hidden ${decision === "selected" ? "ring-2 ring-[#6f9f8f]" : decision === "rejected" ? "opacity-70" : ""}`} key={item.id}><div className={`h-2 ${index % 2 ? "bg-[#e4c777]" : "bg-[#72a393]"}`} /><div className="flex flex-1 flex-col p-5"><div className="flex items-start justify-between gap-3"><span className="pill bg-[#dcece6] text-[#176b5b]">{item.domain}</span><span className="text-xs font-bold text-[#748079]">{item.indicativeAgeOrStage}</span></div><h2 className="serif mt-4 text-xl font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-[#687871]">{item.description}</p><dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2"><div><dt className="text-[#748079]">Finalidade</dt><dd className="mt-1 font-semibold">{item.purpose}</dd></div><div><dt className="text-[#748079]">Complexidade</dt><dd className="mt-1 font-semibold">{item.complexityLevel}</dd></div><div><dt className="text-[#748079]">Adaptações</dt><dd className="mt-1">{item.possibleAdaptations.join(" · ")}</dd></div><div><dt className="text-[#748079]">Acessibilidade</dt><dd className="mt-1">{item.accessibilityResources.join(" · ")}</dd></div></dl><p className="mt-4 text-xs text-[#687871]"><strong>Observar:</strong> {item.observationElements.join(" · ")}</p><p className="mt-3 text-[11px] text-[#748079]">{item.authorship} · {item.license} · v{item.version} · {item.editorialState}</p><div className="mt-auto flex flex-wrap gap-2 pt-5"><Link href={`/atividades/${item.id}`} className="btn btn-ghost flex-1">Analisar detalhes</Link><button className="btn btn-primary" onClick={() => decide(item.id, "selected")}>Selecionar</button><button className="btn btn-ghost" onClick={() => decide(item.id, "rejected")}>Rejeitar</button></div><p className="mt-2 text-xs font-bold text-[#176b5b]">{decision === "pending" ? "Aguardando decisão profissional" : decision === "selected" ? "Selecionada nesta sessão" : "Rejeitada nesta sessão"}</p></div></article>; })}</div> : <div className="card p-10 text-center"><h2 className="serif text-xl font-semibold">Nenhuma atividade corresponde aos filtros</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#687871]">Os {activeCount} critérios escolhidos continuam ativos. Revise ou limpe os filtros explicitamente; nenhum resultado foi inventado.</p></div>}
    <div className="mt-6 flex flex-col items-stretch justify-between gap-3 rounded-xl bg-[#e8efe7] p-4 sm:flex-row sm:items-center"><p id="continue-document-help" className="text-sm">{selectedCount > 0 ? <><strong>{selectedCount} atividade(s) selecionada(s).</strong> Pendências e rejeições não impedem o avanço.</> : <><strong>Selecione pelo menos uma atividade para continuar.</strong> Nenhuma seleção será feita automaticamente.</>}</p>{selectedCount > 0 ? <Link href="/pei" className="btn btn-primary">Continuar para documento <Icon name="arrow" size={18} /></Link> : <button className="btn btn-primary" disabled aria-describedby="continue-document-help">Continuar para documento <Icon name="arrow" size={18} /></button>}</div>
  </>;
}

export function ActivityDetailPage({ activityId }: { activityId: string }) {
  const item = activities.find((activity) => activity.id === activityId);
  const { decisions, decide } = useActivitySession();
  const decision = decisions[activityId] ?? "pending";
  if (!item) return <><PageHead title="Atividade não encontrada" description="Nenhuma sugestão demonstrativa corresponde a este identificador." /><Link href="/atividades" className="btn btn-ghost">Voltar ao banco</Link></>;
  return <><div className="mb-5"><BackToActivitiesLink /></div><PageHead title={item.title} description={item.description} action={<div className="flex gap-2"><button className="btn btn-primary" onClick={() => decide(item.id, "selected")}>Selecionar</button><button className="btn btn-ghost" onClick={() => decide(item.id, "rejected")}>Rejeitar</button></div>} /><Notice /><p className="mb-5 text-sm font-bold text-[#176b5b]">{decision === "pending" ? "Aguardando decisão profissional; esta sugestão não foi selecionada automaticamente." : decision === "selected" ? "Selecionada temporariamente nesta sessão." : "Rejeitada temporariamente nesta sessão."}</p><div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><div className="space-y-5"><section className="card p-6"><span className="pill bg-[#dcece6] text-[#176b5b]">{item.domain}</span><h2 className="serif mt-5 text-xl font-semibold">Finalidade</h2><p className="mt-3 text-sm leading-6 text-[#687871]">{item.purpose}</p><h2 className="serif mt-6 text-xl font-semibold">Orientações de aplicação</h2><ol className="mt-5 space-y-4">{item.applicationGuidance.map((text, index) => <li className="flex gap-3 text-sm leading-6" key={text}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dcece6] font-bold text-[#176b5b]">{index + 1}</span>{text}</li>)}</ol></section><section className="card p-6"><h2 className="serif text-xl font-semibold">Adaptações e acessibilidade</h2><h3 className="mt-4 font-bold">Adaptações possíveis</h3><ul className="mt-3 space-y-2 text-sm">{item.possibleAdaptations.map((text) => <li className="flex gap-2" key={text}><Icon name="check" size={18} />{text}</li>)}</ul><h3 className="mt-5 font-bold">Recursos de acessibilidade</h3><p className="mt-2 text-sm">{item.accessibilityResources.join(" · ")}</p></section>{item.complexityVariations.length > 0 && <section className="card p-6"><h2 className="serif text-xl font-semibold">Variações de complexidade</h2><div className="mt-4 space-y-3">{item.complexityVariations.map((variation) => <div className="rounded-xl bg-[#f4f5f1] p-4 text-sm" key={variation.level}><strong>{variation.level}</strong><p className="mt-1 text-[#687871]">{variation.description}</p></div>)}</div></section>}</div><aside className="space-y-5"><section className="card p-5"><h2 className="font-bold">Aplicação indicativa</h2><p className="mt-3 text-sm leading-6">{item.applicationContext} · {item.indicativeAgeOrStage}<br />{item.modality} · {item.estimatedDuration}<br />Apoio: {item.supportLevel}<br />Complexidade: {item.complexityLevel}</p><h3 className="mt-5 font-bold">Materiais</h3><p className="mt-2 text-sm">{item.materials.join(" · ")}</p></section><section className="card p-5"><h2 className="font-bold">Elementos a observar</h2><p className="mt-2 text-sm">{item.observationElements.join(" · ")}</p><h3 className="mt-5 font-bold">Registro dos resultados</h3><p className="mt-2 text-sm leading-6 text-[#687871]">{item.resultRecording}</p><h3 className="mt-5 font-bold">Próximos passos possíveis</h3><p className="mt-2 text-sm">{item.possibleNextSteps.join(" · ")}</p></section><section className="rounded-2xl border border-[#e6d59f] bg-[#fff8e5] p-5 text-xs leading-5"><strong>{item.editorialState}</strong><p className="mt-2">Autoria: {item.authorship}<br />Licença: {item.license}<br />Versão: {item.version}<br />Revisão: {item.reviewDate}</p></section></aside></div></>;
}

export function PeiPage() {
  const [documentType, setDocumentType] = useState<DocumentType>("PDI");
  const [notes, setNotes] = useState("Priorizar recursos visuais e oferecer tempo para escolhas.");
  const { decisions } = useActivitySession();
  const selectedActivities = activities.filter((activity) => decisions[activity.id] === "selected");
  const document = institutionalDocuments.find((item) => item.type === documentType)!;

  return <>
    <PageHead eyebrow="Etapa 6 de 6" title="Configure o tipo de documento institucional" description="PEI, PDI e PAEE são opções distintas. Esta demonstração não presume que tenham a mesma finalidade, estrutura ou aplicação." />
    <Notice />
    <fieldset className="mb-6">
      <legend className="mb-3 text-sm font-bold">Tipo usado nesta prévia demonstrativa</legend>
      <div className="grid gap-3 md:grid-cols-3">{institutionalDocuments.map((item) => <label className={`card cursor-pointer p-4 ${documentType === item.type ? "border-[#6f9f8f] ring-2 ring-[#cbe0d8]" : ""}`} key={item.type}><div className="flex items-start gap-3"><input className="check mt-1" type="radio" name="document-type" checked={documentType === item.type} onChange={() => setDocumentType(item.type)} /><span><strong>{item.type} · {item.name}</strong><span className="mt-2 block text-xs leading-5 text-[#687871]">{item.description}</span></span></div></label>)}</div>
    </fieldset>
    <div className="mb-6 rounded-xl border border-[#e7d7a4] bg-[#fff8e5] p-4 text-sm text-[#695a2e]"><strong>{document.type} selecionado.</strong> {document.caution}</div>
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      <div className="card overflow-hidden">
        <div className="border-b border-[#e4e7e2] bg-[#edf3ed] p-6"><p className="text-xs font-bold uppercase tracking-widest text-[#176b5b]">Rascunho demonstrativo · {document.type}</p><h2 className="serif mt-2 text-2xl font-semibold">{document.name}</h2><p className="mt-2 text-sm text-[#687871]">Lia Monteiro · perfil fictício · agosto de 2026</p></div>
        <div className="space-y-7 p-6">
          <section><h3 className="serif text-lg font-semibold">Contexto e potencialidades</h3><p className="mt-2 text-sm leading-6 text-[#687871]">Estudante demonstrativa que se envolve com recursos visuais, escolhas e propostas breves. Esta organização não representa a estrutura oficial de nenhum dos tipos de documento.</p></section>
          <section><h3 className="serif text-lg font-semibold">Sugestões aceitas para discussão</h3><div className="mt-3 space-y-3">{objectives.slice(0,3).map((objective,index) => <div className="rounded-xl bg-[#f4f5f1] p-4 text-sm" key={objective.id}><strong>{index+1}. {objective.title}</strong><p className="mt-1 text-xs text-[#748079]">Horizonte indicativo · requer revisão profissional: {objective.horizon}</p></div>)}</div></section>
          <section><h3 className="serif text-lg font-semibold">Atividades sugeridas</h3>{selectedActivities.length ? <div className="mt-3 flex flex-wrap gap-2">{selectedActivities.map((activity) => <span className="pill bg-[#dcece6] text-[#176b5b]" key={activity.id}>{activity.name}</span>)}</div> : <p className="mt-3 text-sm text-[#687871]">Nenhuma atividade foi selecionada nesta sessão.</p>}</section>
          <section><label htmlFor="notes" className="serif text-lg font-semibold">Observações qualitativas do profissional</label><p className="mt-1 text-xs text-[#748079]">Espaço livre para contexto, ressalvas e decisões que não cabem em seleções fechadas.</p><textarea id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-[#ced8d1] bg-white p-4 text-sm outline-none focus:border-[#176b5b]" /></section>
        </div>
      </div>
      <aside><div className="card sticky top-36 p-5"><h2 className="font-bold">Composição demonstrativa</h2><p className="mt-2 text-xs font-bold text-[#176b5b]">Tipo: {document.type}</p><div className="mt-5 space-y-4 text-sm">{[["5","Indicadores sugeridos"],["3","Objetivos analisados"],[String(selectedActivities.length),"Atividades sugeridas"]].map((item) => <div className="flex items-center justify-between border-b border-[#e4e7e2] pb-3" key={item[1]}><span className="text-[#687871]">{item[1]}</span><strong>{item[0]}</strong></div>)}</div><p className="mt-5 text-xs leading-5 text-[#748079]">A seleção não persiste. A equipe deve revisar tipo, finalidade, estrutura e conteúdo.</p><div className="mt-5"><NextButton href="/resumo" label="Revisar percurso" /></div></div></aside>
    </div>
  </>;
}
