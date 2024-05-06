import { apiBaseMethods } from './apiBaseMethods';
import test from '@playwright/test';
import { IApiNoteResponseBody } from "../apiDataTypes/apiNoteDataTypes";

class ApiCommonMethods {
	public async getNotesEndpoint(): Promise<string> {
		return await test.step('Get Notes endpoint', async () => {
			return `${process.env.BASE_URL}/product/get`;
		});
	}

	public async getBasketEndpoint(): Promise<string> {
		return await test.step('Get Basket Info endpoint', async () => {
			return `${process.env.BASE_URL}/basket/get`;
		});
	}

	public async getNotes(): Promise<IApiNoteResponseBody> {
		return await test.step('Get data about all notes', async () => {
			return await apiBaseMethods.getRequest(await this.getNotesEndpoint());
		});
	}
}

export const apiCommonMethods: ApiCommonMethods = new ApiCommonMethods();
