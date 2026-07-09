import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  METRIC_SOURCE_DONUT,
  METRIC_THEME_BARS,
  METRIC_WEEKLY,
  RECENT_QUERIES,
  SOURCE_RANKING,
} from '../../core/mock-data';
import { DonutComponent } from '../../shared/donut.component';

@Component({
  selector: 'app-metricas-page',
  standalone: true,
  imports: [NgFor, NgIf, DonutComponent],
  template: `
    <div class="space-y-5 p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-semibold tracking-tight">Métricas de Confiança</h1>
          <p class="mt-1 text-sm text-text-muted">Acompanhe a qualidade das respostas, a confiabilidade das fontes e o desempenho do sistema RAG.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn text-xs">07/05/2025 – 13/05/2025</button>
          <button type="button" class="btn text-xs">Comparar modelos</button>
          <button type="button" class="btn text-xs">Exportar ▾</button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 xl:grid-cols-6">
        <div *ngFor="let k of kpis" class="card p-3.5">
          <div class="text-[11px] font-medium uppercase tracking-wide text-text-dim">{{ k.label }}</div>
          <div class="kpi-value mt-1">{{ k.value }}</div>
          <div class="mt-1 text-xs text-success">{{ k.trend }}</div>
        </div>
      </div>

      <div class="grid gap-3 xl:grid-cols-2">
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Precisão por tema</div>
          <div class="flex h-40 items-end gap-3">
            <div *ngFor="let b of themeBars" class="flex flex-1 flex-col items-center gap-1">
              <span class="font-mono text-[10px] text-text-muted">{{ b.value }}%</span>
              <div class="w-full rounded-t-md bg-primary" [style.height.%]="b.value"></div>
              <span class="text-[10px] text-text-dim">{{ b.label }}</span>
            </div>
          </div>
        </div>

        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Distribuição de confiança por fonte</div>
          <app-donut [data]="sourceDonut"></app-donut>
        </div>

        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Tendência semanal de qualidade</div>
          <svg viewBox="0 0 320 140" class="w-full">
            <polyline fill="none" stroke="#3b82f6" stroke-width="2" [attr.points]="precisaoPoints"/>
            <polyline fill="none" stroke="#10b981" stroke-width="2" [attr.points]="citacaoPoints"/>
            <g *ngFor="let w of weekly; let i = index">
              <text [attr.x]="30 + i * 42" y="132" text-anchor="middle" fill="#64748b" font-size="9">{{ w.d }}</text>
            </g>
          </svg>
          <div class="mt-1 flex gap-4 text-[11px] text-text-dim">
            <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-primary-bright"></span>Precisão média (%)</span>
            <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-success"></span>Taxa de citação válida (%)</span>
          </div>
        </div>

        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Ranking de fontes por confiança</div>
          <div class="space-y-2.5">
            <div *ngFor="let s of ranking" class="grid grid-cols-[1fr_48px] items-center gap-2 text-xs">
              <div>
                <div class="mb-1 flex justify-between text-text-muted">
                  <span>{{ s.nome }}</span>
                </div>
                <div class="progress-track"><div class="progress-fill" [style.width.%]="s.confianca"></div></div>
              </div>
              <span class="text-right font-mono text-text">{{ s.confianca }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-3 xl:grid-cols-[1fr_1.4fr]">
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Taxa de recuperação vs. relevância</div>
          <svg viewBox="0 0 260 180" class="w-full">
            <line x1="30" y1="150" x2="240" y2="30" stroke="#334155" stroke-dasharray="4 3"/>
            <circle *ngFor="let p of scatter" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="#3b82f6" opacity="0.7"/>
            <circle cx="190" cy="55" r="6" fill="#10b981" stroke="#f8fafc" stroke-width="1.5"/>
            <text x="150" y="48" fill="#94a3b8" font-size="9">Atual · Rec 82,4% · Rel 88,9%</text>
            <text x="120" y="170" text-anchor="middle" fill="#64748b" font-size="9">Recuperação →</text>
          </svg>
        </div>

        <div class="card overflow-hidden">
          <div class="border-b border-border px-4 py-3 text-sm font-semibold">Consultas recentes</div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[640px] text-left text-xs">
              <thead class="bg-bg text-text-dim">
                <tr>
                  <th class="px-4 py-2.5 font-medium">Pergunta</th>
                  <th class="px-3 py-2.5 font-medium">Tema</th>
                  <th class="px-3 py-2.5 font-medium">Confiança</th>
                  <th class="px-3 py-2.5 font-medium">Tempo</th>
                  <th class="px-3 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let q of queries" class="border-t border-border-subtle hover:bg-bg-card-hover">
                  <td class="max-w-[280px] truncate px-4 py-2.5 text-text">{{ q.pergunta }}</td>
                  <td class="px-3 py-2.5"><span class="badge-blue">{{ q.tema }}</span></td>
                  <td class="px-3 py-2.5 font-mono text-success">{{ q.confianca }}%</td>
                  <td class="px-3 py-2.5 font-mono text-text-muted">{{ q.tempo }}</td>
                  <td class="px-3 py-2.5"><span class="badge-green">✓ {{ q.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer class="flex flex-wrap justify-between gap-2 border-t border-border pt-3 text-[11px] text-text-dim">
        <span>Métricas baseadas na relevância das fontes recuperadas e no histórico de avaliações</span>
        <span>Última atualização: 13/05/2025 10:24</span>
      </footer>
    </div>
  `,
})
export class MetricasPage {
  readonly kpis = [
    { label: 'Precisão média', value: '92,4%', trend: '+4,6pp' },
    { label: 'Respostas auditáveis', value: '1.247', trend: '+18,2%' },
    { label: 'Taxa de citação válida', value: '93,1%', trend: '+3,8pp' },
    { label: 'Tempo médio de resposta', value: '1,42s', trend: '-0,18s' },
    { label: 'Cobertura de fontes oficiais', value: '88,7%', trend: '+5,7pp' },
    { label: 'Satisfação do usuário', value: '4,7/5', trend: '+0,3' },
  ];

  readonly themeBars = METRIC_THEME_BARS;
  readonly sourceDonut = METRIC_SOURCE_DONUT;
  readonly weekly = METRIC_WEEKLY;
  readonly ranking = SOURCE_RANKING;
  readonly queries = RECENT_QUERIES;

  readonly scatter = [
    { x: 60, y: 120 }, { x: 90, y: 100 }, { x: 110, y: 95 }, { x: 130, y: 80 },
    { x: 150, y: 75 }, { x: 170, y: 65 }, { x: 200, y: 50 }, { x: 210, y: 70 },
  ];

  get precisaoPoints(): string {
    return this.weekly.map((w, i) => `${30 + i * 42},${120 - (w.precisao - 87) * 12}`).join(' ');
  }

  get citacaoPoints(): string {
    return this.weekly.map((w, i) => `${30 + i * 42},${120 - (w.citacao - 87) * 12}`).join(' ');
  }
}
