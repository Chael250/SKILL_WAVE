import { Module } from '@nestjs/common';
import { AuthInsService } from './auth-ins.service';
import { AuthInsController } from './auth-ins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { AtInsStrategy, RtInsStrategy } from './strategy';

@Module({
  imports : [TypeOrmModule.forFeature([Instructor])],
  controllers: [AuthInsController],
  providers: [AuthInsService, AtInsStrategy, RtInsStrategy],
})
export class AuthInsModule {}
