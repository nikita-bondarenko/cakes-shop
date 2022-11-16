import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ProductInCart} from "./product-in-cart.model";
import {Nuance} from "../../nuance/models/nuance.model";
import {Product} from "../../product/models/product.model";

@Table({tableName: 'product_product_in_cart'})
export class ProductProductInCart extends Model<ProductProductInCart> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => ProductInCart)
    @Column({type: DataType.INTEGER})
    productInCartId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}