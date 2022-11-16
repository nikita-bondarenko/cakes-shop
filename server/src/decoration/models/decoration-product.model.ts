
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {Decoration} from "./decoration.model";

@Table({tableName: 'decoration_product', createdAt: false, updatedAt: false})
export class DecorationProduct extends Model<DecorationProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Decoration)
    @Column({type: DataType.INTEGER})
    decorationId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}