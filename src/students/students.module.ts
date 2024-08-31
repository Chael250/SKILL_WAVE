import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Instructor])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
