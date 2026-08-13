"use client";

import { createContext, useContext, useState } from "react";
import { decideSuggestion } from "../domain/rules";
import type { ActivityFilters, SuggestionDecision } from "../domain/types";

type ActivitySession = {
  decisions: Record<string, SuggestionDecision>;
  decide: (activityId: string, decision: "selected" | "rejected") => void;
  filters: ActivityFilters;
  setFilters: React.Dispatch<React.SetStateAction<ActivityFilters>>;
};

const ActivitySessionContext = createContext<ActivitySession | null>(null);

export function ActivitySessionProvider({ children }: { children: React.ReactNode }) {
  const [decisions, setDecisions] = useState<Record<string, SuggestionDecision>>({});
  const [filters, setFilters] = useState<ActivityFilters>({});
  const decide = (activityId: string, decision: "selected" | "rejected") =>
    setDecisions((current) => decideSuggestion(current, activityId, decision));

  return <ActivitySessionContext value={{ decisions, decide, filters, setFilters }}>{children}</ActivitySessionContext>;
}

export function useActivitySession() {
  const session = useContext(ActivitySessionContext);
  if (!session) throw new Error("useActivitySession deve ser usado dentro de ActivitySessionProvider");
  return session;
}
