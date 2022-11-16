import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProductInCartService} from "./product-in-cart.service";
import {CreateProductInCartDto} from "./dto/CreateProductInCartDto";
import {UpdateProductInCartDto} from "./dto/UpdateProductInCartDto";
import {UpdateProductInCartQuantityDto} from "./dto/UpdateProductInCartQuantityDto";

@Controller('products_in_cart')
export class ProductInCartController {
    constructor(private inCartService: ProductInCartService) {
    }



    @Post()
    putInCart(@Body() dto: CreateProductInCartDto) {
        return this.inCartService.putInCart(dto)
    }

    @Get('/:id')
    getOne(@Param('id') id: number)
    {
        return this.inCartService.getOne(id)
    }

    @Get()
    getAll() {
        return this.inCartService.getAll()
    }

    @Put()
    changeQuantity(@Body() dto: UpdateProductInCartQuantityDto) {
        return this.inCartService.changeQuantity(dto)
    }

    @Put('/:id')
    update(@Body() dto: UpdateProductInCartDto,
           @Param('id') id: number) {
        return this.inCartService.update(id, dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.inCartService.delete(id)
    }


}
