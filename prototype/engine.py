"""RAG Engine for Brazilian Tax Reform Oracle — Prototype."""

import math
import re
import time
from typing import List, Optional
from models import DocumentChunk, DocumentSource, TaxType, SearchResult, QueryResponse


def tokenize(text: str) -> List[str]:
    """Simple tokenizer for prototype."""
    return re.findall(r'\b[a-zA-Zà-úÀ-Ú]+\b', text.lower())


def build_vocab(chunks: List[DocumentChunk]) -> dict:
    """Build vocabulary from all chunks."""
    vocab = {}
    for chunk in chunks:
        for token in tokenize(chunk.text):
            if token not in vocab:
                vocab[token] = len(vocab)
    return vocab


def vectorize(text: str, vocab: dict, dim: int) -> List[float]:
    """Simple TF-based vectorization."""
    tokens = tokenize(text)
    vec = [0.0] * dim
    for token in tokens:
        if token in vocab:
            vec[vocab[token]] += 1.0
    # L2 normalize
    norm = math.sqrt(sum(v*v for v in vec))
    if norm > 0:
        vec = [v / norm for v in vec]
    return vec


def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Cosine similarity between two vectors."""
    dot = sum(x*y for x, y in zip(a, b))
    return dot  # already normalized


class RAGEngine:
    """Retrieval Augmented Generation engine — prototype implementation."""

    def __init__(self):
        self.chunks: List[DocumentChunk] = []
        self.vocab: dict = {}
        self.embeddings: List[List[float]] = []
        self.dim: int = 0

    def ingest(self, chunks: List[DocumentChunk]) -> None:
        """Ingest documents into the engine."""
        self.chunks = chunks
        self.vocab = build_vocab(chunks)
        self.dim = len(self.vocab)
        self.embeddings = []
        for chunk in chunks:
            emb = vectorize(chunk.text, self.vocab, self.dim)
            chunk.embedding = emb
            self.embeddings.append(emb)

    def search(self, query: str, top_k: int = 5) -> List[SearchResult]:
        """Similarity search over indexed documents."""
        if not self.embeddings:
            raise RuntimeError("Engine not ingested. Call ingest() first.")

        query_vec = vectorize(query, self.vocab, self.dim)
        scored = []
        for chunk, emb in zip(self.chunks, self.embeddings):
            score = cosine_similarity(query_vec, emb)
            scored.append((chunk, score))

        scored.sort(key=lambda x: x[1], reverse=True)
        results = []
        for rank, (chunk, score) in enumerate(scored[:top_k], 1):
            results.append(SearchResult(chunk=chunk, score=round(score, 4), rank=rank))
        return results

    def generate(self, query: str, results: List[SearchResult]) -> str:
        """Simulate LLM response with citations."""
        if not results:
            return "Não encontrei documentos relevantes para esta consulta."

        top = results[0].chunk
        answer = (
            f"De acordo com o {top.article} da {top.source.value.upper().replace('_', ' ')}:\n\n"
            f'"{top.text[:200]}..."\n\n'
            f"Este dispositivo trata especificamente de {top.tax_type.value}. "
            f"Para uma análise completa, consulte também os artigos relacionados indexados.\n\n"
            f"Fonte: {top.source.value.upper().replace('_', ' ')}, {top.article}\n"
            f"[Confiabilidade: Alta | Documento indexado em: {top.date_indexed}]"
        )
        return answer

    def query(self, query_text: str) -> QueryResponse:
        """End-to-end query: search + generate + format."""
        start = time.time()
        results = self.search(query_text, top_k=3)
        answer = self.generate(query_text, results)
        elapsed_ms = int((time.time() - start) * 1000)

        confidence = "Alta" if results and results[0].score > 0.3 else "Media" if results else "Baixa"

        return QueryResponse(
            query=query_text,
            answer=answer,
            sources=results,
            confidence=confidence,
            processing_time_ms=elapsed_ms
        )


def create_synthetic_corpus() -> List[DocumentChunk]:
    """Create synthetic tax reform documents for demonstration."""
    chunks = []

    # IBS articles
    ibs_texts = [
        ("Art. 15", "Os serviços de saúde, incluindo planos de saúde e atendimento hospitalar, estão sujeitos à alíquota reduzida de IBS de cinco por cento."),
        ("Art. 16", "As operações de exportação de bens e serviços para o exterior são isentas do Imposto sobre Bens e Serviços."),
        ("Art. 17", "O crédito do IBS será admitido nas aquisições de bens e serviços utilizados como insumo nas atividades econômicas do contribuinte."),
        ("Art. 18", "A base de cálculo do IBS é o valor da operação de que resulta a saída de bem ou prestação de serviço."),
        ("Art. 19", "As operações com alimentos da cesta básica terão alíquota zero do IBS, conforme lista definida em regulamento."),
    ]
    for art, text in ibs_texts:
        chunks.append(DocumentChunk(
            chunk_id=f"ibs_{art.lower().replace(' ', '_')}",
            source=DocumentSource.LC_214,
            tax_type=TaxType.IBS,
            article=art,
            text=text,
            url="https://www.planalto.gov.br/legislacao"
        ))

    # CBS articles
    cbs_texts = [
        ("Art. 25", "A Contribuição sobre Bens e Serviços não é cumulativa, admitindo-se o aproveitamento de crédito nas aquisições subsequentes."),
        ("Art. 26", "A alíquota padrão da CBS será de nove por cento, podendo ser alterada por lei complementar em casos excepcionais."),
        ("Art. 27", "As operações interestaduais de bens e serviços serão tributadas pelo CBS à alíquota de destino, conforme local do destinatário."),
        ("Art. 28", "As instituições financeiras estão sujeitas ao regime especial de CBS, com alíquota diferenciada e regras próprias de creditamento."),
        ("Art. 29", "As prestações de serviços de telecomunicações terão alíquota específica de CBS de doze por cento."),
    ]
    for art, text in cbs_texts:
        chunks.append(DocumentChunk(
            chunk_id=f"cbs_{art.lower().replace(' ', '_')}",
            source=DocumentSource.LC_214,
            tax_type=TaxType.CBS,
            article=art,
            text=text,
            url="https://www.planalto.gov.br/legislacao"
        ))

    # IS articles
    is_texts = [
        ("Art. 40", "O Imposto Seletivo incide sobre bens e serviços específicos que causem externalidades negativas à saúde ou ao meio ambiente."),
        ("Art. 41", "Estão sujeitos ao IS: bebidas alcoólicas, cigarros, armas de fogo, combustíveis fósseis e veículos automotores."),
        ("Art. 42", "A alíquota do IS será definida em lei ordinária por produto, podendo atingir até trinta por cento do preço de venda."),
        ("Art. 43", "O IS não gera direito a crédito, sendo um imposto de custeio específico de políticas públicas setoriais."),
        ("Art. 44", "As bebidas açucaradas artificialmente terão alíquota progressiva de IS conforme teor de açúcar adicionado."),
    ]
    for art, text in is_texts:
        chunks.append(DocumentChunk(
            chunk_id=f"is_{art.lower().replace(' ', '_')}",
            source=DocumentSource.LC_214,
            tax_type=TaxType.IS,
            article=art,
            text=text,
            url="https://www.planalto.gov.br/legislacao"
        ))

    return chunks
