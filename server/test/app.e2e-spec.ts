require("dotenv").config({ path: `./.development.env` })


import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import {AppModule} from "../src/app.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Picture} from "../src/picture/picture.model";
import {Order} from "../src/order/models/order.model";
import {Role} from "../src/role/models/role.model";
import {User} from "../src/user/models/user.model";
import {CommentModel} from "../src/comment/models/comment.model";
import {ProductCart} from "../src/cart/models/product-cart.model";
import {Delivery} from "../src/delivery/models/delivery.model";
import {Payment} from "../src/payment/models/payment.model";
import {Cart} from "../src/cart/models/cart.model";
import {Product} from "../src/product/models/product.model";
import {Category} from "../src/category/models/category.model";
import {Description} from "../src/description/models/description.model";
import {Variant} from "../src/variant/models/variant.model";
import {PaymentOrder} from "../src/payment/models/payment-order.model";
import {DeliveryOrder} from "../src/delivery/models/delivery-order.model";
import {RoleUser} from "../src/role/models/role-user.model";
import {CategoryProduct} from "../src/category/models/category-product.model";

describe('App', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRESS_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRESS_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [Picture, Order, Role, User, CommentModel, ProductCart, Delivery, Payment, Cart, Product, Category, Description, Variant, PaymentOrder, DeliveryOrder, RoleUser, CategoryProduct],
        autoLoadModels: true
      }), AppModule],
    })
        .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, async () => {
    await request(app.getHttpServer())
        .get('/products')
        .expect(200)

  });

  afterAll(async () => {
    await app.close();
  });
});