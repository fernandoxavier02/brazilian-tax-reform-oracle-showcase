import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from '../core/mock-data';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen overflow-hidden bg-bg text-text">
      <aside class="flex w-sidebar shrink-0 flex-col border-r border-border bg-bg-sidebar">
        <div class="border-b border-border px-4 py-4">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#009c3b] via-[#ffdf00] to-[#002776] shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="white" fill-opacity="0.9"/>
              </svg>
            </div>
            <div class="min-w-0">
              <div class="text-[13px] font-semibold leading-tight text-text">Brazilian Tax Reform Oracle</div>
              <div class="mt-1 text-[10px] font-medium tracking-[0.08em] text-text-dim">PLATAFORMA DE INTELIGÊNCIA FISCAL</div>
            </div>
          </div>
        </div>

        <nav class="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          <a
            *ngFor="let item of nav"
            [routerLink]="item.path"
            routerLinkActive="nav-active"
            class="nav-item group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-text-muted transition hover:bg-bg-card-hover hover:text-text"
          >
            <span class="text-text-dim group-[.nav-active]:text-primary-bright" [innerHTML]="iconSvg(item.icon)"></span>
            <span>{{ item.label }}</span>
          </a>
        </nav>

        <div class="space-y-3 border-t border-border p-3">
          <div class="card p-3">
            <div class="dim mb-2">Ambiente</div>
            <div class="mb-1 flex items-center gap-2 text-sm font-medium">
              <span class="dot-green"></span>
              LLM Local - Ollama
            </div>
            <div class="mb-3 truncate font-mono text-[11px] text-text-dim">mistral:7b-instruct-q4_K_M</div>
            <button type="button" class="btn w-full text-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
              Alterar ambiente
            </button>
          </div>

          <div class="card p-3">
            <div class="mb-1.5 flex items-center justify-between">
              <span class="dim">Status do Sistema</span>
              <span class="badge-green">Operacional</span>
            </div>
            <p class="text-[11px] leading-snug text-text-dim">Todos os serviços funcionando normalmente.</p>
          </div>

          <div class="px-1 pb-1 text-[10px] text-text-dim">
            © 2025 Brazilian Tax Reform Oracle · Versão 1.0.0
          </div>
        </div>
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <header class="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-bg/80 px-5 backdrop-blur">
          <div class="relative min-w-0 flex-1">
            <svg class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
            <input
              type="search"
              placeholder="Pesquisar documentos, normas, temas..."
              class="w-full rounded-lg border border-border bg-bg-card py-2 pl-10 pr-3 text-sm text-text placeholder:text-text-dim outline-none focus:border-primary"
            />
          </div>

          <div class="hidden items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1.5 text-xs font-medium text-text-muted sm:flex">
            <span class="dot-green"></span>
            LLM Local - Ollama
          </div>

          <button type="button" class="relative rounded-lg p-2 text-text-muted hover:bg-bg-card hover:text-text">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span class="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">3</span>
          </button>

          <div class="flex items-center gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#1d4ed8] text-xs font-semibold text-white">RM</div>
            <div class="hidden leading-tight md:block">
              <div class="text-sm font-medium">Rafael Martins</div>
              <div class="text-[11px] text-text-dim">Analista Tributário</div>
            </div>
          </div>
        </header>

        <main class="min-h-0 flex-1 overflow-y-auto">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; height: 100%; }
      .nav-item.nav-active {
        background: rgba(37, 99, 235, 0.18);
        color: #f8fafc;
        box-shadow: inset 3px 0 0 #3b82f6;
      }
    `,
  ],
})
export class ShellComponent {
  readonly nav = NAV_ITEMS;

  iconSvg(name: string): string {
    const common =
      'width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    const icons: Record<string, string> = {
      chat: `<svg ${common}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
      sources: `<svg ${common}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
      index: `<svg ${common}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      reforma: `<svg ${common}><path d="M3 3v18h18"/><path d="M7 16l4-8 4 4 4-6"/></svg>`,
      metrics: `<svg ${common}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
      export: `<svg ${common}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
      settings: `<svg ${common}><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    };
    return icons[name] ?? '';
  }
}
