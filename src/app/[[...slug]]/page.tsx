"use client";
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Dashboard, StudentsPage, StudentPage, AssessmentPage, IndicatorsPage, SkillsPage, ObjectivesPage, ActivitiesPage, ActivityPage, PeiPage, SummaryPage } from "@/components/pages";

export default function Page(){const path=usePathname();let content:React.ReactNode;
 if(path==="/")content=<Dashboard/>; else if(path==="/estudantes")content=<StudentsPage/>; else if(path.startsWith("/estudantes/"))content=<StudentPage/>; else if(path==="/avaliacao")content=<AssessmentPage/>; else if(path==="/indicadores")content=<IndicatorsPage/>; else if(path==="/habilidades")content=<SkillsPage/>; else if(path==="/objetivos")content=<ObjectivesPage/>; else if(path==="/atividades")content=<ActivitiesPage/>; else if(path.startsWith("/atividades/"))content=<ActivityPage/>; else if(path==="/pei")content=<PeiPage/>; else if(path==="/resumo")content=<SummaryPage/>; else content=<Dashboard/>;
 return <AppShell>{content}</AppShell>}
