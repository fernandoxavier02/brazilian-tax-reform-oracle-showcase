import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Citation } from '../core/models';

@Component({
  selector: 'app-citation-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="rounded-md border border-citation-border bg-citation-bg px-3 py-2 text-citation-text text-xs">
      <div class="font-semibold">
        Fonte: {{ citation.fonte }}, {{ citation.artigo }}
      </div>
      <div class="mt-0.5 opacity-90">
        Confianca: {{ citation.confianca }} | Indexado: {{ citation.dataIndexado }}
      </div>
      <p *ngIf="citation.trecho" class="mt-1 legal-quote italic text-[11px] text-warning/90">
        "{{ citation.trecho }}..."
      </p>
    </div>
  `,
})
export class CitationCardComponent {
  @Input({ required: true }) citation!: Citation;
}
