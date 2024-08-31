import { AuthGuard } from "@nestjs/passport";

export class AtInsGuard extends AuthGuard("skill_wave_at_instructor") {
    constructor() {
        super();
    }
}