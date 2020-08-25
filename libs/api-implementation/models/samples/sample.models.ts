import { model } from 'mongoose';
import { ISampleDocument } from './sample.types';
import SampleSchema from './sample.schema';
export const SampleModel: model = model<ISampleDocument>(
  'sample',
  SampleSchema
);
