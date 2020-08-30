import { Document, Model } from 'mongoose';

export interface ITestRun {
  githubNumber: Number;
  results: Object[];
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface ITestRunDocument extends ITestRun, Document {}
export interface ITestRunModel extends Model<ITestRunDocument> {}
