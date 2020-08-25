import { Document, Model } from "mongoose";

export interface ISample {
  filename: String;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface ISampleDocument extends ISample, Document {}
export interface ISampleModel extends Model<ISampleDocument> {}