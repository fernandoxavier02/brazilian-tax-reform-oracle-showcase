import {
  ArchitectureLayer,
  ChatThread,
  ComparisonRow,
  CorpusArticle,
  IndexedDocument,
  KpiItem,
  MetricBar,
  PipelineStage,
  TaxCard,
} from './models';

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
    title: 'IBS saúde — alíquota reduzida',
    updatedAt: new Date('2026-07-08T14:30:00'),
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Qual a alíquota de IBS para serviços de saúde?',
        timestamp: new Date('2026-07-08T14:28:00'),
      },
      {
        id: 'm2',
        role: 'oracle',
        content:
          'De acordo com o Art. 15 da LC 214/2025:\n\n"Os serviços de saúde, incluindo planos de saúde e atendimento hospitalar, estão sujeitos à alíquota reduzida de IBS de cinco por cento."\n\nEste dispositivo trata especificamente de IBS. A alíquota reduzida de 5% aplica-se a planos de saúde e atendimento hospitalar.',
        timestamp: new Date('2026-07-08T14:28:02'),
        confidence: 'Alta',
        processingTimeMs: 312,
        citations: [
          {
            fonte: 'LC 214/2025',
            artigo: 'Art. 15, § 1º',
            confianca: 'Alta',
            dataIndexado: '2024-01-15',
            trecho: 'alíquota reduzida de IBS de cinco por cento',
          },
        ],
      },
    ],
  },
  {
    id: 't2',
    title: 'CBS e crédito integral',
    updatedAt: new Date('2026-07-07T10:15:00'),
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: 'A CBS admite aproveitamento de crédito?',
        timestamp: new Date('2026-07-07T10:14:00'),
      },
      {
        id: 'm4',
        role: 'oracle',
        content:
          'De acordo com o Art. 25 da LC 214/2025:\n\n"A Contribuição sobre Bens e Serviços não é cumulativa, admitindo-se o aproveitamento de crédito nas aquisições subsequentes."\n\nA CBS é não-cumulativa e admite crédito integral nas aquisições.',
        timestamp: new Date('2026-07-07T10:14:01'),
        confidence: 'Alta',
        processingTimeMs: 287,
        citations: [
          {
            fonte: 'LC 214/2025',
            artigo: 'Art. 25',
            confianca: 'Alta',
            dataIndexado: '2024-01-15',
          },
        ],
      },
    ],
  },
  {
    id: 't3',
    title: 'Imposto Seletivo — bens',
    updatedAt: new Date('2026-07-06T16:00:00'),
    messages: [],
  },
];

export const DASHBOARD_KPIS: KpiItem[] = [
  { label: 'Documentos', value: '3.847', color: '#1565C0' },
  { label: 'Chunks', value: '12.412', color: '#2E7D32' },
  { label: 'Fontes', value: '6', color: '#E65100' },
  { label: 'Último Crawl', value: 'Hoje 06:00', color: '#6A1B9A' },
];

export const INDEXED_DOCUMENTS: IndexedDocument[] = [
  { fonte: 'Planalto', documento: 'LC 214/2025', tipo: 'Lei Complementar', chunks: 245, status: 'Indexado' },
  { fonte: 'Receita Federal', documento: 'Parecer COSIT 45/2024', tipo: 'Parecer', chunks: 18, status: 'Indexado' },
  { fonte: 'Senado', documento: 'PEC 45/2019', tipo: 'Emenda Constitucional', chunks: 312, status: 'Indexado' },
  { fonte: 'STF', documento: 'ADI 7.234', tipo: 'Ação Direta', chunks: 89, status: 'Indexado' },
  { fonte: 'STJ', documento: 'REsp 1.892.345', tipo: 'Recurso Especial', chunks: 34, status: 'Indexado' },
  { fonte: 'Câmara', documento: 'PL 2.456/2024', tipo: 'Projeto de Lei', chunks: 67, status: 'Pendente' },
];

export const TAX_CARDS: TaxCard[] = [
  {
    code: 'IBS',
    name: 'Imposto sobre Bens e Serviços',
    color: '#1565C0',
    bullets: [
      'Não-cumulativo',
      'Crédito integral',
      'Alíquota padrão: ~17%',
      'Saúde: 5% (reduzida)',
      'Exportação: isento',
      'Gestor: Estados/Municípios',
    ],
  },
  {
    code: 'CBS',
    name: 'Contribuição sobre Bens e Serviços',
    color: '#2E7D32',
    bullets: [
      'Não-cumulativa',
      'Crédito integral',
      'Alíquota padrão: ~9%',
      'Telecom: 12% (específica)',
      'Financeiras: regime especial',
      'Gestor: União',
    ],
  },
  {
    code: 'IS',
    name: 'Imposto Seletivo',
    color: '#E65100',
    bullets: [
      'Cumulativo',
      'Sem crédito',
      'Alíquota: até 30%',
      'Bebidas, cigarros, armas',
      'Combustíveis fósseis',
      'Gestor: União',
    ],
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    title: 'Fontes Oficiais',
    subtitle: 'HTML / PDF',
    color: '#1565C0',
    items: [
      { label: 'Planalto', detail: 'Legislação' },
      { label: 'Receita Fed', detail: 'Pareceres' },
      { label: 'Senado', detail: 'Projetos' },
      { label: 'STF/STJ', detail: 'Jurisprudência' },
    ],
  },
  {
    title: 'ETL',
    subtitle: 'Crawl · Parse · Chunk · Embed',
    color: '#6A1B9A',
    items: [{ label: '384-dim vectors', detail: 'FAISS index' }],
  },
  {
    title: 'Retrieval',
    subtitle: 'Top-K = 5',
    color: '#2E7D32',
    items: [
      { label: 'Query Embedding', detail: 'MiniLM-L6-v2' },
      { label: 'Similarity Search', detail: 'FAISS' },
      { label: 'Reranking', detail: 'Cross-encoder' },
    ],
  },
  {
    title: 'Generation',
    subtitle: 'Context + Citation',
    color: '#E65100',
    items: [{ label: 'Llama 3 8B (Local)', detail: 'Temp=0.3' }],
  },
];

export const METRIC_BARS: MetricBar[] = [
  { label: 'Precisão de Citações', value: 98.7, color: '#1565C0' },
  { label: 'Satisfação do Usuário', value: 96.0, color: '#2E7D32' },
  { label: 'Redução Tempo Pesquisa', value: 92.0, color: '#E65100' },
  { label: 'Taxa de Retenção', value: 98.0, color: '#6A1B9A' },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    metrica: 'Tempo de pesquisa tributária',
    antes: '2-4 horas',
    depois: '15 minutos',
    melhoria: '92%',
  },
  {
    metrica: 'Precisão de fontes citadas',
    antes: 'Estimativa',
    depois: '100% verificável',
    melhoria: 'Qualitativo',
  },
  {
    metrica: 'Custo por consulta',
    antes: 'R$ 800-1.500',
    depois: 'R$ 0 (sistema)',
    melhoria: '100%',
  },
  {
    metrica: 'Satisfação do cliente',
    antes: 'N/A',
    depois: '4.8/5.0',
    melhoria: 'Qualitativo',
  },
  {
    metrica: 'Onboarding de novos advogados',
    antes: '3 meses',
    depois: '2 semanas',
    melhoria: '83%',
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    title: 'DATA SOURCES',
    color: '#1565C0',
    items: [
      { label: 'Planalto', detail: 'Legislação' },
      { label: 'Receita Fed', detail: 'Pareceres' },
      { label: 'Senado', detail: 'Projetos' },
      { label: 'STF/STJ', detail: 'Jurisprudência' },
      { label: 'Câmara', detail: 'Projetos' },
    ],
  },
  {
    title: 'RAG PIPELINE',
    color: '#6A1B9A',
    items: [{ label: 'RAG Pipeline (Python)', detail: 'Crawl · Parse · Chunk · Embed · Index' }],
  },
  {
    title: 'RETRIEVAL',
    color: '#2E7D32',
    items: [
      { label: 'FAISS Index', detail: '384-dim | L2 | Local' },
      { label: 'Similarity Search', detail: 'Top-K=5 | Reranker' },
      { label: 'Context Assembly', detail: 'Top-3 + Metadata' },
    ],
  },
  {
    title: 'GENERATION',
    color: '#E65100',
    items: [{ label: 'Llama 3 8B (Ollama)', detail: 'Local GPU/CPU | Temp=0.3' }],
  },
  {
    title: 'FRONTEND',
    color: '#455A64',
    items: [{ label: 'Angular 17 Dashboard', detail: 'Chat · Threads · Citations · Export PDF/DOCX' }],
  },
];
