import {
  ChatThread,
  CorpusArticle,
  FaqItem,
  NavItem,
  OfficialSourceRow,
  RetrievedSource,
  RiskItem,
} from './models';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Chat Inteligente', path: '/chat', icon: 'chat' },
  { label: 'Fontes Oficiais', path: '/fontes', icon: 'sources' },
  { label: 'Indexação', path: '/indexacao', icon: 'index' },
  { label: 'Visão Geral da Reforma', path: '/reforma', icon: 'reforma' },
  { label: 'Métricas de Confiança', path: '/metricas', icon: 'metrics' },
  { label: 'Exportações', path: '/exportacoes', icon: 'export' },
  { label: 'Configurações', path: '/configuracoes', icon: 'settings' },
];

export const SUGGESTED_QUESTIONS: string[] = [
  'Qual a alíquota de IBS para serviços de saúde?',
  'A CBS admite crédito nas aquisições?',
  'Quais bens estão sujeitos ao Imposto Seletivo?',
  'Exportações de serviços são isentas de IBS?',
  'Como fica a cesta básica no IBS?',
];

export const CORPUS_ARTICLES: CorpusArticle[] = [
  {
    article: 'Art. 15',
    taxType: 'IBS',
    text: 'Os serviços de saúde, incluindo planos de saúde e atendimento hospitalar, estão sujeitos à alíquota reduzida de IBS de cinco por cento.',
    keywords: ['saude', 'saúde', 'hospital', 'plano', 'aliquota', 'alíquota', 'ibs', '5%', 'cinco'],
  },
  {
    article: 'Art. 16',
    taxType: 'IBS',
    text: 'As operações de exportação de bens e serviços para o exterior são isentas do Imposto sobre Bens e Serviços.',
    keywords: ['exportacao', 'exportação', 'exportacoes', 'exportações', 'exterior', 'isento', 'isenta', 'ibs'],
  },
  {
    article: 'Art. 17',
    taxType: 'IBS',
    text: 'O crédito do IBS será admitido nas aquisições de bens e serviços utilizados como insumo nas atividades econômicas do contribuinte.',
    keywords: ['credito', 'crédito', 'insumo', 'aquisicao', 'aquisição', 'ibs'],
  },
  {
    article: 'Art. 18',
    taxType: 'IBS',
    text: 'A base de cálculo do IBS é o valor da operação de que resulta a saída de bem ou prestação de serviço.',
    keywords: ['base', 'calculo', 'cálculo', 'operacao', 'operação', 'ibs'],
  },
  {
    article: 'Art. 19',
    taxType: 'IBS',
    text: 'As operações com alimentos da cesta básica terão alíquota zero do IBS, conforme lista definida em regulamento.',
    keywords: ['cesta', 'basica', 'básica', 'alimentos', 'zero', 'ibs'],
  },
  {
    article: 'Art. 25',
    taxType: 'CBS',
    text: 'A Contribuição sobre Bens e Serviços não é cumulativa, admitindo-se o aproveitamento de crédito nas aquisições subsequentes.',
    keywords: ['credito', 'crédito', 'nao-cumulativa', 'não-cumulativa', 'nao cumulativa', 'não cumulativa', 'cumulativa', 'cbs'],
  },
  {
    article: 'Art. 26',
    taxType: 'CBS',
    text: 'A alíquota padrão da CBS será de nove por cento, podendo ser alterada por lei complementar em casos excepcionais.',
    keywords: ['aliquota', 'alíquota', 'padrao', 'padrão', '9%', 'nove', 'cbs'],
  },
  {
    article: 'Art. 27',
    taxType: 'CBS',
    text: 'As operações interestaduais de bens e serviços serão tributadas pelo CBS à alíquota de destino, conforme local do destinatário.',
    keywords: ['interestadual', 'destino', 'cbs'],
  },
  {
    article: 'Art. 28',
    taxType: 'CBS',
    text: 'As instituições financeiras estão sujeitas ao regime especial de CBS, com alíquota diferenciada e regras próprias de creditamento.',
    keywords: ['financeira', 'financeiras', 'banco', 'regime especial', 'cbs'],
  },
  {
    article: 'Art. 29',
    taxType: 'CBS',
    text: 'As prestações de serviços de telecomunicações terão alíquota específica de CBS de doze por cento.',
    keywords: ['telecom', 'telecomunicacoes', 'telecomunicações', '12%', 'doze', 'cbs'],
  },
  {
    article: 'Art. 30',
    taxType: 'CBS',
    text: 'As exportações de bens e serviços não sofrem incidência da CBS, assegurado o creditamento das aquisições vinculadas.',
    keywords: ['exportacao', 'exportação', 'exportacoes', 'exportações', 'servicos', 'serviços', 'cbs', 'incide', 'incidencia', 'incidência'],
  },
  {
    article: 'Art. 40',
    taxType: 'IS',
    text: 'O Imposto Seletivo incide sobre bens e serviços específicos que causem externalidades negativas à saúde ou ao meio ambiente.',
    keywords: ['seletivo', 'externalidade', 'is', 'imposto seletivo'],
  },
  {
    article: 'Art. 41',
    taxType: 'IS',
    text: 'Estão sujeitos ao IS: bebidas alcoólicas, cigarros, armas de fogo, combustíveis fósseis e veículos automotores.',
    keywords: ['bebidas', 'cigarros', 'armas', 'combustiveis', 'combustíveis', 'veiculos', 'veículos', 'bens', 'is'],
  },
  {
    article: 'Art. 42',
    taxType: 'IS',
    text: 'A alíquota do IS será definida em lei ordinária por produto, podendo atingir até trinta por cento do preço de venda.',
    keywords: ['30%', 'trinta', 'aliquota', 'alíquota', 'is'],
  },
  {
    article: 'Art. 43',
    taxType: 'IS',
    text: 'O IS não gera direito a crédito, sendo um imposto de custeio específico de políticas públicas setoriais.',
    keywords: ['sem credito', 'sem crédito', 'nao gera', 'não gera', 'credito', 'crédito', 'is'],
  },
  {
    article: 'Art. 44',
    taxType: 'IS',
    text: 'As bebidas açucaradas artificialmente terão alíquota progressiva de IS conforme teor de açúcar adicionado.',
    keywords: ['acucaradas', 'açucaradas', 'acucar', 'açúcar', 'bebidas', 'is'],
  },
];

export const INITIAL_THREADS: ChatThread[] = [
  {
    id: 't1',
    title: 'A CBS incide sobre exportações de serviços?',
    updatedAt: new Date('2025-05-13T10:24:00'),
    preview: 'Não — a CBS não incide sobre exportações…',
    tag: 'CBS',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'A CBS incide sobre exportações de serviços?',
        timestamp: new Date('2025-05-13T10:23:00'),
      },
      {
        id: 'm2',
        role: 'oracle',
        content:
          'Não\n\nA CBS não incide sobre exportações de serviços, nos termos da Emenda Constitucional nº 132/2023 e da legislação complementar de regulamentação.',
        timestamp: new Date('2025-05-13T10:24:00'),
        confidence: 'Alta',
        processingTimeMs: 1420,
        citations: [
          {
            fonte: 'EC 132/2023',
            artigo: 'Art. 156-A',
            confianca: 'Alta',
            dataIndexado: '2024-01-10',
            trecho: 'não incidência sobre exportações',
          },
          {
            fonte: 'LC 214/2025',
            artigo: 'Art. 30',
            confianca: 'Alta',
            dataIndexado: '2025-01-15',
          },
        ],
        structured: {
          directAnswer: 'Não',
          summary:
            'A CBS não incide sobre exportações de serviços, nos termos da Emenda Constitucional nº 132/2023 e da legislação complementar de regulamentação.',
          fundamentos: [
            'A EC 132/2023 [1] estabelece a não incidência da CBS sobre exportações de bens e serviços.',
            'A LC 214/2025 [2] detalha o regime de isenção e o tratamento de créditos nas operações de exportação.',
            'O entendimento da Receita Federal [3] reforça a aplicação do princípio do destino nas operações internacionais.',
          ],
          conclusao:
            'Exportações de serviços permanecem fora do campo de incidência da CBS, desde que comprovada a efetiva prestação ao exterior.',
          fontesCitadas: [
            { n: 1, label: 'EC 132/2023' },
            { n: 2, label: 'LC 214/2025' },
            { n: 3, label: 'Parecer COSIT 12/2025' },
          ],
        },
      },
    ],
  },
  {
    id: 't2',
    title: 'Alíquota reduzida de IBS para saúde',
    updatedAt: new Date('2025-05-12T16:40:00'),
    preview: 'Serviços de saúde: 5%…',
    tag: 'IBS',
    messages: [],
  },
  {
    id: 't3',
    title: 'Split Payment — cronograma 2026',
    updatedAt: new Date('2025-05-12T11:10:00'),
    preview: 'Fase piloto e obrigações…',
    tag: 'Split Payment',
    messages: [],
  },
  {
    id: 't4',
    title: 'Cashback da cesta básica',
    updatedAt: new Date('2025-05-11T09:05:00'),
    preview: 'Devolução parcial a famílias…',
    tag: 'Cashback',
    messages: [],
  },
  {
    id: 't5',
    title: 'Imposto Seletivo — combustíveis',
    updatedAt: new Date('2025-05-10T14:22:00'),
    preview: 'Incidência e alíquotas…',
    tag: 'IS',
    messages: [],
  },
  {
    id: 't6',
    title: 'Zona Franca de Manaus — transição',
    updatedAt: new Date('2025-05-09T18:00:00'),
    preview: 'Regimes especiais mantidos…',
    tag: 'Zona Franca',
    messages: [],
  },
];

export const RETRIEVED_SOURCES: RetrievedSource[] = [
  {
    id: 's1',
    title: 'EC 132/2023',
    badge: 'Fonte oficial',
    confianca: 96,
    relevancia: 5,
    tipo: 'Emenda Constitucional',
    publicacao: '20/12/2023',
    org: 'Planalto',
  },
  {
    id: 's2',
    title: 'LC 214/2025',
    badge: 'Fonte oficial',
    confianca: 94,
    relevancia: 5,
    tipo: 'Lei Complementar',
    publicacao: '16/01/2025',
    org: 'Planalto',
  },
  {
    id: 's3',
    title: 'Parecer COSIT 12/2025',
    badge: 'Fonte oficial',
    confianca: 91,
    relevancia: 4,
    tipo: 'Parecer',
    publicacao: '03/03/2025',
    org: 'Receita Federal',
  },
  {
    id: 's4',
    title: 'Nota Técnica RFB 08/2025',
    badge: 'Fonte oficial',
    confianca: 88,
    relevancia: 4,
    tipo: 'Nota Técnica',
    publicacao: '18/02/2025',
    org: 'Receita Federal',
  },
  {
    id: 's5',
    title: 'ADI 7.234 — STF',
    badge: 'Jurisprudência',
    confianca: 85,
    relevancia: 3,
    tipo: 'Ação Direta',
    publicacao: '12/11/2024',
    org: 'STF',
  },
];

export const OFFICIAL_SOURCES: OfficialSourceRow[] = [
  {
    nome: 'Planalto',
    url: 'planalto.gov.br',
    status: 'Ativa',
    ultimaAtualizacao: 'Hoje 06:12',
    documentos: '12.480',
    delta24h: '+412',
    confianca: 96,
    cobertura: 94,
  },
  {
    nome: 'Receita Federal',
    url: 'gov.br/receitafederal',
    status: 'Ativa',
    ultimaAtualizacao: 'Hoje 05:48',
    documentos: '15.980',
    delta24h: '+528',
    confianca: 95,
    cobertura: 92,
  },
  {
    nome: 'Senado Federal',
    url: 'senado.leg.br',
    status: 'Ativa',
    ultimaAtualizacao: 'Ontem 22:10',
    documentos: '7.214',
    delta24h: '+186',
    confianca: 93,
    cobertura: 89,
  },
  {
    nome: 'Câmara dos Deputados',
    url: 'camara.leg.br',
    status: 'Ativa',
    ultimaAtualizacao: 'Ontem 21:40',
    documentos: '6.102',
    delta24h: '+154',
    confianca: 91,
    cobertura: 87,
  },
  {
    nome: 'STF',
    url: 'stf.jus.br',
    status: 'Ativa',
    ultimaAtualizacao: 'Ontem 19:05',
    documentos: '3.841',
    delta24h: '+98',
    confianca: 90,
    cobertura: 84,
  },
  {
    nome: 'STJ',
    url: 'stj.jus.br',
    status: 'Ativa',
    ultimaAtualizacao: 'Ontem 18:22',
    documentos: '3.115',
    delta24h: '+72',
    confianca: 88,
    cobertura: 82,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Quando começa a cobrança plena do IBS e da CBS?',
    a: 'A cobrança plena está prevista para 2033, após o período de transição 2026–2032.',
  },
  {
    q: 'O que acontece com o ICMS e o ISS na transição?',
    a: 'Há convivência e redução gradual das alíquotas até a extinção completa em 2033–2037.',
  },
  {
    q: 'Exportações continuam isentas?',
    a: 'Sim. IBS e CBS não incidem sobre exportações de bens e serviços, com creditamento assegurado.',
  },
  {
    q: 'O Imposto Seletivo gera crédito?',
    a: 'Não. O IS é cumulativo e não gera direito a crédito.',
  },
  {
    q: 'O que é o split payment e quando será obrigatório?',
    a: 'Mecanismo de retenção automática do tributo na liquidação financeira. Piloto em 2026 e obrigatoriedade gradual entre 2027 e 2032.',
  },
];

export const RISK_ITEMS: RiskItem[] = [
  { nome: 'Definição de alíquotas padrão', status: 'amarelo', tendencia: 'Estável', spark: [40, 42, 41, 44, 43, 45, 44] },
  { nome: 'Regulamentação do split payment', status: 'laranja', tendencia: 'Em alta', spark: [30, 35, 38, 42, 48, 52, 58] },
  { nome: 'Cashback — operacionalização', status: 'amarelo', tendencia: 'Estável', spark: [50, 49, 51, 50, 52, 51, 50] },
  { nome: 'Zona Franca — regimes especiais', status: 'verde', tendencia: 'Em baixa', spark: [60, 58, 55, 52, 50, 48, 45] },
];

export const SECTOR_IMPACT = [
  { label: 'Serviços Financeiros', value: 16.4 },
  { label: 'Tecnologia', value: 12.1 },
  { label: 'Comércio', value: 8.7 },
  { label: 'Indústria', value: 4.2 },
  { label: 'Saúde', value: -1.8 },
  { label: 'Agropecuária', value: -3.1 },
];

export const THEME_DONUT = [
  { label: 'IBS', value: 28, color: '#3b82f6' },
  { label: 'CBS', value: 24, color: '#10b981' },
  { label: 'IS', value: 14, color: '#f59e0b' },
  { label: 'Split Payment', value: 12, color: '#8b5cf6' },
  { label: 'Cashback', value: 10, color: '#06b6d4' },
  { label: 'Outros', value: 12, color: '#64748b' },
];

export const NORMATIVE_EVOLUTION = [
  { m: 'Nov/24', atos: 2, acum: 8 },
  { m: 'Dez/24', atos: 3, acum: 11 },
  { m: 'Jan/25', atos: 4, acum: 15 },
  { m: 'Fev/25', atos: 2, acum: 17 },
  { m: 'Mar/25', atos: 3, acum: 20 },
  { m: 'Abr/25', atos: 2, acum: 22 },
  { m: 'Mai/25', atos: 2, acum: 24 },
];

export const INDEX_VOLUME_DONUT = [
  { label: 'Receita Federal', value: 32.8, color: '#3b82f6' },
  { label: 'Planalto', value: 25.6, color: '#10b981' },
  { label: 'Senado', value: 14.8, color: '#f59e0b' },
  { label: 'Câmara', value: 12.5, color: '#8b5cf6' },
  { label: 'STF', value: 7.9, color: '#06b6d4' },
  { label: 'STJ', value: 6.4, color: '#64748b' },
];

export const INDEX_DAILY = [1200, 1450, 1320, 1680, 1540, 1720, 1842];

export const METRIC_THEME_BARS = [
  { label: 'IBS', value: 93.7 },
  { label: 'CBS', value: 92.0 },
  { label: 'IS', value: 89.5 },
  { label: 'Split', value: 94.8 },
  { label: 'Cashback', value: 91.3 },
  { label: 'ZF', value: 90.1 },
];

export const METRIC_SOURCE_DONUT = [
  { label: 'Receita Federal', value: 31.8, color: '#3b82f6' },
  { label: 'Planalto', value: 22.6, color: '#10b981' },
  { label: 'Senado', value: 17.9, color: '#f59e0b' },
  { label: 'Câmara', value: 13.4, color: '#8b5cf6' },
  { label: 'STF', value: 8.2, color: '#06b6d4' },
  { label: 'STJ', value: 4.1, color: '#ec4899' },
  { label: 'Outras', value: 2.0, color: '#64748b' },
];

export const METRIC_WEEKLY = [
  { d: 'Qui', precisao: 88.2, citacao: 90.1 },
  { d: 'Sex', precisao: 89.0, citacao: 90.8 },
  { d: 'Sab', precisao: 89.5, citacao: 91.2 },
  { d: 'Dom', precisao: 90.1, citacao: 91.5 },
  { d: 'Seg', precisao: 91.0, citacao: 92.0 },
  { d: 'Ter', precisao: 91.8, citacao: 92.6 },
  { d: 'Qua', precisao: 92.4, citacao: 93.1 },
];

export const SOURCE_RANKING = [
  { nome: 'Planalto', confianca: 95.6 },
  { nome: 'Receita Federal', confianca: 94.2 },
  { nome: 'Senado Federal', confianca: 92.8 },
  { nome: 'Câmara dos Deputados', confianca: 90.5 },
  { nome: 'STF', confianca: 88.9 },
  { nome: 'STJ', confianca: 86.2 },
];

export const RECENT_QUERIES = [
  { pergunta: 'A CBS incide sobre exportações de serviços?', tema: 'CBS', confianca: 94.6, tempo: '1,21s', status: 'Auditável' },
  { pergunta: 'Qual alíquota de IBS para saúde?', tema: 'IBS', confianca: 93.2, tempo: '1,08s', status: 'Auditável' },
  { pergunta: 'Split payment obrigatório em 2026?', tema: 'Split Payment', confianca: 91.4, tempo: '1,55s', status: 'Auditável' },
  { pergunta: 'IS sobre combustíveis fósseis?', tema: 'CBS/IS', confianca: 89.7, tempo: '1,33s', status: 'Auditável' },
  { pergunta: 'Cashback da cesta básica — elegibilidade', tema: 'Cashback', confianca: 92.1, tempo: '1,19s', status: 'Auditável' },
];

export const EXPORT_HISTORY = [
  { nome: 'Relatório Visão Geral — Mai/2025', formato: 'PDF', data: '13/05/2025 10:02', status: 'Concluído' },
  { nome: 'Métricas de Confiança — Semana 19', formato: 'XLSX', data: '12/05/2025 18:40', status: 'Concluído' },
  { nome: 'Fontes Oficiais — inventário', formato: 'CSV', data: '11/05/2025 09:15', status: 'Concluído' },
  { nome: 'Chat — CBS exportações', formato: 'DOCX', data: '10/05/2025 16:22', status: 'Concluído' },
  { nome: 'Indexação — logs 24h', formato: 'JSON', data: '09/05/2025 07:00', status: 'Processando' },
];
