"""Data models for the Tax Reform Oracle RAG prototype."""

from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum


class DocumentSource(str, Enum):
    PLANALTO = "planalto"
    RECEITA_FEDERAL = "receita_federal"
    SENADO = "senado"
    CAMARA = "camara"
    STF = "stf"
    STJ = "stj"
    LC_214 = "lc_214_2024"


class TaxType(str, Enum):
    IBS = "IBS"
    CBS = "CBS"
    IS = "IS"


@dataclass
class DocumentChunk:
    """A chunk of a legal document with metadata."""
    chunk_id: str
    source: DocumentSource
    tax_type: TaxType
    article: str
    text: str
    url: str = ""
    date_indexed: str = "2024-01-15"
    embedding: Optional[List[float]] = field(default=None, repr=False)

    def __repr__(self):
        return f"DocumentChunk({self.chunk_id}: {self.source.value} Art.{self.article})"


@dataclass
class SearchResult:
    """Result from similarity search."""
    chunk: DocumentChunk
    score: float
    rank: int


@dataclass
class QueryResponse:
    """Structured response to a user query."""
    query: str
    answer: str
    sources: List[SearchResult]
    confidence: str  # "Alta" | "Media" | "Baixa"
    processing_time_ms: int
