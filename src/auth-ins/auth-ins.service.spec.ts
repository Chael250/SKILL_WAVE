import { Test, TestingModule } from '@nestjs/testing';
import { AuthInsService } from './auth-ins.service';

describe('AuthInsService', () => {
  let service: AuthInsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthInsService],
    }).compile();

    service = module.get<AuthInsService>(AuthInsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
