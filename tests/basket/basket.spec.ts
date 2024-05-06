import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { NavBarPage } from '../../src/pages/navBarPage';
import { NoteListPage } from "../../src/pages/noteListPage";
import { QuantityValue } from "../../src/test-data/baseData";
import { Url } from "../../src/test-data/urlData";
import { apiCommonMethods } from "../../src/api/apiMethods/apiCommonMethods";

let noteId: number;
let noteIds: number[];

test.describe('Basket tests', () => {
    let loginPage: LoginPage;
    let navBarPage: NavBarPage;
    let noteListPage: NoteListPage;

    test.beforeEach(async ({ page }, testInfo) => {
        loginPage = new LoginPage(page);
        navBarPage = new NavBarPage(page);
        noteListPage = new NoteListPage(page);

        await loginPage.goToLoginPage();
        await loginPage.loginUser(process.env.USER_LOGIN, process.env.USER_PASSWORD);
        await navBarPage.waitForResponse(await apiCommonMethods.getBasketEndpoint(), 200);
        await navBarPage.checkAndClearBasket();
        if (testInfo.title.includes('TC0004')) {
            await noteListPage.addNoteToBasket(true);
        }
    });

    test.afterEach(async () => {
        await navBarPage.checkAndClearBasket();
    });

    // Regression NS-0001
    // Bug BR-0001
    test.skip('TC0001 User can move to an empty basket', async () => {
        await navBarPage.clickBasketDropdown();
        // need to add steps after fixing bug BR-0001
    });

    // Regression NS-0002
    test('TC0002 User can move to the basket with one non-discount note', async ({ page }) => {
        noteId = await noteListPage.addNoteToBasket();
        await navBarPage.waitForResponse(await apiCommonMethods.getBasketEndpoint(), 200);
        await navBarPage.checkBasketHasCorrectItemsQty(QuantityValue.ONE);
        await navBarPage.clickBasketDropdown();
        await navBarPage.checkBasketDropdownHasCorrectNoteInfo(noteId);
        await navBarPage.clickMoveToBasketButton();
        await navBarPage.checkUrl(page, Url.BASKET);
    });

    // Regression NS-0003
    test('TC0003 User can move to the basket with one discount note', async ({ page }) => {
        noteId = await noteListPage.addNoteToBasket(true);
        await navBarPage.waitForResponse(await apiCommonMethods.getBasketEndpoint(), 200);
        await navBarPage.checkBasketHasCorrectItemsQty(QuantityValue.ONE);
        await navBarPage.clickBasketDropdown();
        await navBarPage.checkBasketDropdownHasCorrectNoteInfo(noteId);
        await navBarPage.clickMoveToBasketButton();
        await navBarPage.checkUrl(page, Url.BASKET);
    });

    // Regression NS-0004
    // Bug BR-0002
    test.skip('TC0004 User can move to the basket with nine different notes', async ({ page }) => {
        noteIds = await noteListPage.addDifferentNotesToBasket(+QuantityValue.EIGHT);
        await navBarPage.waitForResponse(await apiCommonMethods.getBasketEndpoint(), 200);
        await navBarPage.checkBasketHasCorrectItemsQty(QuantityValue.NINE);
        await navBarPage.clickBasketDropdown();
        // need to add steps after fixing bug BR-0002
        await navBarPage.checkUrl(page, Url.BASKET);
    });

    // Regression AB-10254
    // Bug BR-0002
    test.skip('TC0005 User can move to the basket with nine discount notes of the same name', async ({ page }) => {
        noteId = await noteListPage.addNoteToBasket(true, +QuantityValue.NINE);
        await navBarPage.waitForResponse(await apiCommonMethods.getBasketEndpoint(), 200);
        await navBarPage.checkBasketHasCorrectItemsQty(QuantityValue.NINE);
        await navBarPage.clickBasketDropdown();
        // need to add steps after fixing bug BR-0002
        await navBarPage.checkUrl(page, Url.BASKET);
    });
});
