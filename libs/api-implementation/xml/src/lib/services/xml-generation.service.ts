import * as builder from 'xmlbuilder';
import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';

import { TestEntryModel } from '../../../../models/test-entries/test-entry.models';
import { AppConfig } from 'config';
import * as xmlbuilder from 'xmlbuilder';

@Injectable()
export class XmlGenerationService {
  private categories = [
    'broken',
    'cea-708',
    'dvb',
    'dvd',
    'dvr-ms',
    'general',
    'hauppage',
    'mp4',
    'nocc',
    'options',
    'teletext',
    'wtv',
    'xds',
  ];

  constructor() {}

  async generateXML() {
    let multitest: any = {
      multitest: {
        testfile: [],
      },
    };
    await Promise.all(
      this.categories.map(async (category) => {
        const numOfEntries = await this.buildXML(category);

        if (numOfEntries > 0) {
          multitest.multitest.testfile.push({
            location: category + '.xml',
          });
        }
      })
    );
    multitest = builder.create(multitest, { encoding: 'utf-8' });
    writeFileSync(
      AppConfig.PATH_TO_MOUNTED_BUCKET + '/xml/tests.xml',
      multitest.end({ pretty: true })
    );
  }

  private async buildXML(category: string) {
    let xml: any = {
      tests: {
        entry: [],
      },
    };
    let entries: any[];

    entries = await TestEntryModel.find({
      category: category,
    });

    for (const entry of entries) {
      xml.tests.entry.push({
        '@id': entry._id,
        command: entry.command,
        input: {
          '@type': 'file',
          '#text': entry.sample,
        },
        output: 'file',
        compare: {
          file: {
            '@ignore': 'false',
            '@id': entry._id,
            correct: 'wrong.txt',
            expected:
              entry.sample.split('.')[0] +
              '.' +
              entry.correctFiles[0].filename.split('.')[1],
          },
        },
      });
    }

    xml = builder.create(xml, { encoding: 'utf-8' });

    writeFileSync(
      AppConfig.PATH_TO_MOUNTED_BUCKET + '/xml/' + category + '.xml',
      xml.end({ pretty: true })
    );

    return entries.length;
  }
}
