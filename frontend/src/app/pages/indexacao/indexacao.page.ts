import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { INDEX_DAILY, INDEX_VOLUME_DONUT, OFFICIAL_SOURCES } from '../../core/mock-data';
import { DonutComponent } from '../../shared/donut.component';

@Component({
  selector: 'app-indexacao-page',
  standalone: true,
  imports: [NgFor, NgIf, DonutComponent],
  template: `
    <div class="space-y-5 p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-semibold tracking-tight">Dashboard de Indexação</h1>
          <p class="mt-1 text-sm text-text-muted">Monitoramento do pipeline RAG, fontes oficiais e saúde operacional.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn">Logs de Indexação</button>
          <button type="button" class="btn">Exportar Relatório ▾</button>
          <button type="button" class="btn-primary">Executar Sincronização</button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 xl:grid-cols-6">
        <div *ngFor="let k of kpis" class="card p-3.5">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-[11px] font-medium uppercase tracking-wide text-text-dim">{{ k.label }}</span>
            <span *ngIf="!k.ring" class="text-text-dim">{{ k.icon }}</span>
            <svg *ngIf="k.ring" width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" stroke-width="3"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="3"
                stroke-dasharray="87.5" stroke-dashoffset="1.1" transform="rotate(-90 18 18)"/>
            </svg>
          </div>
          <div class="kpi-value">{{ k.value }}</div>
          <div class="mt-1 text-xs" [class]="k.hintClass">{{ k.hint }}</div>
        </div>
      </div>

      <div class="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
        <div class="card p-4">
          <div class="mb-4 text-sm font-semibold">Pipeline de Indexação</div>
          <div class="flex flex-wrap items-stretch gap-2">
            <ng-container *ngFor="let s of pipeline; let last = last">
              <div class="min-w-[110px] flex-1 rounded-[10px] border border-border bg-bg p-3">
                <div class="text-xs font-semibold text-primary-bright">{{ s.name }}</div>
                <div class="mt-1 font-mono text-[11px] text-text-muted">{{ s.detail }}</div>
              </div>
              <div *ngIf="!last" class="hidden items-center text-text-dim xl:flex">→</div>
            </ng-container>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs text-text-muted">
            <span>Status atual: <span class="font-semibold text-success">Idle</span></span>
            <span>Próxima execução agendada: Hoje às 12:00</span>
          </div>
        </div>

        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Saúde Operacional</div>
          <ul class="space-y-2.5">
            <li *ngFor="let h of health" class="flex items-center justify-between gap-2 text-xs">
              <div class="min-w-0 flex-1">
                <div class="mb-1 flex justify-between text-text-muted">
                  <span>{{ h.label }}</span>
                  <span class="font-mono text-text">{{ h.value }}</span>
                </div>
                <div class="progress-track"><div class="progress-fill" [style.width.%]="h.pct"></div></div>
              </div>
              <span class="badge-green shrink-0">Normal</span>
            </li>
          </ul>
          <button type="button" class="mt-3 text-xs font-medium text-primary-bright hover:underline">Ver Detalhes do Sistema</button>
        </div>
      </div>

      <div class="grid gap-3 xl:grid-cols-[1.7fr_1fr]">
        <div class="card overflow-hidden">
          <div class="border-b border-border px-4 py-3 text-sm font-semibold">Fontes Oficiais</div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[720px] text-left text-xs">
              <thead class="bg-bg text-text-dim">
                <tr>
                  <th class="px-4 py-2.5 font-medium">Fonte</th>
                  <th class="px-3 py-2.5 font-medium">Status</th>
                  <th class="px-3 py-2.5 font-medium">Última Atualização</th>
                  <th class="px-3 py-2.5 font-medium">Documentos</th>
                  <th class="px-3 py-2.5 font-medium">Confiança</th>
                  <th class="px-3 py-2.5 font-medium">Cobertura</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of sources" class="border-t border-border-subtle hover:bg-bg-card-hover">
                  <td class="px-4 py-2.5">
                    <div class="font-medium text-text">{{ s.nome }}</div>
                    <div class="text-[11px] text-text-dim">{{ s.url }}</div>
                  </td>
                  <td class="px-3 py-2.5"><span class="badge-green">{{ s.status }}</span></td>
                  <td class="px-3 py-2.5 text-text-muted">{{ s.ultimaAtualizacao }}</td>
                  <td class="px-3 py-2.5">
                    <span class="font-mono">{{ s.documentos }}</span>
                    <span class="ml-1 text-success">{{ s.delta24h }}</span>
                  </td>
                  <td class="px-3 py-2.5">
                    <div class="mb-1 font-mono">{{ s.confianca }}%</div>
                    <div class="progress-track w-20"><div class="progress-fill" [style.width.%]="s.confianca"></div></div>
                  </td>
                  <td class="px-3 py-2.5">
                    <div class="mb-1 font-mono">{{ s.cobertura }}%</div>
                    <div class="progress-track w-20"><div class="progress-fill bg-success" [style.width.%]="s.cobertura"></div></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="space-y-3">
          <div class="card p-4">
            <div class="mb-3 text-sm font-semibold">Volume por Fonte</div>
            <app-donut [data]="volume" [size]="130"></app-donut>
          </div>
          <div class="card p-4">
            <div class="mb-3 text-sm font-semibold">Evolução Diária de Indexação</div>
            <svg viewBox="0 0 260 90" class="w-full">
              <polyline fill="none" stroke="#3b82f6" stroke-width="2" [attr.points]="dailyPoints"/>
              <g *ngFor="let d of daily; let i = index">
                <circle [attr.cx]="20 + i * 36" [attr.cy]="pointY(d)" r="3" fill="#3b82f6"/>
              </g>
            </svg>
            <div class="mt-1 text-[11px] text-text-dim">Últimos 7 dias · docs indexados / dia</div>
          </div>
        </div>
      </div>

      <div class="card flex flex-wrap items-center gap-3 p-3">
        <span class="text-xs font-semibold text-text-muted">Ações Rápidas</span>
        <button type="button" class="btn-primary text-xs">Executar Sincronização</button>
        <button type="button" class="btn text-xs">Reprocessar Pendentes</button>
        <button type="button" class="btn text-xs">Limpar Cache</button>
        <button type="button" class="btn text-xs">Validar Indexação</button>
        <div class="ml-auto flex gap-4 text-[11px] text-text-dim">
          <span>Reprocessamento: <strong class="text-warning">327</strong> pendentes</span>
          <span>Auditoria: 13/05/2025 08:40</span>
        </div>
      </div>
    </div>
  `,
})
export class IndexacaoPage {
  readonly kpis = [
    { label: 'Documentos Indexados', value: '48.732', hint: '+1.842 (24h)', hintClass: 'text-success', icon: '📄', ring: false },
    { label: 'Fontes Ativas', value: '6 / 6', hint: '100% ativas', hintClass: 'text-success', icon: '🌐', ring: false },
    { label: 'Chunks Gerados', value: '312.846', hint: '+9.213 (24h)', hintClass: 'text-success', icon: '▦', ring: false },
    { label: 'Embeddings Processados', value: '312.846', hint: '+9.213 (24h)', hintClass: 'text-success', icon: '◎', ring: false },
    { label: 'Taxa de Sucesso', value: '98,7%', hint: '+0,8 p.p. (24h)', hintClass: 'text-success', icon: '', ring: true },
    { label: 'Documentos Pendentes', value: '327', hint: '-42 (24h)', hintClass: 'text-warning', icon: '⏱', ring: false },
  ];

  readonly pipeline = [
    { name: 'Crawling', detail: '6/6 fontes' },
    { name: 'Parsing', detail: '48.732 docs' },
    { name: 'Chunking', detail: '312.846 chunks' },
    { name: 'Embedding', detail: '312.846 vetores' },
    { name: 'Validação', detail: '98,7% sucesso' },
    { name: 'Indexação FAISS', detail: 'Hoje 06:12' },
  ];

  readonly health = [
    { label: 'Fila de Indexação', value: '12%', pct: 12 },
    { label: 'Latência (p95)', value: '1,42 s', pct: 35 },
    { label: 'Taxa de Processamento', value: '156 docs/min', pct: 62 },
    { label: 'Uso de Memória', value: '62%', pct: 62 },
    { label: 'Uso de Disco', value: '1,1 TB / 4 TB', pct: 28 },
  ];

  readonly sources = OFFICIAL_SOURCES;
  readonly volume = INDEX_VOLUME_DONUT;
  readonly daily = INDEX_DAILY;

  get dailyPoints(): string {
    return this.daily.map((d, i) => `${20 + i * 36},${this.pointY(d)}`).join(' ');
  }

  pointY(v: number): number {
    const min = Math.min(...this.daily);
    const max = Math.max(...this.daily);
    return 80 - ((v - min) / (max - min || 1)) * 60;
  }
}
