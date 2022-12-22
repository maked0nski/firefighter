import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch, Res, UploadedFile,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

import {AccessTokenGuard} from "../__core/guards";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";
import {CustomOkResponse, editFileName, imageFileFilter} from "../__utils";
import {
    SWAGGER_EXAMPLE_USER,
    SWAGGER_EXAMPLE_USER_BY_ID,
    SWAGGER_EXAMPLE_USERS_LIST,
    SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR,
    SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR_AND_POSITION,
    SWAGGER_EXAMPLE_USERS_LIST_WITH_POSITION,
} from "../__utils/example";
import {Exception} from "../__exceptions";
import {UserType} from "./type";
import {Public} from "../__core/decorators";

@ApiTags('Users')
@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}


    @ApiOperation({summary: 'Get all users'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @ApiOperation({summary: 'Get all users with car'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR})
    @HttpCode(HttpStatus.OK)
    @Get('/withCar')
    getAllWithCar(): Promise<UserType[]> {
        return this.userService.getAllWithCar();
    }

    @ApiOperation({summary: 'Get all users with position'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST_WITH_POSITION})
    @HttpCode(HttpStatus.OK)
    @Get('withPosition')
    getAllWithPosition(): Promise<UserType[]> {
        return this.userService.getAllWithPosition();
    }

    @ApiOperation({summary: 'Get all users with Car and position'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR_AND_POSITION})
    @HttpCode(HttpStatus.OK)
    @Get('withCarAndPosition')
    getAllWithCarAndPosition() {
        return this.userService.getAllWithCarAndPosition();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.getById(Number(id));
    }


    @Get(':id/image')
    async watchFile(@Param('id') id: string, @Res() res) {
        // let image: string = await this.userService.getById(Number(id)).then(value => value.image);
        return res.sendFile(await this.userService.getById(Number(id)).then(value => value.image), {root: './files/image/'});
    }


    @ApiOperation({summary: 'Update user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files/image',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter
        })
    )
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() userUpdateDto: UpdateUserDto,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<UserType> {
        try {
            if (image) {
                userUpdateDto.image = `${image.filename}`;
            }
            return this.userService.updateUser(Number(id), userUpdateDto);
        } catch (e) {
            console.log(e)
        }

    }



    @Public()
    @Get('/avatar/:image')
    getAvatar(@Param('image') image, @Res() res) {
        return res.sendFile(image, {root: './files/image'});
    }



    @ApiOperation({summary: 'Add user position'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/addPosition')
    addPosition(@Param('id') id: string, @Body('positionId') positionId: string): Promise<UserType> {
        return this.userService.addPosition(Number(id), Number(positionId))
    }

    @ApiOperation({summary: 'Delete user position'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/deletePosition')
    deletePosition(@Param('id') id: string): Promise<UserType> {
        return this.userService.deletePosition(Number(id))
    }


    @ApiOperation({summary: 'Add car to user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/addCar')
    addCar(@Param('id') id: string, @Body('carId') carId: string): Promise<UserType> {
        return this.userService.addCar(Number(id), Number(carId))
    }

    @ApiOperation({summary: 'Remove car from user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/deleteCar')
    deleteCar(@Param('id') id: string): Promise<UserType> {
        return this.userService.deleteCar(Number(id))
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(Number(id))
    }


}
