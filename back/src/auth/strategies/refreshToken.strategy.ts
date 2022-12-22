import {ForbiddenException, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Request} from 'express';

import {JwtPayload, JwtPayloadWithRt} from "../types";
import {configs} from "../../__configs";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configs.ACCESS_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        console.log("validate")
        const refreshToken = req
            .get('authorization')
            .replace('Bearer', '')
            .trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
        console.log(payload)
        return {
            ...payload,
            refreshToken,
        };
    }
}
