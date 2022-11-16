import {forwardRef, Module} from '@nestjs/common';
import {CartService} from './cart.service';
import {CartController} from './cart.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "../order/models/order.model";
import {Cart} from "./models/cart.model";
import {User} from "../user/models/user.model";
import {UserModule} from "../user/user.module";

@Module({
    providers: [CartService],
    controllers: [CartController],
    imports: [SequelizeModule.forFeature([Order, Cart, User])],
    exports: [CartService]
})
export class CartModule {
}
