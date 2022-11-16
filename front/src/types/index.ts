import {Properties} from "csstype";

export type NameOnly = {
    price: number;
    id: number
    name: string;
}

export type CreateCategoryDto = NameOnly

export type Cake = NameOnly

export type CreateDescriptionDto = {
    id: number;
    title?: string;
    text?: string;
}

export type Picture = {
    value: string;
    id: number;
    main: boolean;
}

export type NamePrice = {
    id: number;
    name: string;
    price: number;
}
export type Cream = NamePrice

export type Size = NamePrice

export type Nuance = NamePrice

export interface Payload {
    type: "categories" | "descriptions" | "pictures" | "cakes" | "creams" | "sizes" | "nuances" | "properties" | "decorations"
    body: Size | Cream | CreateCategoryDto | CreateDescriptionDto | Picture | null | undefined
}

export interface SetPayload {
    type: "mainPicture"| "name"| "price",
    value: string | number
}

export type Decor = {
    id: number;
    name: string;
    price: number;
    picture: string;
}

export type Property = {
    id: number;
    name: string;
    description: string;
    value: string;
}

export enum arrTypes {
    CAT= "categories",
    PIC = "pictures",
    DESC= "descriptions",
    CAKE="cakes",
    CREAM = "creams",
    SIZE = "sizes",
    NUANCE = "nuances",
    DECOR = "decorations",
    NAME = "name",
    PRICE = "price",
    MAIN = "mainPicture",
    PROP = "properties",
    NAV = "isNav",
    MAIN_COLOR = "mainColor",
    CURSOR_COLOR = "cursorColor",
    ERROR = "errors",
    CONSTRUCTOR = "constructor",
    CANDY = "candy",
    PRODUCT = "product",
    DELETE_MODAL = "isDeleteModalOpen",
    DELETING_ID = "deletingProductId"
}

export interface Styles {
    [key: string]: Properties
}

export type Product = {
    id?: number
    name?: string;
    price?: number;
    categories?: NameOnly[];
    descriptions?: { title: string, text: string }[];
    pictures?: Picture[];
    cakes?: Cake[];
    creams?: Cream[];
    decorations?: Decor[];
    sizes?: Size[];
    nuances?: Nuance[];
    properties?: Property[];
    typeId?: number;
    ordered?: number;
}

export type User = {
    roles: {value: string}[]
    email: string;
    picture: string;
    name: string;
}

export type Comment = {
    id: number,
    userId: number;
    productId: number;
    text: string;
    user: User
}

export type GlobalComment = {
    id: number,
    userId: number;
    text: string;
    user: User
}

export type ProductInCart = {
    id?:number;
    productId: number;
    cartId: number;
    cakeId?: number;
    creamId?: number;
    decorations?: number[];
    nuances?:number[];
    sizeId?: number;
    comment?: string;
    quantity: number;
}

export type ProductInCartFromRepository = {
    price: number;
    id?:number;
    productId: number;
    cartId: number;
    cakeId?: number;
    cake: Cake;
    creamId?: number;
    cream: Cream;
    decorations?: Decor[];
    nuances?:Nuance[];
    sizeId?: number;
    size: Size;
    comment?: string;
    quantity: number;
    product: Product;
}

export type Cart = {
    userId: number;
    productsInCart: ProductInCartFromRepository[];
    price: number;
    quantity: number;
    orderId: number;
}

export type Order = {
    userId: number;
    cartId: number;
    finalPrice?: number;
    address?: string;
    description?: string;
}