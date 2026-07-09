import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then((m) => m.ChatPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'reforma',
    loadComponent: () => import('./pages/reforma/reforma.page').then((m) => m.ReformaPage),
  },
  {
    path: 'pipeline',
    loadComponent: () => import('./pages/pipeline/pipeline.page').then((m) => m.PipelinePage),
  },
  {
    path: 'metricas',
    loadComponent: () => import('./pages/metricas/metricas.page').then((m) => m.MetricasPage),
  },
  {
    path: 'arquitetura',
    loadComponent: () => import('./pages/arquitetura/arquitetura.page').then((m) => m.ArquiteturaPage),
  },
  { path: '**', redirectTo: 'chat' },
];
