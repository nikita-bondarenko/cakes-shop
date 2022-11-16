import {Body, Injectable, Param} from '@nestjs/common';
import {Type} from "./type.model";
import {CreateTypeDto} from "./dto/CreateTypeDto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private typeRepository: typeof Type) {
    }

    async getAll() {
        const items = await this.typeRepository.findAll({include: {all:true}})
        return items
    }

    async getOne(id: number) {
        const item = await this.typeRepository.findOne({where: {id},include: {all:true}})
        return item
    }

    async create(dto: CreateTypeDto) {
        const item = await this.typeRepository.create(dto)
        return item
    }

    async update( id: number, dto: CreateTypeDto) {
        const item = await this.getOne(id)
        await item.update(dto)
        return item
    }

    async delete( id: number) {
      await this.typeRepository.destroy({where: {id}})
    }
}
