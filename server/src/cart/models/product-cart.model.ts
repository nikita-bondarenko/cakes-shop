import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {Cart} from "./cart.model";
@Table({tableName: 'product_cart'})
export class ProductCart extends Model<ProductCart> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Cart)
    @Column({type: DataType.INTEGER})
    cartId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}