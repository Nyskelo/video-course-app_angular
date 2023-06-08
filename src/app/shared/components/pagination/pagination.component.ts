import {
	ChangeDetectionStrategy,
	Component,
	computed,
	EventEmitter,
	Input,
	Output,
	signal,
} from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
	@Input() currentPage = 1;
	@Input() total = signal<number>(5);
	@Input() limit = 5;
	@Input() loadButton = false;
	@Output() changePage = new EventEmitter<number>();
	@Output() loadMore = new EventEmitter<number>();

	pages = computed(() => [...Array(this.total()).keys()].map((el) => el + 1));
}
