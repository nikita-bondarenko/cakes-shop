import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {copy} from "../category/category.service";
import {Cream} from "./models/cream.model";
import {CreateCreamDto} from "./dto/CreateCreamDto";
import {Category} from "../category/models/category.model";
import {Product} from "../product/models/product.model";
import {getAllByProductId} from "../product/product.service";
import {excludeIfTwice} from "../property/property.service";

@Injectable()
export class CreamService {

    constructor(@InjectModel(Cream) private creamRepository: typeof Cream) {

    }

    async getAll() {
        return this.creamRepository.findAll()
    }

    async createMany(dto: CreateCreamDto[]): Promise<Cream[]> {
        const arr = excludeIfTwice(dto, 'name')


        const items = await Promise.all(arr.map(async (item): Promise<Cream> => {
                const [elem, created] = await this.creamRepository.findOrCreate({
                    where: {
                        name: item.name,
                        ...(item.price ? {price: item.price} : {})
                    },
                    defaults: {
                        name: item.name,
                        ...(item.price ? {price: item.price} : {})
                    }

                })
                return copy(elem)
            }
        ))
        return items
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.creamRepository)
        await Promise.all(items.map(item => {
            return item.products.length > 1 ? 0 : this.creamRepository.destroy({where: {id: item.id}})
        }))
    }
}
