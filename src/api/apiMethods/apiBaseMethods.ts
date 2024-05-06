import { expect } from '@playwright/test';
import { ApiRequestItems } from '../apiRequestItems';

class ApiBaseMethods {
	public async getRequest(endpoint: string): Promise<any> {
		try {
			const response: any = await new ApiRequestItems().url(endpoint).method('GET').send();
			expect(response.status).toBeGreaterThanOrEqual(200);
			expect(response.status).toBeLessThanOrEqual(299);
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export const apiBaseMethods: ApiBaseMethods = new ApiBaseMethods();
