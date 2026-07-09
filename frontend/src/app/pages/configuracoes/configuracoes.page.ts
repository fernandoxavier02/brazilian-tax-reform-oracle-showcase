import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracoes-page',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <div class="space-y-5 p-5">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Configurações</h1>
        <p class="mt-1 text-sm text-text-muted">Ambiente LLM, preferências de indexação e notificações.</p>
      </div>

      <div class="grid gap-3 xl:grid-cols-2">
        <div class="card p-4">
          <div class="mb-4 text-sm font-semibold">Ambiente LLM</div>
          <label class="mb-1 block text-xs text-text-dim">Provedor</label>
          <select class="mb-3 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm" [(ngModel)]="provider">
            <option>Ollama (local)</option>
            <option>OpenAI-compatible</option>
          </select>
          <label class="mb-1 block text-xs text-text-dim">Modelo</label>
          <input class="mb-3 w-full rounded-lg border border-border bg-bg px-3 py-2 font-mono text-sm" [(ngModel)]="model" />
          <label class="mb-1 block text-xs text-text-dim">Temperatura</label>
          <input type="range" min="0" max="1" step="0.1" class="w-full" [(ngModel)]="temperature" />
          <div class="mt-1 text-xs text-text-dim">{{ temperature }}</div>
        </div>

        <div class="card p-4">
          <div class="mb-4 text-sm font-semibold">Indexação</div>
          <div *ngFor="let t of toggles" class="mb-3 flex items-center justify-between gap-3 border-b border-border-subtle pb-3 last:border-0">
            <div>
              <div class="text-sm font-medium">{{ t.label }}</div>
              <div class="text-[11px] text-text-dim">{{ t.hint }}</div>
            </div>
            <button
              type="button"
              class="relative h-6 w-11 rounded-full transition"
              [class.bg-primary]="t.on"
              [class.bg-border]="!t.on"
              (click)="t.on = !t.on"
            >
              <span class="absolute top-0.5 h-5 w-5 rounded-full bg-white transition" [class.left-0.5]="!t.on" [class.left-5]="t.on"></span>
            </button>
          </div>
        </div>

        <div class="card p-4">
          <div class="mb-4 text-sm font-semibold">Notificações</div>
          <div *ngFor="let n of notifs" class="mb-3 flex items-center justify-between">
            <span class="text-sm text-text-muted">{{ n.label }}</span>
            <input type="checkbox" [(ngModel)]="n.on" class="h-4 w-4 accent-primary" />
          </div>
        </div>

        <div class="card p-4">
          <div class="mb-4 text-sm font-semibold">Conta</div>
          <div class="mb-3 flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">RM</div>
            <div>
              <div class="text-sm font-semibold">Rafael Martins</div>
              <div class="text-xs text-text-dim">rafael.martins@empresa.com.br</div>
              <div class="text-xs text-text-dim">Analista Tributário</div>
            </div>
          </div>
          <button type="button" class="btn text-xs">Alterar senha</button>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <button type="button" class="btn">Cancelar</button>
        <button type="button" class="btn-primary">Salvar alterações</button>
      </div>
    </div>
  `,
})
export class ConfiguracoesPage {
  provider = 'Ollama (local)';
  model = 'mistral:7b-instruct-q4_K_M';
  temperature = 0.3;

  toggles = [
    { label: 'Sincronização automática', hint: 'Executar crawl diário às 06:00', on: true },
    { label: 'Reindexar ao detectar mudança', hint: 'Hash-diff nas fontes oficiais', on: true },
    { label: 'Validação de embeddings', hint: 'Checagem de dimensão e NaN', on: true },
    { label: 'Modo debug de pipeline', hint: 'Logs verbosos no painel', on: false },
  ];

  notifs = [
    { label: 'Falhas de indexação', on: true },
    { label: 'Novas normas publicadas', on: true },
    { label: 'Relatório semanal de métricas', on: false },
    { label: 'Alertas de risco regulatório', on: true },
  ];
}
