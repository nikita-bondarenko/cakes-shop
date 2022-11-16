
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Order} from "../../order/models/order.model";
import {Delivery} from "./delivery.model";

@Table({tableName: 'delivery_order', createdAt: false, updatedAt: false})
export class DeliveryOrder extends Model<DeliveryOrder> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Delivery)
    @Column({type: DataType.INTEGER})
    deliveryId: number;

    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;
}