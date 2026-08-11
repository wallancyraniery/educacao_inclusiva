# Percurso — protótipo educacional

Protótipo visual navegável criado para a etapa **PRC-026 — Identificar Oportunidade de Produto** da Improve. A identidade “Percurso” é provisória e não representa uma definição comercial.

## Objetivo

Investigar se um fluxo assistido pode reduzir o intervalo entre o registro de uma avaliação do desenvolvimento e o planejamento de ações educacionais. O protótipo foi feito para uma sessão de Discovery com o profissional parceiro e outros profissionais, permitindo encontrar erros de compreensão antes de qualquer arquitetura de produção.

## Problema investigado e fluxo

Profissionais precisam transformar resultados observados em decisões aplicáveis. A demonstração torna explícito o caminho:

**Avaliação → Indicadores → Habilidades → Objetivos → Atividades → Documento institucional**

As associações são regras locais, puras e transparentes. Indicadores, objetivos e atividades são sugestões para análise: o profissional pode selecionar, editar ou rejeitar no estado efêmero da demonstração. Na etapa final, PEI, PDI e PAEE aparecem como tipos distintos e configuráveis, sem pressupor equivalência de estrutura ou finalidade.

## Stack

- Next.js 16 com App Router e diretório `src`
- React 19 e TypeScript 5.9 em modo estrito
- Tailwind CSS 4
- ESLint 9
- Vitest 4
- npm

## Instalação e execução

Requer Node.js 20.9 ou superior (desenvolvido com Node 22).

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Verificações

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm audit
```

Os testes cobrem associações entre resultados, habilidades, objetivos e atividades, seleção de objetivos e filtragem das atividades.

## Rotas

| Rota | Experiência |
| --- | --- |
| `/` | Painel inicial |
| `/estudantes` | Lista de estudantes fictícios |
| `/estudantes/lia` | Perfil demonstrativo |
| `/avaliacao` | Início e registro da avaliação |
| `/indicadores` | Indicadores por área |
| `/habilidades` | Habilidades relacionadas |
| `/objetivos` | Seleção de objetivos |
| `/atividades` | Banco e seleção de atividades |
| `/atividades/a1` | Detalhes de uma atividade |
| `/pei` | Seleção entre PEI, PDI e PAEE e composição demonstrativa da prévia |
| `/resumo` | Resumo do caminho percorrido |

## Organização do código

- `src/app`: entrada, estilos globais e roteamento do protótipo
- `src/components`: shell, componentes visuais e experiências de cada etapa
- `src/domain`: tipos e regras puras de associação
- `src/data`: dados locais fictícios e atividades autorais demonstrativas

## Limitações e segurança do conteúdo

Todos os nomes, contextos, avaliações e perfis são fictícios. As atividades são originais, demonstrativas e ainda não foram validadas profissionalmente. Não há itens de instrumentos oficiais, conteúdo de planilhas comerciais, materiais internos de concorrentes, diagnósticos, informações clínicas ou documentos pessoais.

A ferramenta apoia, mas não substitui, a decisão do profissional. As prévias de PEI, PDI ou PAEE não são documentos definitivos, não reproduzem formulários oficiais e não representam promessa clínica, diagnóstica ou legal. Os três tipos não são tratados como sinônimos; finalidade, estrutura, nomenclatura e aplicação precisam ser confirmadas no contexto institucional.

Por decisão de escopo, não foram implementados banco de dados, autenticação, autorização, automações generativas, serviços externos, uploads, pagamentos, analytics, e-mail, PDF definitivo, deploy ou repositório remoto. O estado das escolhas é efêmero e reinicia ao recarregar algumas páginas.

## Decisões a validar com o profissional parceiro

- Se a sequência proposta representa o raciocínio real do profissional.
- Quais informações mínimas de uma avaliação devem chegar aos indicadores.
- Se as cinco áreas genéricas ajudam ou restringem o planejamento.
- Como explicar as associações sem sugerir automatismo ou prescrição.
- Quais campos tornam uma atividade realmente aplicável no cotidiano.
- Como registrar apoio, adaptações e evolução sem linguagem estigmatizante.
- Qual participação de estudante, família e equipe deve aparecer no PEI.
- Quais responsabilidades de revisão e autoria precisam ficar visíveis.

## Próximos passos após o Discovery

Conduzir uma sessão moderada, registrar pontos de hesitação e divergências, revisar o modelo conceitual e priorizar hipóteses. Somente depois disso avaliar arquitetura de produção, modelo de dados, governança de conteúdo, acessibilidade aprofundada, privacidade e requisitos legais.
