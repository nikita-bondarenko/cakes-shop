import {BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Order} from "../../order/models/order.model";
import {DeliveryOrder} from "./delivery-order.model";

interface DeliveryCreationAttrs {
    name: string;
    description: string;
    price: number;
}

@Table({tableName: 'deliveries'})
export class Delivery extends Model<Delivery, DeliveryCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;
    @HasMany(() => Order )
    orders: Order[];
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    price: number;

}