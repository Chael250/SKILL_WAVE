import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Instructor])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
