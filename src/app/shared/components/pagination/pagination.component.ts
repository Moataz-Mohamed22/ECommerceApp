import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationModule, PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginationModule],
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() pageSize!: number;
  @Input() totalItems!: number;

  @Output() pageChanged = new EventEmitter<PageChangedEvent>();

  onPageChange(event: PageChangedEvent): void {
    this.pageChanged.emit(event);
  }
}
