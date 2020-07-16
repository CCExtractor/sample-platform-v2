import { Injectable } from '@nestjs/common';
import { createAppAuth } from '@octokit/auth-app';
import * as fs from 'fs';
import * as doAsync from 'doasync';
import * as request from 'request-promise';
import * as path from 'path';

import { AppConfig } from '../../../../../config';

@Injectable()
export class GithubInteractionsApiService {
  async getArtifact() {
    const auth = await this.authenticate();
    const { token } = await auth({ type: 'installation' });
    const res = JSON.parse(
      await request.get({
        uri:
          'https://api.github.com/repos/zelzhan/ccextractor/actions/artifacts',
        headers: {
          authorization: 'token ' + token,
          'User-Agent': 'request',
        },
      })
    );
    const file = fs.createWriteStream('linux.zip');
    request
      .get({
        uri: `https://api.github.com/repos/zelzhan/ccextractor/actions/artifacts/${res.artifacts[0].id}/zip`,
        headers: {
          authorization: 'token ' + token,
          'User-Agent': 'request',
        },
      })
      .pipe(file);
  }
  
  getData(): { message: string } {
    return { message: 'Welcome to github-interactions-api!' };
  }

  private async authenticate() {
    const secret = await doAsync(fs).readFile(
      path.resolve(__dirname, `../../../${AppConfig.NAME_OF_GITHUB_APP_PRIVATE_KEY}`)
    );

    return createAppAuth({
      id: AppConfig.GITHUB_APP_ID as number,
      privateKey: secret,
      installationId: AppConfig.GITHUB_APP_INSTALLATION_ID as number,
      clientId: AppConfig.GITHUB_APP_CLIENT_ID as string,
      clientSecret: AppConfig.GITHUB_APP_CLIENT_SECRET as string,
    });

  }
}
