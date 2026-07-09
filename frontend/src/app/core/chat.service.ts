import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import {
  ChatMessage,
  ChatThread,
  Citation,
  ConfidenceLevel,
  CorpusArticle,
  StructuredAnswer,
} from './models';
import { CORPUS_ARTICLES, INITIAL_THREADS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly threadsSubject = new BehaviorSubject<ChatThread[]>(
    INITIAL_THREADS.map((t) => ({ ...t, messages: [...t.messages] }))
  );
  private readonly activeThreadIdSubject = new BehaviorSubject<string>(
    INITIAL_THREADS[0].id
  );
  private readonly typingSubject = new BehaviorSubject<boolean>(false);

  readonly threads$: Observable<ChatThread[]> = this.threadsSubject.asObservable();
  readonly activeThreadId$: Observable<string> = this.activeThreadIdSubject.asObservable();
  readonly typing$: Observable<boolean> = this.typingSubject.asObservable();

  get activeThread(): ChatThread | undefined {
    return this.threadsSubject.value.find(
      (t) => t.id === this.activeThreadIdSubject.value
    );
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
      const title =
        firstMessage.length > 48 ? `${firstMessage.slice(0, 48)}...` : firstMessage;
      return { ...t, title };
    });
    this.threadsSubject.next(threads);
  }

  private buildOracleResponse(query: string): ChatMessage {
    const matches = this.matchArticles(query);
    const top = matches[0];
    const confidence: ConfidenceLevel =
      top && top.score >= 2 ? 'Alta' : top ? 'Media' : 'Baixa';
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

    const structured = this.buildStructured(query, article, matches);
    const content = structured
      ? `${structured.directAnswer}\n\n${structured.summary}`
      : [
          `De acordo com o ${article.article} da LC 214/2025:`,
          '',
          `"${article.text}"`,
          '',
          `Este dispositivo trata especificamente de ${article.taxType}.`,
        ].join('\n');

    return {
      id: `o_${Date.now()}`,
      role: 'oracle',
      content,
      timestamp: new Date(),
      confidence,
      processingTimeMs,
      citations,
      structured: structured ?? undefined,
    };
  }

  private buildStructured(
    query: string,
    article: CorpusArticle,
    matches: { article: CorpusArticle; score: number }[]
  ): StructuredAnswer | null {
    const n = this.normalize(query);
    const isExportCbs =
      n.includes('export') && (n.includes('cbs') || n.includes('servic'));

    if (isExportCbs) {
      return {
        directAnswer: 'Não',
        summary:
          'A CBS não incide sobre exportações de serviços, nos termos da Emenda Constitucional nº 132/2023 e da legislação complementar de regulamentação.',
        fundamentos: [
          'A EC 132/2023 [1] estabelece a não incidência da CBS sobre exportações de bens e serviços.',
          'A LC 214/2025 [2] detalha o regime de isenção e o tratamento de créditos nas operações de exportação.',
          'O entendimento da Receita Federal [3] reforça a aplicação do princípio do destino nas operações internacionais.',
        ],
        conclusao:
          'Exportações de serviços permanecem fora do campo de incidência da CBS, desde que comprovada a efetiva prestação ao exterior.',
        fontesCitadas: [
          { n: 1, label: 'EC 132/2023' },
          { n: 2, label: 'LC 214/2025' },
          { n: 3, label: 'Parecer COSIT' },
        ],
      };
    }

    return {
      directAnswer: article.taxType,
      summary: article.text,
      fundamentos: matches.slice(0, 3).map(
        (m) =>
          `${m.article.article} da LC 214/2025: ${m.article.text.slice(0, 120)}…`
      ),
      conclusao: `Conclusão baseada no corpus indexado para ${article.taxType}.`,
      fontesCitadas: matches.slice(0, 3).map((m, i) => ({
        n: i + 1,
        label: `${m.article.article} · LC 214/2025`,
      })),
    };
  }

  private matchArticles(
    query: string
  ): { article: CorpusArticle; score: number }[] {
    const normalized = this.normalize(query);
    return CORPUS_ARTICLES.map((article) => {
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
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
