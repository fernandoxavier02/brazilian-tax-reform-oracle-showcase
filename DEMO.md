# Demonstração — Brazilian Tax Reform Oracle

## Como Executar o Protótipo

```bash
cd prototype
pip install -r requirements.txt
python main.py
```

## O que o Protótipo Demonstra

1. **Document Chunking:** Divide textos sintéticos de legislação em chunks semanticamente coerentes
2. **Embedding:** Converte chunks para vetores de 384 dimensões usando sentence-transformers (ou fallback numpy)
3. **Similarity Search:** Busca por similaridade coseno entre query e documentos indexados
4. **Context Assembly:** Monta contexto para LLM com top-3 resultados + metadata
5. **Citation Tracking:** Cada resposta inclui referência ao artigo-fonte

## Dados Sintéticos

O protótipo contém 15 artigos sintéticos da Reforma Tributária:
- 5 sobre IBS (alíquotas, base de cálculo, créditos)
- 5 sobre CBS (incidência, não-cumulatividade, exportações)
- 5 sobre IS (bens sujeitos, alíquotas específicas, isenções)

Todas as informações são fictícias e para fins demonstrativos. Não constituem parecer jurídico.

## Exemplo de Interação

```
> Usuário: "Qual a alíquota de IBS para serviços de saúde?"

> Sistema:
  De acordo com o Art. 15 da LC 214/2025 (conteúdo ilustrativo):
  "Os serviços de saúde, incluindo planos de saúde e atendimento
   hospitalar, estão sujeitos à alíquota reduzida de IBS de 5%.
  
  Fonte: LC 214/2025, Art. 15, § 1º
  [Confiabilidade: Alta | Documento indexado em: 2024-01-15]"
```

## Limitações do Protótipo

- Sem LLM real (simulação de resposta)
- Sem crawler real (documentos hardcoded)
- Sem FAISS real (similarity search pura em numpy)
- Sem frontend (CLI apenas)

O sistema de produção inclui todos os componentes reais mencionados em ARCHITECTURE.md.
