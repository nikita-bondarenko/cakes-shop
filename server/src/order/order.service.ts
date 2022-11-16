import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "./models/order.model";
import {Op} from "sequelize";
import {User} from "../user/models/user.model";
import {CreateOrderDto} from "./dto/CreateOrderDto";
import {Cart} from "../cart/models/cart.model";
import {CartService} from "../cart/cart.service";
import {UpdateOrderDto} from "./dto/UpdateOrderDto";
import {ProductInCart} from "../product-in-cart/models/product-in-cart.model";
import {MailService} from "../mail/mail.service";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                private cartService: CartService,
                private mailService: MailService) {
    }

    async getAll(offset: number = 0, limit: number = 10): Promise<{ items: Order[], pagination: { count: number, limit: number, offset: number } }> {
        const items = await this.orderRepository.findAll({
            include: {all: true},
            offset: offset,
            limit: limit,
            order: [['updatedAt', 'DESC']]
        })

        const count = await this.orderRepository.count()
        return {
            items,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    async getOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({
            where: {id}, include: [{
                model: User,
                include: [{
                    model: Cart
                }]
            },
                {
                    model: Cart,
                    include: [{
                        model: ProductInCart
                    }, {
                        model: User
                    }]
                }]
        })
    }

    async search(query: string = '', offset: number = 0, limit: number = 10): Promise<{ items: Order[], pagination: { count: number, limit: number, offset: number } }> {
        const items = await this.orderRepository.findAll({
            include: {
                model: User,
                where: {email: {[Op.iLike]: `%${query}%`}}
            },
            order: [['updatedAt', 'DESC']]
        })

        const count = await this.orderRepository.count()

        return {
            items,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    async create(dto: CreateOrderDto) {
        const item = await this.orderRepository.create(dto)
        await this.cartService.orderCart(dto.cartId, item.id, dto.userId)
        const order = await this.getOne(item.id)
        const cart = await this.cartService.findOneById(dto.cartId)
        await this.mailService.sendOrderSignal(order, cart)
        return order
    }

    async update(id: number, dto: UpdateOrderDto) {
        const item = await this.getOne(id)
        // @ts-ignore
        await item.update(dto)
        return this.getOne(id)
    }

    async delete(id) {
        const item = await this.getOne(id)
        await item.destroy()
    }

}
