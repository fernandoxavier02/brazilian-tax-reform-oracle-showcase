import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DASHBOARD_KPIS, INDEXED_DOCUMENTS } from '../../core/mock-data';
import { KpiCardComponent } from '../../shared/kpi-card.component';
import { StatusBadgeComponent } from '../../shared/status-badge.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgFor, KpiCardComponent, StatusBadgeComponent],
  template: `
    <div class="p-4 md:p-6 space-y-6 bg-surface-alt min-h-full">
      <div>
        <h2 class="text-xl font-semibold text-slate">Document Indexing Status</h2>
        <p class="text-sm text-gray-500 mt-1">Status do corpus oficial indexado no Oracle</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <app-kpi-card
          *ngFor="let kpi of kpis"
          [label]="kpi.label"
          [value]="kpi.value"
          [color]="kpi.color"
        />
      </div>

      <div class="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100">
          <h3 class="font-semibold text-slate">Ultimos Documentos Indexados</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th class="px-4 py-3 font-semibold">Fonte</th>
                <th class="px-4 py-3 font-semibold">Documento</th>
                <th class="px-4 py-3 font-semibold">Tipo</th>
                <th class="px-4 py-3 font-semibold">Chunks</th>
                <th class="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let doc of documents" class="border-t border-gray-100 hover:bg-gray-50/80">
                <td class="px-4 py-3">{{ doc.fonte }}</td>
                <td class="px-4 py-3 font-medium text-slate">{{ doc.documento }}</td>
                <td class="px-4 py-3 text-gray-600">{{ doc.tipo }}</td>
                <td class="px-4 py-3">{{ doc.chunks }}</td>
                <td class="px-4 py-3"><app-status-badge [status]="doc.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class DashboardPage {
  readonly kpis = DASHBOARD_KPIS;
  readonly documents = INDEXED_DOCUMENTS;
}
