import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';

import {CreateCategoryDto} from "./dto/CreateCategoryDto";
import {CategoryService} from "./category.service";
import {query} from "express";

@Controller('/categories')
export class CategoryController {

    constructor(private categoryService: CategoryService) {
    }

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto)
    }

    @Get()
    getAll(@Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.categoryService.getAll(offset, limit)
    }

    @Get('/search')
    search(@Query('name') name: string) {
        return this.categoryService.search(name)
    }

    @Get('/name/:name')
    searchByName(@Query('name') name: string) {
        return   this.categoryService.search(name)
    }

    @Get('/:id')
    getOne(@Param('id') id: number ) {
        return this.categoryService.getOne(id)
    }

    @Put('/:id')
    update(@Param('id') id: number ,
           @Body() dto: CreateCategoryDto) {
        return this.categoryService.update(id,dto)
    }

    @Delete('/:id')
    delete(@Param('id') id:number) {
        return this.categoryService.delete(id)
    }


}
