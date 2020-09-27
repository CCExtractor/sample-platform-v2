import { Injectable } from '@nestjs/common';
import { TestRunModel } from '../../../../models/test-run/test-run.models';

@Injectable()
export class TestRunService {
  async getAll() {
    try {
      return await TestRunModel.find({});
    } catch (error) {
      console.error('Error while fetching the test entries');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
    }
  }
}
