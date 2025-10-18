import express from 'express';
import { getConfig } from '../../controllers/tableConfigController.mjs';

const router = express.Router();

router.get('/table-config', getConfig);

export default router;