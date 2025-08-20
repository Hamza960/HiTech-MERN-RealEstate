import express from 'express';
import {
  createInquiry,
  listClients,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';

const router = express.Router();

// Public inquiry
router.post('/', createInquiry);

// Agent
router.get('/', listClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
