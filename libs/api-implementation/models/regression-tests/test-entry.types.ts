import { Document, Model } from "mongoose";

export interface ITestEntry {
  category: string;
  correctFiles: Buffer[];
  command: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface ITestEntryDocument extends ITestEntry, Document {}
export interface ITestEntryModel extends Model<ITestEntryDocument> {}