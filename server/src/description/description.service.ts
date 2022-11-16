import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from "../category/dto/CreateCategoryDto";
import {Category} from "../category/models/category.model";
import {copy} from "../category/category.service";
import {InjectModel} from "@nestjs/sequelize";
import {Description} from "./models/description.model";
import {CreateDescriptionDto} from "./dto/CreateDescriptionDto";
import {excludeIfTwice} from "../property/property.service";

@Injectable()
export class DescriptionService {
    constructor(@InjectModel(Description) private descriptionRepository: typeof Description) {

    }

    async createMany(dto: CreateDescriptionDto[]): Promise<Description[]> {

        const arr = excludeIfTwice(dto, 'title')

        const items = await this.descriptionRepository.bulkCreate(arr)
        return items
    }

    async deleteByProductId(id: number) : Promise<number> {
        const number = await this.descriptionRepository.destroy({
            where: {productId: id}
        })
        return number
    }
}
