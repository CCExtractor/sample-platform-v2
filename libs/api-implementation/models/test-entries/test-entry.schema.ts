import { Schema } from 'mongoose';

const TestEntrySchema = new Schema({
  category: {
    type: String,
    enum: [
      'broken',
      'cea-708',
      'dvb',
      'dvd',
      'dvr-ms',
      'general',
      'hauppage',
      'mp4',
      'nocc',
      'options',
      'teletext',
      'wtv',
      'xds',
    ],
    required: true,
  },
  correctFiles: {
    type: [Object],
    required: true,
  },
  sample: {
    type: String,
    required: true,
  },
  command: {
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
export default TestEntrySchema;
