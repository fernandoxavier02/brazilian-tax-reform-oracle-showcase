import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { ChatService } from '../../core/chat.service';
import { SUGGESTED_QUESTIONS } from '../../core/mock-data';
import { ChatMessage, ChatThread } from '../../core/models';
import { CitationCardComponent } from '../../shared/citation-card.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, DatePipe, FormsModule, CitationCardComponent],
  template: `
    <div class="h-[calc(100vh-7.5rem)] flex bg-surface">
      <!-- Threads sidebar -->
      <aside class="hidden lg:flex w-64 flex-col border-r border-gray-200 bg-white">
        <div class="p-3 border-b border-gray-100">
          <button
            type="button"
            class="w-full rounded-lg bg-primary text-white text-sm font-semibold py-2 hover:bg-primary-dark transition-colors"
            (click)="chat.createThread()"
          >
            + Nova consulta
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-2 space-y-1">
          <button
            type="button"
            *ngFor="let thread of threads$ | async"
            class="w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors"
            [class.bg-blue-50]="thread.id === (activeId$ | async)"
            [class.text-primary]="thread.id === (activeId$ | async)"
            [class.font-semibold]="thread.id === (activeId$ | async)"
            [class.hover:bg-gray-50]="thread.id !== (activeId$ | async)"
            (click)="chat.selectThread(thread.id)"
          >
            <div class="truncate">{{ thread.title }}</div>
            <div class="text-[10px] text-gray-400 mt-0.5">{{ thread.updatedAt | date: 'dd/MM HH:mm' }}</div>
          </button>
        </div>
      </aside>

      <!-- Chat area -->
      <section class="flex-1 flex flex-col min-w-0">
        <div class="px-4 py-3 border-b border-gray-200 bg-white">
          <h2 class="text-base font-semibold text-slate">Chat Inteligente</h2>
          <p class="text-xs text-gray-500">Consultas em linguagem natural com citacoes da LC 214/2025 (sintetica)</p>
        </div>

        <div #scrollBox class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <ng-container *ngIf="activeThread$ | async as thread">
            <div *ngIf="thread.messages.length === 0" class="text-center py-10">
              <p class="text-sm text-gray-500 mb-4">Faca uma pergunta sobre a Reforma Tributaria</p>
              <div class="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                <button
                  type="button"
                  *ngFor="let q of suggestions"
                  class="rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs text-primary hover:bg-blue-50 transition-colors"
                  (click)="useSuggestion(q)"
                >
                  {{ q }}
                </button>
              </div>
            </div>

            <div *ngFor="let msg of thread.messages" [class]="msg.role === 'user' ? 'flex justify-start' : 'flex justify-end'">
              <div
                class="max-w-[85%] md:max-w-[70%] rounded-xl px-4 py-3 shadow-sm"
                [class.bg-user-bubble]="msg.role === 'user'"
                [class.border]="true"
                [class.border-primary]="msg.role === 'user'"
                [class.bg-white]="msg.role === 'oracle'"
                [class.border-gray-200]="msg.role === 'oracle'"
              >
                <div
                  class="text-[11px] font-bold mb-1"
                  [class.text-primary]="msg.role === 'user'"
                  [class.text-success]="msg.role === 'oracle'"
                >
                  {{ msg.role === 'user' ? 'Voce' : 'Oracle' }}
                </div>
                <div
                  class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed"
                  [class.legal-quote]="msg.role === 'oracle'"
                >{{ msg.content }}</div>

                <div *ngIf="msg.role === 'oracle' && msg.citations?.length" class="mt-3 space-y-2">
                  <app-citation-card *ngFor="let c of msg.citations" [citation]="c" />
                </div>

                <div *ngIf="msg.role === 'oracle'" class="mt-3 flex flex-wrap items-center gap-2">
                  <span *ngIf="msg.confidence" class="text-[10px] text-gray-400">
                    Confianca: {{ msg.confidence }} · {{ msg.processingTimeMs }} ms
                  </span>
                  <button
                    type="button"
                    class="text-[11px] font-medium text-primary border border-primary/30 rounded px-2 py-1 hover:bg-blue-50"
                    (click)="exportPdf(msg)"
                  >
                    Exportar PDF
                  </button>
                  <button
                    type="button"
                    class="text-[11px] font-medium text-slate border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
                    (click)="exportWord(msg)"
                  >
                    Exportar Word
                  </button>
                </div>
              </div>
            </div>

            <div *ngIf="typing$ | async" class="flex justify-end">
              <div class="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                <div class="text-[11px] font-bold text-success mb-1">Oracle</div>
                <div class="flex gap-1 items-center h-5">
                  <span class="typing-dot w-1.5 h-1.5 rounded-full bg-success"></span>
                  <span class="typing-dot w-1.5 h-1.5 rounded-full bg-success"></span>
                  <span class="typing-dot w-1.5 h-1.5 rounded-full bg-success"></span>
                </div>
              </div>
            </div>
          </ng-container>
        </div>

        <div *ngIf="(activeThread$ | async)?.messages?.length" class="px-4 pb-2">
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              *ngFor="let q of suggestions.slice(0, 3)"
              class="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] text-gray-600 hover:border-primary hover:text-primary"
              (click)="useSuggestion(q)"
            >
              {{ q }}
            </button>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 bg-white">
          <form class="flex gap-2" (ngSubmit)="send()">
            <input
              type="text"
              class="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              placeholder="Digite sua pergunta sobre a Reforma Tributaria..."
              [(ngModel)]="draft"
              name="draft"
              [disabled]="(typing$ | async) === true"
            />
            <button
              type="submit"
              class="rounded-lg bg-primary text-white font-semibold px-5 py-2.5 text-sm hover:bg-primary-dark disabled:opacity-50 transition-colors"
              [disabled]="!draft.trim() || (typing$ | async)"
            >
              Consultar
            </button>
          </form>
        </div>
      </section>
    </div>
  `,
})
export class ChatPage {
  readonly chat = inject(ChatService);
  readonly suggestions = SUGGESTED_QUESTIONS;
  draft = '';

  @ViewChild('scrollBox') scrollBox?: ElementRef<HTMLDivElement>;

  readonly threads$ = this.chat.threads$;
  readonly activeId$ = this.chat.activeThreadId$;
  readonly typing$ = this.chat.typing$;
  readonly activeThread$ = combineLatest([this.threads$, this.activeId$]).pipe(
    map(([threads, id]) => threads.find((t) => t.id === id))
  );

  send(): void {
    const text = this.draft;
    this.draft = '';
    this.chat.sendMessage(text).subscribe(() => this.scrollToBottom());
    setTimeout(() => this.scrollToBottom(), 50);
  }

  useSuggestion(q: string): void {
    this.draft = q;
    this.send();
  }

  exportPdf(msg: ChatMessage): void {
    const blob = new Blob([this.formatExport(msg, 'PDF')], { type: 'text/plain;charset=utf-8' });
    this.download(blob, `oracle-resposta-${msg.id}.txt`);
  }

  exportWord(msg: ChatMessage): void {
    const blob = new Blob([this.formatExport(msg, 'Word')], { type: 'application/msword;charset=utf-8' });
    this.download(blob, `oracle-resposta-${msg.id}.doc`);
  }

  private formatExport(msg: ChatMessage, format: string): string {
    const cites = (msg.citations ?? [])
      .map((c) => `- ${c.fonte}, ${c.artigo} | Confianca: ${c.confianca} | Indexado: ${c.dataIndexado}`)
      .join('\n');
    return [
      `Brazilian Tax Reform Oracle — Export ${format}`,
      '',
      msg.content,
      '',
      'Citacoes:',
      cites || '(nenhuma)',
      '',
      'Aviso: demonstracao educacional. Nao constitui aconselhamento juridico.',
    ].join('\n');
  }

  private download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private scrollToBottom(): void {
    const el = this.scrollBox?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
