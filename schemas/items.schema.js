import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
  item_code: {
    type: Number,
    required: true,
    unique: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_stat: {
    health: { type: Number },
    power: { type: Number },
  },
});

export default mongoose.model('Items', ItemsSchema);
