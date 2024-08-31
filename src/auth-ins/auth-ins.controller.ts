import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthInsService } from './auth-ins.service';
import { CreateAuthInDto } from './dto/create-auth-in.dto';
import { GetUserId, GetUserInfo, Public } from 'src/common/decorators';

@Controller('auth-ins')
export class AuthInsController {
  constructor(private readonly authInsService: AuthInsService) {}
 
  @Public()
  @Post("local/signin")
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() auth:CreateAuthInDto){
    return await this.authInsService.signInLocal(auth.email, auth.password)
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetUserId() id:string, @GetUserInfo("refreshToken") rt:string){
    return await this.authInsService.refreshToken(id, rt)
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@GetUserId() id:string){
    return await this.authInsService.logout(id)
  }
}
