"""Generate professional mockup images for Brazilian Tax Reform Oracle showcase."""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import numpy as np

plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Arial', 'DejaVu Sans']

OUTPUT = "D:/brazilian-tax-reform-oracle-showcase/assets"

def save(fig, name, sub="screenshots"):
    fig.savefig(f"{OUTPUT}/{sub}/{name}", dpi=180, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"[ASSET] {name}")

# 1. Chat Interface
fig = plt.figure(figsize=(12, 9))
fig.patch.set_facecolor('#f5f5f5')

# Header
ax_h = fig.add_axes([0, 0.92, 1, 0.08])
ax_h.set_facecolor('#1565C0')
ax_h.text(0.5, 0.5, 'Brazilian Tax Reform Oracle — Chat Interface', fontsize=14, fontweight='bold', color='white', ha='center', va='center')
ax_h.set_xticks([]); ax_h.set_yticks([]); ax_h.spines[:].set_visible(False)

# User message
ax_u = fig.add_axes([0.05, 0.72, 0.6, 0.12])
ax_u.set_facecolor('#E3F2FD')
rect = FancyBboxPatch((0,0),1,1, boxstyle="round,pad=0.03", facecolor='#E3F2FD', edgecolor='#1565C0', linewidth=1.5, transform=ax_u.transAxes)
ax_u.add_patch(rect)
ax_u.text(0.05, 0.7, 'Você', fontsize=8, color='#1565C0', fontweight='bold', transform=ax_u.transAxes)
ax_u.text(0.05, 0.35, '"Qual a alíquota de IBS para serviços de saúde?"', fontsize=10, color='#1a1a1a', transform=ax_u.transAxes)
ax_u.set_xlim(0,1); ax_u.set_ylim(0,1); ax_u.set_xticks([]); ax_u.set_yticks([]); ax_u.spines[:].set_visible(False)

# Bot message
ax_b = fig.add_axes([0.35, 0.35, 0.6, 0.32])
ax_b.set_facecolor('white')
rect = FancyBboxPatch((0,0),1,1, boxstyle="round,pad=0.03", facecolor='white', edgecolor='#ddd', linewidth=1, transform=ax_b.transAxes)
ax_b.add_patch(rect)
ax_b.text(0.05, 0.88, 'Oracle', fontsize=8, color='#2E7D32', fontweight='bold', transform=ax_b.transAxes)
ax_b.text(0.05, 0.68, 'De acordo com o Art. 15 da LC 214/2025:', fontsize=9, color='#1a1a1a', transform=ax_b.transAxes)
ax_b.text(0.05, 0.52, '"Os serviços de saúde... estão sujeitos à', fontsize=9, color='#333', transform=ax_b.transAxes)
ax_b.text(0.05, 0.42, 'alíquota reduzida de IBS de 5%."', fontsize=9, color='#333', transform=ax_b.transAxes)

# Citation box
ax_c = fig.add_axes([0.38, 0.40, 0.54, 0.08])
ax_c.set_facecolor('#FFF8E1')
rect = FancyBboxPatch((0,0),1,1, boxstyle="round,pad=0.02", facecolor='#FFF8E1', edgecolor='#FFB300', linewidth=1, transform=ax_c.transAxes)
ax_c.add_patch(rect)
ax_c.text(0.05, 0.5, 'Fonte: LC 214/2025, Art. 15, § 1º | Confiança: Alta | Indexado: 2024-01-15', fontsize=8, color='#E65100', transform=ax_c.transAxes, va='center')
ax_c.set_xlim(0,1); ax_c.set_ylim(0,1); ax_c.set_xticks([]); ax_c.set_yticks([]); ax_c.spines[:].set_visible(False)

ax_b.set_xlim(0,1); ax_b.set_ylim(0,1); ax_b.set_xticks([]); ax_b.set_yticks([]); ax_b.spines[:].set_visible(False)

# Input bar
ax_i = fig.add_axes([0.05, 0.05, 0.7, 0.06])
ax_i.set_facecolor('white')
rect = FancyBboxPatch((0,0),1,1, boxstyle="round,pad=0.02", facecolor='white', edgecolor='#ccc', linewidth=1, transform=ax_i.transAxes)
ax_i.add_patch(rect)
ax_i.text(0.03, 0.5, 'Digite sua pergunta sobre a Reforma Tributária...', fontsize=9, color='#999', va='center', transform=ax_i.transAxes)
ax_i.set_xlim(0,1); ax_i.set_ylim(0,1); ax_i.set_xticks([]); ax_i.set_yticks([]); ax_i.spines[:].set_visible(False)

# Send button
ax_s = fig.add_axes([0.78, 0.05, 0.17, 0.06])
ax_s.set_facecolor('#1565C0')
rect = FancyBboxPatch((0,0),1,1, boxstyle="round,pad=0.02", facecolor='#1565C0', edgecolor='#1565C0', linewidth=1, transform=ax_s.transAxes)
ax_s.add_patch(rect)
ax_s.text(0.5, 0.5, 'Consultar', fontsize=10, fontweight='bold', color='white', ha='center', va='center', transform=ax_s.transAxes)
ax_s.set_xlim(0,1); ax_s.set_ylim(0,1); ax_s.set_xticks([]); ax_s.set_yticks([]); ax_s.spines[:].set_visible(False)

save(fig, '01-chat-interface.png')

# 2. RAG Pipeline Flow
fig, ax = plt.subplots(figsize=(13, 7))
ax.set_xlim(0, 13); ax.set_ylim(0, 7); ax.axis('off'); fig.patch.set_facecolor('white')

def box(x,y,w,h,c,t,s="",tc='white'):
    r = FancyBboxPatch((x,y),w,h,boxstyle="round,pad=0.05",facecolor=c,edgecolor='white',linewidth=2)
    ax.add_patch(r)
    ax.text(x+w/2,y+h/2+0.15,t,fontsize=9,fontweight='bold',color=tc,ha='center',va='center')
    if s: ax.text(x+w/2,y+h/2-0.25,s,fontsize=7,color=tc,ha='center',va='center',alpha=0.9)

def arrow(x1,y1,x2,y2,c='#888'):
    ax.annotate('',xy=(x2,y2),xytext=(x1,y1),arrowprops=dict(arrowstyle='->',color=c,lw=1.5))

ax.text(6.5,6.7,'RAG Pipeline — Documento até Resposta',fontsize=14,fontweight='bold',color='#1a1a1a',ha='center')

# Sources
box(0.5,5.2,2,0.8,'#1565C0','Planalto','HTML/PDF', 'white')
box(2.8,5.2,2,0.8,'#1565C0','Receita Fed','HTML/PDF', 'white')
box(5.1,5.2,2,0.8,'#1565C0','Senado','HTML', 'white')
box(7.4,5.2,2,0.8,'#1565C0','STF/STJ','HTML/PDF', 'white')

# Pipeline
box(2.5,3.8,8,0.7,'#6A1B9A','ETL: Crawl · Parse · Chunk · Embed','384-dim vectors | FAISS index', 'white')

# Retrieval
box(1.5,2.4,3,0.7,'#2E7D32','Query Embedding','MiniLM-L6-v2', 'white')
box(5,2.4,3,0.7,'#2E7D32','Similarity Search','Top-K = 5 | FAISS', 'white')
box(8.5,2.4,3,0.7,'#2E7D32','Reranking','Cross-encoder', 'white')

# Generation
box(4,0.8,5,0.7,'#E65100','Llama 3 8B (Local)','Context + Citation', 'white')

# Arrows
arrow(1.5,5.2,3.5,4.5)
arrow(3.8,5.2,5,4.5)
arrow(6.1,5.2,6.5,4.5)
arrow(8.4,5.2,8,4.5)
arrow(6.5,3.8,3,3.1)
arrow(6.5,3.8,6.5,3.1)
arrow(6.5,3.8,10,3.1)
arrow(3,2.4,5.5,1.5)
arrow(6.5,2.4,6.5,1.5)
arrow(10,2.4,7.5,1.5)

save(fig, '02-rag-pipeline.png')

# 3. Document Indexing Dashboard
fig = plt.figure(figsize=(12, 7))
fig.patch.set_facecolor('#fafafa')

ax_h = fig.add_axes([0, 0.92, 1, 0.08])
ax_h.set_facecolor('#1565C0')
ax_h.text(0.5, 0.5, 'Oracle — Document Indexing Status', fontsize=14, fontweight='bold', color='white', ha='center', va='center')
ax_h.set_xticks([]); ax_h.set_yticks([]); ax_h.spines[:].set_visible(False)

# KPIs
kpis = [
    ('Documentos', '3.847', '#1565C0'),
    ('Chunks', '12.412', '#2E7D32'),
    ('Fontes', '6', '#E65100'),
    ('Último Crawl', 'Hoje 06:00', '#6A1B9A'),
]
for i, (label, value, color) in enumerate(kpis):
    ax = fig.add_axes([0.03 + i*0.24, 0.74, 0.22, 0.14])
    ax.set_facecolor('white')
    rect = FancyBboxPatch((0,0),1,1,boxstyle="round,pad=0.02",facecolor='white',edgecolor=color,linewidth=2.5,transform=ax.transAxes)
    ax.add_patch(rect)
    ax.text(0.5, 0.55, value, fontsize=16, fontweight='bold', color=color, ha='center', va='center', transform=ax.transAxes)
    ax.text(0.5, 0.2, label, fontsize=9, color='#555', ha='center', va='center', transform=ax.transAxes)
    ax.set_xlim(0,1); ax.set_ylim(0,1); ax.set_xticks([]); ax.set_yticks([]); ax.spines[:].set_visible(False)

# Table
ax_t = fig.add_axes([0.05, 0.1, 0.9, 0.58])
ax_t.set_facecolor('white')
rect = FancyBboxPatch((0,0),1,1,boxstyle="round,pad=0.01",facecolor='white',edgecolor='#ddd',linewidth=1,transform=ax_t.transAxes)
ax_t.add_patch(rect)
ax_t.text(0.05, 0.95, 'Últimos Documentos Indexados', fontsize=11, fontweight='bold', color='#1a1a1a', transform=ax_t.transAxes)

rows = [
    ('Fonte', 'Documento', 'Tipo', 'Chunks', 'Status'),
    ('Planalto', 'LC 214/2025', 'Lei Complementar', '245', 'Indexado'),
    ('Receita Federal', 'Parecer COSIT 45/2024', 'Parecer', '18', 'Indexado'),
    ('Senado', 'PEC 45/2019', 'Emenda Constitucional', '312', 'Indexado'),
    ('STF', 'ADI 7.234', 'Ação Direta', '89', 'Indexado'),
    ('STJ', 'REsp 1.892.345', 'Recurso Especial', '34', 'Indexado'),
    ('Câmara', 'PL 2.456/2024', 'Projeto de Lei', '67', 'Pendente'),
]
y = 0.85
for row_idx, row in enumerate(rows):
    for col_idx, cell in enumerate(row):
        x_pos = 0.05 + col_idx * 0.17
        weight = 'bold' if row_idx == 0 else 'normal'
        color = '#666' if row_idx == 0 else '#333'
        if col_idx == 4 and cell == 'Indexado':
            color = '#2E7D32'
        if col_idx == 4 and cell == 'Pendente':
            color = '#E65100'
        ax_t.text(x_pos, y, cell, fontsize=8, fontweight=weight, color=color, transform=ax_t.transAxes)
    y -= 0.12
ax_t.set_xlim(0,1); ax_t.set_ylim(0,1); ax_t.set_xticks([]); ax_t.set_yticks([]); ax_t.spines[:].set_visible(False)

save(fig, '03-indexing-dashboard.png')

# 4. Tax Reform Overview — IBS/CBS/IS
fig, ax = plt.subplots(figsize=(11, 7))
ax.set_xlim(0, 11); ax.set_ylim(0, 7); ax.axis('off'); fig.patch.set_facecolor('white')

ax.text(5.5, 6.7, 'Reforma Tributária — Novos Impostos', fontsize=14, fontweight='bold', color='#1a1a1a', ha='center')

# IBS
box(0.5, 3.5, 3, 2.5, '#1565C0', 'IBS', 'Imposto sobre Bens e Serviços', 'white')
ax.text(2, 5.2, '• Não-cumulativo\n• Crédito integral\n• Alíquota padrão: ~17%\n• Saúde: 5% (reduzida)\n• Exportação: isento\n• Gestor: Estados/Municípios', fontsize=8, color='white', ha='center')

# CBS
box(4, 3.5, 3, 2.5, '#2E7D32', 'CBS', 'Contribuição sobre Bens e Serviços', 'white')
ax.text(5.5, 5.2, '• Não-cumulativa\n• Crédito integral\n• Alíquota padrão: ~9%\n• Telecom: 12% (específica)\n• Financeiras: regime especial\n• Gestor: União', fontsize=8, color='white', ha='center')

# IS
box(7.5, 3.5, 3, 2.5, '#E65100', 'IS', 'Imposto Seletivo', 'white')
ax.text(9, 5.2, '• Cumulativo\n• Sem crédito\n• Alíquota: até 30%\n• Bebidas, cigarros, armas\n• Combustíveis fósseis\n• Gestor: União', fontsize=8, color='white', ha='center')

# Arrows showing substitution
ax.annotate('', xy=(4, 4.75), xytext=(3.5, 4.75), arrowprops=dict(arrowstyle='<->', color='#666', lw=2))
ax.annotate('', xy=(7.5, 4.75), xytext=(7, 4.75), arrowprops=dict(arrowstyle='<->', color='#666', lw=2))

# Old taxes being replaced
ax.text(5.5, 3.0, 'Substituem: ICMS + ISS + IPI + PIS + COFINS', fontsize=10, color='#666', ha='center', fontweight='bold')
ax.text(5.5, 2.5, 'Vigência plena prevista para 2033 (transição de 10 anos)', fontsize=9, color='#999', ha='center')

save(fig, '04-tax-reform-overview.png')

# 5. Architecture Diagram
fig, ax = plt.subplots(figsize=(13, 8))
ax.set_xlim(0, 13); ax.set_ylim(0, 8); ax.axis('off'); fig.patch.set_facecolor('white')

ax.text(6.5, 7.7, 'Tax Reform Oracle — Architecture', fontsize=14, fontweight='bold', color='#1a1a1a', ha='center')

ax.text(0.5, 7.0, 'DATA SOURCES', fontsize=10, fontweight='bold', color='#555')
box(0.5, 6.2, 2, 0.6, '#1565C0', 'Planalto', 'Legislação', 'white')
box(2.8, 6.2, 2, 0.6, '#1565C0', 'Receita Fed', 'Pareceres', 'white')
box(5.1, 6.2, 2, 0.6, '#1565C0', 'Senado', 'Projetos', 'white')
box(7.4, 6.2, 2, 0.6, '#1565C0', 'STF/STJ', 'Jurisprudência', 'white')
box(9.7, 6.2, 2.3, 0.6, '#1565C0', 'Câmara', 'Projetos', 'white')

box(3, 5.0, 7, 0.6, '#6A1B9A', 'RAG Pipeline (Python)', 'Crawl · Parse · Chunk · Embed · Index', 'white')

ax.text(0.5, 4.3, 'RETRIEVAL', fontsize=10, fontweight='bold', color='#555')
box(1.5, 3.3, 3, 0.7, '#2E7D32', 'FAISS Index', '384-dim | L2 | Local', 'white')
box(5, 3.3, 3, 0.7, '#2E7D32', 'Similarity Search', 'Top-K=5 | Reranker', 'white')
box(8.5, 3.3, 3, 0.7, '#2E7D32', 'Context Assembly', 'Top-3 + Metadata', 'white')

ax.text(0.5, 2.6, 'GENERATION', fontsize=10, fontweight='bold', color='#555')
box(4.5, 1.5, 4, 0.7, '#E65100', 'Llama 3 8B (Ollama)', 'Local GPU/CPU | Temp=0.3', 'white')

ax.text(0.5, 0.9, 'FRONTEND', fontsize=10, fontweight='bold', color='#555')
box(3, 0.1, 7, 0.6, '#455A64', 'Angular 17 Dashboard', 'Chat · Threads · Citations · Export PDF/DOCX', 'white')

save(fig, '05-architecture-diagram.png', sub='diagrams')

# 6. Confidence & Metrics
fig, ax = plt.subplots(figsize=(10, 6))
ax.set_facecolor('#fafafa')

metrics = ['Precisão\nde Citações', 'Satisfação\ndo Usuário', 'Redução\nTempo Pesquisa', 'Taxa de\nRetenção']
values = [98.7, 96.0, 92.0, 98.0]
colors = ['#1565C0', '#2E7D32', '#E65100', '#6A1B9A']

bars = ax.bar(metrics, values, color=colors, edgecolor='white', linewidth=2, width=0.6)
ax.set_ylabel('Percentual (%)', fontsize=11)
ax.set_title('Métricas do Oracle — Deployment em Produção', fontsize=13, fontweight='bold')
ax.set_ylim(0, 110)

for bar, val in zip(bars, values):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 2, f'{val}%', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#333')

ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
plt.tight_layout()
save(fig, '06-confidence-metrics.png')

print("\n[INFO] All Brazilian Tax Reform Oracle assets generated successfully!")
