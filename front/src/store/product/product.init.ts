import {id} from "../../hooks/random";

const categoryInit = () => ({
    name: '',
    id: id()
})

const descriptionInit = () => ({
    title: '',
    text: '',
    id: id()
})

const pictureInit = () => ({
    value: '',
    id: id(),
    main: false,
})


const namePriceInit = () => ({
    name: '',
    price: 0,
    id: id()
})

const decorInit = () => ({
    id: id(),
    name: '',
    price: 0,
    picture: ''

})

const propInit = () => ({
    id: id(),
    name: '',
    value: ''
})

export const init = {
    categories: categoryInit,
    descriptions: descriptionInit,
    pictures: pictureInit,
    cakes: categoryInit,
    creams: namePriceInit,
    sizes: namePriceInit,
    nuances: namePriceInit,
    decorations: decorInit,
    properties: propInit
}