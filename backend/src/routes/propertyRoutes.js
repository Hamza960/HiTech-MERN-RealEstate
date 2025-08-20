import express from 'express';
import {
  listProperties,
  getProperty,
  createProperty,
  updateProperty,
  archiveProperty,
  unarchiveProperty,
  deleteProperty
} from '../controllers/propertyController.js';

const router = express.Router();

// Public
router.get('/', listProperties);
router.get('/:id', getProperty);

// Agent (no auth per spec)
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.post('/:id/archive', archiveProperty);
router.post('/:id/unarchive', unarchiveProperty);
router.delete('/:id', deleteProperty);

export default router;
