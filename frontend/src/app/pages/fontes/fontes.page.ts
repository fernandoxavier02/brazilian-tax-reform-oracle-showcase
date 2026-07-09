import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { OFFICIAL_SOURCES } from '../../core/mock-data';

@Component({
  selector: 'app-fontes-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="space-y-5 p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-semibold tracking-tight">Fontes Oficiais</h1>
          <p class="mt-1 text-sm text-text-muted">Inventário das fontes normativas monitoradas pelo pipeline de indexação.</p>
        </div>
        <div class="flex gap-2">
          <button type="button" class="btn">Adicionar fonte</button>
          <button type="button" class="btn-primary">Sincronizar todas</button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Fontes ativas</div>
          <div class="kpi-value mt-1">6 / 6</div>
        </div>
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Documentos totais</div>
          <div class="kpi-value mt-1">48.732</div>
        </div>
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Confiança média</div>
          <div class="kpi-value mt-1">92,2%</div>
        </div>
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Último crawl</div>
          <div class="kpi-value mt-1 text-[1.1rem]">Hoje 06:12</div>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <div *ngFor="let s of sources" class="card p-4 transition hover:bg-bg-card-hover">
          <div class="mb-3 flex items-start justify-between gap-2">
            <div>
              <div class="text-sm font-semibold">{{ s.nome }}</div>
              <div class="text-[11px] text-text-dim">{{ s.url }}</div>
            </div>
            <span class="badge-green">{{ s.status }}</span>
          </div>
          <div class="mb-3 grid grid-cols-2 gap-2 text-xs text-text-muted">
            <div>Documentos<br/><span class="font-mono text-text">{{ s.documentos }}</span> <span class="text-success">{{ s.delta24h }}</span></div>
            <div>Atualização<br/><span class="text-text">{{ s.ultimaAtualizacao }}</span></div>
          </div>
          <div class="mb-1 flex justify-between text-[11px] text-text-muted">
            <span>Confiança</span><span class="font-mono">{{ s.confianca }}%</span>
          </div>
          <div class="progress-track mb-2"><div class="progress-fill" [style.width.%]="s.confianca"></div></div>
          <div class="mb-1 flex justify-between text-[11px] text-text-muted">
            <span>Cobertura</span><span class="font-mono">{{ s.cobertura }}%</span>
          </div>
          <div class="progress-track"><div class="progress-fill bg-success" [style.width.%]="s.cobertura"></div></div>
        </div>
      </div>
    </div>
  `,
})
export class FontesPage {
  readonly sources = OFFICIAL_SOURCES;
}
