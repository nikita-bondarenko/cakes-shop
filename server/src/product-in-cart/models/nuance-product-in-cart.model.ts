import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ProductInCart} from "./product-in-cart.model";
import {Nuance} from "../../nuance/models/nuance.model";

@Table({tableName: 'nuance_product_in_cart', createdAt: false, updatedAt: false})
export class NuanceProductInCart extends Model<NuanceProductInCart> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => ProductInCart)
    @Column({type: DataType.INTEGER})
    productInCartId: number;

    @ForeignKey(() => Nuance)
    @Column({type: DataType.INTEGER})
    nuanceId: number;
}