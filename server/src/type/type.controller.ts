import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TypeService} from "./type.service";
import {CreateTypeDto} from "./dto/CreateTypeDto";

@Controller('/types')
export class TypeController {
    constructor(private typeService: TypeService) {

    }

    @Get()
    getAll() {
        return this.typeService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.typeService.getOne(id)

    }

    @Post()
    create(@Body() dto: CreateTypeDto) {
        return this.typeService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateTypeDto) {
        return this.typeService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.typeService.delete(id)
    }
}
