
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {Cream} from "./cream.model";

@Table({tableName: 'cream_product', createdAt: false, updatedAt: false})
export class CreamProduct extends Model<CreamProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Cream)
    @Column({type: DataType.INTEGER})
    creamId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}