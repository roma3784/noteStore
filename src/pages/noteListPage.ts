import test, { Page } from '@playwright/test';
import { ILocator } from '../dataTypes/dataTypes';
import { BasePage } from './basePage';
import { apiCommonMethods } from '../api/apiMethods/apiCommonMethods';
import { IApiNoteTestData } from "../api/apiDataTypes/apiNoteDataTypes";

let noteTestData: IApiNoteTestData[];

export class NoteListPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }
    public buyNoteByNoteIdButton(noteId: number): ILocator {
        return {
            value: this.page.locator(`//*[@data-product=${noteId}]//*[(contains(@class, 'actionBuyProduct'))]`),
            definition: `Buy Note By Note Id '${noteId} Button'`,
        };
    }

    public inputNoteCountByNoteId(noteId: number): ILocator {
        return {
            value: this.page.locator(`//*[@data-product=${noteId}]//*[@name="product-enter-count"]`),
            definition: `Input Note Count By Note Id '${noteId} Field'`,
        };
    }

    public async addNoteToBasket(isDiscount: boolean = false, noteQty: number = 1): Promise<number> {
        return await test.step(`Add Note to Basket`, async () => {
            let noteId: number;
            ({ products: noteTestData } = await apiCommonMethods.getNotes());
            if (!isDiscount) {
                noteId = noteTestData.find((el) => el.discount === 0).id
            } else {
                noteId = noteTestData.find((el) => el.discount > 0).id
            }
            if (noteQty > 1) {
                await this.actions.type(this.inputNoteCountByNoteId(noteId), noteQty, { withClear: true });
            }
            await this.actions.click(this.buyNoteByNoteIdButton(noteId));
            return noteId;
        });
    }

    public async addDifferentNotesToBasket(noteQty: number): Promise<number[]> {
        return await test.step(`Add Different Notes to Basket`, async () => {
            let noteIds: number[];
            ({products: noteTestData} = await apiCommonMethods.getNotes());
            noteIds = noteTestData.slice(0, noteQty).map((el) => el.id);
            for (const noteId of noteIds) {
                await this.actions.click(this.buyNoteByNoteIdButton(noteId));
            }
            return noteIds;
        });
    }
}
