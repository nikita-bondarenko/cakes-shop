import {Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/CreateUserDto";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdateUserDto} from "../user/dto/UpdateUserDto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }



    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Post('/confirm')
    confirm(@Body('email') email: string,
            @Body('token') token: string) {
        return this.authService.confirm(email, token)
    }

    @Post('/new_token')
    updateJWT(@Body() jwt: string) {
        return this.authService.updateJWT(jwt)
    }

    @Post('/email/:email')
    loginByEmail(@Param('email') email: string) {
        return this.authService.loginByEmail(email)
    }

    @UseInterceptors(FileInterceptor('picture'))
    @Put('/update')
    update(
        @Body() dto: UpdateUserDto,
        @UploadedFile() picture) {
        return this.authService.updateUserData(dto, picture)
    }
}
