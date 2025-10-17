import * as drugModel from '../models/drugModel.mjs';

export const getAllDrugs = async () => {
    try {
        const drugs = await drugModel.getAllDrugs();
        return drugs;
    } catch (ex) {
        throw ex;
    }
};