import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthStuService } from './auth-stu.service';
import { CreateAuthStuDto } from './dto/create-auth-stu.dto';
import { GetUserId, GetUserInfo, Public } from 'src/common/decorators';

@Controller('auth-stu')
export class AuthStuController {
  constructor(private readonly authStuService: AuthStuService) {}

  @Public()
  @Post("local/signin")
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() auth:CreateAuthStuDto){
    return await this.authStuService.signInLocal(auth.email, auth.password)
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetUserId() id:string, @GetUserInfo("refreshToken") rt:string){
    return await this.authStuService.refreshToken(id, rt)
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@GetUserId() id:string){
    return await this.authStuService.logout(id)
  }

}
