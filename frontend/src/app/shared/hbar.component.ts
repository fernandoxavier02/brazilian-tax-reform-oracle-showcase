import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hbar',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="space-y-2.5">
      <div *ngFor="let row of rows" class="grid grid-cols-[140px_1fr_52px] items-center gap-2 text-xs">
        <span class="truncate text-text-muted">{{ row.label }}</span>
        <div class="progress-track">
          <div
            class="h-full rounded-full"
            [style.width.%]="barWidth(row.value)"
            [style.background]="row.value >= 0 ? '#3b82f6' : '#ef4444'"
          ></div>
        </div>
        <span class="text-right font-mono" [class.text-success]="row.value >= 0" [class.text-danger]="row.value < 0">
          {{ row.value > 0 ? '+' : '' }}{{ row.value }}%
        </span>
      </div>
    </div>
  `,
})
export class HBarComponent {
  @Input() rows: { label: string; value: number }[] = [];

  barWidth(value: number): number {
    const max = Math.max(...this.rows.map((r) => Math.abs(r.value)), 1);
    return (Math.abs(value) / max) * 100;
  }
}
