export interface IApiNoteTestData {
	id: number;
	title: string;
	type: string;
	price: number;
	discount: number;
	count: number;
	poster: string;
}

export interface IApiNoteResponseBody {
	response: boolean;
	error: string;
	products: IApiNoteTestData[];
	page: number;
	pages: number;
}
