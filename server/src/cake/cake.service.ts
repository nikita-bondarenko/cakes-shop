import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Category} from "../category/models/category.model";
import {CreateCategoryDto} from "../category/dto/CreateCategoryDto";
import {copy} from "../category/category.service";
import {Cake} from "./models/cake.model";
import {CreateCakeDto} from "./dto/CreateCakeDto";
import {Product} from "../product/models/product.model";
import {getAllByProductId, ProductService} from "../product/product.service";
import {excludeIfTwice} from "../property/property.service";

@Injectable()
export class CakeService {

    constructor(@InjectModel(Cake) private cakeRepository: typeof Cake,
                @InjectModel(Product) private productRepository: typeof Product
    ) {

    }

    async getAll(offset: number = 0, limit: number = 10): Promise<Cake[]> {
        const items = await this.cakeRepository.findAll({
            include: {all: true},
            offset: offset,
            limit: limit,
            order: [['name', 'ASC']]
        })
        return items
    }

    async createMany(dto: CreateCakeDto[]): Promise<Cake[]> {

        const arr = excludeIfTwice(dto, 'name')


        const items = await Promise.all(arr.map(async (item): Promise<Cake> => {
                const [elem, created] = await this.cakeRepository.findOrCreate({
                    where: {name: item.name},
                    defaults: {
                        name: item.name
                    }
                })
                return copy(elem)
            }
        ))
        return items
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.cakeRepository)
        await Promise.all(items.map(item => {
            return item.products.length > 1 ? 0 : this.cakeRepository.destroy({where: {id: item.id}})
        }))
    }
}
