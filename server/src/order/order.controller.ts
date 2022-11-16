import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderDto} from "./dto/CreateOrderDto";
import {UpdateOrderDto} from "./dto/UpdateOrderDto";

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.orderService.create(dto)
    }

    @Put('/:id')
    update(@Body() dto: UpdateOrderDto, @Param('id') id: number) {
        return this.orderService.update(id, dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.orderService.delete(id)
    }

    @Get()
    getAll(@Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.orderService.getAll(offset, limit)
    }

    @Get('/search')
    search(@Query('name') name: string,
           @Query('offset') offset: number,
           @Query('limit') limit: number) {
        return this.orderService.search(name, offset, limit)
    }

    @Get('/:id')
    getOne(@Param('id') id: number ) {
        return this.orderService.getOne(id)
    }
}
