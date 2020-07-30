import { Document, Model } from "mongoose";

export interface IRegressionTest {
  command: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface IRegressionTestDocument extends IRegressionTest, Document {}
export interface IRegressionTestModel extends Model<IRegressionTestDocument> {}