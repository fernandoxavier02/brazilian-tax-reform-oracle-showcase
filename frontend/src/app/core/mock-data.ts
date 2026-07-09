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
  'Qual a aliquota de IBS para servicos de saude?',
  'A CBS admite credito nas aquisicoes?',
  'Quais bens estao sujeitos ao Imposto Seletivo?',
  'Exportacoes de servicos sao isentas de IBS?',
  'Como fica a cesta basica no IBS?',
];

export const CORPUS_ARTICLES: CorpusArticle[] = [
  {
    article: 'Art. 15',
    taxType: 'IBS',
    text: 'Os servicos de saude, incluindo planos de saude e atendimento hospitalar, estao sujeitos a aliquota reduzida de IBS de cinco por cento.',
    keywords: ['saude', 'saude', 'hospital', 'plano', 'aliquota', 'ibs', '5%', 'cinco'],
  },
  {
    article: 'Art. 16',
    taxType: 'IBS',
    text: 'As operacoes de exportacao de bens e servicos para o exterior sao isentas do Imposto sobre Bens e Servicos.',
    keywords: ['exportacao', 'exportacoes', 'exterior', 'isento', 'isenta', 'ibs'],
  },
  {
    article: 'Art. 17',
    taxType: 'IBS',
    text: 'O credito do IBS sera admitido nas aquisicoes de bens e servicos utilizados como insumo nas atividades economicas do contribuinte.',
    keywords: ['credito', 'insumo', 'aquisicao', 'ibs'],
  },
  {
    article: 'Art. 18',
    taxType: 'IBS',
    text: 'A base de calculo do IBS e o valor da operacao de que resulta a saida de bem ou prestacao de servico.',
    keywords: ['base', 'calculo', 'operacao', 'ibs'],
  },
  {
    article: 'Art. 19',
    taxType: 'IBS',
    text: 'As operacoes com alimentos da cesta basica terao aliquota zero do IBS, conforme lista definida em regulamento.',
    keywords: ['cesta', 'basica', 'alimentos', 'zero', 'ibs'],
  },
  {
    article: 'Art. 25',
    taxType: 'CBS',
    text: 'A Contribuicao sobre Bens e Servicos nao e cumulativa, admitindo-se o aproveitamento de credito nas aquisicoes subsequentes.',
    keywords: ['credito', 'nao-cumulativa', 'nao cumulativa', 'cumulativa', 'cbs'],
  },
  {
    article: 'Art. 26',
    taxType: 'CBS',
    text: 'A aliquota padrao da CBS sera de nove por cento, podendo ser alterada por lei complementar em casos excepcionais.',
    keywords: ['aliquota', 'padrao', '9%', 'nove', 'cbs'],
  },
  {
    article: 'Art. 27',
    taxType: 'CBS',
    text: 'As operacoes interestaduais de bens e servicos serao tributadas pelo CBS a aliquota de destino, conforme local do destinatario.',
    keywords: ['interestadual', 'destino', 'cbs'],
  },
  {
    article: 'Art. 28',
    taxType: 'CBS',
    text: 'As instituicoes financeiras estao sujeitas ao regime especial de CBS, com aliquota diferenciada e regras proprias de creditamento.',
    keywords: ['financeira', 'financeiras', 'banco', 'regime especial', 'cbs'],
  },
  {
    article: 'Art. 29',
    taxType: 'CBS',
    text: 'As prestacoes de servicos de telecomunicacoes terao aliquota especifica de CBS de doze por cento.',
    keywords: ['telecom', 'telecomunicacoes', '12%', 'doze', 'cbs'],
  },
  {
    article: 'Art. 40',
    taxType: 'IS',
    text: 'O Imposto Seletivo incide sobre bens e servicos especificos que causem externalidades negativas a saude ou ao meio ambiente.',
    keywords: ['seletivo', 'externalidade', 'is', 'imposto seletivo'],
  },
  {
    article: 'Art. 41',
    taxType: 'IS',
    text: 'Estao sujeitos ao IS: bebidas alcoolicas, cigarros, armas de fogo, combustiveis fosseis e veiculos automotores.',
    keywords: ['bebidas', 'cigarros', 'armas', 'combustiveis', 'veiculos', 'bens', 'is'],
  },
  {
    article: 'Art. 42',
    taxType: 'IS',
    text: 'A aliquota do IS sera definida em lei ordinaria por produto, podendo atingir ate trinta por cento do preco de venda.',
    keywords: ['30%', 'trinta', 'aliquota', 'is'],
  },
  {
    article: 'Art. 43',
    taxType: 'IS',
    text: 'O IS nao gera direito a credito, sendo um imposto de custeio especifico de politicas publicas setoriais.',
    keywords: ['sem credito', 'nao gera', 'credito', 'is'],
  },
  {
    article: 'Art. 44',
    taxType: 'IS',
    text: 'As bebidas acucaradas artificialmente terao aliquota progressiva de IS conforme teor de acucar adicionado.',
    keywords: ['acucaradas', 'acucar', 'bebidas', 'is'],
  },
];

export const INITIAL_THREADS: ChatThread[] = [
  {
    id: 't1',
    title: 'IBS saude — aliquota reduzida',
    updatedAt: new Date('2026-07-08T14:30:00'),
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Qual a aliquota de IBS para servicos de saude?',
        timestamp: new Date('2026-07-08T14:28:00'),
      },
      {
        id: 'm2',
        role: 'oracle',
        content:
          'De acordo com o Art. 15 da LC 214/2025:\n\n"Os servicos de saude, incluindo planos de saude e atendimento hospitalar, estao sujeitos a aliquota reduzida de IBS de cinco por cento."\n\nEste dispositivo trata especificamente de IBS. A aliquota reduzida de 5% aplica-se a planos de saude e atendimento hospitalar.',
        timestamp: new Date('2026-07-08T14:28:02'),
        confidence: 'Alta',
        processingTimeMs: 312,
        citations: [
          {
            fonte: 'LC 214/2025',
            artigo: 'Art. 15, § 1º',
            confianca: 'Alta',
            dataIndexado: '2024-01-15',
            trecho: 'aliquota reduzida de IBS de cinco por cento',
          },
        ],
      },
    ],
  },
  {
    id: 't2',
    title: 'CBS e credito integral',
    updatedAt: new Date('2026-07-07T10:15:00'),
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: 'A CBS admite aproveitamento de credito?',
        timestamp: new Date('2026-07-07T10:14:00'),
      },
      {
        id: 'm4',
        role: 'oracle',
        content:
          'De acordo com o Art. 25 da LC 214/2025:\n\n"A Contribuicao sobre Bens e Servicos nao e cumulativa, admitindo-se o aproveitamento de credito nas aquisicoes subsequentes."\n\nA CBS e nao-cumulativa e admite credito integral nas aquisicoes.',
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
  { label: 'Ultimo Crawl', value: 'Hoje 06:00', color: '#6A1B9A' },
];

export const INDEXED_DOCUMENTS: IndexedDocument[] = [
  { fonte: 'Planalto', documento: 'LC 214/2025', tipo: 'Lei Complementar', chunks: 245, status: 'Indexado' },
  { fonte: 'Receita Federal', documento: 'Parecer COSIT 45/2024', tipo: 'Parecer', chunks: 18, status: 'Indexado' },
  { fonte: 'Senado', documento: 'PEC 45/2019', tipo: 'Emenda Constitucional', chunks: 312, status: 'Indexado' },
  { fonte: 'STF', documento: 'ADI 7.234', tipo: 'Acao Direta', chunks: 89, status: 'Indexado' },
  { fonte: 'STJ', documento: 'REsp 1.892.345', tipo: 'Recurso Especial', chunks: 34, status: 'Indexado' },
  { fonte: 'Camara', documento: 'PL 2.456/2024', tipo: 'Projeto de Lei', chunks: 67, status: 'Pendente' },
];

export const TAX_CARDS: TaxCard[] = [
  {
    code: 'IBS',
    name: 'Imposto sobre Bens e Servicos',
    color: '#1565C0',
    bullets: [
      'Nao-cumulativo',
      'Credito integral',
      'Aliquota padrao: ~17%',
      'Saude: 5% (reduzida)',
      'Exportacao: isento',
      'Gestor: Estados/Municipios',
    ],
  },
  {
    code: 'CBS',
    name: 'Contribuicao sobre Bens e Servicos',
    color: '#2E7D32',
    bullets: [
      'Nao-cumulativa',
      'Credito integral',
      'Aliquota padrao: ~9%',
      'Telecom: 12% (especifica)',
      'Financeiras: regime especial',
      'Gestor: Uniao',
    ],
  },
  {
    code: 'IS',
    name: 'Imposto Seletivo',
    color: '#E65100',
    bullets: [
      'Cumulativo',
      'Sem credito',
      'Aliquota: ate 30%',
      'Bebidas, cigarros, armas',
      'Combustiveis fosseis',
      'Gestor: Uniao',
    ],
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    title: 'Fontes Oficiais',
    subtitle: 'HTML / PDF',
    color: '#1565C0',
    items: [
      { label: 'Planalto', detail: 'Legislacao' },
      { label: 'Receita Fed', detail: 'Pareceres' },
      { label: 'Senado', detail: 'Projetos' },
      { label: 'STF/STJ', detail: 'Jurisprudencia' },
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
  { label: 'Precisao de Citacoes', value: 98.7, color: '#1565C0' },
  { label: 'Satisfacao do Usuario', value: 96.0, color: '#2E7D32' },
  { label: 'Reducao Tempo Pesquisa', value: 92.0, color: '#E65100' },
  { label: 'Taxa de Retencao', value: 98.0, color: '#6A1B9A' },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    metrica: 'Tempo de pesquisa tributaria',
    antes: '2-4 horas',
    depois: '15 minutos',
    melhoria: '92%',
  },
  {
    metrica: 'Precisao de fontes citadas',
    antes: 'Estimativa',
    depois: '100% verificavel',
    melhoria: 'Qualitativo',
  },
  {
    metrica: 'Custo por consulta',
    antes: 'R$ 800-1.500',
    depois: 'R$ 0 (sistema)',
    melhoria: '100%',
  },
  {
    metrica: 'Satisfacao do cliente',
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
      { label: 'Planalto', detail: 'Legislacao' },
      { label: 'Receita Fed', detail: 'Pareceres' },
      { label: 'Senado', detail: 'Projetos' },
      { label: 'STF/STJ', detail: 'Jurisprudencia' },
      { label: 'Camara', detail: 'Projetos' },
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
