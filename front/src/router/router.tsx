import HomePage from "../pages/home/HomePage";
import ProductCreate from "../pages/product/create/ProductCreate";
import ProductUpdate from "../pages/product/update/ProductUpdate";
import {arrTypes} from "../types";
import NotFoundPage from "../pages/NotFoundPage";
import CakeCatalog from "../pages/cake/CakeCatalog";
import CandyCatalog from "../pages/candy/CandyCatalog";
import Auth from "../pages/auth/Auth";
import Profile from "../pages/profile/Profile";
import CakePage from "../pages/cake/CakePage";
import CandyPage from "../pages/candy/CandyPage";
import ConstructorUpdate from "../pages/constructor/update/UpdateConstructor";
import CakeUpdate from "../pages/cake/CakeUpdate";
import CakeCreate from "../pages/cake/CakeCreate";
import Cart from "../pages/cart/Cart";
import CandyCreate from "../pages/candy/create/CandyCreate";
import CandyUpdate from "../pages/candy/update/CandyUpdate";
import Order from "../pages/order/Order";

export const routes = [

    {
        path: "/", element: <HomePage></HomePage>
    },
    {
        path: "/*", element: <NotFoundPage></NotFoundPage>
    },
    {
        path: "/not_found", element: <NotFoundPage></NotFoundPage>
    },
    {
        path: '/constructor/:id', element: <CandyPage></CandyPage>
    },
    {
        path: '/constructor/update/:id', element: <ConstructorUpdate />,
    },
    {
        path: '/cakes', element: <CakeCatalog/>
    },
    {
        path: '/cakes/:id', element: <CakePage></CakePage>
    },
    {
        path: '/cakes/create', element: <CakeCreate />
    },
    {
        path: "/cakes/update/:id", element: <CakeUpdate/>
    },
    {
        path: '/candies', element: <CandyCatalog/>
    },
    {
        path: '/candies/:id', element: <CandyPage></CandyPage>
    },
    {
        path: "/candies/create", element: <CandyCreate />
    },
    {
        path: "/candies/update/:id", element: <CandyUpdate />
    },
    {
        path: '/auth', element: <Auth></Auth>
    },
    {
        path: '/profile', element: <Profile></Profile>
    },
    {
        path: '/cart', element: <Cart></Cart>
    },
    {
        path: '/order', element: <Order></Order>

    }


]