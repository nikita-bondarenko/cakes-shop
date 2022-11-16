import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {CreatePaymentDto} from "./dto/CreatePaymentDto";
import {UpdatePaymentDto} from "./dto/UpdatePaymentDto";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {
    }

    @Get()
    getAll() {
        return this.paymentService.getAll()
    }

    @Post()
    create(@Body() dto: CreatePaymentDto) {
        return this.paymentService.create(dto)
    }

    @Put('/:id')
    update(@Body() dto: UpdatePaymentDto, @Param('id') id: number) {
        return this.paymentService.update(id, dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.paymentService.delete(id)
    }

}
