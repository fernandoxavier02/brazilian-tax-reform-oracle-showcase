import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-donut',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="flex items-center gap-4">
      <svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="'0 0 ' + size + ' ' + size" class="shrink-0">
        <circle
          *ngFor="let s of segments; let i = index"
          [attr.cx]="size / 2"
          [attr.cy]="size / 2"
          [attr.r]="radius"
          fill="none"
          [attr.stroke]="s.color"
          [attr.stroke-width]="stroke"
          [attr.stroke-dasharray]="s.dash"
          [attr.stroke-dashoffset]="s.offset"
          [attr.transform]="'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'"
        />
        <text
          *ngIf="centerLabel"
          [attr.x]="size / 2"
          [attr.y]="size / 2 - 4"
          text-anchor="middle"
          class="fill-text font-mono text-[11px] font-semibold"
          style="font-size: 13px; fill: #f8fafc"
        >{{ centerValue }}</text>
        <text
          *ngIf="centerLabel"
          [attr.x]="size / 2"
          [attr.y]="size / 2 + 12"
          text-anchor="middle"
          style="font-size: 9px; fill: #64748b"
        >{{ centerLabel }}</text>
      </svg>
      <ul *ngIf="showLegend" class="min-w-0 space-y-1.5 text-xs">
        <li *ngFor="let item of data" class="flex items-center gap-2 text-text-muted">
          <span class="h-2 w-2 shrink-0 rounded-full" [style.background]="item.color"></span>
          <span class="truncate">{{ item.label }}</span>
          <span class="ml-auto font-mono text-text">{{ item.value }}%</span>
        </li>
      </ul>
    </div>
  `,
})
export class DonutComponent {
  @Input() data: { label: string; value: number; color: string }[] = [];
  @Input() size = 140;
  @Input() stroke = 14;
  @Input() centerValue = '';
  @Input() centerLabel = '';
  @Input() showLegend = true;

  get radius(): number {
    return (this.size - this.stroke) / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get segments(): { color: string; dash: string; offset: number }[] {
    const total = this.data.reduce((s, d) => s + d.value, 0) || 1;
    let cursor = 0;
    return this.data.map((d) => {
      const len = (d.value / total) * this.circumference;
      const offset = -cursor;
      cursor += len;
      return {
        color: d.color,
        dash: `${len} ${this.circumference - len}`,
        offset,
      };
    });
  }
}
