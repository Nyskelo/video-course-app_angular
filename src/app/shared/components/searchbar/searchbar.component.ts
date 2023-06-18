import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { InputComponent } from '../input/input.component';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
	@ViewChild(InputComponent) childInput!: InputComponent;
	@ViewChild('form') form!: NgForm;
	@Output() searchTextChanged: EventEmitter<string> =
		new EventEmitter<string>();

	onClear() {
		this.form.setValue({ search: '' });
	}

	onInputValueChanged(searchValue: string) {
		this.searchTextChanged.emit(searchValue);
	}
}
