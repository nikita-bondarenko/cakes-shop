
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Payment} from "./payment.model";
import {Order} from "../../order/models/order.model";

@Table({tableName: 'payment_order', createdAt: false, updatedAt: false})
export class PaymentOrder extends Model<PaymentOrder> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Payment)
    @Column({type: DataType.INTEGER})
    paymentId: number;

    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;
}