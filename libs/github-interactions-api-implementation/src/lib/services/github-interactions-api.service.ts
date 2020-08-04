import { Injectable } from '@nestjs/common';
import { createAppAuth } from '@octokit/auth-app';
import * as fs from 'fs';
import * as doAsync from 'doasync';
import * as request from 'request-promise';
import * as path from 'path';

import { AppConfig } from '../../../../../config';
import { SecretConfig } from '../../../../../secret-config';

@Injectable()
export class GithubInteractionsApiService {
  async getArtifact() {
    try {
      await this.downloadArtifact();
    } catch (error) {
      console.error('Error occured while downloading the artifact');
      // tslint:disable-next-line: no-console
      console.debug(error.stack);
    }
  }

  private async downloadArtifact() {
    const auth = await this.authenticate();
    const { token } = await auth({ type: 'installation' });
    const res = JSON.parse(
      await request.get({
        uri: `${AppConfig.GITHUB_API_LINK}/repos/${AppConfig.CCEXTRACTOR_REPO_OWNER}/${AppConfig.CCEXTRACTOR_REPO_NAME}/actions/artifacts`,
        headers: {
          authorization: 'token ' + token,
          'User-Agent': 'request',
        },
      })
    );

    const file = fs.createWriteStream('linux.zip');
    request
      .get({
        uri: `${AppConfig.GITHUB_API_LINK}/repos/${AppConfig.CCEXTRACTOR_REPO_OWNER}/${AppConfig.CCEXTRACTOR_REPO_NAME}/actions/artifacts/${res.artifacts[0].id}/zip`,
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
      path.resolve(__dirname, `../../../${AppConfig.GITHUB_APP_PRIVATE_KEY}`)
    );

    return createAppAuth({
      id: SecretConfig.GITHUB_APP_ID as number,
      privateKey: secret,
      installationId: SecretConfig.GITHUB_APP_INSTALLATION_ID as number,
      clientId: SecretConfig.GITHUB_APP_CLIENT_ID as string,
      clientSecret: SecretConfig.GITHUB_APP_CLIENT_SECRET as string,
    });
  }
}
