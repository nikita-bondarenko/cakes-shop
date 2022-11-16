import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateProductDto} from "../product/dto/CreateProductDto";
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {CreateUserDto} from "./dto/CreateUserDto";
import {UpdateProductDto} from "../product/dto/UpdateProductDto";
import {UpdateUserDto} from "./dto/UpdateUserDto";

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    getAll(@Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.userService.getAll(offset, limit)
    }

    @Get('/unique/:email/:id')
    isEmailUnique(@Param('email') email: string, @Param('id') id: number) {
        return this.userService.isEmailUnique(email, id)
    }

    @Get('/search')
    search(@Query('email') email: string,
           @Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.userService.search(email, offset, limit)
    }

    @Get('/:id')
    getOne(@Param('id') id: number ) {
        return this.userService.getOne(id)
    }

    @Put("/:id")
    updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update({...dto, id})
    }

    @UseInterceptors(FileInterceptor('picture'))
    @Post()
    create(@Body() dto: CreateUserDto, @UploadedFile() picture) {
        return this.userService.create(dto, picture)
    }

    @Delete('/:id')
    delete(@Param('id') id:number) {
        return this.userService.delete(id)
    }

    @Post('/ban/:id')
    ban(@Param('id') id : number,
        @Body('value') value: boolean,
        @Body('banReason') banReason: string) {
        return this.userService.ban(id, banReason, value)
    }

    @Post('/role/:id')
    setRole(@Param('id') id: number,
            @Body('roles') ids: number[]) {
        return this.userService.setRole(id, ids)
    }

}
