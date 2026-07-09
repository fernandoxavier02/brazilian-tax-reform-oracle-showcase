import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  iconPath: string;
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
                <p class="text-[10px] md:text-xs text-blue-100/90 hidden sm:block">Pesquisa tributária com citações oficiais</p>
              </div>
            </div>
          </div>
          <span class="text-[10px] md:text-xs bg-white/15 px-2 py-1 rounded">Demo educacional</span>
        </div>
      </header>

      <div class="flex flex-1 min-h-0">
        <aside
          class="fixed md:static inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 pt-14 md:pt-0 transform transition-transform duration-200 md:translate-x-0"
          [class.-translate-x-full]="!navOpen"
          [class.translate-x-0]="navOpen"
        >
          <nav class="p-3 space-y-1">
            <a
              *ngFor="let item of navItems"
              [routerLink]="item.path"
              routerLinkActive="bg-blue-50 text-primary border-primary"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate border border-transparent hover:bg-gray-50 transition-colors"
              (click)="navOpen = false"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" [attr.d]="item.iconPath" />
              </svg>
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
        Demonstração educacional com dados sintéticos. Não constitui aconselhamento jurídico, tributário ou contábil.
        &copy; 2026 Fernando Xavier.
      </footer>
    </div>
  `,
})
export class ShellComponent {
  navOpen = false;

  readonly navItems: NavItem[] = [
    {
      path: '/chat',
      label: 'Chat Inteligente',
      iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
    {
      path: '/dashboard',
      label: 'Indexação',
      iconPath: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
      path: '/reforma',
      label: 'Reforma Tributária',
      iconPath: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    },
    {
      path: '/pipeline',
      label: 'Pipeline RAG',
      iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },
    {
      path: '/metricas',
      label: 'Métricas',
      iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      path: '/arquitetura',
      label: 'Arquitetura',
      iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
  ];
}
