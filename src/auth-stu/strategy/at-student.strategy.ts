import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class AtStuStrategy extends PassportStrategy(Strategy, "skill_wave_at_student"){
    constructor(private readonly config: ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get("SKILL_WAVE_PRIVATE_KEY")
        })
    }

    validate(payload: any){
        return payload
    }
}