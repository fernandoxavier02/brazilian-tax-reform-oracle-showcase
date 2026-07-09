import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hbar',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="space-y-2.5">
      <div *ngFor="let row of rows" class="grid grid-cols-[120px_1fr_48px] items-center gap-2 text-xs">
        <span class="truncate text-text-muted">{{ row.label }}</span>
        <div class="relative h-2 overflow-hidden rounded-full bg-border">
          <div
            class="absolute top-0 h-full rounded-full"
            [class.left-0]="row.value >= 0"
            [class.right-1/2]="row.value < 0"
            [style.width.%]="barWidth(row.value)"
            [style.background]="row.value >= 0 ? '#10b981' : '#ef4444'"
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
    return (Math.abs(value) / max) * 50;
  }
}
