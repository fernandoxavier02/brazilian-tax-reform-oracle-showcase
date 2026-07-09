import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { ChatMessage, ChatThread, Citation, ConfidenceLevel, CorpusArticle } from './models';
import { CORPUS_ARTICLES, INITIAL_THREADS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly threadsSubject = new BehaviorSubject<ChatThread[]>(
    INITIAL_THREADS.map((t) => ({ ...t, messages: [...t.messages] }))
  );
  private readonly activeThreadIdSubject = new BehaviorSubject<string>(INITIAL_THREADS[0].id);
  private readonly typingSubject = new BehaviorSubject<boolean>(false);

  readonly threads$: Observable<ChatThread[]> = this.threadsSubject.asObservable();
  readonly activeThreadId$: Observable<string> = this.activeThreadIdSubject.asObservable();
  readonly typing$: Observable<boolean> = this.typingSubject.asObservable();

  get activeThread(): ChatThread | undefined {
    return this.threadsSubject.value.find((t) => t.id === this.activeThreadIdSubject.value);
  }

  selectThread(id: string): void {
    this.activeThreadIdSubject.next(id);
  }

  createThread(title = 'Nova consulta'): void {
    const thread: ChatThread = {
      id: `t_${Date.now()}`,
      title,
      updatedAt: new Date(),
      messages: [],
    };
    this.threadsSubject.next([thread, ...this.threadsSubject.value]);
    this.activeThreadIdSubject.next(thread.id);
  }

  sendMessage(text: string): Observable<ChatMessage> {
    const trimmed = text.trim();
    if (!trimmed) {
      return of();
    }

    const threadId = this.activeThreadIdSubject.value;
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    this.appendMessage(threadId, userMsg);
    this.maybeRenameThread(threadId, trimmed);
    this.typingSubject.next(true);

    const oracleMsg = this.buildOracleResponse(trimmed);

    return of(oracleMsg).pipe(
      delay(800),
      tap((msg) => {
        this.appendMessage(threadId, msg);
        this.typingSubject.next(false);
      })
    );
  }

  private appendMessage(threadId: string, message: ChatMessage): void {
    const threads = this.threadsSubject.value.map((t) => {
      if (t.id !== threadId) {
        return t;
      }
      return {
        ...t,
        updatedAt: new Date(),
        messages: [...t.messages, message],
      };
    });
    this.threadsSubject.next(threads);
  }

  private maybeRenameThread(threadId: string, firstMessage: string): void {
    const threads = this.threadsSubject.value.map((t) => {
      if (t.id !== threadId) {
        return t;
      }
      if (t.messages.filter((m) => m.role === 'user').length > 1) {
        return t;
      }
      const title = firstMessage.length > 42 ? `${firstMessage.slice(0, 42)}...` : firstMessage;
      return { ...t, title };
    });
    this.threadsSubject.next(threads);
  }

  private buildOracleResponse(query: string): ChatMessage {
    const matches = this.matchArticles(query);
    const top = matches[0];
    const confidence: ConfidenceLevel = top && top.score >= 2 ? 'Alta' : top ? 'Media' : 'Baixa';
    const processingTimeMs = 240 + Math.floor(Math.random() * 180);

    if (!top) {
      return {
        id: `o_${Date.now()}`,
        role: 'oracle',
        content:
          'Não encontrei trechos suficientemente relevantes no corpus sintético indexado. Tente reformular com termos como IBS, CBS, IS, saúde, exportação, cesta básica ou crédito.',
        timestamp: new Date(),
        confidence: 'Baixa',
        processingTimeMs,
        citations: [],
      };
    }

    const article = top.article;
    const citations: Citation[] = matches.slice(0, 2).map((m) => ({
      fonte: 'LC 214/2025',
      artigo: m.article.article,
      confianca: m.score >= 2 ? 'Alta' : 'Media',
      dataIndexado: '2024-01-15',
      trecho: m.article.text.slice(0, 80),
    }));

    const content = [
      `De acordo com o ${article.article} da LC 214/2025:`,
      '',
      `"${article.text}"`,
      '',
      `Este dispositivo trata especificamente de ${article.taxType}. Para uma análise completa, consulte também os artigos relacionados indexados.`,
    ].join('\n');

    return {
      id: `o_${Date.now()}`,
      role: 'oracle',
      content,
      timestamp: new Date(),
      confidence,
      processingTimeMs,
      citations,
    };
  }

  private matchArticles(query: string): { article: CorpusArticle; score: number }[] {
    const normalized = this.normalize(query);
    const scored = CORPUS_ARTICLES.map((article) => {
      let score = 0;
      for (const kw of article.keywords) {
        if (normalized.includes(this.normalize(kw))) {
          score += 1;
        }
      }
      if (normalized.includes(article.taxType.toLowerCase())) {
        score += 1;
      }
      return { article, score };
    })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored;
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
