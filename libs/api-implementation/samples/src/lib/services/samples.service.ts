import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { AppConfig } from '../../../../../../config';
@Injectable()
export class SamplesService {
  async writeToBucket(file) {
    try {
      writeFileSync(
        AppConfig.PATH_TO_MOUNTED_BUCKET + file.originalname,
        file.buffer
      );
    } catch (error) {
      console.error(`Error occured while writing the file to the bucket`);
      console.debug(error.stack);
      throw error;
    }
  }
}
