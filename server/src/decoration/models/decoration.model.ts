import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {DecorationProduct} from "./decoration-product.model";
import {Product} from "../../product/models/product.model";
import {ProductInCart} from "../../product-in-cart/models/product-in-cart.model";
import {DecorationProductInCart} from "./decoration-product-in-cart.model";

interface DecorationCreationAttrs {
    name: string;
    price: number;
    picture: string
}

@Table({tableName: 'decorations'})
export class Decoration extends Model<Decoration, DecorationCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: true})
    picture: string;

    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    price: number;

    @BelongsToMany(() => Product, () => DecorationProduct)
    products: Product[];

    @BelongsToMany(() => ProductInCart, () => DecorationProductInCart)
    productsInCart: ProductInCart[]
}