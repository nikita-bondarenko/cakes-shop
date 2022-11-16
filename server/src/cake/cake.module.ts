import {forwardRef, Module} from '@nestjs/common';
import { CakeController } from './cake.controller';
import { CakeService } from './cake.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Cake} from "./models/cake.model";
import {Product} from "../product/models/product.model";
import {ProductModule} from "../product/product.module";
import {ProductService} from "../product/product.service";

@Module({
  controllers: [CakeController],
  providers: [CakeService],
  imports: [SequelizeModule.forFeature([Cake,Product])],
  exports: [CakeService]
})
export class CakeModule {}
