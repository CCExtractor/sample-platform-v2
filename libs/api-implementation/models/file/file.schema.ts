import { Schema } from 'mongoose';

const FileSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  buffer: {
    type: Buffer,
    required: true,
  },
});
export default FileSchema;
