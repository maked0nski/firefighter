import {ApiBadRequestResponse, ApiOkResponse} from '@nestjs/swagger';
import {HttpStatus} from '@nestjs/common';

import {Exception} from '../__exceptions';

export function CustomExceptionResponse(config: { statusCode?: number; exceptionText: string; description?: string }) {
    const {statusCode = HttpStatus.BAD_REQUEST, exceptionText, description} = config;
    return ApiBadRequestResponse({
        schema: {
            type: 'object',
            description,
            properties: {
                statusCode: {type: 'number', example: statusCode},
                error: {type: 'string', example: exceptionText},
            },
        },
    });
}

export function UnauthorizedExceptionResponse() {
    return CustomExceptionResponse({statusCode: HttpStatus.UNAUTHORIZED, exceptionText: Exception.UNATHORIZED});
}

export function CustomOkResponse(config: { status?: number; description?: string; exampleData: any }) {
    const {status = 200, exampleData, description} = config;
    return ApiOkResponse({
        status,
        description,
        schema: {
            type: 'object',
            example: exampleData,
        },
    });
}
