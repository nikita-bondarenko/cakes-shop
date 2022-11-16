import { Module } from '@nestjs/common';
import { NuanceController } from './nuance.controller';
import { NuanceService } from './nuance.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Nuance} from "./models/nuance.model";
import {Product} from "../product/models/product.model";
import {ProductInCart} from "../product-in-cart/models/product-in-cart.model";

@Module({
  controllers: [NuanceController],
  providers: [NuanceService],
  imports:[SequelizeModule.forFeature([Nuance, Product, ProductInCart])],
  exports: [NuanceService]
})
export class NuanceModule {}
