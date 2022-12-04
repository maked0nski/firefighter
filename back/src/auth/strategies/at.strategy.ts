import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable} from "@nestjs/common";

import {JwtPayload} from "../types";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "Wery_Strong_AT_SECRET_KeY",
        });
    }

    validate(payload: JwtPayload) {
        return payload
    }
}