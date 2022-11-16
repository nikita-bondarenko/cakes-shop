import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {Cart} from "../../cart/models/cart.model";
import {Payment} from "../../payment/models/payment.model";
import {Delivery} from "../../delivery/models/delivery.model";
import {DeliveryOrder} from "../../delivery/models/delivery-order.model";
import {PaymentOrder} from "../../payment/models/payment-order.model";

interface OrderCreationAttrs {
    payment: Payment;
    userId: number;
    delivery: Delivery;
    cart: Cart;
    finalPrice: number;
    address: string;
    description: string;
}

@Table({tableName: '/orders'})
export class Order extends Model<Order, OrderCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: true})
    userId: number;
    @BelongsTo(() => User)
    user: User
    @HasOne(() => Cart)
    cart: Cart;
    @ForeignKey(() => Delivery)
    @Column({type: DataType.INTEGER, allowNull: true})
    deliveryId: number;
    @BelongsTo(() => Delivery )
    delivery: Delivery;
    @ForeignKey(() => Payment)
    @Column({type: DataType.INTEGER, allowNull: true})
    paymentId: number
    @BelongsTo(() => Payment)
    payment: Payment;
    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    finalPrice: number;
    @Column({type: DataType.STRING})
    address: number;
    @Column({type: DataType.STRING})
    description: string;
}