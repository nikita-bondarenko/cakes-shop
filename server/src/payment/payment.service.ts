import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {Payment} from "./models/payment.model";
import {CreatePaymentDto} from "./dto/CreatePaymentDto";
import {UpdatePaymentDto} from "./dto/UpdatePaymentDto";

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment) private paymentRepository: typeof Payment) {

    }

    private async getOne(id): Promise<Payment> {
        return this.paymentRepository.findOne({where: {id}})
    }

    async getAll(): Promise<Payment[]> {
        return this.paymentRepository.findAll({include: {all: true}})
    }

    async create(dto: CreatePaymentDto): Promise<Payment> {
        return this.paymentRepository.create(dto)
    }

    async update(id, dto: UpdatePaymentDto) {
        const item = await this.getOne(id)
        await item.update(dto)
        return
    }

    async delete (id) {
        const item = await this.getOne(id)
        await item.destroy()
    }
}
