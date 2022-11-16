import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "../order/models/order.model";
import {Delivery} from "./models/delivery.model";

@Module({
  providers: [DeliveryService],
  controllers: [DeliveryController],
  imports: [SequelizeModule.forFeature([Order, Delivery])]

})
export class DeliveryModule {}
