"""Golden tests for Tax Reform Oracle RAG engine."""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from engine import RAGEngine, create_synthetic_corpus, cosine_similarity, vectorize


def test_ingestion():
    engine = RAGEngine()
    corpus = create_synthetic_corpus()
    engine.ingest(corpus)
    assert len(engine.chunks) == 15
    assert engine.dim > 0
    assert len(engine.embeddings) == 15
    print("[PASS] test_ingestion")


def test_search_healthcare():
    engine = RAGEngine()
    engine.ingest(create_synthetic_corpus())
    results = engine.search("alíquota IBS saúde")
    assert len(results) > 0
    top = results[0]
    assert "saúde" in top.chunk.text.lower() or "IBS" in top.chunk.tax_type.value
    assert top.score > 0
    print(f"[PASS] test_search_healthcare (score={top.score:.4f})")


def test_search_cbs_credit():
    engine = RAGEngine()
    engine.ingest(create_synthetic_corpus())
    results = engine.search("crédito CBS cumulativo")
    assert len(results) > 0
    top = results[0]
    assert "crédito" in top.chunk.text.lower() or "cumulativa" in top.chunk.text.lower()
    print(f"[PASS] test_search_cbs_credit (score={top.score:.4f})")


def test_search_is_goods():
    engine = RAGEngine()
    engine.ingest(create_synthetic_corpus())
    results = engine.search("quais bens imposto seletivo")
    assert len(results) > 0
    top = results[0]
    # Top result should be IS-related (either Art. 40 about IS definition or Art. 41 listing goods)
    assert top.chunk.tax_type.value == "IS"
    assert "imposto seletivo" in top.chunk.text.lower() or "externalidades" in top.chunk.text.lower() or "bebidas" in top.chunk.text.lower()
    print(f"[PASS] test_search_is_goods (score={top.score:.4f})")


def test_query_response_structure():
    engine = RAGEngine()
    engine.ingest(create_synthetic_corpus())
    resp = engine.query("Qual a alíquota de IBS para saúde?")
    assert resp.query
    assert resp.answer
    assert len(resp.sources) > 0
    assert resp.confidence in ("Alta", "Media", "Baixa")
    assert resp.processing_time_ms >= 0
    print(f"[PASS] test_query_response_structure (time={resp.processing_time_ms}ms)")


def test_cosine_similarity_range():
    a = [1.0, 0.0, 0.0]
    b = [1.0, 0.0, 0.0]
    assert cosine_similarity(a, b) == 1.0
    c = [0.0, 1.0, 0.0]
    assert cosine_similarity(a, c) == 0.0
    print("[PASS] test_cosine_similarity_range")


if __name__ == "__main__":
    test_ingestion()
    test_search_healthcare()
    test_search_cbs_credit()
    test_search_is_goods()
    test_query_response_structure()
    test_cosine_similarity_range()
    print("\n[SUCCESS] All tests passed!")
