
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {Size} from "./size.model";

@Table({tableName: 'size_product', createdAt: false, updatedAt: false})
export class SizeProduct extends Model<SizeProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Size)
    @Column({type: DataType.INTEGER})
    creamId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}