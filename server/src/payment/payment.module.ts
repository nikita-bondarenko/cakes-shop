import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Payment} from "./models/payment.model";
import {Order} from "../order/models/order.model";

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [SequelizeModule.forFeature([Payment, Order])]
})
export class PaymentModule {}
