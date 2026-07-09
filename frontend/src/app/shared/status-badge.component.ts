import { Component, Input } from '@angular/core';
import { IndexStatus } from '../core/models';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      [class]="status === 'Indexado' ? 'bg-green-50 text-success' : 'bg-orange-50 text-warning'"
    >
      {{ status }}
    </span>
  `,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: IndexStatus;
}
