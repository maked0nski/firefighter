import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../core/guards";
import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {ContactPersonService} from "./contact_person.service";
import {Exception} from "../exceptions";
import {CustomOkResponse} from "../utils";
import {
    SWAGGER_CONTACT_PERSON, SWAGGER_CONTACT_PERSON_BODY, SWAGGER_CONTACT_PERSON_LIST
} from "../utils/example";
import {CreateContactPersonDto, UpdateContactPersonDto} from "./dto";


@ApiTags('Контактні особи фірми клієнта')
@Controller('contact_person')
@UseGuards(AccessTokenGuard)
export class ContactPersonController {

    constructor(private contactPersonService: ContactPersonService) {
    }

    @ApiOperation({summary: 'Create contact person'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_CONTACT_PERSON})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_CONTACT_PERSON_BODY
        },
        required: true
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() dto: CreateContactPersonDto): Promise<CreateContactPersonDto> {
        console.log(dto)
        return this.contactPersonService.create(dto)
    };


    @ApiOperation({summary: 'Get all contact persons'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_CONTACT_PERSON_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(): Promise<CreateContactPersonDto[]> {
        return this.contactPersonService.getAll();
    }


    @ApiOperation({summary: 'Get contact person by id'})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_CONTACT_PERSON_LIST})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getById(@Param('id') id: string): Promise<CreateContactPersonDto> {
        return this.contactPersonService.getById(Number(id));
    }


    @ApiOperation({summary: 'Update contact person by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_CONTACT_PERSON})
    @ApiBody({
        description: "Example body",
        schema: {
            example: SWAGGER_CONTACT_PERSON_BODY
        },
        required: false
    })
    @ApiParam({name: "id", description: 'Contact person id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.CONTACT_PERSON_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateContactPersonDto): Promise<CreateContactPersonDto> {
        console.log(id)
        return this.contactPersonService.update(Number(id), dto);
    }


    @ApiOperation({summary: 'Remove firm id from contact person by id'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_CONTACT_PERSON})
    @ApiParam({name: "id", description: 'Contact person id', schema: {example: 1}})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.CONTACT_PERSON_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    deleteFirmId(@Param('id') id: string): Promise<CreateContactPersonDto> {
        return this.contactPersonService.deleteFirmId(Number(id));
    }


    @ApiOperation({summary: 'Delete contact person by id'})
    @ApiNotFoundResponse({description: Exception.CONTACT_PERSON_NOT_FOUND})
    @ApiParam({name: "id", description: 'Contact person id', schema: {example: 1}})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<CreateContactPersonDto> {
        return this.contactPersonService.delete(Number(id));
    }
}
