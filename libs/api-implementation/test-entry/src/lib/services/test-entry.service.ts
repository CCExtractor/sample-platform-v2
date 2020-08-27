import { Injectable } from '@nestjs/common';
import { TestEntryModel } from '../../../../models/test-entries/test-entry.models';

@Injectable()
export class TestEntryService {
 
  async getAll() {
    try {
      return await TestEntryModel.find({});
    } catch (error) {
      console.error('Error while fetching the test entries');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
    }
  }

  async create(
    category: string,
    new_command: string,
    sample: string,
    files: any[]
  ) {
    const correctFiles = []

    files.forEach(file => {
      correctFiles.push({
        filename: file.originalname,
        buffer: file.buffer
      })
    })

    try {
      return await TestEntryModel.create({
        command: new_command,
        category: category,
        sample: sample,
        correctFiles: correctFiles,
      });
    } catch (error) {
      console.error('Error while creating the test entry');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }
}
