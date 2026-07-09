import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ARCHITECTURE_LAYERS } from '../../core/mock-data';

@Component({
  selector: 'app-arquitetura-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="p-4 md:p-6 space-y-6 bg-white min-h-full">
      <div class="text-center">
        <h2 class="text-xl md:text-2xl font-semibold text-slate">Tax Reform Oracle — Architecture</h2>
        <p class="text-sm text-gray-500 mt-1">Camadas do sistema RAG 100% local</p>
      </div>

      <div class="max-w-5xl mx-auto space-y-5">
        <section *ngFor="let layer of layers">
          <h3 class="text-xs font-bold tracking-wider text-gray-500 mb-2">{{ layer.title }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            <div
              *ngFor="let item of layer.items"
              class="rounded-xl px-4 py-3 text-white shadow-sm"
              [style.backgroundColor]="layer.color"
              [class.sm:col-span-2]="layer.items.length === 1"
              [class.lg:col-span-3]="layer.items.length === 1"
              [class.xl:col-span-5]="layer.items.length === 1"
            >
              <div class="font-semibold text-sm">{{ item.label }}</div>
              <div class="text-xs opacity-90 mt-0.5">{{ item.detail }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ArquiteturaPage {
  readonly layers = ARCHITECTURE_LAYERS;
}
