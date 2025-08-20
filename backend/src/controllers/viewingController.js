import Viewing from '../models/Viewing.js';

export const createViewing = async (req, res, next) => {
  try {
    const viewing = await Viewing.create(req.body);
    res.status(201).json(viewing);
  } catch (err) { next(err); }
};

export const listViewings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, property, client, status } = req.query;
    const filter = {};
    if (property) filter.property = property;
    if (client) filter.client = client;
    if (status) filter.status = status;

    const skip = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(limit));
    const [items, total] = await Promise.all([
      Viewing.find(filter).sort({ date: -1 }).skip(skip).limit(Number(limit)).populate('property').populate('client'),
      Viewing.countDocuments(filter)
    ]);
    res.json({ data: items, total, page: Number(page), limit: Number(limit) });
  } catch (err) { next(err); }
};

export const updateViewing = async (req, res, next) => {
  try {
    const viewing = await Viewing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!viewing) return res.status(404).json({ message: 'Viewing not found' });
    res.json(viewing);
  } catch (err) { next(err); }
};

export const deleteViewing = async (req, res, next) => {
  try {
    const viewing = await Viewing.findByIdAndDelete(req.params.id);
    if (!viewing) return res.status(404).json({ message: 'Viewing not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
