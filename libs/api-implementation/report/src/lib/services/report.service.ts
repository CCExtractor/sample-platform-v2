import { Injectable } from '@nestjs/common';
import { TestEntryModel } from '../../../../models/test-entries/test-entry.models';
import { TestRunModel } from '../../../../models/test-run/test-run.models';
import * as crypto from 'crypto';

@Injectable()
export class ReportService {
  private sha256(data: string | Buffer | DataView) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('base64');
  }

  async fileIsCorrect(file: { buffer: Buffer }, test_id: string) {
    try {
      const testEntry = await TestEntryModel.findOne({
        _id: test_id,
      });

      const fileHash = this.sha256(file.buffer);

      for (const file of testEntry.correctFiles) {
        if (fileHash === this.sha256(file.buffer.buffer)) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error while comparing the hash of files');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }

  async createResult(
    test_id: number,
    isSuccess: boolean,
    githubNumber: string,
    type: string
  ) {
    try {
      const currentTestRun = await this.getTestRun(githubNumber);
      if (currentTestRun) {
        await this.addToTestRun(currentTestRun, test_id, isSuccess);
      } else {
        await this.createTestRun(githubNumber, test_id, isSuccess, type);
      }
    } catch (error) {
      console.error('Error while creating the rest run instance');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }

  async updateResult(
    test_id: number,
    runTime: number,
    exitCode: number,
    githubNumber: string
  ) {
    try {
      const currentTestRun = await this.getTestRun(githubNumber);
      const indexOfTest = currentTestRun.results.findIndex(
        (result) => result.id === test_id
      );

      currentTestRun.results[indexOfTest].runTime = runTime;
      currentTestRun.results[indexOfTest].exitCode = exitCode;
      await this.updateTestRun(githubNumber, currentTestRun);
    } catch (error) {
      console.error('Error while updating the test run instance');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
      throw error;
    }
  }

  private async updateTestRun(githubNumber, testRun) {
    await TestRunModel.findOneAndUpdate(
      { githubNumber: githubNumber },
      testRun,
      { upsert: true }
    );
  }

  private async addToTestRun(currentTestRun, test_id, isSuccess) {
    currentTestRun.results.push({
      id: test_id,
      success: isSuccess,
    });
    await TestRunModel.findOneAndUpdate(
      {
        githubNumber: currentTestRun.githubNumber,
      },
      {
        results: currentTestRun.results,
      }
    );
  }

  private async createTestRun(
    githubNumber: string,
    test_id: number,
    isSuccess: boolean,
    type: string
  ) {
    await TestRunModel.create({
      githubNumber: githubNumber,
      type: type,
      results: [
        {
          success: isSuccess,
          id: test_id,
        },
      ],
    });
  }

  private async getTestRun(githubNumber) {
    return await TestRunModel.findOne({
      githubNumber: githubNumber,
    });
  }
}
