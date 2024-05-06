import { Actions } from '../helpers/actions';
import { Page, test } from '@playwright/test';
import { Assertions } from '../helpers/assertions';
import { ElementUtils } from '../helpers/elementUtils';
import { DataProvider } from '../helpers/dataProvider';

export class BasePage {
    public actions: Actions;
    public assertions: Assertions;
    public elementUtils: ElementUtils;
    public dataProvider: DataProvider;
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.actions = new Actions();
        this.assertions = new Assertions();
        this.elementUtils = new ElementUtils();
        this.dataProvider = new DataProvider();
    }

    public async checkUrl(page: Page, urlValue: string): Promise<void> {
        await test.step(`Check Url ${urlValue}`, async () => {
            const url = `${process.env.BASE_URL}${urlValue}`;
            await this.assertions.expectToHaveUrl(page, url)
        });
    }

    public async waitForResponse(responseEndpoint: string, statusCode: number): Promise<void> {
        await test.step(`Wait For Response Endpoint '${responseEndpoint}'`, async () => {
            const response = await this.page.waitForResponse(responseEndpoint);
            await this.assertions.expectToBeEqual(response.status(), statusCode);
        });
    }
}
