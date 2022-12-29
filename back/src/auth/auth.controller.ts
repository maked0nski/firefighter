import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

import {GetCurrentUserDecorator, GetCurrentUserIdDecorator, Public} from "../__core/decorators";
import {AuthUserDto, ChangePasswordDto, ConfirmAccountDto, ForgotPasswordDto} from "./dto";
import {AccessTokenGuard, RefreshTokenGuard} from "../__core/guards";
import {GetCurrentUserRoleDecorator} from "../__core/decorators";
import {AuthService} from "./auth.service";
import {UserType} from "../user/type";
import {Tokens} from "./types";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Public()
    @ApiOperation({summary: 'Registration user'})
    @ApiOkResponse({
        status: HttpStatus.CREATED, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NTg1MjI4NH0.KlgbHUF76K8PyD0QYDh1xgEcsB_HzfgD21X-aTlytYc",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NjQ1NjE4NH0.bSJUZGZG-Z1uMP_z8uIWGEYQK-oonGlKDmnETI8ISGo"
            }
        }
    })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() authUserDto: AuthUserDto): Promise<Tokens> {
        return this.authService.registration(authUserDto);
    }


    @Public()
    @ApiOperation({summary: 'Registration user'})
    @ApiOkResponse({
        status: HttpStatus.CREATED, schema: {
            example: true
        }
    })
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() authUserDto: AuthUserDto) {
        return this.authService.signUp(authUserDto)
    }

    @Public()
    @Get('confirm')
    async confirm(@Query() query: ConfirmAccountDto) {
        await this.authService.confirm(query.token);
        return true
    }

    @Public()
    @ApiOperation({summary: 'Login user'})
    @ApiOkResponse({
        status: HttpStatus.OK, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NTg1MjI4NH0.KlgbHUF76K8PyD0QYDh1xgEcsB_HzfgD21X-aTlytYc",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NjQ1NjE4NH0.bSJUZGZG-Z1uMP_z8uIWGEYQK-oonGlKDmnETI8ISGo"
            }
        }
    })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() authUserDto: AuthUserDto): Promise<Tokens> {
        return this.authService.login(authUserDto);
    }

    @Post('logout')
    @ApiOperation({summary: 'Logout user'})
    @ApiOkResponse({status: HttpStatus.OK, schema: {example: true}})
    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserIdDecorator() userId: number): Promise<boolean> {
        return this.authService.logout(userId);
    }

    @Public()
    @ApiOperation({summary: 'Refresh tokens user'})
    @ApiOkResponse({
        status: HttpStatus.OK, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIpXVCJ9.eyJpZCI6joidXNlcjIwbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NTg1MjI4NH0.Klgbh1xgEcsB_HzfgD21X-aTlytYc",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInpXVCJ9.eyJpZIjoidXNlcjIwbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NjQ1NjE4NH0.bSJUZGZG-Z1uMGlKDmnETI8ISGo"
            }
        }
    })
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserIdDecorator() userId: number,
        @GetCurrentUserDecorator('refreshToken') refreshToken: string
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @UseGuards(AccessTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('role')
    getRoleByTokken(@GetCurrentUserRoleDecorator() role: string,) {
        return role
    }


    @Public()
    @Post('forgotPassword')
    async forgotPassword(@Body() forgotPassword: ForgotPasswordDto): Promise<void> {
        return this.authService.forgotPassword(forgotPassword);
    }

    @Patch('changePassword')
    @UseGuards(AccessTokenGuard)
    async changePassword(
        @GetCurrentUserDecorator() user: UserType,
        @Body() newPassword: ChangePasswordDto,
    ): Promise<boolean> {
        return this.authService.changePassword(user.id, newPassword);
    }


}
