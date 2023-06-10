import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	ViewChild,
} from '@angular/core';

import { InputComponent } from '../input/input.component';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
	@ViewChild(InputComponent) childInput!: InputComponent;
	@Output() searchTextChanged: EventEmitter<string> =
		new EventEmitter<string>();

	onClear() {
		this.childInput.value = '';
		this.childInput.valueChanged.emit(this.childInput.value);
	}

	onInputValueChanged(searchValue: string) {
		this.searchTextChanged.emit(searchValue);
	}
}
