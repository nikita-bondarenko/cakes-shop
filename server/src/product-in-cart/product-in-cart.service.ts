import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ProductInCart} from "./models/product-in-cart.model";
import {CreateProductInCartDto} from "./dto/CreateProductInCartDto";
import {Product} from "../product/models/product.model";
import {ProductService} from "../product/product.service";
import {NuanceService} from "../nuance/nuance.service";
import {CartService} from "../cart/cart.service";
import {UpdateProductInCartDto} from "./dto/UpdateProductInCartDto";
import {UpdateProductInCartQuantityDto} from "./dto/UpdateProductInCartQuantityDto";

@Injectable()
export class ProductInCartService {
    constructor(@InjectModel(ProductInCart) private productInCartRepository: typeof ProductInCart,
                private productService: ProductService,
                private nuanceService: NuanceService,
                private cartService: CartService) {
    }

    async changeQuantity(dto: UpdateProductInCartQuantityDto) {
        const {id, quantity} = dto
        const product = await this.getOnById(id)
        await product.update({quantity})

    }

    async getOnById(id) {
        const item = await this.productInCartRepository.findOne({where: {id}, include: {all: true}})
        return item
    }

    private async create(dto: CreateProductInCartDto) {
        const productInCart = await this.productInCartRepository.create(dto)
        await productInCart.$set('nuances', dto.nuances)
        await productInCart.$set('decorations', dto.decorations)
        return this.getOnById(productInCart.id)
    }

    async putInCart(dto: CreateProductInCartDto) {
        console.log(dto)
        const cart = await this.cartService.findOneById(dto.cartId)
        const currentProduct = cart.productsInCart.find(product => product.productId === dto.productId && product.cakeId == dto.cakeId && product.creamId == dto.creamId && product.sizeId == dto.sizeId  && product.decorations.every(nuance => dto.decorations.some(id => nuance.id === id)) && product.decorations.length === dto.decorations.length && product.nuances.every(nuance => dto.nuances.some(id => nuance.id === id)) && product.nuances.length === dto.nuances.length)
        let item

        if (currentProduct) {
            await currentProduct.update({comment: dto.comment || currentProduct.comment})
            await currentProduct.increment({quantity: dto.quantity})
            item = currentProduct
        } else {
            item = await this.create(dto)
        }
        return item
    }

    async getAll() {
        return this.productInCartRepository.findAll({include: {all: true}})
    }

    async delete(id) {
        const item = await this.getOnById(id)
        await item.destroy()
    }

    async update(id, dto: UpdateProductInCartDto) {
        const item = await this.getOnById(id)
        const deletedNuances = item.nuances.filter(nuance => dto.nuances.every(id => id !== nuance.id))
        await this.nuanceService.deleteFew(deletedNuances.map(item => item.id))
        await item.$remove('nuances', item.nuances.length ? item.nuances.map(item => item.id) : [])
        await item.$set('nuances', dto.nuances)
        // @ts-ignore
        await item.update(dto)
        return this.getOnById(id)
    }

    async getOne(id) {
        return this.productInCartRepository.findOne({where: {id}, include: {all: true}})
    }
}
