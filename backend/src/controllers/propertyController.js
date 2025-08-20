import Property from '../models/Property.js';
import buildPropertyPipeline from '../utils/buildPropertyPipeline.js';

export const listProperties = async (req, res, next) => {
  try {
    const pipeline = buildPropertyPipeline(req.query);
    const [result] = await Property.aggregate(pipeline);
    res.json(result || { data: [], total: 0, page: 1, limit: 12 });
  } catch (err) { next(err); }
};

export const getProperty = async (req, res, next) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) { next(err); }
};

export const createProperty = async (req, res, next) => {
  try {
    const prop = await Property.create(req.body);
    res.status(201).json(prop);
  } catch (err) { next(err); }
};

export const updateProperty = async (req, res, next) => {
  try {
    const prop = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) { next(err); }
};

export const archiveProperty = async (req, res, next) => {
  try {
    const prop = await Property.findByIdAndUpdate(req.params.id, { isActive: false, archivedAt: new Date() }, { new: true });
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) { next(err); }
};

export const unarchiveProperty = async (req, res, next) => {
  try {
    const prop = await Property.findByIdAndUpdate(req.params.id, { isActive: true, archivedAt: null }, { new: true });
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) { next(err); }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const prop = await Property.findByIdAndDelete(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
