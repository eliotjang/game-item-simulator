import mongoose from 'mongoose';

const CharactersSchema = new mongoose.Schema({
  character_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  health: {
    type: Number,
    required: true,
    default: 500,
  },
  power: {
    type: Number,
    required: true,
    default: 100,
  },
});

export default mongoose.model('Characters', CharactersSchema);
