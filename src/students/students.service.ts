import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private readonly students:Repository<Student>, private readonly auth:JwtService, private readonly config:ConfigService) {}
  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.studentPassword = await bcrypt.hash(createStudentDto.studentPassword, 10)
    const student = this.students.create(createStudentDto)
    const tokens = await this.getToken(student.studentId)
    const newStudent = await this.students.save(student)
    await this.updateRefreshToken(student.studentId, tokens.rt)
    return {
      newStudent,
      ...tokens

  }
}

  async findAll() {
    const student = await this.students.find()
    return student.map((student:CreateStudentDto) => {
      const {studentPassword , ...notPassword} = student
      return notPassword
    })
  }

  findOne(id: string) {
    return this.students.findOne({where:{studentId:id}})
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.students.update({studentId:id}, updateStudentDto)
  }

  async remove(id: string) {
    const student = await this.students.findOne({where:{studentId:id}})
    return this.students.remove(student)
  }

  async getToken(studentId:string){
    const [at,rt] = await Promise.all([
      this.auth.signAsync({
        id: studentId
      }, {
        secret: this.config.get("SKILL_WAVE_PRIVATE_KEY"),
        expiresIn: 60 * 30
      }),
      this.auth.signAsync({
        id: studentId
      },{
        secret: this.config.get("SKILL_WAVE_PRIVATE_KEY"),
        expiresIn: 60 * 60 * 24 * 14
      })
    ])
     return {
      at,
      rt
     }
  }

  async updateRefreshToken(id:string,rt:string){
    this.students.update({studentId: id}, {refreshToken: rt})
  }
}
