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
	@ViewChild(InputComponent, { static: true }) someInput!: InputComponent;
	@Output() searchTextChanged: EventEmitter<string> =
		new EventEmitter<string>();

	enteredSearchValue = '';

	onSearchTextChanged() {
		this.searchTextChanged.emit(this.enteredSearchValue);
		this.someInput.value = '';
		this.someInput.valueChanged.emit(this.someInput.value);
	}
	onInputValueChanged(searchValue: string) {
		this.enteredSearchValue = searchValue;
	}
}
