import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

import {PositionService} from "./position.service";
import {PositionDto} from "./dto";
import {AtGuard} from "../core/guards";
import {CustomOkResponse} from "../utils";
import {SWAGGER_EXAMPLE_POSITION, SWAGGER_EXAMPLE_POSITION_LIST} from "../utils/example";
import {Exception} from "../exceptions";


@ApiTags('Positions')
@Controller('position')
@UseGuards(AtGuard)
export class PositionController {

    constructor(private positionService: PositionService) {
    }

    @ApiOperation({summary: 'Get all position'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_POSITION_LIST})
    @Get()
    getAllPositions(): Promise<PositionDto[]> {
        return this.positionService.getAll();
    }

    @ApiOperation({summary: 'Get position by id'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_POSITION})
    @ApiNotFoundResponse({description: Exception.POSITION_NOT_FOUND})
    @Get(':id')
    getPositionById(@Param('id') id: string): Promise<PositionDto> {
        return this.positionService.getById(Number(id));
    }

    @ApiOperation({summary: 'Create new position'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_POSITION})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @Post()
    createPosition(@Body() dto: PositionDto): Promise<PositionDto> {
        return this.positionService.create(dto);
    }

    @ApiOperation({summary: 'Update position by id'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_POSITION})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.POSITION_NOT_FOUND})
    @Patch(':id')
    updatePosition(@Param('id') id: string, @Body() dto: PositionDto): Promise<PositionDto> {
        return this.positionService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Detete position by id'})
    @ApiNotFoundResponse({description: Exception.POSITION_NOT_FOUND})
    @Delete(':id')
    deletPosition(@Param('id') id: string): Promise<PositionDto> {
        return this.positionService.delete(Number(id));
    }

}
