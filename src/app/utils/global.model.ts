export interface Course {
	id: number;
	name: string;
	description: string;
	isTopRated: boolean;
	date: string;
	authors: Author[];
	length: number;
}

export interface Author {
	id: string | number;
	name: string;
	lastName?: string;
}
export class User {
	id!: string;
	firstName!: string;
	lastName!: string;
}

export const enum action {
	'EDIT' = 'Edit',
	'ADD' = 'Add',
	'CANCEL' = 'Cancel',
	'SAVE' = 'Save',
}

export interface CourseState {
	state: boolean;
	action: action;
}
