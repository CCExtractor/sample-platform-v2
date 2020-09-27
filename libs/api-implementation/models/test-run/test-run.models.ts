import { model } from 'mongoose';
import { ITestRunDocument } from './test-run.types';
import TestRunSchema from './test-run.schema';
export const TestRunModel: model = model<ITestRunDocument>(
  'test-run',
  TestRunSchema
);
