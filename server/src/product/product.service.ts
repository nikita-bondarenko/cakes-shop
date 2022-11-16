import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./models/product.model";
import {CreateProductDto} from "./dto/CreateProductDto";
import {UpdateProductDto} from "./dto/UpdateProductDto";
import {Op} from "sequelize";
import {CategoryService, copy} from "../category/category.service";
import {DescriptionService} from "../description/description.service";
import {FileService} from "../file/file.service";
import {PictureService} from "../picture/picture.service";
import {DecorationService} from "../decoration/decoration.service";
import {CakeService} from "../cake/cake.service";
import {CreamService} from "../cream/cream.service";
import {NuanceService} from "../nuance/nuance.service";
import {SizeService} from "../size/size.service";
import {PropertyService} from "../property/property.service";
import {Cake} from "../cake/models/cake.model";
import {Model} from "sequelize-typescript";
import {Picture} from "../picture/picture.model";
import {Category} from "../category/models/category.model";
import {Size} from "../size/models/size.model";
import {Cream} from "../cream/models/cream.model";
import {CreatePictureDto} from "../picture/dto/CreatePictureDto";
import {CreateDecorationDto} from "../decoration/dto/CreateDecorationDto";

export const getAllByProductId = async (id: number, model): Promise<any[]> => {
    const items = await model.findAll({
            include: [{
                model: Product,
                where: {id}
            }]
        }
    )
    const nestedItems = await Promise.all(items.map(item => model.findOne({
        where: {id: item.id},
        include: {all: true}
    })))
    return nestedItems
}

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository: typeof Product,
                private categoryService: CategoryService,
                private descriptionService: DescriptionService,
                private fileService: FileService,
                private pictureService: PictureService,
                private cakeService: CakeService,
                private decorationService: DecorationService,
                private creamService: CreamService,
                private nuanceService: NuanceService,
                private sizeService: SizeService,
                private propertyService: PropertyService) {
    }

    async getAll(
        {
            offset,
            limit,
            typeId,
            name,
            categoryId,
            minPrice,
            maxPrice
        }
    ): Promise<{ items: Product[], pagination: { count: number, limit: number, offset: number } }> {


        const {rows: items, count} = await this.productRepository.findAndCountAll({
            where: {
                [Op.and]: [{
                    ...(typeId ? {typeId} : {})
                },
                    name ? {name: {[Op.iLike]: `%${name}%`}} : {},
                    minPrice ? {price: {[Op.gte]: minPrice}} : {},
                    maxPrice ? {price: {[Op.lte]: maxPrice}} : {}
                ]
            },
            include: [
                {model: Size},
                {model: Picture},
                {model: Cream},
                categoryId ? {model: Category, where: {id: categoryId}} : {model: Category}
            ],
            offset: offset,
            limit: limit,
            order: [['name', 'ASC']]
        })

        return {
            items,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    async isUniqueName(name: string, id: number): Promise<boolean> {
        const product = await this.productRepository.findOne({where: {name: {[Op.iLike]: name}}})
        return !product || (product && product.id == id)
    }

    async getOne(id: number): Promise<Product> {
        const product = await this.findById(id)
        return product
    }

    async search(query: string = '', offset: number = 0, limit: number = 10): Promise<{ items: Product[], pagination: { count: number, limit: number, offset: number } }> {
        const items = await this.productRepository.findAll({
            where: {
                name: {[Op.iLike]: `%${query}%`}
            },
            include: {all: true},
            order: [['name', 'ASC']]
        })

        const count = await this.productRepository.count()

        return {
            items,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    private async createDependencies(type: string, items: any, product, service) {
        if (!items) return
        const newItems = await service.createMany(items)
        await product.$set(type, newItems.map(item => item.id))
    }

    private findById = (id) => this.productRepository.findOne({where: {id}, include: {all: true}})


    private propsArr = ['pictures', 'descriptions', 'categories', 'cakes', 'creams', 'decorations', 'properties', 'sizes', 'nuances']

    private serviceObj = {
        descriptions: this.descriptionService,
        pictures: this.pictureService,
        categories: this.categoryService,
        cakes: this.cakeService,
        creams: this.creamService,
        properties: this.propertyService,
        nuances: this.nuanceService,
        sizes: this.sizeService,
        decorations: this.decorationService
    }

    async create(dto: CreateProductDto): Promise<Product> {

        try {
            // @ts-ignore
            delete dto.id
            console.log(dto)
            const product = await this.productRepository.create(dto)

            await product.$set('type', dto.typeId)
            if (dto.descriptions) {
                // @ts-ignore
                dto.descriptions = dto.descriptions.map(item => ({...item, productId: product.id}))
            }

            if (dto.pictures) {
                // @ts-ignore
                dto.pictures = dto.pictures.map(item => ({...item, productId: product.id}))
            }

            await Promise.all(this.propsArr.map(prop => {
                    if (!dto[prop]) return
                    return this.createDependencies(prop, dto[prop], product, this.serviceObj[prop])
                }
            ))

            const newProduct = await this.findById(product.id)
            return newProduct
        } catch (e) {
            console.error(e)
        }

    }

    private async updateDependencies(type: string, items: any, product, service) {

        if (type === "descriptions" || type === "pictures") {
            await this.serviceObj[type].deleteByProductId(product.id)
        } else {
            await this.serviceObj[type].deleteByProductId(product.id)
            await product.$remove('cakes', product.cakes.map(item => item.id))
        }

        await this.createDependencies(type, items, product, service)
    }

    async update(id, dto: UpdateProductDto): Promise<Product> {
        await this.productRepository.update(
            {name: dto.name, price: dto.price},
            {
                where: {
                    id
                }
            }
        )

        const product = await this.findById(id)
        const deletedDecorationFiles = dto.decorations.length ? copy(product.decorations.filter(item => dto.decorations.every(decor => decor.picture !== item.picture))).map(item => item.picture) : []
        const deletedPictureFiles = dto.pictures.length ? copy(product.pictures.filter(item => dto.pictures.every(picture => picture.value !== item.value))).map(item => item.value) : []

        console.log([...deletedDecorationFiles, ...deletedPictureFiles])

        await Promise.all([...deletedDecorationFiles, ...deletedPictureFiles].map(picture => this.fileService.deleteFile(picture)))

        if (dto.descriptions) {
            // @ts-ignore
            dto.descriptions = dto.descriptions.map(item => ({...item, productId: product.id}))
        }


        if (dto.pictures) {
            // @ts-ignore
            dto.pictures = dto.pictures.map(item => ({...item, productId: product.id}))
        }

        await Promise.all(this.propsArr.map(prop => {
                if (!dto[prop]) return
                return this.updateDependencies(prop, dto[prop], product, this.serviceObj[prop])
            }
        ))

        const updatedProduct = await this.findById(id)
        return updatedProduct
    }

    async delete(id) {
        const product = await this.findById(id)
        if (product.productsInCart.length) return new HttpException("Невозможно удалить товар", HttpStatus.BAD_REQUEST)
        await Promise.all(product.pictures.map(picture => this.fileService.deleteFile(picture.value)))
        await Promise.all(this.propsArr.map(prop => {
                if (!product[prop]) return
                return this.serviceObj[prop].deleteByProductId(product.id)
            }
        ))
        await product.destroy()
    }

    async deleteAll(): Promise<number> {
        const number = await this.productRepository.destroy({where: {}})
        return number
    }

    async cleanFileStore(id: number, pictures: CreatePictureDto[], decorations: CreateDecorationDto[]) {

        const product = await this.getOne(id)
        pictures.forEach(picture => product.pictures.every(item => item.value !== picture.value) && this.fileService.deleteFile(picture.value))
        if (decorations && !!decorations.length) decorations.forEach(decor => product.decorations.every(item => item.picture !== decor.picture) && this.fileService.deleteFile(decor.picture))
    }
}
