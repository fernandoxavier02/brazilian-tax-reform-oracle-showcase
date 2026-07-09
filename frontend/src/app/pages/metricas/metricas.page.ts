import { Component } from '@angular/core';
import { NgFor, DecimalPipe } from '@angular/common';
import { COMPARISON_ROWS, METRIC_BARS } from '../../core/mock-data';

@Component({
  selector: 'app-metricas-page',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  template: `
    <div class="p-4 md:p-6 space-y-8 bg-surface-alt min-h-full">
      <div>
        <h2 class="text-xl font-semibold text-slate">Metricas do Oracle — Deployment em Producao</h2>
        <p class="text-sm text-gray-500 mt-1">Indicadores sanitizados da narrativa de resultados</p>
      </div>

      <div class="rounded-xl bg-white border border-gray-200 p-5 shadow-sm space-y-5">
        <div *ngFor="let m of metrics" class="space-y-1.5">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-slate">{{ m.label }}</span>
            <span class="font-bold" [style.color]="m.color">{{ m.value | number: '1.0-1' }}%</span>
          </div>
          <div class="h-3 rounded-full bg-gray-100 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700"
              [style.width.%]="m.value"
              [style.backgroundColor]="m.color"
            ></div>
          </div>
        </div>
      </div>

      <div class="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100">
          <h3 class="font-semibold text-slate">Antes × Depois</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th class="px-4 py-3 font-semibold">Metrica</th>
                <th class="px-4 py-3 font-semibold">Antes</th>
                <th class="px-4 py-3 font-semibold">Depois</th>
                <th class="px-4 py-3 font-semibold">Melhoria</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of comparisons" class="border-t border-gray-100">
                <td class="px-4 py-3 font-medium text-slate">{{ row.metrica }}</td>
                <td class="px-4 py-3 text-gray-600">{{ row.antes }}</td>
                <td class="px-4 py-3 text-gray-600">{{ row.depois }}</td>
                <td class="px-4 py-3 font-semibold text-success">{{ row.melhoria }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class MetricasPage {
  readonly metrics = METRIC_BARS;
  readonly comparisons = COMPARISON_ROWS;
}
