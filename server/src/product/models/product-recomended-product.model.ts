import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "./product.model";

@Table({tableName: 'product_product', createdAt: false, updatedAt: false})
export class ProductProduct extends Model<ProductProduct> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    recommendedProductId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}