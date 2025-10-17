import express from "express";

import { getAllDrugs } from "../../controllers/drugController.mjs";

const router = express.Router();

router.get("/drugs", getAllDrugs);

export default router;