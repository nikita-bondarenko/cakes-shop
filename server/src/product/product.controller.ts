import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/CreateProductDto";
import {Product} from "./models/product.model";
import {UpdateProductDto} from "./dto/UpdateProductDto";
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {copy} from "../category/category.service";
import {Picture} from "../picture/picture.model";
import {CreatePictureDto} from "../picture/dto/CreatePictureDto";
import {CreateDescriptionDto} from "../description/dto/CreateDescriptionDto";
import {CreateDecorationDto} from "../decoration/dto/CreateDecorationDto";

@Controller('/products')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto)
    }

    @Get()
    getAll(@Query('offset') offset: number,
           @Query('limit') limit: number,
           @Query('typeId') typeId: number,
           @Query('categoryId') categoryId: number,
           @Query('name') name: string,
           @Query('minPrice') minPrice: number,
           @Query('maxPrice') maxPrice: number,
    ) {
        return this.productService.getAll({offset, limit, typeId, name, categoryId, minPrice, maxPrice})
    }

    @Get('/search')
    search(@Query('name') name: string,
           @Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.productService.search(name, offset, limit)
    }

    @Get('/unique/:name/:id')
    isUniqueName(@Param('name') name: string,
                 @Param('id') id: number) {
        return this.productService.isUniqueName(name, id)
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.productService.getOne(id)
    }

    @Put('/:id')
    update(@Param('id',) id: number,
           @Body() dto: UpdateProductDto) {
        return this.productService.update(id, dto)
    }

    @Delete('/all')
    deleteAll() {
        return this.productService.deleteAll()
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.productService.delete(id)
    }

    @Delete("/files/:id")
    cleanFileStore(@Param('id') id: number, @Query('pictures') pictures: CreatePictureDto[], @Query("decorations") decorations: CreateDecorationDto[] ) {
        return this.productService.cleanFileStore(id, pictures, decorations)
    }

}
