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
export interface User {
	id: string;
	firstName: string;
	lastName: string;
}
