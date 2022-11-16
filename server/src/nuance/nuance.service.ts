import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Decoration} from "../decoration/models/decoration.model";
import {CreateDecorationDto} from "../decoration/dto/CreateDecorationDto";
import {copy} from "../category/category.service";
import {Nuance} from "./models/nuance.model";
import {CreateNuanceDto} from "./dto/CreateNuanceDto";
import {Category} from "../category/models/category.model";
import {Product} from "../product/models/product.model";
import {getAllByProductId} from "../product/product.service";
import {ProductInCart} from "../product-in-cart/models/product-in-cart.model";
import {Op} from "sequelize";
import {excludeIfTwice} from "../property/property.service";

@Injectable()
export class NuanceService {
    constructor(@InjectModel(Nuance) private nuanceRepository: typeof Nuance) {

    }

    async createMany(dto: CreateNuanceDto[]): Promise<Nuance[]> {

        const arr = excludeIfTwice(dto, 'name')

        const items = await Promise.all(arr.map(async (item): Promise<Nuance> => {
                const [elem, created] = await this.nuanceRepository.findOrCreate({
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

    async deleteAll(items) {
        await Promise.all(items.map(item => {
            return item.products.length > 1 || item.productsInCart.length ? 0 : this.nuanceRepository.destroy({where: {id: item.id}})
        }))
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.nuanceRepository)
        await this.deleteAll(items)
    }

    async deleteFew(ids): Promise<void> {
        const items = await Promise.all(ids.map(id => this.nuanceRepository.findOne({
            where: {id},
            include: {all: true}
        })))
        await this.deleteAll(items)
    }


    async findManyById(ids: number[]): Promise<Nuance[]> {
        const items = await Promise.all(ids.map(id => this.nuanceRepository.findOne({
            where: {id},
            include: {all: true}
        })))
        return items
    }

    async search(type: string, value: string) {
        const items = await this.nuanceRepository.findAll({
            where: {
                name: {[Op.iLike]: `%${value}%`}
            },
            order: [['name', 'ASC']]
        })
        return items;
    }

    async getAll() {
        return this.nuanceRepository.findAll()
    }

}
