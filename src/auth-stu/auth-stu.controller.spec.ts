import { Test, TestingModule } from '@nestjs/testing';
import { AuthStuController } from './auth-stu.controller';
import { AuthStuService } from './auth-stu.service';

describe('AuthStuController', () => {
  let controller: AuthStuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthStuController],
      providers: [AuthStuService],
    }).compile();

    controller = module.get<AuthStuController>(AuthStuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
