import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cream} from "../cream/models/cream.model";
import {CreateCreamDto} from "../cream/dto/CreateCreamDto";
import {copy} from "../category/category.service";
import {Decoration} from "./models/decoration.model";
import {CreateDecorationDto} from "./dto/CreateDecorationDto";
import {Category} from "../category/models/category.model";
import {Product} from "../product/models/product.model";
import {getAllByProductId} from "../product/product.service";
import {FileService} from "../file/file.service";
import {excludeIfTwice} from "../property/property.service";

@Injectable()
export class DecorationService {
    constructor(@InjectModel(Decoration) private decorationRepository: typeof Decoration,
                private fileService: FileService) {

    }

    async getAll(offset: number = 0, limit: number = 10): Promise<Decoration[]> {


        const items = await this.decorationRepository.findAll({
            offset: offset,
            limit: limit,
            order: [['name', 'ASC']]
        })
        return items
    }

    async createMany(dto: CreateDecorationDto[]): Promise<Decoration[]> {
        const arr = excludeIfTwice(dto, 'name')
        const items = await Promise.all(arr.map(async (item): Promise<Decoration> => {
                const [elem, created] = await this.decorationRepository.findOrCreate({
                    where: {
                        name: item.name,
                        picture: item.picture,
                        price: item.price
                    }
                })
                return copy(elem)
            }
        ))
        return items
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.decorationRepository)
        await Promise.all(items.map(item => {
            if (!(item.products.length > 1)) {
                this.decorationRepository.destroy({where: {id: item.id}})
            }
        }))
    }
}
