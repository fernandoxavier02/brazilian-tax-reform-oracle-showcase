export type ConfidenceLevel = 'Alta' | 'Media' | 'Baixa';

export interface Citation {
  fonte: string;
  artigo: string;
  confianca: ConfidenceLevel;
  dataIndexado: string;
  trecho?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'oracle';
  content: string;
  timestamp: Date;
  confidence?: ConfidenceLevel;
  processingTimeMs?: number;
  citations?: Citation[];
  structured?: StructuredAnswer;
}

export interface StructuredAnswer {
  directAnswer: string;
  summary: string;
  fundamentos: string[];
  conclusao: string;
  fontesCitadas: { n: number; label: string }[];
}

export interface ChatThread {
  id: string;
  title: string;
  updatedAt: Date;
  preview?: string;
  tag?: string;
  messages: ChatMessage[];
}

export interface CorpusArticle {
  article: string;
  taxType: string;
  text: string;
  keywords: string[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface RetrievedSource {
  id: string;
  title: string;
  badge: string;
  confianca: number;
  relevancia: number;
  tipo: string;
  publicacao: string;
  org: string;
}

export interface OfficialSourceRow {
  nome: string;
  url: string;
  status: 'Ativa' | 'Pausada';
  ultimaAtualizacao: string;
  documentos: string;
  delta24h: string;
  confianca: number;
  cobertura: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RiskItem {
  nome: string;
  status: 'amarelo' | 'laranja' | 'verde';
  tendencia: string;
  spark: number[];
}
