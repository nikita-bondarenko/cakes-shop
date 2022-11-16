import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DeliveryService} from "./delivery.service";
import {CreateDeliveryDto} from "./dto/CreateDeliveryDto";
import {Delivery} from "./models/delivery.model";
import {UpdateDeliveryDto} from "./dto/UpdateDeliveryDto";

@Controller('delivery')
export class DeliveryController {
    constructor(private deliveryService: DeliveryService) {
    }

    @Get()
    getAll() {
        return this.deliveryService.getAll()
    }

    @Post()
    create(@Body() dto: CreateDeliveryDto) {
        return this.deliveryService.create(dto)
    }

    @Put('/:id')
    update(@Body() dto: UpdateDeliveryDto, @Param('id') id: number) {
        return this.deliveryService.update(id, dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.deliveryService.delete(id)
    }

}
