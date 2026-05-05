import express from 'express';
import * as geminiController from '../controllers/geminiController.js';

const router = express.Router();

router.post('/chat', geminiController.chat);
router.post('/verify', geminiController.verify);

export default router;
