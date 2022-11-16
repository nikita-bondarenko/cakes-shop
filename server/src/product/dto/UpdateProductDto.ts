import {Category} from "../../category/models/category.model";
import {Description} from "../../description/models/description.model";
import {Picture} from "../../picture/picture.model";
import {CommentModel} from "../../comment/models/comment.model";
import {Cake} from "../../cake/models/cake.model";
import {Cream} from "../../cream/models/cream.model";
import {Decoration} from "../../decoration/models/decoration.model";
import {Size} from "../../size/models/size.model";
import {Nuance} from "../../nuance/models/nuance.model";
import {Property} from "../../property/models/property.model";

export class UpdateProductDto {
    name?: string;
    price?: number;
    categories?: Category[];
    descriptions?: Description[];
    comments?: CommentModel[];
    pictures?: Picture[];
    cakes?: Cake[];
    creams?: Cream[];
    decorations?: Decoration[];
    sizes?: Size[];
    nuances?: Nuance[];
    properties?: Property[];
    typeId?: number;
    ordered?: number;
}