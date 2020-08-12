import { async, TestBed } from '@angular/core/testing';
import { FrontendSamplesModule } from './frontend-samples.module';

describe('FrontendSamplesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrontendSamplesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FrontendSamplesModule).toBeDefined();
  });
});
