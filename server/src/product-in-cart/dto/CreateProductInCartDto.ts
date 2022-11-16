import {Category} from "../../category/models/category.model";
import {Description} from "../../description/models/description.model";
import {CommentModel} from "../../comment/models/comment.model";
import {Picture} from "../../picture/picture.model";
import {Cake} from "../../cake/models/cake.model";
import {Cream} from "../../cream/models/cream.model";
import {Decoration} from "../../decoration/models/decoration.model";
import {Size} from "../../size/models/size.model";
import {Nuance} from "../../nuance/models/nuance.model";
import {Property} from "../../property/models/property.model";
import {IsArray, IsNumber} from "class-validator";

export class CreateProductInCartDto {
    productId: number;
    cartId: number;
    cakeId: number;
    creamId: number;
    decorations?: number[];
    sizeId: number;
    nuances?: number[];
    comment?: string;
    quantity: number;
    price?: number;
}