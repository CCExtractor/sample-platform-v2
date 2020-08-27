import { Document, Model } from 'mongoose';

export interface IFile {
  filename: String;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface IFileDocument extends IFile, Document {}
export interface IFileModel extends Model<IFileDocument> {}
