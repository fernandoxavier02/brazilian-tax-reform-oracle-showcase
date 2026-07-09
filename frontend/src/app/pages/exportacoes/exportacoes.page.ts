import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { EXPORT_HISTORY } from '../../core/mock-data';

@Component({
  selector: 'app-exportacoes-page',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="space-y-5 p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-semibold tracking-tight">Exportações</h1>
          <p class="mt-1 text-sm text-text-muted">Histórico e geração de relatórios em PDF, DOCX, XLSX e CSV.</p>
        </div>
        <button type="button" class="btn-primary">Nova exportação</button>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Exportações (30d)</div>
          <div class="kpi-value mt-1">47</div>
        </div>
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Concluídas</div>
          <div class="kpi-value mt-1 text-success">44</div>
        </div>
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Em processamento</div>
          <div class="kpi-value mt-1 text-warning">1</div>
        </div>
        <div class="card p-3.5">
          <div class="text-[11px] uppercase tracking-wide text-text-dim">Volume gerado</div>
          <div class="kpi-value mt-1">128 MB</div>
        </div>
      </div>

      <div class="card overflow-hidden">
        <div class="border-b border-border px-4 py-3 text-sm font-semibold">Histórico recente</div>
        <table class="w-full text-left text-xs">
          <thead class="bg-bg text-text-dim">
            <tr>
              <th class="px-4 py-2.5 font-medium">Nome</th>
              <th class="px-3 py-2.5 font-medium">Formato</th>
              <th class="px-3 py-2.5 font-medium">Data</th>
              <th class="px-3 py-2.5 font-medium">Status</th>
              <th class="px-3 py-2.5 font-medium">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of history" class="border-t border-border-subtle hover:bg-bg-card-hover">
              <td class="px-4 py-3 font-medium text-text">{{ e.nome }}</td>
              <td class="px-3 py-3"><span class="badge-blue">{{ e.formato }}</span></td>
              <td class="px-3 py-3 text-text-muted">{{ e.data }}</td>
              <td class="px-3 py-3">
                <span [class]="e.status === 'Concluído' ? 'badge-green' : 'badge-yellow'">{{ e.status }}</span>
              </td>
              <td class="px-3 py-3">
                <button type="button" class="text-primary-bright hover:underline" [disabled]="e.status !== 'Concluído'">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card p-4">
        <div class="mb-3 text-sm font-semibold">Modelos disponíveis</div>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button *ngFor="let t of templates" type="button" class="rounded-[10px] border border-border bg-bg p-3 text-left transition hover:border-primary hover:bg-bg-card-hover">
            <div class="text-sm font-semibold">{{ t.name }}</div>
            <div class="mt-1 text-[11px] text-text-dim">{{ t.desc }}</div>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ExportacoesPage {
  readonly history = EXPORT_HISTORY;
  readonly templates = [
    { name: 'Visão Geral', desc: 'Panorama executivo da reforma' },
    { name: 'Métricas RAG', desc: 'Precisão, citação e latência' },
    { name: 'Inventário de Fontes', desc: 'Status e cobertura por origem' },
    { name: 'Transcrição de Chat', desc: 'Conversa + fontes citadas' },
  ];
}
