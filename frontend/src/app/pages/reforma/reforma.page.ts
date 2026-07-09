import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FAQ_ITEMS,
  NORMATIVE_EVOLUTION,
  RISK_ITEMS,
  SECTOR_IMPACT,
  THEME_DONUT,
} from '../../core/mock-data';
import { DonutComponent } from '../../shared/donut.component';
import { HBarComponent } from '../../shared/hbar.component';
import { SparklineComponent } from '../../shared/sparkline.component';

@Component({
  selector: 'app-reforma-page',
  standalone: true,
  imports: [NgFor, NgIf, DonutComponent, HBarComponent, SparklineComponent],
  template: `
    <div class="space-y-5 p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-semibold tracking-tight">Visão Geral da Reforma</h1>
          <p class="mt-1 text-sm text-text-muted">Panorama executivo da Reforma Tributária do Consumo no Brasil.</p>
        </div>
        <button type="button" class="btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar relatório
        </button>
      </div>

      <!-- KPIs -->
      <div class="grid grid-cols-2 gap-3 xl:grid-cols-6">
        <div *ngFor="let k of kpis" class="card p-3.5">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-[11px] font-medium uppercase tracking-wide text-text-dim">{{ k.label }}</span>
            <span class="text-text-dim" [innerHTML]="k.icon"></span>
          </div>
          <div class="kpi-value text-[1.15rem]">{{ k.value }}</div>
          <div class="mt-1 text-xs" [class]="k.hintClass">{{ k.hint }}</div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="card p-4">
        <div class="mb-4 text-sm font-semibold">Linha do tempo de implementação</div>
        <div class="grid gap-3 md:grid-cols-4">
          <div
            *ngFor="let p of phases"
            class="rounded-[10px] border p-3"
            [class.border-primary]="p.active"
            [class.bg-primary/10]="p.active"
            [class.border-border]="!p.active"
          >
            <div class="text-[10px] font-semibold uppercase tracking-wider text-text-dim">{{ p.period }}</div>
            <div class="mt-1 text-sm font-semibold" [class.text-primary-bright]="p.active">{{ p.title }}</div>
            <ul class="mt-2 space-y-1 text-[11px] text-text-muted">
              <li *ngFor="let i of p.items">• {{ i }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Novos tributos + substituídos -->
      <div class="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Novos tributos</div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div *ngFor="let t of taxes" class="rounded-[10px] border border-border bg-bg p-3">
              <div class="flex items-center gap-2">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" [style.background]="t.color">{{ t.code }}</span>
                <div>
                  <div class="text-sm font-semibold">{{ t.code }}</div>
                  <div class="text-[11px] text-text-dim">{{ t.scope }}</div>
                </div>
              </div>
              <p class="mt-2 text-xs text-text-muted">{{ t.name }}</p>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Tributos substituídos</div>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let s of substituted" class="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary-bright">{{ s }}</span>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid gap-3 xl:grid-cols-3">
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Impacto estimado por setor</div>
          <app-hbar [rows]="sectors"></app-hbar>
        </div>
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Temas mais consultados</div>
          <app-donut [data]="themes" centerValue="8.742" centerLabel="Consultas"></app-donut>
        </div>
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Evolução normativa</div>
          <svg viewBox="0 0 280 120" class="w-full">
            <g *ngFor="let b of normative; let i = index">
              <rect [attr.x]="20 + i * 36" [attr.y]="100 - b.atos * 18" width="18" height="{{ b.atos * 18 }}" rx="3" fill="#2563eb" opacity="0.85"/>
            </g>
            <polyline fill="none" stroke="#10b981" stroke-width="2" [attr.points]="linePoints"/>
            <g *ngFor="let b of normative; let i = index">
              <text [attr.x]="29 + i * 36" y="114" text-anchor="middle" fill="#64748b" font-size="8">{{ b.m }}</text>
            </g>
          </svg>
          <div class="mt-2 flex gap-4 text-[11px] text-text-dim">
            <span><span class="mr-1 inline-block h-2 w-2 rounded-sm bg-primary"></span>Atos publicados</span>
            <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-success"></span>Acumulado</span>
          </div>
        </div>
      </div>

      <!-- Bottom grid -->
      <div class="grid gap-3 xl:grid-cols-3">
        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Perguntas frequentes</div>
          <div class="space-y-2">
            <details *ngFor="let f of faqs; let i = index" class="rounded-lg border border-border bg-bg open:bg-bg-card-hover" [attr.open]="i === 0 ? '' : null">
              <summary class="cursor-pointer px-3 py-2.5 text-xs font-medium text-text">{{ f.q }}</summary>
              <p class="border-t border-border px-3 py-2 text-xs text-text-muted">{{ f.a }}</p>
            </details>
          </div>
        </div>

        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Fontes normativas recentes</div>
          <ul class="space-y-2.5">
            <li *ngFor="let n of recentNorms" class="flex items-start gap-2 rounded-lg border border-border bg-bg px-3 py-2">
              <span class="badge-blue shrink-0">{{ n.badge }}</span>
              <div class="min-w-0 flex-1">
                <div class="truncate text-xs font-medium">{{ n.title }}</div>
                <div class="text-[11px] text-text-dim">{{ n.date }}</div>
              </div>
              <span *ngIf="n.novo" class="badge-green">Novo</span>
            </li>
          </ul>
        </div>

        <div class="card p-4">
          <div class="mb-3 text-sm font-semibold">Monitoramento de riscos</div>
          <div class="space-y-2.5">
            <div *ngFor="let r of risks" class="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2">
              <div class="flex items-center gap-2 text-xs">
                <span class="h-2 w-2 rounded-full" [style.background]="riskColor(r.status)"></span>
                <span class="truncate">{{ r.nome }}</span>
              </div>
              <span class="text-[11px] text-text-dim">{{ r.tendencia }}</span>
              <app-sparkline [values]="r.spark" [color]="riskColor(r.status)"></app-sparkline>
            </div>
          </div>
        </div>
      </div>

      <footer class="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-[11px] text-text-dim">
        <span>Dados atualizados em 18/05/2025 10:24 · Fuso horário: America/Sao_Paulo</span>
        <span>Fontes oficiais monitoradas: 18</span>
      </footer>
    </div>
  `,
})
export class ReformaPage {
  readonly kpis = [
    { label: 'Fase de Transição', value: 'Pré-operacional', hint: '2026–2032', hintClass: 'text-text-muted', icon: icon('hourglass') },
    { label: 'Marcos Normativos', value: '24', hint: 'Atos publicados', hintClass: 'text-text-muted', icon: icon('book') },
    { label: 'Setores Impactados', value: '62', hint: 'Setores monitorados', hintClass: 'text-text-muted', icon: icon('users') },
    { label: 'Alíquotas Monitoradas', value: '17', hint: 'Cenários ativos', hintClass: 'text-text-muted', icon: icon('pct') },
    { label: 'Risco Regulatório', value: 'Médio', hint: 'Tendência estável', hintClass: 'text-warning', icon: icon('shield') },
    { label: 'Consultas Recentes', value: '1.425', hint: 'Últimos 7 dias', hintClass: 'text-text-muted', icon: icon('chat') },
  ];

  readonly phases = [
    { period: '2023–2025', title: 'Preparação', active: false, items: ['EC 132/2023', 'Leis complementares', 'Regulamentação inicial'] },
    { period: '2026–2032', title: 'Transição', active: true, items: ['Convivência de tributos', 'Redução gradual ICMS/ISS', 'Testes de split payment'] },
    { period: '2033', title: 'Início Pleno', active: false, items: ['Extinção PIS/COFINS', 'Extinção IPI', 'IBS/CBS plenos'] },
    { period: '2034–2037', title: 'Consolidação', active: false, items: ['Extinção ICMS/ISS', 'Estabilização do modelo', 'Ajustes finais'] },
  ];

  readonly taxes = [
    { code: 'IBS', name: 'Imposto sobre Bens e Serviços', scope: 'Subnacional', color: '#2563eb' },
    { code: 'CBS', name: 'Contribuição sobre Bens e Serviços', scope: 'Federal', color: '#10b981' },
    { code: 'IS', name: 'Imposto Seletivo', scope: 'Federal', color: '#f59e0b' },
  ];

  readonly substituted = ['ICMS', 'ISS', 'IPI', 'PIS', 'COFINS'];
  readonly sectors = SECTOR_IMPACT;
  readonly themes = THEME_DONUT;
  readonly normative = NORMATIVE_EVOLUTION;
  readonly faqs = FAQ_ITEMS;
  readonly risks = RISK_ITEMS;

  readonly recentNorms = [
    { badge: 'LC', title: 'LC 214/2025 — Regulamentação IBS/CBS', date: '16/01/2025', novo: true },
    { badge: 'Dec', title: 'Decreto 12.xxx — Split Payment piloto', date: '02/04/2025', novo: true },
    { badge: 'Port', title: 'Portaria RFB — Créditos de exportação', date: '18/03/2025', novo: false },
    { badge: 'EC', title: 'EC 132/2023 — Reforma Tributária', date: '20/12/2023', novo: false },
  ];

  get linePoints(): string {
    return this.normative
      .map((b, i) => `${29 + i * 36},${100 - b.acum * 3.2}`)
      .join(' ');
  }

  riskColor(status: string): string {
    switch (status) {
      case 'amarelo':
        return '#f59e0b';
      case 'laranja':
        return '#f97316';
      case 'verde':
        return '#10b981';
      default: {
        const _e: never = status as never;
        return String(_e);
      }
    }
  }
}

function icon(name: string): string {
  const c = 'width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"';
  const map: Record<string, string> = {
    hourglass: `<svg ${c}><path d="M5 22h14M5 2h14M8 2v4l4 4 4-4V2M8 22v-4l4-4 4 4v4"/></svg>`,
    book: `<svg ${c}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
    users: `<svg ${c}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    pct: `<svg ${c}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
    shield: `<svg ${c}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    chat: `<svg ${c}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  };
  return map[name] ?? '';
}
