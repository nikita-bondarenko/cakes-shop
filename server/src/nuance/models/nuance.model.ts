import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Product} from "../../product/models/product.model";
import {NuanceProduct} from "./nuance-product.model";
import {ProductInCart} from "../../product-in-cart/models/product-in-cart.model";
import {NuanceProductInCart} from "../../product-in-cart/models/nuance-product-in-cart.model";

interface NuanceCreationAttrs {
    name: string;
    price: number;
}

@Table({tableName: 'nuance'})
export class Nuance extends Model<Nuance, NuanceCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    price: number;

    @BelongsToMany(() => Product, () => NuanceProduct)
    products: Product[];

    @BelongsToMany(() => ProductInCart, () => NuanceProductInCart)
    productsInCart: ProductInCart[];
}