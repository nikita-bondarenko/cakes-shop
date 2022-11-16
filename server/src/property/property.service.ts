import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Nuance} from "../nuance/models/nuance.model";
import {CreateNuanceDto} from "../nuance/dto/CreateNuanceDto";
import {copy} from "../category/category.service";
import {Property} from "./models/property.model";
import {CreatePropertyDto} from "./dto/CreatePropertyDto";
import {Product} from "../product/models/product.model";
import {getAllByProductId} from "../product/product.service";

export const excludeIfTwice = (items: any[], prop: string) =>
    items.reduce((arr: any[], item: any) => {
        const itemWithSameValue = arr.find(i => i[prop].toLowerCase() === item[prop].toLowerCase())
        return itemWithSameValue ? arr : [...arr, item]
    }, [])

@Injectable()
export class PropertyService {
    constructor(@InjectModel(Property) private propertyRepository: typeof Property) {

    }

    async getAll() {
        return this.propertyRepository.findAll()
    }

    async createMany(dto: CreatePropertyDto[]): Promise<Property[]> {

        const arr = excludeIfTwice(dto, 'name')

        const items = await Promise.all(arr.map(async (item): Promise<Property> => {
                const [elem, created] = await this.propertyRepository.findOrCreate({
                    where: {
                        name: item.name,
                        value: item.value
                    },
                    defaults: {
                        name: item.name,
                        value: item.value
                    }
                })
                return copy(elem)
            }
        ))
        return items
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.propertyRepository)
        await Promise.all(items.map(item => {
            return item.products.length > 1 ? 0 : this.propertyRepository.destroy({where: {id: item.id}})
        }))
    }
}
