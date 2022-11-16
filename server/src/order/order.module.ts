import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Payment} from "../payment/models/payment.model";
import {Order} from "./models/order.model";
import {Delivery} from "../delivery/models/delivery.model";
import {Cart} from "../cart/models/cart.model";
import {User} from "../user/models/user.model";
import {CartModule} from "../cart/cart.module";
import {MailModule} from "../mail/mail.module";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [SequelizeModule.forFeature([Payment, Order, Delivery, Cart, User]), CartModule, MailModule]

})
export class OrderModule {}
