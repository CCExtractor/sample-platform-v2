import { model } from 'mongoose';
import { ITestEntryDocument } from './test-entry.types';
import TestEntrySchema from './test-entry.schema';
export const TestEntryModel: model = model<ITestEntryDocument>(
  'test-entry',
  TestEntrySchema
);
