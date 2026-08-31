# Percurso — Educação Inclusiva

Protótipo de produto digital em fase de **Discovery** para investigar como apoiar profissionais da educação inclusiva na transformação de avaliações em planejamento de ações educacionais.

O projeto explora um percurso assistido e transparente:

**Avaliação → Indicadores → Habilidades → Objetivos → Atividades → Documento institucional**

A solução foi construída como protótipo navegável para validar o problema, o fluxo e o modelo conceitual com profissionais antes de decisões de arquitetura de produção. O desenvolvimento combina modelagem de domínio, regras de associação explícitas, interface navegável e testes automatizados.

> **Estado atual:** protótipo em Discovery. Os dados são fictícios e as sugestões demonstrativas. O projeto ainda passará por etapas de validação com profissionais antes da definição de uma solução de produção.

## Competências demonstradas

- Desenvolvimento com Next.js, React e TypeScript em modo estrito
- Modelagem de domínio e regras de negócio puras e transparentes
- Organização de componentes, dados e experiências por responsabilidade
- Testes automatizados com Vitest
- Construção orientada por Discovery e validação de hipóteses
- Tratamento explícito de limitações, autoria, acessibilidade e segurança de conteúdo

## Contexto do Discovery

O protótipo foi desenvolvido durante uma etapa de descoberta e validação de oportunidade de produto. A identidade “Percurso” é provisória e não representa uma definição comercial.

## Objetivo

Investigar se um fluxo assistido pode reduzir o intervalo entre o registro de uma avaliação do desenvolvimento e o planejamento de ações educacionais. O protótipo foi feito para sessões de Discovery com o profissional parceiro e outros profissionais, permitindo encontrar erros de compreensão antes de qualquer arquitetura de produção.

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

Os testes cobrem associações, filtros isolados e combinados, estado vazio, variações de complexidade, metadados obrigatórios e a barreira editorial contra sugestões sem autoria, licença, versão ou estado editorial.

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

## Banco demonstrativo de atividades

A amostra local reúne 12 atividades inteiramente originais e não validadas profissionalmente: três de comunicação e expressão, três de interação e participação, três de autonomia e rotina e três de habilidades acadêmicas funcionais. Ela serve para testar o modelo de informação e a experiência de análise; não é catálogo prescritivo nem recomendação definitiva.

Cada atividade registra identificador, título, descrição, finalidade, habilidades e objetivos relacionados, contexto, etapa apenas indicativa, modalidade, materiais, duração, apoio, complexidade e eventuais variações. Também explicita adaptações, acessibilidade, orientações, elementos a observar, registro de resultados, próximos passos, autoria, licença, estado editorial, versão e data de revisão.

Na rota `/atividades`, os filtros por habilidade, objetivo, contexto, modalidade, complexidade, adaptação e acessibilidade são combinados com lógica **E**. Se nenhum item atender a todos os critérios, o estado vazio mantém os filtros visíveis e não inventa resultados nem remove escolhas. Filtros e decisões são compartilhados entre catálogo e detalhes durante a navegação. Selecionar ou rejeitar é sempre uma ação explícita do profissional e permanece somente na memória da sessão, sendo reiniciado ao atualizar a página.

## Limitações e segurança do conteúdo

Todos os nomes, contextos, avaliações e perfis são fictícios. As atividades são originais, demonstrativas e ainda não foram validadas profissionalmente. Não há itens de instrumentos oficiais, conteúdo de planilhas comerciais, materiais internos de concorrentes, diagnósticos, informações clínicas ou documentos pessoais.

A ferramenta apoia, mas não substitui, a decisão do profissional. As prévias de PEI, PDI ou PAEE não são documentos definitivos, não reproduzem formulários oficiais e não representam promessa clínica, diagnóstica ou legal. Os três tipos não são tratados como sinônimos; finalidade, estrutura, nomenclatura e aplicação precisam ser confirmadas no contexto institucional.

Por decisão de escopo, não foram implementados banco de dados, autenticação, autorização, IA, API, impressão, PDF, assinatura, compartilhamento, deploy, integrações, uploads, pagamentos, analytics ou e-mail. O estado das escolhas é local e efêmero e reinicia ao recarregar as páginas. A demonstração não usa diagnóstico como regra automática, não contém dados reais e não reproduz Inventário Portage ou qualquer conteúdo protegido.

## Decisões a validar com os profissionais

- Se a sequência proposta representa o raciocínio real dos profissionais.
- Quais informações mínimas de uma avaliação devem chegar aos indicadores.
- Se as cinco áreas genéricas ajudam ou restringem o planejamento.
- Como explicar as associações sem sugerir automatismo ou prescrição.
- Quais campos tornam uma atividade realmente aplicável no cotidiano.
- Como registrar apoio, adaptações e evolução sem linguagem estigmatizante.
- Qual participação de estudante, família e equipe deve aparecer no PEI.
- Quais responsabilidades de revisão e autoria precisam ficar visíveis.

## Próximos passos do Discovery

Consolidar a coleta com os profissionais, conduzir as etapas de validação previstas, registrar pontos de hesitação e divergências, revisar o modelo conceitual e priorizar hipóteses. Somente depois disso avaliar arquitetura de produção, modelo de dados, governança de conteúdo, acessibilidade aprofundada, privacidade e requisitos legais.
