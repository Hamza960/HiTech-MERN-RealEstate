import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Property from '../models/Property.js';
import Client from '../models/Client.js';
import Viewing from '../models/Viewing.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error('MONGO_URI missing');

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected');

  await Promise.all([Property.deleteMany({}), Client.deleteMany({}), Viewing.deleteMany({})]);

  const properties = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.properties.json')));
  await Property.insertMany(properties);

  console.log('Seed completed');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
