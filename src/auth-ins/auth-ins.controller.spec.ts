import { Test, TestingModule } from '@nestjs/testing';
import { AuthInsController } from './auth-ins.controller';
import { AuthInsService } from './auth-ins.service';

describe('AuthInsController', () => {
  let controller: AuthInsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthInsController],
      providers: [AuthInsService],
    }).compile();

    controller = module.get<AuthInsController>(AuthInsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
