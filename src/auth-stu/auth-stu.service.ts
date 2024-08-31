import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthStuService {
  constructor(@InjectRepository(Student) private readonly students: Repository<Student>, private readonly auth:JwtService, private readonly config: ConfigService) {}
  async signInLocal(email:string, password: string){
    const student = await this.students.findOne({where:{studentEmail:email}})
    if(!student) throw new UnauthorizedException("Invalid email")
    const isValid = await bcrypt.compare(password, student.studentPassword)
    if(!isValid) throw new UnauthorizedException("Invalid password")
    
    const token = await this.getToken(student.studentId)
    token.rt = await bcrypt.hash(token.rt, 10)
    await this.updateRefreshToken(student.studentId, token.rt)
    return token
  }
  async refreshToken(id:string, rt:string){
    const student = await this.students.findOne({where:{studentId:id}})
    if(!student) throw new UnauthorizedException("Unauthorized");
    const isValid = await bcrypt.compare(rt, student.refreshToken)
    if(!isValid) throw new UnauthorizedException("Unauthorized")

    const token = await this.getToken(student.studentId)
    token.rt = await bcrypt.hash(token.rt, 10)
    await this.updateRefreshToken(student.studentId, token.rt)
    return token
  }
  async logout(id:string){
    return this.students.update({studentId: id}, {refreshToken: null})
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
    await this.students.update({studentId: id}, {refreshToken: rt})
  }
}
