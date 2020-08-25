import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { AppConfig } from '../../../../../../config';
import { SampleModel } from '../../../../models/samples/sample.models';

@Injectable()
export class SamplesService {
  async writeToBucket(file) {
    try {
      writeFileSync(
        AppConfig.PATH_TO_MOUNTED_BUCKET + file.originalname,
        file.buffer
      );
      await this.addSampleToDB(file.originalname);
    } catch (error) {
      console.error(`Error occured while writing the file to the bucket`);
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }

  async getAllSampleNames() {
    try {
      return await SampleModel.find({});
    } catch (error) {
      console.error('Error occured while fetching the sample names');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }

  private async addSampleToDB(filename: string) {
    await SampleModel.create({
      filename: filename,
    });
  }
}
