import Link from "next/link";

export function BackToActivitiesLink() {
  return <Link href="/atividades" className="btn btn-ghost"><span aria-hidden="true">←</span>Voltar às atividades</Link>;
}
