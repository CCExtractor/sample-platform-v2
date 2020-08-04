import { Module } from '@nestjs/common';

import { GithubInteractionsApiModule } from '../../../../libs/github-interactions-api-implementation/src'

@Module({
  imports: [GithubInteractionsApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
