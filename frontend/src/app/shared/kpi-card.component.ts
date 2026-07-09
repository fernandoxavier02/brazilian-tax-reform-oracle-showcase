import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  template: `
    <div
      class="rounded-xl bg-white p-4 shadow-sm border-2"
      [style.borderColor]="color"
    >
      <div class="text-2xl font-bold" [style.color]="color">{{ value }}</div>
      <div class="mt-1 text-sm text-gray-500">{{ label }}</div>
    </div>
  `,
})
export class KpiCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
  @Input() color = '#1565C0';
}
