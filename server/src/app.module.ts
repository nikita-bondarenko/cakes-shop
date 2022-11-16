import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {RoleModule} from './role/role.module';
import {CommentModule} from './comment/comment.module';
import {ProductModule} from './product/product.module';
import {OrderModule} from './order/order.module';
import {CartModule} from './cart/cart.module';
import {DescriptionModule} from './description/description.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {DeliveryModule} from './delivery/delivery.module';
import {PaymentModule} from './payment/payment.module';
import {CategoryModule} from './category/category.module';
import * as path from "path";
import {Order} from "./order/models/order.model";
import {User} from "./user/models/user.model";
import {CommentModel} from "./comment/models/comment.model";
import {Delivery} from "./delivery/models/delivery.model";
import {Payment} from "./payment/models/payment.model";
import {Cart} from "./cart/models/cart.model";
import {Product} from "./product/models/product.model";
import {Category} from "./category/models/category.model";
import {Description} from "./description/models/description.model";
import {PaymentOrder} from "./payment/models/payment-order.model";
import {DeliveryOrder} from "./delivery/models/delivery-order.model";
import {RoleUser} from "./role/models/role-user.model";
import {CategoryProduct} from "./category/models/category-product.model";
import {Role} from "./role/models/role.model";
import {ProductCart} from "./cart/models/product-cart.model";
import {PictureModule} from './picture/picture.module';
import {Picture} from "./picture/picture.model";
import {CakeModule} from './cake/cake.module';
import {CreamModule} from './cream/cream.module';
import {DecorationModule} from './decoration/decoration.module';
import {SizeModule} from './size/size.module';
import {NuanceModule} from './nuance/nuance.module';
import {ProductInCartModule} from './product-in-cart/product-in-cart.module';
import {TypeModule} from './type/type.module';
import {PropertyModule} from './property/property.module';
import {ProductProduct} from "./product/models/product-recomended-product.model";
import {ProductInCart} from "./product-in-cart/models/product-in-cart.model";
import {Cake} from "./cake/models/cake.model";
import {CakeProduct} from "./cake/models/cake-product.model";
import {Type} from "./type/type.model";
import {Size} from "./size/models/size.model";
import {SizeProduct} from "./size/models/size-product.model";
import {Decoration} from "./decoration/models/decoration.model";
import {DecorationProduct} from "./decoration/models/decoration-product.model";
import {CreamProduct} from "./cream/models/cream-prodict.model";
import {Cream} from "./cream/models/cream.model";
import {Nuance} from "./nuance/models/nuance.model";
import {NuanceProductInCart} from "./product-in-cart/models/nuance-product-in-cart.model";
import {NuanceProduct} from "./nuance/models/nuance-product.model";
import {PropertyProduct} from "./property/models/property-product.model";
import {Property} from "./property/models/property.model";
import {FileModule} from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthModule} from './auth/auth.module';
import {MailModule} from './mail/mail.module';
import {ProductProductInCart} from "./product-in-cart/models/product-product-in-cart.model";
import { GlobalCommentModule } from './global-comment/global-comment.module';
import {GlobalCommentModel} from "./global-comment/models/global-comment.model";
import { CommentGateway } from './comment.gateway';
import {DecorationProductInCart} from "./decoration/models/decoration-product-in-cart.model";

@Module({
    imports: [ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
    }), ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
    }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DBHOST,
            port: 5432,
            username: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME,
            models: [GlobalCommentModel, Property, PropertyProduct, ProductProduct, Cake, CakeProduct, Type, Size, SizeProduct, Decoration, DecorationProduct, Nuance, NuanceProductInCart, NuanceProduct, Cream, CreamProduct, ProductInCart, Picture, Order, Role, User, CommentModel, ProductCart, Delivery, Payment, Cart, Product, Category, Description, PaymentOrder, DeliveryOrder, RoleUser, CategoryProduct, ProductProductInCart, DecorationProductInCart],
            autoLoadModels: true
        }), AuthModule, MailModule, UserModule, RoleModule, CommentModule, ProductModule, OrderModule, CartModule, DescriptionModule, DeliveryModule, PaymentModule, CategoryModule, PictureModule, CakeModule, CreamModule, DecorationModule, SizeModule, NuanceModule, ProductInCartModule, TypeModule, PropertyModule, FileModule, AuthModule, MailModule, GlobalCommentModule],
    providers: [CommentGateway]
})
export class AppModule {
}
