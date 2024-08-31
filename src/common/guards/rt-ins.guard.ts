import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

export class RtInsGuard extends AuthGuard("skill_wave_at_instructor") {
    constructor(){
        super()
    }
    
}