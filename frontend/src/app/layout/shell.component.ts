import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col bg-surface">
      <header class="bg-primary text-white shadow-md z-20">
        <div class="flex items-center justify-between px-4 md:px-6 h-14">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="md:hidden rounded p-1.5 hover:bg-white/10"
              (click)="navOpen = !navOpen"
              aria-label="Menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex items-center gap-2">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded bg-white/15 text-sm font-bold">TX</span>
              <div>
                <h1 class="text-sm md:text-base font-semibold leading-tight">Brazilian Tax Reform Oracle</h1>
                <p class="text-[10px] md:text-xs text-blue-100/90 hidden sm:block">Pesquisa tributaria com citacoes oficiais</p>
              </div>
            </div>
          </div>
          <span class="text-[10px] md:text-xs bg-white/15 px-2 py-1 rounded">Demo educacional</span>
        </div>
      </header>

      <div class="flex flex-1 min-h-0">
        <aside
          class="fixed md:static inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 pt-14 md:pt-0 transform transition-transform duration-200"
          [class.-translate-x-full]="!navOpen"
          [class.translate-x-0]="navOpen"
          [class.md:translate-x-0]="true"
        >
          <nav class="p-3 space-y-1">
            <a
              *ngFor="let item of navItems"
              [routerLink]="item.path"
              routerLinkActive="bg-blue-50 text-primary border-primary"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate border border-transparent hover:bg-gray-50 transition-colors"
              (click)="navOpen = false"
            >
              <span class="text-base w-5 text-center" [innerHTML]="item.icon"></span>
              {{ item.label }}
            </a>
          </nav>
        </aside>

        <div
          *ngIf="navOpen"
          class="fixed inset-0 bg-black/30 z-20 md:hidden"
          (click)="navOpen = false"
        ></div>

        <main class="flex-1 min-w-0 overflow-auto">
          <ng-content></ng-content>
        </main>
      </div>

      <footer class="border-t border-gray-200 bg-white px-4 py-3 text-center text-[11px] text-gray-500">
        Demonstracao educacional com dados sinteticos. Nao constitui aconselhamento juridico, tributario ou contabil.
        &copy; 2026 Fernando Xavier.
      </footer>
    </div>
  `,
})
export class ShellComponent {
  navOpen = false;

  readonly navItems: NavItem[] = [
    { path: '/chat', label: 'Chat Inteligente', icon: '&#128172;' },
    { path: '/dashboard', label: 'Indexacao', icon: '&#128202;' },
    { path: '/reforma', label: 'Reforma Tributaria', icon: '&#9878;' },
    { path: '/pipeline', label: 'Pipeline RAG', icon: '&#9881;' },
    { path: '/metricas', label: 'Metricas', icon: '&#128200;' },
    { path: '/arquitetura', label: 'Arquitetura', icon: '&#127959;' },
  ];
}
