import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TAX_CARDS } from '../../core/mock-data';

@Component({
  selector: 'app-reforma-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="p-4 md:p-6 space-y-6 bg-white min-h-full">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-xl md:text-2xl font-semibold text-slate">Reforma Tributaria — Novos Impostos</h2>
        <p class="text-sm text-gray-500 mt-2">Visao geral de IBS, CBS e IS conforme a narrativa da vitrine</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        <article
          *ngFor="let card of cards"
          class="rounded-2xl p-5 text-white shadow-md min-h-[280px] flex flex-col"
          [style.backgroundColor]="card.color"
        >
          <h3 class="text-3xl font-bold tracking-tight">{{ card.code }}</h3>
          <p class="text-sm opacity-90 mt-1 mb-4">{{ card.name }}</p>
          <ul class="space-y-2 text-sm leading-relaxed flex-1">
            <li *ngFor="let bullet of card.bullets" class="flex gap-2">
              <span class="opacity-70">•</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="text-center space-y-2 pt-2">
        <p class="text-sm font-semibold text-gray-600">Substituem: ICMS + ISS + IPI + PIS + COFINS</p>
        <p class="text-xs text-gray-400">Vigencia plena prevista para 2033 (transicao de 10 anos)</p>
      </div>
    </div>
  `,
})
export class ReformaPage {
  readonly cards = TAX_CARDS;
}
