import test, { Page } from '@playwright/test';
import { ILocator } from '../dataTypes/dataTypes';
import { BasePage } from './basePage';
import { Url } from "../test-data/urlData";

export class LoginPage extends BasePage {
    public readonly loginInput: ILocator;
    public readonly passwordInput: ILocator;
    public readonly enterButton: ILocator;

    constructor(page: Page) {
        super(page);
        this.loginInput = { value: page.locator('#loginform-username'), definition: 'Login Input Field' };
        this.passwordInput = { value: page.locator('#loginform-password'), definition: 'Password Input Field' };
        this.enterButton = { value: page.getByRole('button', { name: 'Вход' }), definition: 'Enter Button' };
    }

    public async goToLoginPage(): Promise<void> {
        await test.step(`Go to Login Page`, async () => {
            await this.page.goto(`${process.env.BASE_URL}${Url.LOGIN}`);
        });
    }

    public async loginUser(userLogin: string, userPassword: string): Promise<void> {
        await test.step(`Login user ${userLogin}`, async () => {
            await this.actions.typeSequentially(this.loginInput, userLogin);
            await this.actions.typeSequentially(this.passwordInput, userPassword);
            await this.actions.click(this.enterButton);
        });
    }
}
