import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema({
  character_id: {
    type: Number,
    required: true,
    unique: true,
  },
  items_code: {
    type: Array,
  },
});

export default mongoose.model('Equipment', EquipmentSchema);
