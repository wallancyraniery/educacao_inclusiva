import type { Activity, Indicator, InstitutionalDocument, Objective, Skill, Student } from "@/domain/types";

export const institutionalDocuments: InstitutionalDocument[] = [
  { type: "PEI", name: "Plano Educacional Individualizado", description: "Opção demonstrativa para organizar um planejamento educacional individualizado conforme as práticas da instituição.", caution: "A finalidade, a composição e a nomenclatura devem ser confirmadas pela equipe responsável." },
  { type: "PDI", name: "Plano de Desenvolvimento Individual", description: "Opção demonstrativa para instituições que adotam um plano de desenvolvimento individual em seu percurso próprio.", caution: "Não é apresentado como sinônimo do PEI nem como reprodução de um formulário institucional." },
  { type: "PAEE", name: "Plano de Atendimento Educacional Especializado", description: "Opção demonstrativa para organizar discussões relacionadas ao atendimento educacional especializado.", caution: "Seu escopo deve ser definido pelo profissional e pelas regras aplicáveis à instituição." },
];

export const students: Student[] = [
  { id: "lia", name: "Lia Monteiro", initials: "LM", age: "8 anos", context: "2º ano · acompanhamento escolar", lastUpdate: "Hoje, 09:40" },
  { id: "caio", name: "Caio Nunes", initials: "CN", age: "10 anos", context: "4º ano · acompanhamento escolar", lastUpdate: "Ontem, 15:20" },
  { id: "maya", name: "Maya Alves", initials: "MA", age: "7 anos", context: "1º ano · acompanhamento escolar", lastUpdate: "05 ago, 11:10" },
];

export const indicators: Indicator[] = [
  { id: "i1", area: "Linguagem", label: "Organiza informações para relatar uma experiência breve", status: "em-desenvolvimento" },
  { id: "i2", area: "Cognição", label: "Sustenta uma estratégia simples diante de um desafio", status: "potencial" },
  { id: "i3", area: "Socialização", label: "Participa de uma atividade compartilhada com turnos", status: "em-desenvolvimento" },
  { id: "i4", area: "Autocuidados", label: "Segue uma sequência visual em uma rotina conhecida", status: "consolidado" },
  { id: "i5", area: "Desenvolvimento motor", label: "Coordena movimentos finos em tarefas de sala", status: "em-desenvolvimento" },
];

export const skills: Skill[] = [
  { id: "h1", area: "Linguagem", name: "Construir narrativas curtas em sequência", indicatorIds: ["i1"] },
  { id: "h2", area: "Cognição", name: "Planejar e revisar uma estratégia", indicatorIds: ["i2"] },
  { id: "h3", area: "Socialização", name: "Alternar turnos e comunicar escolhas", indicatorIds: ["i3"] },
  { id: "h4", area: "Autocuidados", name: "Executar rotinas com pistas graduais", indicatorIds: ["i4"] },
  { id: "h5", area: "Desenvolvimento motor", name: "Aprimorar precisão em movimentos manuais", indicatorIds: ["i5"] },
];

export const objectives: Objective[] = [
  { id: "o1", skillId: "h1", title: "Relatar uma experiência usando começo, meio e fim", horizon: "8 semanas" },
  { id: "o2", skillId: "h2", title: "Escolher e testar uma estratégia entre duas opções", horizon: "6 semanas" },
  { id: "o3", skillId: "h3", title: "Participar de quatro trocas de turno com apoio visual", horizon: "6 semanas" },
  { id: "o4", skillId: "h4", title: "Concluir uma rotina de três etapas com redução de pistas", horizon: "10 semanas" },
  { id: "o5", skillId: "h5", title: "Manipular materiais de sala com maior controle", horizon: "8 semanas" },
];

export const activities: Activity[] = [
  { id: "a1", name: "Três cenas, uma história", summary: "Organização de cartões autorais para criar e contar uma pequena narrativa.", area: "Linguagem", skillId: "h1", objectiveId: "o1", ageRange: "6 a 10 anos (indicativa)", supportLevel: "Pistas visuais e perguntas abertas", environment: "Sala de aula ou atendimento individual", materials: ["3 cartões em branco", "Lápis de cor", "Cronômetro opcional"], preparation: "Desenhe ou combine três cenas familiares e embaralhe os cartões.", steps: ["Convide o estudante a observar as cenas.", "Peça que escolha uma ordem possível.", "Apoie o relato com perguntas sobre começo, meio e fim.", "Registre quais pistas foram necessárias."], adaptations: ["Usar fotografias genéricas do ambiente", "Oferecer duas opções de conectivos", "Permitir resposta oral, escrita ou por apontar"], observationCriterion: "Organiza três momentos e comunica ao menos uma relação entre eles, registrando o nível de apoio.", source: "Conteúdo original demonstrativo", author: "Equipe de produto — protótipo", reviewStatus: "Não validada profissionalmente" },
  { id: "a2", name: "Qual caminho funciona?", summary: "Desafio com duas estratégias possíveis e espaço para testar e revisar.", area: "Cognição", skillId: "h2", objectiveId: "o2", ageRange: "7 a 12 anos (indicativa)", supportLevel: "Mediação verbal leve", environment: "Mesa de trabalho", materials: ["Blocos", "Duas fichas de estratégia", "Folha de registro"], preparation: "Monte um modelo simples com blocos e prepare duas sugestões de caminho.", steps: ["Apresente o resultado esperado.", "Leia as duas estratégias.", "Deixe o estudante escolher e testar.", "Converse sobre manter ou trocar a estratégia."], adaptations: ["Diminuir o número de peças", "Demonstrar a primeira ação", "Usar símbolos nas fichas"], observationCriterion: "Escolhe uma estratégia e sinaliza se deseja mantê-la ou revisá-la.", source: "Conteúdo original demonstrativo", author: "Equipe de produto — protótipo", reviewStatus: "Não validada profissionalmente" },
  { id: "a3", name: "Construção em turnos", summary: "Construção coletiva em que cada participante escolhe e adiciona uma peça.", area: "Socialização", skillId: "h3", objectiveId: "o3", ageRange: "6 a 11 anos (indicativa)", supportLevel: "Marcador visual de turno", environment: "Dupla ou pequeno grupo", materials: ["Peças de montar", "Cartão ‘minha vez/sua vez’"], preparation: "Disponha poucas peças ao alcance e combine um objetivo comum.", steps: ["Apresente o marcador de turno.", "Cada pessoa escolhe uma peça por vez.", "Modele uma forma de pedir ou recusar.", "Celebre o resultado coletivo sem comparar desempenhos."], adaptations: ["Reduzir o grupo para duas pessoas", "Usar escolhas por apontar", "Prever uma pausa combinada"], observationCriterion: "Realiza quatro trocas, comunicando escolha com o recurso que preferir.", source: "Conteúdo original demonstrativo", author: "Equipe de produto — protótipo", reviewStatus: "Não validada profissionalmente" },
  { id: "a4", name: "Meu roteiro de organização", summary: "Sequência visual para guardar materiais ao fim de uma atividade.", area: "Autocuidados", skillId: "h4", objectiveId: "o4", ageRange: "6 a 12 anos (indicativa)", supportLevel: "Pistas visuais graduais", environment: "Sala de aula", materials: ["Três cartões de etapas", "Caixa organizadora"], preparation: "Crie cartões genéricos: separar, guardar e conferir.", steps: ["Apresente toda a sequência.", "Realize a rotina com as pistas disponíveis.", "Retire uma pista quando houver segurança.", "Registre autonomia e preferências."], adaptations: ["Usar objetos reais como pistas", "Dividir uma etapa", "Manter todas as pistas pelo tempo necessário"], observationCriterion: "Conclui a rotina com registro do tipo e da quantidade de pistas.", source: "Conteúdo original demonstrativo", author: "Equipe de produto — protótipo", reviewStatus: "Não validada profissionalmente" },
];
