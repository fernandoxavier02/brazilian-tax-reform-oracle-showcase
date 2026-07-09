import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/chat.service';
import { RETRIEVED_SOURCES } from '../../core/mock-data';
import { ChatMessage, ChatThread } from '../../core/models';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, FormsModule],
  template: `
    <div class="flex h-full min-h-0 flex-col">
      <div class="shrink-0 border-b border-border px-5 py-4">
        <div class="mb-1 flex flex-wrap items-center gap-2">
          <h1 class="text-xl font-semibold tracking-tight">Chat Inteligente</h1>
          <span class="badge-outline-green">Auditável</span>
          <span class="badge-outline-blue">Fontes Oficiais</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg>
        </div>
        <p class="mb-3 text-sm text-text-muted">Consultas em linguagem natural com fontes oficiais recuperadas pelo RAG.</p>
        <div class="flex flex-wrap items-center gap-2">
          <button
            *ngFor="let f of filters"
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-medium transition"
            [class.border-primary]="activeFilter === f"
            [class.bg-primary/20]="activeFilter === f"
            [class.text-primary-bright]="activeFilter === f"
            [class.border-border]="activeFilter !== f"
            [class.text-text-muted]="activeFilter !== f"
            (click)="activeFilter = f"
          >{{ f }}</button>
          <button type="button" class="btn ml-1 rounded-full px-3 py-1 text-xs">+ Filtros</button>
        </div>
      </div>

      <div class="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[240px_1fr_280px]">
        <!-- Conversas -->
        <aside class="flex min-h-0 flex-col border-r border-border">
          <div class="flex items-center justify-between border-b border-border px-3 py-3">
            <span class="text-sm font-semibold">Conversas</span>
            <button type="button" class="btn-primary px-2 py-1 text-[11px]" (click)="chat.createThread()">+ Nova conversa</button>
          </div>
          <div class="min-h-0 flex-1 overflow-y-auto p-2">
            <button
              *ngFor="let t of threads$ | async"
              type="button"
              class="mb-1 w-full rounded-lg border border-transparent px-3 py-2.5 text-left transition hover:bg-bg-card-hover"
              [class.border-primary]="(activeId$ | async) === t.id"
              [class.bg-primary/15]="(activeId$ | async) === t.id"
              (click)="chat.selectThread(t.id)"
            >
              <div class="truncate text-xs font-medium text-text">{{ t.title }}</div>
              <div class="mt-1 flex items-center justify-between gap-2">
                <span *ngIf="t.tag" class="badge-blue">{{ t.tag }}</span>
                <span class="text-[10px] text-text-dim">{{ t.updatedAt | date:'HH:mm' }}</span>
              </div>
            </button>
          </div>
        </aside>

        <!-- Chat -->
        <section class="flex min-h-0 flex-col border-r border-border">
          <div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
            <ng-container *ngIf="activeThread as thread">
              <ng-container *ngFor="let m of thread.messages">
                <div *ngIf="m.role === 'user'" class="flex justify-end">
                  <div class="max-w-[85%] rounded-[10px] bg-primary px-4 py-2.5 text-sm text-white">
                    <div class="mb-1 text-[10px] font-semibold opacity-80">RM</div>
                    {{ m.content }}
                  </div>
                </div>

                <div *ngIf="m.role === 'oracle'" class="max-w-[92%]">
                  <div class="card p-4">
                    <ng-container *ngIf="m.structured; else plain">
                      <div class="mb-2 text-lg font-semibold text-text">{{ m.structured.directAnswer }}</div>
                      <p class="mb-4 text-sm text-text-muted">{{ m.structured.summary }}</p>
                      <div class="mb-3">
                        <div class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-dim">Fundamento jurídico</div>
                        <ul class="space-y-1.5 text-sm text-text-muted">
                          <li *ngFor="let f of m.structured.fundamentos" class="leading-relaxed">• {{ f }}</li>
                        </ul>
                      </div>
                      <div class="mb-3">
                        <div class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-dim">Conclusão</div>
                        <p class="text-sm text-text-muted">{{ m.structured.conclusao }}</p>
                      </div>
                      <div class="flex flex-wrap gap-2 border-t border-border pt-3">
                        <span class="text-[11px] font-medium text-text-dim">Fontes citadas:</span>
                        <span *ngFor="let c of m.structured.fontesCitadas" class="badge-blue">{{ c.n }} {{ c.label }}</span>
                      </div>
                    </ng-container>
                    <ng-template #plain>
                      <pre class="whitespace-pre-wrap font-sans text-sm text-text-muted">{{ m.content }}</pre>
                    </ng-template>
                  </div>

                  <div class="mt-2 flex flex-wrap items-center gap-2">
                    <button type="button" class="btn px-2 py-1 text-xs" title="Útil">👍</button>
                    <button type="button" class="btn px-2 py-1 text-xs" title="Não útil">👎</button>
                    <button type="button" class="btn px-2 py-1 text-xs">Exportar resposta ▾</button>
                    <button type="button" class="btn px-2 py-1 text-xs">PDF</button>
                    <button type="button" class="btn px-2 py-1 text-xs">Word</button>
                  </div>
                </div>
              </ng-container>

              <div *ngIf="typing$ | async" class="text-xs text-text-dim">Oracle está analisando fontes…</div>
            </ng-container>
          </div>

          <div class="shrink-0 border-t border-border p-3">
            <div class="flex items-end gap-2">
              <button type="button" class="btn px-2 py-2" title="Anexar">📎</button>
              <textarea
                rows="2"
                [(ngModel)]="draft"
                (keydown.enter)="$event.preventDefault(); send()"
                placeholder="Faça uma pergunta sobre a Reforma Tributária..."
                class="min-h-[44px] flex-1 resize-none rounded-[10px] border border-border bg-bg-card px-3 py-2.5 text-sm text-text outline-none focus:border-primary"
              ></textarea>
              <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-bright" (click)="send()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-2">
              <div class="card px-3 py-2 text-center">
                <div class="text-[10px] uppercase tracking-wide text-text-dim">Documentos Recuperados</div>
                <div class="font-mono text-sm font-semibold">18</div>
              </div>
              <div class="card px-3 py-2 text-center">
                <div class="text-[10px] uppercase tracking-wide text-text-dim">Tempo de Resposta</div>
                <div class="font-mono text-sm font-semibold">1,42 s</div>
              </div>
              <div class="card flex items-center justify-center gap-2 px-3 py-2">
                <div class="text-center">
                  <div class="text-[10px] uppercase tracking-wide text-text-dim">Precisão Estimada</div>
                  <div class="font-mono text-sm font-semibold">92%</div>
                </div>
                <svg width="28" height="28" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" stroke-width="3"/>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="80.8" stroke-dashoffset="6.5" transform="rotate(-90 18 18)"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- Fontes -->
        <aside class="flex min-h-0 flex-col">
          <div class="flex items-center justify-between border-b border-border px-3 py-3">
            <span class="text-sm font-semibold">Fontes recuperadas (18)</span>
            <button type="button" class="text-text-dim hover:text-text">⬇</button>
          </div>
          <div class="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
            <div *ngFor="let s of sources" class="card p-3">
              <div class="mb-1.5 flex items-start justify-between gap-2">
                <div class="text-sm font-semibold">{{ s.title }}</div>
                <span class="badge-blue shrink-0">{{ s.badge }}</span>
              </div>
              <div class="mb-2 text-[11px] text-text-dim">{{ s.org }} · {{ s.tipo }}</div>
              <div class="mb-1 flex items-center justify-between text-[11px]">
                <span class="text-text-muted">Confiança</span>
                <span class="font-mono text-success">{{ s.confianca }}%</span>
              </div>
              <div class="progress-track mb-2"><div class="progress-fill bg-success" [style.width.%]="s.confianca"></div></div>
              <div class="flex items-center justify-between text-[11px] text-text-muted">
                <span>Relevância: {{ '★'.repeat(s.relevancia) }}{{ '☆'.repeat(5 - s.relevancia) }}</span>
                <span>{{ s.publicacao }}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
})
export class ChatPage {
  readonly filters = ['Todos', 'IBS', 'CBS', 'IS', 'Split Payment', 'Cashback', 'Zona Franca'];
  activeFilter = 'Todos';
  draft = '';
  readonly sources = RETRIEVED_SOURCES;

  readonly threads$ = this.chat.threads$;
  readonly activeId$ = this.chat.activeThreadId$;
  readonly typing$ = this.chat.typing$;

  constructor(readonly chat: ChatService) {}

  get activeThread(): ChatThread | undefined {
    return this.chat.activeThread;
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) return;
    this.draft = '';
    this.chat.sendMessage(text).subscribe();
  }
}
