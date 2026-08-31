# Brazilian Tax Reform Oracle — Showcase

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Domain: Legal & Tax RAG](https://img.shields.io/badge/Domain-Tax_Law_RAG-412991.svg?style=for-the-badge)](https://github.com/fernandoxavier02)
[![FX Studio AI](https://img.shields.io/badge/FX_Studio_AI-AI_Architecture-FF6B6B?style=for-the-badge)](https://github.com/fernandoxavier02)

**Architectural showcase and retrieval-augmented generation (RAG) prototype for Brazilian Tax Reform legal research with citation-backed responses.**

</div>

---

## 🌟 Executive Overview

The **Brazilian Tax Reform** (Constitutional Amendment PEC 45/2019) replaces five legacy taxes (ICMS, ISS, IPI, PIS, COFINS) with a dual value-added tax structure:
- **IBS** (Goods and Services Tax — State/Municipal, non-cumulative)
- **CBS** (Goods and Services Contribution — Federal, non-cumulative)
- **IS** (Selective Tax — Federal, specific goods/services)

Tax attorneys, corporate controllers, and tax directors must cross-reference dozens of evolving official legal repositories (Federal Revenue, Senate, Supreme Court / STF, Superior Court / STJ). This showcase demonstrates an intelligent RAG system delivering precise answers with verified legal citations.

---

## 🏗️ Core Capabilities

| Module | Description | Impact |
| :--- | :--- | :--- |
| **Conversational RAG UI** | Thread-aware conversational interface | Natural language legal inquiry |
| **Citation Verification** | Explicit legal source mapping (Constitutional Article, Law, Court Ruling) | Fully auditable and verifiable |
| **Corpus Chunking Engine** | Normalized statutory text decomposition and chunking | High retrieval precision |
| **Vector Similarity Match** | Cosine similarity scoring over tax domain embeddings | Rapid semantic retrieval |

---

## 🏛️ System Architecture

```
┌─────────────────┐         ┌─────────────────────────┐         ┌─────────────────┐
│ Official Legal  │         │   RAG Pipeline (Python) │         │   Frontend UI   │
│ Sources         │────────►│   · Crawl & Parse       │────────►│   (Angular/TS)  │
│ · Planalto      │         │   · Chunk & Vectorize   │         │   · Threads     │
│ · Receita       │         │   · Similarity Search   │         │   · Citations   │
│ · STF / STJ     │         │   · Context Assembly    │         │   · Export      │
└─────────────────┘         └─────────────────────────┘         └─────────────────┘
                                     │
                            ┌────────▼────────┐
                            │ Vector Store    │
                            │ · SQLite Meta   │
                            │ · Embeddings    │
                            └─────────────────┘
```

---

## 🧪 Educational Prototype Quickstart

This repository includes a standalone Python 3.11 prototype demonstrating statutory chunking, TF vectorization, context assembly, and citation tracking with synthetic tax reform statutes:

```bash
cd prototype
python main.py
```

---

## 📄 License & Attribution

- **Author:** [Fernando Xavier](https://github.com/fernandoxavier02) — *Founder, FX Studio AI | Finance Executive*
- **License:** [MIT License](LICENSE)
- **Disclaimer:** *This showcase is an educational engineering prototype and does not constitute formal tax, accounting, or legal advice.*
