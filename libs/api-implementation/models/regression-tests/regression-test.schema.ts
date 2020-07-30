import { Schema } from "mongoose";

const RegressionTestSchema = new Schema({
  command: String,
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});
export default RegressionTestSchema;