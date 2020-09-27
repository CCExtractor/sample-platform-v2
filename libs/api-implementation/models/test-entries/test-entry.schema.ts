import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoose_sequence from 'mongoose-sequence';

const AutoIncrement = mongoose_sequence(mongoose);

const TestEntrySchema = new Schema(
  {
    _id: Number,
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
  },
  { _id: false }
);

TestEntrySchema.plugin(AutoIncrement);
export default TestEntrySchema;
