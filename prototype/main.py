"""CLI demo for the Tax Reform Oracle RAG prototype."""

from engine import RAGEngine, create_synthetic_corpus


def main():
    print("=" * 70)
    print("  Brazilian Tax Reform Oracle — RAG Prototype")
    print("=" * 70)

    print("\n>>> Ingesting synthetic corpus (15 articles)...")
    engine = RAGEngine()
    corpus = create_synthetic_corpus()
    engine.ingest(corpus)
    print(f"    Indexed {len(corpus)} document chunks")
    print(f"    Vocabulary size: {engine.dim} tokens")

    print("\n>>> Sample Queries\n")

    queries = [
        "Qual a alíquota de IBS para serviços de saúde?",
        "Como funciona o crédito do CBS?",
        "Quais bens estão sujeitos ao Imposto Seletivo?",
        "Exportações são isentas de CBS?",
        "Alimentos da cesta básica pagam IBS?",
    ]

    for query in queries:
        print(f"  [QUERY] {query}")
        resp = engine.query(query)
        print(f"  [ANSWER] {resp.answer[:200]}...")
        print(f"  [SOURCES] {len(resp.sources)} document(s) | Confidence: {resp.confidence} | Time: {resp.processing_time_ms}ms")
        print()

    print("=" * 70)
    print("  Prototype execution completed successfully.")
    print("=" * 70)


if __name__ == "__main__":
    main()
