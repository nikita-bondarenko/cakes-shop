import {arrTypes} from "./types";
import {NamePriceListProps} from "./components/product/name-price/NamePriceList";
import {NameOnlyListProps} from "./components/product/name-only/NameOnlyList";

export const BASE_URL_API = 'http://localhost:5000'


export const COMMENT_WEBSOCKET_SERVER_URL = BASE_URL_API

export const namePriceArr: NamePriceListProps[] = [
    {
        type: arrTypes.CREAM, title: "Крем", nameLabel: "Название крема", priceLabel: "Стоимость крема"
    },
    {
        type: arrTypes.SIZE, title: "Размер", nameLabel: "Описание размера", priceLabel: "Стоимость товара"
    },
    {
        type: arrTypes.NUANCE,
        title: "Специальное предложение",
        nameLabel: "Название специального предложения",
        priceLabel: "Стоимость специального предложения"
    }
]

export const nameOnlyArr: NameOnlyListProps[] = [
    {
        type: arrTypes.CAT, title: "Категория", label: "Название категории"
    },
    {
        type: arrTypes.CAKE, title: "Корж", label: "Название коржа"
    }
]

export const JWT_KEY = "ujk"

export enum socketTypes {
    NEW = "new_message",
    UPDATE = "update_message",
    DELETE = "delete_message",
    NEW_GLOBAL = "new_global_message",
    UPDATE_GLOBAL = "update_global_message",
    DELETE_GLOBAL = "delete_global_message"
}