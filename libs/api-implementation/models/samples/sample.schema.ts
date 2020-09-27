import { Schema } from 'mongoose';

const SampleSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});
export default SampleSchema;
