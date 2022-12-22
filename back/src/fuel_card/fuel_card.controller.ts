import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

import {AccessTokenGuard} from "../__core/guards";
import {FuelCardService} from "./fuel_card.service";
import {CreateFuelCardDto, UpdateFuelCardDto} from "./dto";
import {CustomOkResponse} from "../__utils";
import {
    SWAGGER_EXAMPLE_ARRAY_FUEL_CARD_LIST,
    SWAGGER_EXAMPLE_ONE_FUEL_CARD
} from "../__utils/example";
import {Exception} from "../__exceptions";

@ApiTags('Fuel cards')
@Controller('fuel_card')
@UseGuards(AccessTokenGuard)
export class FuelCardController {

    constructor(private fuelCardService: FuelCardService) {
    }


    @ApiOperation({summary: 'Get all list fuel cards'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_ARRAY_FUEL_CARD_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllFuelCards(): Promise<CreateFuelCardDto[]> {
        return this.fuelCardService.getAllFuelCards();
    }



    @ApiOperation({summary: 'Get fuel card by id'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @ApiNotFoundResponse({description: Exception.CARD_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getFuelCardById(@Param('id') id: string): Promise<CreateFuelCardDto> {
        return this.fuelCardService.getFuelCardById(Number(id));
    }

    @ApiOperation({summary: 'Create fuel card'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createFuelCard(@Body() createFuelCardDto: CreateFuelCardDto): Promise<CreateFuelCardDto> {
        return this.fuelCardService.createFuelCard(createFuelCardDto);
    }

    @ApiOperation({summary: 'Update fuel card by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.CARD_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    updateFuelCardById(@Param('id') id: string, @Body() updateFuelCardDto: UpdateFuelCardDto): Promise<CreateFuelCardDto> {
        return this.fuelCardService.updateFuelCardById(Number(id), updateFuelCardDto)
    }

    @ApiOperation({summary: 'Add car to user'})
    @ApiBody({
        description: "User id", schema: {
            example: {
                userId: "2"
            }
        }
    })
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/addUser')
    addUser(@Param('id') id: string, @Body('userId') userId: string): Promise<CreateFuelCardDto> {
        return this.fuelCardService.addUser(Number(id), Number(userId))
    }

    @ApiOperation({summary: 'Remove car from user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_ONE_FUEL_CARD})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/deleteUser')
    deleteUser(@Param('id') id: string): Promise<CreateFuelCardDto> {
        return this.fuelCardService.deleteUser(Number(id))
    }

    @ApiOperation({summary: 'Delete fuel card by id'})
    @ApiNotFoundResponse({description: Exception.CARD_NOT_FOUND})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteFuelCardById(@Param('id') id: string): Promise<CreateFuelCardDto>{
        return this.fuelCardService.deleteFuelCardById(Number(id));
    }
}
