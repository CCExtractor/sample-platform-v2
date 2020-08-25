import { Injectable } from '@nestjs/common';
import { TestEntryModel } from '../../../../models/test-entries/test-entry.models';

@Injectable()
export class TestEntryService {
  async getAll() {
    try {
    } catch (error) {
      console.error('Error while fetching the test entries');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      return await TestEntryModel.find({});
    }
  }

  async create(
    category: string,
    new_command: string,
    sample: string,
    files: Buffer[]
  ) {
    try {
      return await TestEntryModel.create({
        command: new_command,
        category: category,
        sample: sample,
        correctFiles: files,
      });
    } catch (error) {
      console.error('Error while creating the test entry');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }
}
