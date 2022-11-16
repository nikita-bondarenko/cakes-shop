import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {Product} from "../../product/models/product.model";
import {Order} from "../../order/models/order.model";
import {ProductCart} from "./product-cart.model";
import {ProductInCart} from "../../product-in-cart/models/product-in-cart.model";

interface CartCreationAttrs {
    userId: number;
    productsInCart: ProductInCart[];
    price: number;
    quantity: number;
    orderId: number;
}

@Table({tableName: 'carts'})
export class Cart extends Model<Cart, CartCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;

    @BelongsTo(() => Order)
    order: Order

    @HasMany(() => ProductInCart, )
    productsInCart: ProductInCart[];

    @Column({type: DataType.INTEGER})
    price: number;

    @Column({type: DataType.INTEGER,allowNull: false, defaultValue: 0 })
    quantity: number;
}