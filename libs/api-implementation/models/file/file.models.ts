import { model } from 'mongoose';
import { IFileDocument } from './file.types';
import FileSchema from './file.schema';
export const FileModel: model = model<IFileDocument>('file', FileSchema);
