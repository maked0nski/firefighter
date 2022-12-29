import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {
    SWAGGER_EXAMPLE_FIRE_EXTINGUISHER, SWAGGER_EXAMPLE_FIRE_EXTINGUISHER_BODY
} from "../__utils/example";
import {CreateFireExtinguishersDto, UpdateFireExtinguishersDto} from "./dto";
import {FireExtinguishersService} from "./fire_extinguishers.service";
import {AccessTokenGuard} from "../__core/guards";
import {CustomOkResponse} from "../__utils";
import {Exception} from "../__exceptions";


@ApiTags('Вогнегасники')
@Controller('fire_extinguishers')
@UseGuards(AccessTokenGuard)
export class FireExtinguishersController {

    constructor(private fireExtinguishersService: FireExtinguishersService) {
    }

    @ApiOperation({summary: 'Create fire extinguishers'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER_BODY
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateFireExtinguishersDto): Promise<CreateFireExtinguishersDto> {
        return this.fireExtinguishersService.create(dto)
    };


    @ApiOperation({summary: 'Get fire extinguishers by id'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER})
    @HttpCode(HttpStatus.OK)
    @Get('id')
    getById(@Param('id') id: string): Promise<CreateFireExtinguishersDto> {
        return this.fireExtinguishersService.getById(Number(id));
    }

    @ApiOperation({summary: 'Update fire extinguishers by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER_BODY
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Fire fire extinguishers id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.FIRE_EXTINGUISHER_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFireExtinguishersDto): Promise<CreateFireExtinguishersDto> {
        return this.fireExtinguishersService.update(Number(id), dto);
    }

    // @ApiOperation({summary: 'Add firm to fire extinguishers by id'})
    // @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER})
    // @ApiBody({
    //     description: "Example body",
    //     schema: {
    //         example: {
    //             firmId: 1
    //         }
    //     },
    //     required: false
    // })
    // @ApiParam({name: "id", description: 'Fire extinguishers id', schema: {example: 1}})
    // @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    // @ApiNotFoundResponse({description: Exception.FIRE_EXTINGUISHER_NOT_FOUND})
    // @HttpCode(HttpStatus.CREATED)
    // @Patch(':id/addFirm')
    // addFirm(@Param('id') id: string, @Body('firmId') firmId: string): Promise<CreateFireExtinguishersDto> {
    //     return this.fireExtinguishersService.addFirm(Number(id), Number(firmId));
    // }

    // @ApiOperation({
    //     summary: "Remove firmId from fire extinguishers"
    // })
    // @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_FIRE_EXTINGUISHER})
    // @HttpCode(HttpStatus.OK)
    // @ApiNotFoundResponse({description: Exception.FIRE_EXTINGUISHER_NOT_FOUND})
    // @Patch(':id/deleteFirm')
    // deleteFirm(@Param('id') id: string): Promise<CreateFireExtinguishersDto> {
    //     return this.fireExtinguishersService.deleteFirm(Number(id));
    // }

    @ApiOperation({summary: 'Delete fire extinguishers by id'})
    @ApiNotFoundResponse({description: Exception.FIRE_EXTINGUISHER_NOT_FOUND})
    @ApiParam({name: "id", description: 'Fire extinguishersn id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<CreateFireExtinguishersDto> {
        return this.fireExtinguishersService.delete(Number(id));
    }


}
