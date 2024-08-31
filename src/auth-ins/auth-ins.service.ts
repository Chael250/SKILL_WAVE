import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInDto } from './dto/create-auth-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthInsService {
  constructor(@InjectRepository(Instructor) private readonly auth:Repository<Instructor>, private readonly jwt:JwtService, private readonly config:ConfigService) {}

  async signInLocal(email:string, password: string){
    const instructor = await this.auth.findOne({where:{email,}})
    if(!instructor) throw new UnauthorizedException("Invaid Email")
    const isValid = await bcrypt.hash(instructor.password, 10)
    if(!isValid) throw new UnauthorizedException("Invalid password")

    const tokens = await this.getToken(instructor.instructorId)
    await this.updateRefreshToken(instructor.instructorId, tokens.rt)
    return tokens
  }

  async refreshToken(id:string, rt: string){
    const instructor = await this.auth.findOne({where:{instructorId: id}})
    if(!instructor) throw new UnauthorizedException("Invaid Email")
    const isValid = await bcrypt.compare(rt, instructor.refreshToken)
    if(!isValid) throw new ForbiddenException("Forbidden")
    
    const token = await this.getToken(instructor.instructorId)
    token.rt = await bcrypt.hash(token.rt, 10)
    await this.updateRefreshToken(instructor.instructorId, token.rt)
    return token
  }
  async logout(id:string){
    return this.auth.update({instructorId: id}, {refreshToken: null})
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
    this.auth.update({instructorId:id}, {refreshToken: rt})
  }
}