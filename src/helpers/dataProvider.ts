import { test } from '@playwright/test';
import { noteTestData } from "../test-data/noteData";
import { IApiNoteTestData } from "../api/apiDataTypes/apiNoteDataTypes";

export class DataProvider {

    public async getNoteDataById(noteId: number): Promise<IApiNoteTestData> {
        return await test.step(`Get Note Data By Note Id ${noteId}`, async () => {
            return noteTestData.find((el) => el.id == noteId);
        });
    }
}