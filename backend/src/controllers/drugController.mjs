import * as drugService from "../services/drugService.mjs";

export const getAllDrugs = async (req, res) => {
    try {
        const drugs = await drugService.getAllDrugs(req, res);
        return res.json(drugs);
    } catch (ex) {
        console.error('Error fetching drugs:', ex);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};