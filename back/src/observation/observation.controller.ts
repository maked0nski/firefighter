import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {CreateObservationDto, UpdateObservationDto} from "./dto";
import {ObservationService} from "./observation.service";
import {AccessTokenGuard} from "../__core/guards";
import {CustomOkResponse} from "../__utils";
import {Exception} from "../__exceptions";
import {
    SWAGGER_EXAMPLE_OBSERVATION,
    SWAGGER_EXAMPLE_OBSERVATION_LIST
} from "../__utils/example";

@ApiTags('Карточка спостереження')
@Controller('observation')
@UseGuards(AccessTokenGuard)
export class ObservationController {

    constructor(private observationService: ObservationService) {
    }

    @ApiOperation({summary: 'Create sim observation'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_OBSERVATION})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                number: 1058,
            }
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateObservationDto) {
        return this.observationService.create(dto);
    }

    @ApiOperation({summary: 'Find all list observations'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_OBSERVATION_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(): Promise<CreateObservationDto[]> {
        return this.observationService.findAll();
    }

    @ApiOperation({summary: 'Get observation by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_OBSERVATION})
    @ApiParam({name: "id", description: 'observation id', schema: {example: 1}})
    @ApiNotFoundResponse({description: Exception.OBSERVATION_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findById(@Param('id') id: string): Promise<CreateObservationDto> {
        return this.observationService.findById(Number(id));
    }

    @ApiOperation({summary: 'Update observation by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_OBSERVATION})
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
                number: 1010,
                contract: "№345 від 19.01.2022"
            }
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Sim card id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.OBSERVATION_NOT_FOUND})
    @ApiParam({name: "id", description: 'observation id', schema: {example: 1}})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateObservationDto): Promise<CreateObservationDto> {
        return this.observationService.update(Number(id), dto);
    }

    @ApiOperation({summary: 'Add sim card to observation'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_OBSERVATION})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.OBSERVATION_NOT_FOUND})
    @Patch(':id/addSim')
    addSimCard(@Param('id') id: string, @Body('sim_card_id') sim_card_id: string) {
        return this.observationService.addSimCard(Number(id), Number(sim_card_id));
    }

    @ApiOperation({summary: "Delete sim card from observation"})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_OBSERVATION})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.OBSERVATION_NOT_FOUND})
    @Patch(':id/deleteSim')
    deleteSimCard(@Param('id') id: string): Promise<CreateObservationDto> {
        return this.observationService.deleteSimCard(Number(id));
    }

    @ApiOperation({summary: 'Delete observation by id'})
    @ApiNotFoundResponse({description: Exception.OBSERVATION_NOT_FOUND})
    @ApiParam({name: "id", description: 'observation id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        return this.observationService.delete(Number(id));
    }
}
