import {forwardRef, Module} from '@nestjs/common';
import {addressHelper, commentHelper, listHelper, MailService, phoneHelper, quantityHelper} from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import * as path from "path";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {ConfigModule} from "@nestjs/config";
import {ProductInCart} from "../product-in-cart/models/product-in-cart.model";
import {allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";


@Module({
    providers: [MailService],
    imports: [forwardRef(() => UserModule),ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
    }), MailerModule.forRoot({
        transport: process.env.MAIL_TRANSPORT,
        defaults: {
            from: process.env.MAIL_FROM,
        },
        template: {
            dir: path.join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter({'list': listHelper, 'quantity': quantityHelper, 'comment': commentHelper, 'phone': phoneHelper, 'address': addressHelper}), // or new PugAdapter() or new EjsAdapter()
            options: {
                strict: true,
            },
        },
    }) ],
    exports: [MailService]
})
export class MailModule {
}
