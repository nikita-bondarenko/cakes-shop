import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cart} from "./models/cart.model";
import {ProductInCart} from "../product-in-cart/models/product-in-cart.model";
import {Nuance} from "../nuance/models/nuance.model";
import {UserService} from "../user/user.service";
import {User} from "../user/models/user.model";
import {Decoration} from "../decoration/models/decoration.model";
import {Size} from "../size/models/size.model";
import {Cream} from "../cream/models/cream.model";
import {Cake} from "../cake/models/cake.model";
import {Product} from "../product/models/product.model";
import {Picture} from "../picture/picture.model";
import {Property} from "../property/models/property.model";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart) private cartRepository: typeof Cart, @InjectModel(User) private userRepository: typeof User
    ) {
    }

    async create(userId) {
        const dto = {
            userId,
            productsInCart: [],

        }
        const cart = await this.cartRepository.create(dto)
        return cart
    }

    async findOneById(id) {
        const cart = await this.cartRepository.findOne({
            where: {id},
            include: [{
                model: ProductInCart,
                include: [
                    {
                        model: Nuance
                    },
                    {
                        model: Decoration
                    },
                    {
                        model: Cream
                    },
                    {
                        model: Size
                    },
                    {
                        model: Cake
                    },
                    {
                        model: Product,
                        include: [
                            {model: Picture},
                            {model: Property}
                        ]
                    }
                ]
            }]
        })
        return cart
    }

    async getAll(offset: number = 0, limit: number = 10): Promise<{ items: Cart[], pagination: { count: number, limit: number, offset: number } }> {
        const {rows, count} = await this.cartRepository.findAndCountAll({
            include: ProductInCart,
            offset: offset,
            limit: limit,
            order: [['price', 'ASC']]
        })
        return {
            items: rows,
            pagination: {
                count,
                limit,
                offset
            }
        }
    }

    async orderCart(cartId: number, orderId: number, userId: number) {
        // const cart = await this.findOneById(cartId)
        // console.log('orderId', orderId)
        // await cart.update({orderId})
        const newCart = await this.create(userId)
        const user = await this.userRepository.findOne({where: {id: userId}, include: {all: true}})
        await user.update({cartId: newCart.id})
    }

}
