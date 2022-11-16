import {IsNumber} from "class-validator";
import {Nuance} from "../../nuance/models/nuance.model";

export class UpdateProductInCartDto {
    productId: number;
    cartId: number;
    cakeId: number;
    creamId: number;
    decorations?: number[];
    sizeId: number;
    nuances?: number[];
    comment?: string;
    quantity: number;
}