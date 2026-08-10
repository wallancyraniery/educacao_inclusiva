"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const nav = [{href:"/",label:"Visão geral",icon:"home"},{href:"/estudantes",label:"Estudantes",icon:"users"},{href:"/avaliacao",label:"Avaliações",icon:"file"},{href:"/atividades",label:"Atividades",icon:"book"}];
const steps = [{href:"/avaliacao",label:"Avaliação"},{href:"/indicadores",label:"Indicadores"},{href:"/habilidades",label:"Habilidades"},{href:"/objetivos",label:"Objetivos"},{href:"/atividades",label:"Atividades"},{href:"/pei",label:"PEI"}];

export function AppShell({ children }: { children:React.ReactNode }) {
 const path=usePathname(); const activeStep=steps.findIndex((s)=>path.startsWith(s.href));
 return <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
  <aside className="hidden lg:flex lg:flex-col border-r border-[#dce2dc] bg-[#f1f3ed]/90 p-5 sticky top-0 h-screen">
   <Link href="/" className="flex items-center gap-3 px-2 py-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#176b5b] text-white"><Icon name="layers"/></span><span><strong className="serif text-xl">Percurso</strong><small className="block text-[10px] tracking-[.17em] text-[#687871] uppercase">Protótipo</small></span></Link>
   <nav aria-label="Navegação principal" className="mt-8 space-y-1">{nav.map(n=><Link key={n.href} href={n.href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${path===n.href?"bg-white text-[#176b5b] shadow-sm":"text-[#586861] hover:bg-white/70"}`}><Icon name={n.icon}/>{n.label}</Link>)}</nav>
   <div className="mt-auto rounded-2xl bg-[#dfead0] p-4 text-sm"><Icon name="info"/><strong className="mt-2 block">Ambiente demonstrativo</strong><p className="mt-1 text-xs leading-5 text-[#586861]">Dados fictícios. Conteúdo em validação profissional.</p></div>
  </aside>
  <div className="min-w-0"><header className="sticky top-0 z-20 border-b border-[#dde3dd] bg-[#f7f5ef]/90 backdrop-blur-xl">
   <div className="flex h-16 items-center justify-between px-5 md:px-8"><Link href="/" className="flex items-center gap-2 lg:hidden"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#176b5b] text-white"><Icon name="layers"/></span><strong className="serif">Percurso</strong></Link><div className="hidden lg:block text-sm text-[#687871]">Espaço de planejamento educacional</div><div className="flex items-center gap-3"><span className="pill bg-[#f3e7bd] text-[#735c19]">Demonstração</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#284a40] text-xs font-bold text-white">MP</span></div></div>
   {activeStep>=0&&<div className="overflow-x-auto border-t border-[#e6e8e3] px-5 md:px-8"><ol className="mx-auto flex min-w-max max-w-5xl items-center py-3" aria-label="Etapas do percurso">{steps.map((s,i)=><li key={s.href} className="flex items-center"><Link href={s.href} className={`flex items-center gap-2 text-xs font-bold ${i<=activeStep?"text-[#176b5b]":"text-[#8a958f]"}`}><span className={`grid h-6 w-6 place-items-center rounded-full ${i<activeStep?"bg-[#176b5b] text-white":i===activeStep?"border-2 border-[#176b5b] bg-white":"bg-[#e4e7e2]"}`}>{i<activeStep?<Icon name="check" size={14}/>:i+1}</span>{s.label}</Link>{i<steps.length-1&&<span className={`mx-2 h-px w-7 md:w-10 ${i<activeStep?"bg-[#176b5b]":"bg-[#d4d9d4]"}`}/>}</li>)}</ol></div>}
  </header><main className="mx-auto max-w-[1280px] p-5 pb-24 md:p-8">{children}</main></div>
 </div>;
}
