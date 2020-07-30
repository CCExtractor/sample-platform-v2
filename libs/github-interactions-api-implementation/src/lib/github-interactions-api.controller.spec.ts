import { Test, TestingModule } from '@nestjs/testing';

import { GithubInteractionsApiController } from './github-interactions-api.controller';
import { GithubInteractionsApiService } from './services/github-interactions-api.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GithubInteractionsApiController],
      providers: [GithubInteractionsApiService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to github-interactions-api!"', () => {
      const appController = app.get<GithubInteractionsApiController>(GithubInteractionsApiController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to github-interactions-api!',
      });
    });
  });
});
