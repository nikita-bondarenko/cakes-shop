
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Decoration} from "./decoration.model";
import {ProductInCart} from "../../product-in-cart/models/product-in-cart.model";

@Table({tableName: 'decoration_product_in_cart', createdAt: false, updatedAt: false})
export class DecorationProductInCart extends Model<DecorationProductInCart> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Decoration)
    @Column({type: DataType.INTEGER})
    decorationId: number;

    @ForeignKey(() => ProductInCart)
    @Column({type: DataType.INTEGER})
    productInCartId: number;
}