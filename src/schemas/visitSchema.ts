import mongoose, { Schema } from 'mongoose';

const VisitSchema: Schema = new Schema({
  screen: { type: Object, required: true, unique: false },
  languages: { type: Array, required: false, unique: false },
  userAgent : { type: String, required: false, unique: false }
});

export default mongoose.model('user_agents', VisitSchema);