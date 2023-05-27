import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
	enteredSearchValue = '';
	@Output() searchTextChanged: EventEmitter<string> =
		new EventEmitter<string>();

	onSearchTextChanged() {
		this.searchTextChanged.emit(this.enteredSearchValue);
	}
	onInputValueChanged(searchValue: string) {
		this.enteredSearchValue = searchValue;
	}
}
