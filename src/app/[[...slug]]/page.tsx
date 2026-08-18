"use client";
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Dashboard, StudentsPage, StudentPage, AssessmentPage, IndicatorsPage, SkillsPage, ObjectivesPage, SummaryPage } from "@/components/pages";
import { ActivityBankPage, ActivityDetailPage, PeiPage } from "@/components/activity-pages";

export default function Page(){const path=usePathname();let content:React.ReactNode;
 if(path==="/")content=<Dashboard/>; else if(path==="/estudantes")content=<StudentsPage/>; else if(path.startsWith("/estudantes/"))content=<StudentPage/>; else if(path==="/avaliacao")content=<AssessmentPage/>; else if(path==="/indicadores")content=<IndicatorsPage/>; else if(path==="/habilidades")content=<SkillsPage/>; else if(path==="/objetivos")content=<ObjectivesPage/>; else if(path==="/atividades")content=<ActivityBankPage/>; else if(path.startsWith("/atividades/"))content=<ActivityDetailPage activityId={path.split("/").at(-1) ?? ""}/>; else if(path==="/pei")content=<PeiPage/>; else if(path==="/resumo")content=<SummaryPage/>; else content=<Dashboard/>;
 return <AppShell>{content}</AppShell>}
