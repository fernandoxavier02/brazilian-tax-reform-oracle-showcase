import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'reforma' },
  {
    path: 'reforma',
    loadComponent: () =>
      import('./pages/reforma/reforma.page').then((m) => m.ReformaPage),
  },
  {
    path: 'indexacao',
    loadComponent: () =>
      import('./pages/indexacao/indexacao.page').then((m) => m.IndexacaoPage),
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then((m) => m.ChatPage),
  },
  {
    path: 'metricas',
    loadComponent: () =>
      import('./pages/metricas/metricas.page').then((m) => m.MetricasPage),
  },
  {
    path: 'fontes',
    loadComponent: () =>
      import('./pages/fontes/fontes.page').then((m) => m.FontesPage),
  },
  {
    path: 'exportacoes',
    loadComponent: () =>
      import('./pages/exportacoes/exportacoes.page').then((m) => m.ExportacoesPage),
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes.page').then(
        (m) => m.ConfiguracoesPage
      ),
  },
  { path: '**', redirectTo: 'reforma' },
];
