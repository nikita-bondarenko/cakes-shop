import {BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Order} from "../../order/models/order.model";
import {PaymentOrder} from "./payment-order.model";

interface PaymentCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'payments'})
export class Payment extends Model<Payment, PaymentCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;
    @HasMany(() => Order)
    orders: number[];
}