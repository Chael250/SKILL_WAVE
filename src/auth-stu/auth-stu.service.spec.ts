import { Test, TestingModule } from '@nestjs/testing';
import { AuthStuService } from './auth-stu.service';

describe('AuthStuService', () => {
  let service: AuthStuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthStuService],
    }).compile();

    service = module.get<AuthStuService>(AuthStuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
