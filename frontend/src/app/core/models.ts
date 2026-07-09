export type ConfidenceLevel = 'Alta' | 'Media' | 'Baixa';
export type IndexStatus = 'Indexado' | 'Pendente';
export type MessageRole = 'user' | 'oracle';

export interface Citation {
  fonte: string;
  artigo: string;
  confianca: ConfidenceLevel;
  dataIndexado: string;
  trecho?: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  citations?: Citation[];
  confidence?: ConfidenceLevel;
  processingTimeMs?: number;
}

export interface ChatThread {
  id: string;
  title: string;
  updatedAt: Date;
  messages: ChatMessage[];
}

export interface IndexedDocument {
  fonte: string;
  documento: string;
  tipo: string;
  chunks: number;
  status: IndexStatus;
}

export interface KpiItem {
  label: string;
  value: string;
  color: string;
}

export interface TaxCard {
  code: string;
  name: string;
  color: string;
  bullets: string[];
}

export interface MetricBar {
  label: string;
  value: number;
  color: string;
}

export interface ComparisonRow {
  metrica: string;
  antes: string;
  depois: string;
  melhoria: string;
}

export interface PipelineStage {
  title: string;
  subtitle: string;
  color: string;
  items: { label: string; detail: string }[];
}

export interface ArchitectureLayer {
  title: string;
  color: string;
  items: { label: string; detail: string }[];
}

export interface CorpusArticle {
  article: string;
  taxType: 'IBS' | 'CBS' | 'IS';
  text: string;
  keywords: string[];
}
