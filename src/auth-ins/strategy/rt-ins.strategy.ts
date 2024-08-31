import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtInsStrategy extends PassportStrategy(Strategy, "skill_wave_at_instructor") {
    constructor(private readonly config:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:  config.get("SKILL_WAVE_PRIVATE_KEY"),
            PassReqToCallback: true
        })
    }

    validate(payload:any, refreshToken: string){
        return{
            refreshToken,
            ...payload
        }
    }
}