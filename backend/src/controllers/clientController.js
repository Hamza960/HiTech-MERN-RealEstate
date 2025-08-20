import Client from '../models/Client.js';

export const createInquiry = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) { next(err); }
};

export const listClients = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, processed } = req.query;
    const filter = {};
    if (processed === 'true') filter.processed = true;
    if (processed === 'false') filter.processed = false;

    const skip = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(limit));
    const [items, total] = await Promise.all([
      Client.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('interestedProperty'),
      Client.countDocuments(filter)
    ]);
    res.json({ data: items, total, page: Number(page), limit: Number(limit) });
  } catch (err) { next(err); }
};

export const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) { next(err); }
};

export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
