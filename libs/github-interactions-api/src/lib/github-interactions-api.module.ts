import { Module } from '@nestjs/common';
import { GithubInteractionsApiService } from './services/github-interactions-api.service';
import { GithubInteractionsApiController } from './github-interactions-api.controller';

@Module({
  controllers: [GithubInteractionsApiController],
  providers: [GithubInteractionsApiService],
  exports: [GithubInteractionsApiService],
})
export class GithubInteractionsApiModule {}
