import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PIPELINE_STAGES } from '../../core/mock-data';

@Component({
  selector: 'app-pipeline-page',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="p-4 md:p-6 space-y-8 bg-white min-h-full">
      <div class="text-center">
        <h2 class="text-xl md:text-2xl font-semibold text-slate">RAG Pipeline — Documento ate Resposta</h2>
        <p class="text-sm text-gray-500 mt-1">Fontes oficiais → ETL → Retrieval → Generation</p>
      </div>

      <div class="max-w-5xl mx-auto space-y-6">
        <section *ngFor="let stage of stages; let last = last" class="relative">
          <div class="flex items-center gap-3 mb-3">
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold"
              [style.backgroundColor]="stage.color"
            >{{ $any(stages).indexOf(stage) + 1 }}</span>
            <div>
              <h3 class="font-semibold text-slate">{{ stage.title }}</h3>
              <p class="text-xs text-gray-500">{{ stage.subtitle }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ml-0 sm:ml-11">
            <div
              *ngFor="let item of stage.items"
              class="rounded-xl px-4 py-3 text-white shadow-sm"
              [style.backgroundColor]="stage.color"
            >
              <div class="font-semibold text-sm">{{ item.label }}</div>
              <div class="text-xs opacity-90 mt-0.5">{{ item.detail }}</div>
            </div>
          </div>

          <div *ngIf="!last" class="flex justify-center my-4">
            <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class PipelinePage {
  readonly stages = PIPELINE_STAGES;
}
