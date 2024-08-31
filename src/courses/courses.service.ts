import { Injectable } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly courses:Repository<Course>) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courses.create(createCourseDto)
  }

  findAll() {
    return this.courses.find()
  }

  findOne(id: string) {
    return this.courses.findOne({where:{courseId:id}})
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courses.update({courseId:id}, updateCourseDto)
  }

  async remove(id: string) {
    const course = await this.courses.findOne({where:{courseId:id}})
    return this.courses.remove(course)
  }
}
