import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";

import {CreateClientDto, UpdateClientDto} from "./dto";
import {ClientService} from "./client.service";
import {CustomOkResponse} from "../utils";
import {Exception} from "../exceptions";
import {AccessTokenGuard} from "../core/guards";
import {
    SWAGGER_CLIENT_BODY_EXAMPLE,
    SWAGGER_CLIENT_EXAMPLE, SWAGGER_CLIENT_LIST_EXAMPLE
} from "../utils/example";


@ApiTags('Фірми клієнти')
@Controller('client')
@UseGuards(AccessTokenGuard)
export class ClientController {

    constructor(private clientService:ClientService) {
    }


    @ApiOperation({summary: 'Create client firm'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_CLIENT_EXAMPLE})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_CLIENT_BODY_EXAMPLE
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateClientDto): Promise<CreateClientDto> {
        return this.clientService.create(dto)
    };

    @ApiOperation({summary: 'Get all client firms'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_CLIENT_LIST_EXAMPLE})
    @ApiNotFoundResponse({description: Exception.FIRM_CLIENT_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(): Promise<CreateClientDto[]> {
        return this.clientService.getAll();
    }

    @ApiOperation({summary: 'Get client firms by id'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_CLIENT_EXAMPLE})
    @ApiNotFoundResponse({description: Exception.FIRM_CLIENT_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getById(@Param('id') id: string): Promise<CreateClientDto> {
        return this.clientService.getById(Number(id));
    }

    @ApiOperation({summary: 'Get client firms by id'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_CLIENT_EXAMPLE})
    @ApiNotFoundResponse({description: Exception.FIRM_CLIENT_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id/all')
    getAllDataById(@Param('id') id: string): Promise<CreateClientDto> {
        return this.clientService.getAllDataById(Number(id));
    }

    @ApiOperation({summary: 'Update client firms by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_CLIENT_EXAMPLE})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_CLIENT_BODY_EXAMPLE
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Client firms id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.FIRM_CLIENT_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateClientDto): Promise<CreateClientDto> {
        return this.clientService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Delete client firms by id'})
    @ApiNotFoundResponse({description: Exception.FIRM_CLIENT_NOT_FOUND})
    @ApiParam({name: "id", description: 'Client firms id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<CreateClientDto> {
        return this.clientService.delete(Number(id));
    }


}
