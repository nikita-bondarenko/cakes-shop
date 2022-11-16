import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';
import {User} from "../user/models/user.model";
import {CreateUserDto} from "../user/dto/CreateUserDto";
import {Cart} from "../cart/models/cart.model";
import {ProductInCart} from "../product-in-cart/models/product-in-cart.model";
import {Order} from "../order/models/order.model";
import {UserService} from "../user/user.service";

export const listHelper = (context: ProductInCart[], options) => {
    const res = context.map(item =>
`<li style="margin-bottom: 20px">
<h3 style="margin-bottom: 0px">${item.product.name}</h3>
${item.cake ? 
`<div><strong>Корж:</strong> ${item.cake.name}</div>` : ''}
${item.cream ? 
`<div><strong>Крем:</strong> ${item.cream.name}</div>` : ''}
${item.size ? 
`<div><strong>Размер:</strong> ${item.size.name}</div>` : ''}
${item.nuances.length ? `
<div><strong>Нюансы:</strong></div>
<ul>
${item.nuances.map(nuance => 
`<li>${nuance.name}</li>`).join('')}
</ul>` : ''}
${item.decorations.length ? `
<div><strong>Украшения:</strong></div>
<ul>
${item.decorations.map(decor =>
    `<li>${decor.name}</li>`).join('')}
</ul>` : ''}
${item.product.properties.length ? `
${item.product.properties.map(property =>
    `<div><strong>${property.name}:</strong>${property.value}</div>`).join('')}` : ''}
<div><strong>Количество:</strong>${item.quantity}</div>
<div><strong>Стоимость:</strong>${item.price}x${item.quantity}=<strong>${item.price * item.quantity}</strong></div>
</li>`
    ).join('');
    return `<ol>${res}</ol>`;
}

export const commentHelper = (context) => {
    return context ? `
    <h3 style="margin-bottom: 0px">Пожелания к заказу:</h3>
    <p>${context}</p>
    ` : ''
}

export const addressHelper = (context) => {
    return context ? `
    <h3 style="margin-bottom: 0px">Адрес доставки:</h3>
    <p>${context}</p>
    ` : ''
}

export const phoneHelper = (context) => {
    return context ? `
    <div><strong>Телефон:</strong> context</div>
    ` : ''
}

export const quantityHelper = (context: ProductInCart[], options) => {
    const res = context.reduce((acc, item) => acc + item.quantity, 0)

    return res;
}


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private userService: UserService) {
    }

    async sendUserConfirmation(email: string, token: string) {
        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Добро пожаловать в магазин тортиков! Пожалуйста, подтвердите свою почту.',
            template: './confirmation.hbs', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                token
            },
        });
    }

    async sendOrderSignal(order: Order, cart: Cart) {

        const admins = await this.userService.findAdmins()
        
        await Promise.all(admins.map(admin => this.mailerService.sendMail({
            to: admin.email,
            subject: "У вас новый заказ!",
            template: './orderAdmin',
            context: {
                email: order.user.email,
                price: order.finalPrice,
                address: order.address,
                description: order.description,
                cart,
                order
            }
        })))

        await this.mailerService.sendMail({
            to: order.user.email,
            subject: "Вы оставили заказ на нашем сайте.",
            template: './orderClient',
            context: {
                email: order.user.email,
                price: order.finalPrice,
                address: order.address,
                description: order.description,
                cart,
                order
            }
        })
    }

    async sendUserData(email: string, password: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Вы успешно зарегистрировались!",
            template: './userData',
            context: {
                email,
                password
            }
        })
    }
}
