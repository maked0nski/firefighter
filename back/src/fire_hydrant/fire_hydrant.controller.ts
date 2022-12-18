import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {AtGuard} from "../core/guards";

import {CreateFireHydrantDto, UpdateFireHydrantDto} from "./dto";
import {SWAGGER_EXAMPLE_FIRE_HYDRANT} from "../utils/example";
import {FireHydrantService} from "./fire_hydrant.service";
import {CustomOkResponse} from "../utils";
import {Exception} from "../exceptions";

@ApiTags('Пожежні гідранти')
@Controller('hydrant')
@UseGuards(AtGuard)
export class FireHydrantController {
    constructor(private fireHydrantService: FireHydrantService) {
    }

    @ApiOperation({summary: 'Create fire-hydrant'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_HYDRANT})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                reminding: true,
                quantity: 45,
                next_check: "02.05.2023"
            }
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateFireHydrantDto): Promise<CreateFireHydrantDto> {
        return this.fireHydrantService.create(dto)
    };

    @ApiOperation({summary: 'Get fire-hydrant by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_HYDRANT})
    @ApiParam({name: "id", description: 'Sim card id', schema: {example: 1}})
    @ApiNotFoundResponse({description: Exception.FIRE_HYDRANT_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findById(@Param('id') id: string): Promise<UpdateFireHydrantDto> {
        return this.fireHydrantService.findById(Number(id));
    };

    @ApiOperation({summary: 'Update fire-hydrant by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_HYDRANT})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                reminding: true,
                quantity: 45,
                next_check: "02.05.2023"
            }
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Fire-hydrant id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.FIRE_HYDRANT_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFireHydrantDto): Promise<UpdateFireHydrantDto> {
        return this.fireHydrantService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Addfirm to fire-hydrant by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_HYDRANT})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                firmId: 1
            }
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Fire-hydrant id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.FIRE_HYDRANT_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id/addFirm')
    addFirm(@Param('id') id: string, @Body('firmId') firmId: string): Promise<CreateFireHydrantDto> {
        return this.fireHydrantService.addFirm(Number(id), Number(firmId));
    }

    @ApiOperation({summary: "Delete firmId from fire-hydrant"})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_HYDRANT})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.FIRE_HYDRANT_NOT_FOUND})
    @Patch(':id/deleteFirm')
    deleteFirm(@Param('id') id: string) {
        return this.fireHydrantService.deleteFirm(Number(id));
    }

    @ApiOperation({summary: 'Delete fire-hydrant by id'})
    @ApiNotFoundResponse({description: Exception.FIRE_HYDRANT_NOT_FOUND})
    @ApiParam({name: "id", description: 'Fire-hydrant id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<CreateFireHydrantDto> {
        return this.fireHydrantService.delete(Number(id));
    }

}
