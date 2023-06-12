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
	id!: number;
	fakeToken!: string;
	name!: object;
	login!: string;
	password!: string;
}

export interface UserAuth {
	login: string;
	password: string;
}

export const enum action {
	'EDIT' = 'Edit',
	'ADD' = 'Add',
	'CANCEL' = 'Cancel',
	'SAVE' = 'Save',
	'DELETE' = 'Delete',
	'GET' = 'Get',
	'SEARCH' = 'search',
	'EMPTY' = 'Empty',
}
export const enum customPath {
	'coursesList' = 'courses',
	'courseEdit' = 'courses/:id',
	'courseAdd' = 'courses/new',
	'login' = 'login',
}

export interface CourseState {
	state: boolean;
	action: action;
}
