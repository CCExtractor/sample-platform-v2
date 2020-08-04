import { Controller, Get } from '@nestjs/common';

import { GithubInteractionsApiService } from './services/github-interactions-api.service';

@Controller()
export class GithubInteractionsApiController {
  constructor(private readonly appService: GithubInteractionsApiService) {}

  @Get('/latest-linux-artifact')
  async getArtifact() {
    await this.appService.getArtifact();
    return 'OK';
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
