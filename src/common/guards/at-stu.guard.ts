import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AtStuGuard extends AuthGuard("skill_wave_at_student"){
    constructor(private readonly reflector:Reflector){
        super()
    }

    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) return true
        
        return super.canActivate(context)
    }
}