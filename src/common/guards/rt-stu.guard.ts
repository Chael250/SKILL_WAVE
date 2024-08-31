import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RtStuGuard extends AuthGuard("skill_wave_rt_student"){
    constructor(){
        super()
    }
}