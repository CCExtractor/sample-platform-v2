import { Injectable } from '@nestjs/common';
import { RegressionTestModel } from '../../../../models/regression-tests/regression-test.models';

@Injectable()
export class RegressionTestService {
  async getAll() {
    return await RegressionTestModel.find({});
  }

  async create(new_command: string) {
    return await RegressionTestModel.create({
      command: new_command,
    });
  }
}
