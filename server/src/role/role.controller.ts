import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./dto/CreateRoleDto";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getByValue(value)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.roleService.delete(id)
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() dto: CreateRoleDto) {
        return this.roleService.update(id,dto)
    }
}



