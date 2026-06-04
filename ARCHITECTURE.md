# Arquitetura — Brazilian Tax Reform Oracle

## 1. Visão Geral

Sistema **RAG (Retrieval Augmented Generation)** 100% local para consulta jurídica-tributária sobre a Reforma Tributária brasileira. Nenhuma chamada à nuvem — privacidade total.

## 2. Componentes

### 2.1 Data Ingestion Layer

| Fonte | URL Base | Formato | Frequência |
|---|---|---|---|
| Planalto | `https://www.planalto.gov.br/legislacao` | HTML/PDF | Diária |
| Receita Federal | `https://www.gov.br/receitafederal/pt-br` | HTML/PDF | Diária |
| Senado | `https://www25.senado.leg.br/` | HTML | Diária |
| Câmara dos Deputados | `https://www.camara.leg.br/` | HTML | Diária |
| STF | `https://portal.stf.jus.br/` | HTML/PDF | Semanal |
| STJ | `https://www.stj.jus.br/` | HTML/PDF | Semanal |

**Processo:**
1. Crawler com `requests` + `BeautifulSoup4`
2. Parse para texto limpo
3. Chunking por artigo/parágrafo (tamanho: 512 tokens, overlap: 64)
4. Metadata extraction (fonte, data, URL, tipo)

### 2.2 Embedding Layer

- **Modelo:** `sentence-transformers/all-MiniLM-L6-v2` (local)
- **Dimensão:** 384
- **Formato:** FAISS índice flat (L2 distance)
- **Armazenamento:** SQLite (metadata) + FAISS (vetores)

### 2.3 Retrieval Layer

- **Top-K:** 5 documentos mais similares
- **Reranking:** Cross-encoder local (`cross-encoder/ms-marco-MiniLM-L-6-v2`)
- **Context assembly:** Concatenação dos top-3 chunks + metadata

### 2.4 Generation Layer

- **Modelo:** Llama 3 8B via Ollama (local GPU/CPU)
- **Prompt template:** System prompt com instruções de citação + contexto retrieved
- **Temperatura:** 0.3 (factual precision)
- **Max tokens:** 1024

### 2.5 Frontend

- **Framework:** Angular 17.3 standalone components
- **Estado:** RxJS BehaviorSubject para threads
- **UI:** Chat interface com bubbles, citations inline, export buttons
- **Export:** PDF (jsPDF) + DOCX (docx.js)

## 3. Fluxo de Dados

```
[Fonte Oficial] → [Crawler] → [Parser] → [Chunker] → [Embedder] → [FAISS Index]
                                                                    ↓
[Usuario] → [Angular Chat] → [Query] → [Embedder] → [FAISS Search] → [Reranker]
                                                                    ↓
[LLM Local] ← [Context Assembly] ← [Top-3 Chunks + Metadata]
    ↓
[Resposta com Citacoes] → [Angular Chat] → [Export PDF/DOCX]
```

## 4. Segurança e Privacidade

- **Zero cloud LLM:** Nenhuma chamada à OpenAI, Anthropic, Google
- **Zero data leakage:** Documentos do cliente nunca saem do servidor local
- **Zero telemetry:** Sem analytics, tracking ou logging remoto
- **Access control:** JWT-based auth (opcional, desabilitado no protótipo)

## 5. Decisões de Design

| Decisão | Justificativa |
|---|---|
| FAISS local vs Pinecone/Weaviate | Zero custo de infra, zero latência de rede, 100% privacidade |
| Llama 3 8B vs GPT-4 | Custo zero, privacidade, suficiente para factual QA |
| Angular vs React | Expertise do time, componentes standalone, TypeScript-first |
| SQLite vs PostgreSQL | Simplificação, dados estruturados pequenos (~10MB) |

## 6. Roadmap Técnico

| Fase | Entregável | Status |
|---|---|---|
| MVP | Crawler + FAISS + Llama 3 + Chat básico | ✅ Produção |
| v1.1 | Fine-tuning Llama 3 com corpus tributário | 🔄 Em desenvolvimento |
| v1.2 | Multimodal (imagens de tabelas de alíquotas) | 📋 Backlog |
| v1.3 | API REST para integração com ERPs | 📋 Backlog |
| v2.0 | Multi-tenant SaaS com Stripe billing | 📋 Backlog |
