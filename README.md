# Brazilian Tax Reform Oracle — Showcase

> **Tipo:** Vitrine técnica arquitetural  
> **Status:** Protótipo público educacional com dados sintéticos
> **Autor:** Fernando Xavier  
> **Domínio:** Direito Tributário Brasileiro · Reforma Tributária · RAG (Retrieval Augmented Generation)  
> **Licença:** Proprietário — Todos os direitos reservados. Vitrine para avaliação de portfólio profissional apenas.

---

*Esta vitrine demonstra, em um cenário sintético, como combinar recuperação de documentos, busca por similaridade e citações para apoiar pesquisas tributárias. Não representa um sistema de cliente nem publica resultados de produção.*

---

## 🎯 O Problema de Negócio

A **Reforma Tributária brasileira** (PEC 45/2019, promulgada em dezembro de 2023) é a maior mudança no sistema tributário nacional desde a Constituição de 1988. Ela substitui cinco impostos (ICMS, ISS, IPI, PIS, COFINS) por três novos:

- **IBS** — Imposto sobre Bens e Serviços (estadual/municipal, não-cumulativo)
- **CBS** — Contribuição sobre Bens e Serviços (federal, não-cumulativo)
- **IS** — Imposto Seletivo (federal, sobre bens e serviços específicos)

**O gap:** Advogados tributários, controllers e diretores fiscais podem precisar consultar **dezenas de fontes oficiais** (Planalto, Receita Federal, Senado, Câmara, STF, STJ) para responder perguntas como:

> *"Qual a alíquota de IBS para serviços de saúde no estado de São Paulo em 2026?"*
> *"A CBS incide sobre exportações de serviços?"*
> *"Quais bens estão sujeitos ao IS?"*

Uma solução de recuperação com citações pode reduzir buscas dispersas e tornar a origem de cada resposta verificável.

---

## 🏗️ A Solução

Arquitetura **RAG (Retrieval Augmented Generation)** com frontend Angular para consultas em linguagem natural sobre a Reforma Tributária. A implementação pública é uma demonstração local com corpus sintético e citações simuladas.

### Funcionalidades Principais

| Módulo | Descrição | Impacto |
|---|---|---|
| **Chat Inteligente** | Interface conversacional com histórico de threads | UX de ChatGPT com foco tributário |
| **RAG Local** | Índice vetorial do corpus sintético da demonstração | Execução local no protótipo |
| **Fontes Oficiais** | Referências a Planalto, Receita Federal, Senado, Câmara, STF e STJ | Origem indicada nas citações |
| **Citações por Resposta** | Cada resposta inclui referência ao artigo/lei/fonte | Auditável e verificável |
| **Interface demonstrativa** | Chat, threads, telas de indexação e exportação | Fluxo visual navegável |

---

## 📈 Evidência pública

### Chat com Citações em Tempo Real
![Visão Geral da Reforma](assets/screenshots/01-visao-geral-reforma.png)

### Pipeline RAG (ilustrativo)
![Métricas de Confiança](assets/screenshots/02-metricas-confianca.png)

### Dashboard de Indexação (ilustrativo)
![Chat Inteligente](assets/screenshots/03-chat-inteligente.png)

### Visão Geral da Reforma Tributária (ilustrativa)
![Dashboard de Indexação](assets/screenshots/04-dashboard-indexacao.png)



O repositório oferece um protótipo executável, corpus sintético, busca com similaridade por tokens, respostas com citações e testes automatizados. Não há métricas de clientes, adoção ou desempenho de produção declaradas aqui.

---

## 🏛️ Arquitetura

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para diagramas detalhados.

O diagrama abaixo é uma arquitetura de referência; o engine Python executável desta vitrine usa apenas a biblioteca padrão e dados sintéticos.

```
┌─────────────────┐         ┌─────────────────────────┐         ┌─────────────────┐
│   Fontes        │         │   RAG Pipeline (Python) │         │   Angular 17    │
│   Oficiais      │────────►│   · Crawl + Parse       │────────►│   Chat UI       │
│   · Planalto    │         │   · Chunk + Embed       │         │   · Threads     │
│   · Receita     │         │   · FAISS Index         │         │   · Citations   │
│   · Senado      │         │   · Llama 3 (local)     │         │   · Export      │
│   · STF         │         │                         │         │                 │
└─────────────────┘         └─────────────────────────┘         └─────────────────┘
                                     │
                            ┌────────────▼────────────┐
                            │   Document Store        │
                            │   · SQLite (metadata)   │
                            │   · FAISS (embeddings)  │
                            └─────────────────────────┘
```

---

## 🧪 Protótipo público

Protótipo Python puro que demonstra um pipeline RAG simplificado com dados sintéticos de legislação:
- Document chunking
- Vetorização TF e similaridade de cosseno em Python padrão
- Context assembly para LLM
- Citation tracking

```bash
cd prototype
python main.py
```

---

## ⚠️ Aviso Legal

**© 2026 Fernando Xavier. Todos os direitos reservados.**

Este repositório contém documentação arquitetural, uma interface demonstrativa, um protótipo educacional com dados sintéticos e imagens ilustrativas. Não há dados de clientes nem resultados de produção publicados.

**Este projeto é uma demonstração técnica e educacional. As respostas geradas pelo sistema não constituem aconselhamento tributário, jurídico ou contábil.** Para decisões sobre a Reforma Tributária (CBS/IBS), consulte um profissional habilitado.

**Proibida** a reprodução, distribuição ou uso comercial do código de produção.

---

<details>
<summary><sub>Stack técnico (para avaliadores técnicos)</sub></summary>

- **Backend do protótipo:** Python 3.11 + biblioteca padrão (vetorização TF e similaridade de cosseno)
- **Arquitetura de referência:** LangChain, FAISS, Sentence Transformers e LLM local podem ser avaliados como extensões futuras; não fazem parte do engine Python atual
- **Frontend:** Angular 17.3 + TypeScript 5.4 + RxJS 7.8 + Tailwind CSS
- **Containerização:** Docker

</details>

---

## 📬 Contato

[LinkedIn](https://linkedin.com/in/fernandoxavier02) · [FX Studio AI](https://fxstudioai.com)
