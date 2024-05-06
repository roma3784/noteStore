import { expect, Page, test } from '@playwright/test';

export class Assertions {
	public async expectToBeEqual<T>(actual: T, expected: T): Promise<void> {
		await test.step(`Expect Actual result "${actual}" to Be equal with Expected "${expected}"`, async () => {
			await expect.soft(actual).toBe(expected);
		});
	}

	public async expectToHaveUrl(page: Page, url: string | RegExp): Promise<void> {
		await test.step(`Expect to have URL "${url}"`, async () => {
			await expect(page).toHaveURL(url);
		});
	}

	public async expectToContain(actual: string | string[], expected: string, isStrict = false): Promise<void> {
		await test.step(`Expect value: "${JSON.stringify(actual)}" to contain Value: "${JSON.stringify(expected)}"`, async () => {
			if (!isStrict) {
				await expect.soft(actual).toContain(expected);
			} else {
				await expect(actual).toContain(expected);
			}
		});
	}
}
