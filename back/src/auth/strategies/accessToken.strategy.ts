import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable} from "@nestjs/common";

import {JwtPayload} from "../types";
import {configs} from "../../__configs";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configs.ACCESS_TOKEN_SECRET,
        });
    }

    validate(payload: JwtPayload) {
        return payload
    }
}
