import express from 'express';
import {
  createViewing,
  listViewings,
  updateViewing,
  deleteViewing
} from '../controllers/viewingController.js';

const router = express.Router();

router.post('/', createViewing);
router.get('/', listViewings);
router.put('/:id', updateViewing);
router.delete('/:id', deleteViewing);

export default router;
