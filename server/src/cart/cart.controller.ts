import {Controller, Get, Param, Query} from '@nestjs/common';
import {CartService} from "./cart.service";

@Controller('carts')
export class CartController {
    constructor( private cartService: CartService) {
    }

    @Get()
    getAll(@Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.cartService.getAll(offset, limit)
    }

    @Get('/:id')
    findOneById(@Param('id') id: number) {
        return this.cartService.findOneById(id)
    }


}
