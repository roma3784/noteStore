import { Locator, test } from '@playwright/test';
import { ILocator } from '../dataTypes/dataTypes';

export class ElementUtils {
	public async getTextByLocator(locator: ILocator): Promise<string> {
		return await test.step(`Get text by ${locator.definition} locator`, async () => {
			const pageElement: Locator = await locator.value;
			return await pageElement.innerText();
		});
	}

	public async getTextListByLocator(locator: ILocator): Promise<string[]> {
		return await test.step(`Get text list by ${locator.definition} locator`, async () => {
			return await locator.value.allInnerTexts();
		});
	}
}
