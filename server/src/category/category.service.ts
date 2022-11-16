import {Injectable} from '@nestjs/common';
import {Op} from "sequelize";
import {InjectModel} from "@nestjs/sequelize";
import {Category} from "./models/category.model";
import {CreateCategoryDto} from "./dto/CreateCategoryDto";
import {Product} from "../product/models/product.model";
import {deepAssign} from "sequelize-typescript/dist/shared/object";
import {getAllByProductId} from "../product/product.service";
import {excludeIfTwice} from "../property/property.service";

export const copy = (obj) => JSON.parse(JSON.stringify(obj))

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category) private categoryRepository: typeof Category) {

    }

    async getAll(offset: number = 0, limit: number = 10): Promise<Category[]> {
        const items = await this.categoryRepository.findAll({
            include: {all:true},
            offset: offset,
            limit: limit,
            order: [['name', 'ASC']]
        })
        return items
    }

    async getOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: {id}
        })
        return category
    }


    async search(query: string = ''): Promise<Category[]> {
        const items = await this.categoryRepository.findAll({
            where: {
                name: {[Op.iLike]: `%${query}%`}
            },
            order: [['name', 'ASC']]
        })
        return items;
    }

    async create(dto: CreateCategoryDto): Promise<Category> {
        const item = await this.categoryRepository.create(dto)
        return item
    }

    async createMany(dto: CreateCategoryDto[]): Promise<Category[]> {

        const arr = excludeIfTwice(dto, 'name')

        const items = await Promise.all(arr.map(async (item): Promise<Category> => {
                const [category, created] = await this.categoryRepository.findOrCreate({
                    where: {name: item.name}
                })
                return copy(category)
            }
        ))
        return items
    }

    async update(id, dto: CreateCategoryDto): Promise<number> {
        const [affectedCount] = await this.categoryRepository.update(dto, {
            where: {
                id
            }
        })
        return affectedCount
    }

    async delete(id): Promise<number> {
        const number = await this.categoryRepository.destroy({
            where: {
                id
            }
        })
        return number
    }

    async deleteByProductId(id): Promise<void> {
        const items = await getAllByProductId(id, this.categoryRepository)
        await Promise.all(items.map(item => {
            return item.products.length > 1 ? 0 : this.categoryRepository.destroy({where: {id: item.id}})
        }))
    }
}
