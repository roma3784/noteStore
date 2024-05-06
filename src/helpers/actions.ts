import { Locator, test } from '@playwright/test';
import { IClickOptions, ILocator, IPressOptions, ITypeOptions } from '../dataTypes/dataTypes';

export class Actions {
    public async type(element: ILocator, text: string | number, options?: ITypeOptions): Promise<void> {
        await test.step(`Type text: "${text}" in the ${element.definition}`, async () => {
            const pageElement: Locator = await element.value;
            if (options.withClear) {
                await pageElement.fill('');
            }
            await pageElement.fill(text.toString(), options);
        });
    }

    public async typeSequentially(element: ILocator, text: string | number, options?: IPressOptions, withClear: boolean = false,
    ): Promise<void> {
        await test.step(`Type text: "${text}" in the ${element.definition}`, async () => {
            const pageElement: Locator = await element.value;
            if (withClear) {
                await pageElement.fill('');
            }
            await pageElement.pressSequentially(text.toString(), options);
        });
    }

    public async click(element: ILocator, options?: IClickOptions): Promise<void> {
        await test.step(`Click on element with locator: ${element.definition}`, async () => {
            const pageElement: Locator = await element.value;
            await pageElement.click(options);
        });
    }
}