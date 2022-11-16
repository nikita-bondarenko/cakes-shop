import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Nuance} from "../nuance/models/nuance.model";
import {CreateNuanceDto} from "../nuance/dto/CreateNuanceDto";
import {copy} from "../category/category.service";
import {Size} from "./models/size.model";
import {CreateSizeDto} from "./dto/CreateSizeDto";
import {Property} from "../property/models/property.model";
import {Product} from "../product/models/product.model";
import {getAllByProductId} from "../product/product.service";
import {excludeIfTwice} from "../property/property.service";

@Injectable()
export class SizeService {
    constructor(@InjectModel(Size) private sizeRepository: typeof Size) {

    }


    async getAll() {
        return this.sizeRepository.findAll()
    }

    async createMany(dto: CreateSizeDto[]): Promise<Size[]> {

        const arr = excludeIfTwice(dto, 'name')

        const items = await Promise.all(arr.map(async (item): Promise<Size> => {
                const [elem, created] = await this.sizeRepository.findOrCreate({
                    where: {
                        name: item.name,
                        price: item.price
                    },
                    defaults: {
                        name: item.name,
                        price: item.price
                    }
                })
                return copy(elem)
            }
        ))
        return items
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.sizeRepository)
        await Promise.all(items.map(item => {
            return item.products.length > 1 ? 0 : this.sizeRepository.destroy({where: {id: item.id}})
        }))
    }
}
