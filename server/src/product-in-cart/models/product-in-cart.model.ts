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
import {Cart} from "../../cart/models/cart.model";
import {Product} from "../../product/models/product.model";
import {NuanceProductInCart} from "./nuance-product-in-cart.model";
import {IsNumber} from "class-validator";
import {DecorationProductInCart} from "../../decoration/models/decoration-product-in-cart.model";

interface ProductInCartCreationAttrs {
    productId: number;
    cartId: number;
    cakeId: number;
    creamId: number;
    sizeId: number;
    comment?: string;
    quantity: number;
    price: number;
}

@Table({tableName: 'products_in_cart'})
export class ProductInCart extends Model<ProductInCart, ProductInCartCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    productId: number;
    @BelongsTo(() => Product)
    product: Product;

    @ForeignKey(() => Cart)
    @Column({type: DataType.INTEGER, allowNull: false})
    cartId: number;

    @BelongsTo(() => Cart)
    cart: Cart;

    @ForeignKey(() => Cake)
    @Column({type: DataType.INTEGER, allowNull: true})
    cakeId: number;

    @BelongsTo(() => Cake)
    cake: Cake;

    @ForeignKey(() => Cream)
    @Column({type: DataType.INTEGER, allowNull: true})
    creamId: number;

    @BelongsTo(() => Cream)
    cream: Cream;

    @BelongsToMany(() => Decoration, () => DecorationProductInCart)
    decorations: Decoration[];

    @ForeignKey(() => Size)
    @Column({type: DataType.INTEGER, allowNull: true})
    sizeId

    @BelongsTo(() => Size)
    size: Size;

    @BelongsToMany(() => Nuance, () => NuanceProductInCart)
    nuances: Nuance[]

    @Column({type: DataType.INTEGER, defaultValue: 1, allowNull: false})
    quantity: number;

    @Column({type: DataType.INTEGER, defaultValue: 0, allowNull: false})
    price: number;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string;
}