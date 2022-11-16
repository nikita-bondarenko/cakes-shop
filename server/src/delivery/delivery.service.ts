import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Delivery} from "./models/delivery.model";
import {CreateDeliveryDto} from "./dto/CreateDeliveryDto";
import {UpdateDeliveryDto} from "./dto/UpdateDeliveryDto";

@Injectable()
export class DeliveryService {
    constructor(@InjectModel(Delivery) private deliveryRepository) {

    }

    private async getOne(id): Promise<Delivery> {
        return this.deliveryRepository.findOne({where: {id}})
    }

    async getAll(): Promise<Delivery[]> {
        return this.deliveryRepository.findAll({include: {all: true}})
    }

    async create(dto: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryRepository.create(dto)
    }

    async update(id, dto: UpdateDeliveryDto) {
        const item = await this.getOne(id)
        await item.update(dto)
        return
    }

    async delete (id) {
        const item = await this.getOne(id)
        await item.destroy()
    }
}
