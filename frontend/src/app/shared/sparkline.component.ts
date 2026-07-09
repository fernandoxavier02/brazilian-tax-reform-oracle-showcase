import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sparkline',
  standalone: true,
  template: `
    <svg [attr.width]="width" [attr.height]="height" class="overflow-visible">
      <polyline
        fill="none"
        [attr.stroke]="color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        [attr.points]="points"
      />
    </svg>
  `,
})
export class SparklineComponent {
  @Input() values: number[] = [];
  @Input() width = 64;
  @Input() height = 20;
  @Input() color = '#3b82f6';

  get points(): string {
    if (!this.values.length) return '';
    const min = Math.min(...this.values);
    const max = Math.max(...this.values);
    const range = max - min || 1;
    return this.values
      .map((v, i) => {
        const x = (i / (this.values.length - 1 || 1)) * this.width;
        const y = this.height - ((v - min) / range) * (this.height - 2) - 1;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
