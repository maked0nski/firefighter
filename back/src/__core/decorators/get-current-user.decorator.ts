import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {JwtPayloadWithRt} from "../../auth/types";

export const GetCurrentUserDecorator = createParamDecorator(
    (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request)
        if (!data) return request.user;
        return request.user[data];
    },
);