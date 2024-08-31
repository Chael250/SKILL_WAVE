import { Module } from '@nestjs/common';
import { AuthStuService } from './auth-stu.service';
import { AuthStuController } from './auth-stu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { JwtService } from '@nestjs/jwt';
import { AtStuStrategy, RtStuStrategy } from './strategy';
import { RtStuGuard } from 'src/common/guards';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [AuthStuController],
  providers: [AuthStuService, AtStuStrategy, RtStuStrategy],
})
export class AuthStuModule {}
