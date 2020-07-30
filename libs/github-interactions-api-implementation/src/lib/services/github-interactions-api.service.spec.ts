import { Test } from '@nestjs/testing';

import { GithubInteractionsApiService } from './github-interactions-api.service';

describe('AppService', () => {
  let service: GithubInteractionsApiService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [GithubInteractionsApiService],
    }).compile();

    service = app.get<GithubInteractionsApiService>(GithubInteractionsApiService);
  });

  describe('getData', () => {
    it('should return "Welcome to github-interactions-api!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to github-interactions-api!',
      });
    });
  });
});
