import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType, ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {CommentModel} from "../../comment/models/comment.model";
import {Category} from "../../category/models/category.model";
import {CategoryProduct} from "../../category/models/category-product.model";
import {Description} from "../../description/models/description.model";
import {Picture} from "../../picture/picture.model";
import {Nuance} from "../../nuance/models/nuance.model";
import {NuanceProduct} from "../../nuance/models/nuance-product.model";
import {CakeProduct} from "../../cake/models/cake-product.model";
import {SizeProduct} from "../../size/models/size-product.model";
import {Size} from "../../size/models/size.model";
import {Cake} from "../../cake/models/cake.model";
import {Cream} from "../../cream/models/cream.model";
import {CreamProduct} from "../../cream/models/cream-prodict.model";
import {Decoration} from "../../decoration/models/decoration.model";
import {DecorationProduct} from "../../decoration/models/decoration-product.model";
import {Property} from "../../property/models/property.model";
import {PropertyProduct} from "../../property/models/property-product.model";
import {Type} from "../../type/type.model";
import {ProductProduct} from "./product-recomended-product.model";
import {ProductInCart} from "../../product-in-cart/models/product-in-cart.model";
import {ProductProductInCart} from "../../product-in-cart/models/product-product-in-cart.model";

interface ProductCreationAttrs {
    name: string;
    price: number;
    categories: Category[];
    descriptions: Description[];
    comments: CommentModel[];
    pictures: Picture[];
    cakes: Cake[];
    creams: Cream[];
    decorations: Decoration[];
    sizes: Size[];
    nuances: Nuance[];
    properties: Property[];
    typeId: number;
    type: Type;
    ordered: number;
}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    price: number;

    @BelongsToMany(() => Category, () => CategoryProduct)
    categories: Category[];

    @HasMany(() => Description)
    descriptions: Description[];

    @HasMany(() => CommentModel)
    comments: CommentModel[]

    @HasMany(() => Picture)
    pictures: Picture[];

    @BelongsToMany(() => Cake, () => CakeProduct)
    cakes: Cake[];

    @BelongsToMany(() => Cream, () => CreamProduct)
    creams: Cream[];

    @BelongsToMany(() => Decoration, () => DecorationProduct)
    decorations: Decoration[];

    @BelongsToMany(() => Size, () => SizeProduct)
    sizes: Size[];

    @BelongsToMany(() => Nuance, () => NuanceProduct)
    nuances: Nuance[];

    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    ordered: number;

    @BelongsToMany(() => Property, () => PropertyProduct)
    properties: Property[];

    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER})
    typeId: number;

    @BelongsTo(() => Type)
    type: Type;

    @BelongsToMany(() => Product, () => ProductProduct)
    recommendations: Product[];

    @HasMany(() => ProductInCart)
    productsInCart: ProductInCart[]
}