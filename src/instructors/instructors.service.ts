import { Injectable } from '@nestjs/common';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/create-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InstructorsService {
  constructor(@InjectRepository(Instructor) private readonly instructors:Repository<Instructor>, private readonly jwt:JwtService, private readonly config:ConfigService) {}
  async create(createInstructorDto: CreateInstructorDto) {
    createInstructorDto.password = await bcrypt.hash(createInstructorDto.password, 10)
    const instructors = this.instructors.create(createInstructorDto)
    const tokens = await this.getToken(instructors.password)
    const newInstructors = await this.instructors.save(instructors)
    await this.updateRefreshToken(instructors.instructorId, tokens.rt)
    return {
      newInstructors,
      ...tokens

  }
  }

  findAll() {
    return this.instructors.find()
  }

  findOne(id: string) {
    return this.instructors.findOne({where:{instructorId: id}})
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    if(updateInstructorDto.password){
      updateInstructorDto.password = await bcrypt.hash(updateInstructorDto.password, 10)
    }
    return this.instructors.update({instructorId:id}, updateInstructorDto)    
  }

  async remove(id: string) {
    const instructor = await this.instructors.findOne({where:{instructorId:id}}) 
    return this.instructors.remove(instructor)
  }

  async getToken(id:string){
    const [at, rt] = await Promise.all([
      this.jwt.signAsync({
        id,
      }, {
        secret: this.config.get("SKILL_WAVE_PRIVATE_KEY"),
        expiresIn: 60 * 30
      }),
      this.jwt.signAsync({
        id,
      }, {
        secret: this.config.get("SKILL_WAVE_PRIVATE_KEY"),
        expiresIn: 60 * 60 * 24 * 14
      })
    ])

    return {
      at,rt
    }
  }

  async updateRefreshToken(id:string, rt:string){
    this.instructors.update({instructorId:id}, {refreshToken: rt})
  }
}