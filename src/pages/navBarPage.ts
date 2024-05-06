import test, { Page } from '@playwright/test';
import { ILocator } from '../dataTypes/dataTypes';
import { BasePage } from './basePage';
import { Currency } from "../test-data/baseData";
import {IApiNoteTestData} from "../api/apiDataTypes/apiNoteDataTypes";

export class NavBarPage extends BasePage {
    public readonly basketCountItems: ILocator;
    public readonly basketDropdown: ILocator;
    public readonly clearBasketButton: ILocator;
    public readonly basketTotalPrice: ILocator;
    public readonly allNotesPrices: ILocator;
    public readonly moveToBasketButton: ILocator;

    constructor(page: Page) {
        super(page);
        this.basketCountItems = { value: page.locator('.basket-count-items'), definition: 'Basket Count Items' };
        this.basketDropdown = { value: page.locator('#dropdownBasket'), definition: 'Basket Dropdown' };
        this.clearBasketButton = { value: page.getByRole('button', { name: 'Очистить корзину' }), definition: 'Clear Basket Button' };
        this.basketTotalPrice = { value: page.locator('.basket_price'), definition: 'Basket Total Price' };
        this.allNotesPrices = { value: page.locator('.basket-item-price'), definition: 'All Notes Prices' };
        this.moveToBasketButton = { value: page.getByRole('button', { name: 'Перейти в корзину' }), definition: 'Move To Basket Button' };
    }
    public noteTitleByNoteId(noteId: number): ILocator {
        return {
            value: this.page.locator(`//*[@data-product=${noteId}]//*[@class='basket-item-title']`),
            definition: `Note Title By Note Id '${noteId}'`,
        };
    }

    public notePriceByNoteId(noteId: number): ILocator {
        return {
            value: this.page.locator(`//*[@data-product=${noteId}]//*[@class='basket-item-price']`),
            definition: `Note Price By Note Id '${noteId}'`,
        };
    }

    public async checkAndClearBasket(): Promise<void> {
        await test.step(`Check and Clear Basket`, async () => {
            const basketItemsQty: number = +await this.elementUtils.getTextByLocator(this.basketCountItems);
            if (basketItemsQty > 0) {
                await this.actions.click(this.basketDropdown);
                await this.actions.click(this.clearBasketButton);
            }
        });
    }

    public async checkBasketHasCorrectItemsQty(basketItemsQty: string): Promise<void> {
        await test.step(`Check Basket Has Correct Value`, async () => {
            const basketCountItems: string = await this.elementUtils.getTextByLocator(this.basketCountItems);
            await this.assertions.expectToContain(basketCountItems, basketItemsQty);
        });
    }

    public async clickBasketDropdown(): Promise<void> {
        await test.step(`Click on Basket Dropdown`, async () => {
            await this.actions.click(this.basketDropdown);
        });
    }

    public async checkBasketDropdownHasCorrectNoteInfo(noteId: number): Promise<void> {
        await test.step(`Check Basket Dropdown Has Correct Note Info`, async () => {
            const noteData: IApiNoteTestData = await this.dataProvider.getNoteDataById(noteId);
            let notePrice: number = noteData.price - noteData.discount;
            let allNotesPrices: number[] = (await this.elementUtils.getTextListByLocator(this.allNotesPrices)).map((el) => +el.replace(/[^0-9]/g, ""));
            let basketTotalPrice: number = allNotesPrices.reduce((acc, number) => acc + number);

            await this.assertions.expectToContain(await this.elementUtils.getTextByLocator(this.noteTitleByNoteId(noteId)), noteData.title);
            await this.assertions.expectToContain(await this.elementUtils.getTextByLocator(this.notePriceByNoteId(noteId)), `${notePrice} ${Currency.RUB}`);
            await this.assertions.expectToContain(await this.elementUtils.getTextByLocator(this.basketTotalPrice), basketTotalPrice.toString());
        });
    }

    public async clickMoveToBasketButton(): Promise<void> {
        await test.step(`Click Move To Basket Button`, async () => {
            await this.actions.click(this.moveToBasketButton);
        });
    }
}
