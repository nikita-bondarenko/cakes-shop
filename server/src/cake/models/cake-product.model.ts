
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {Cake} from "./cake.model";

@Table({tableName: 'cake_product', createdAt: false, updatedAt: false})
export class CakeProduct extends Model<CakeProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Cake)
    @Column({type: DataType.INTEGER})
    cakeId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}