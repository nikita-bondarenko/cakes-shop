import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {User} from "../../user/models/user.model";
import {Product} from "../../product/models/product.model";
import {Order} from "../../order/models/order.model";
import {CategoryProduct} from "./category-product.model";

interface CategoryCreationAttrs {
    name: string;
    products: Product[];
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
    @BelongsToMany(() => Product, () => CategoryProduct)
    products: Product[];

}