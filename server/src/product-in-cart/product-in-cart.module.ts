import { Module } from '@nestjs/common';
import { ProductInCartController } from './product-in-cart.controller';
import { ProductInCartService } from './product-in-cart.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "../product/models/product.model";
import {Size} from "../size/models/size.model";
import {ProductInCart} from "./models/product-in-cart.model";
import {Cart} from "../cart/models/cart.model";
import {ProductModule} from "../product/product.module";
import {Nuance} from "../nuance/models/nuance.model";
import {NuanceModule} from "../nuance/nuance.module";
import {CartService} from "../cart/cart.service";
import {CartModule} from "../cart/cart.module";

@Module({
  controllers: [ProductInCartController],
  providers: [ProductInCartService],
  imports: [SequelizeModule.forFeature([Product, ProductInCart, Cart]), ProductModule, NuanceModule, CartModule],

})
export class ProductInCartModule {}
