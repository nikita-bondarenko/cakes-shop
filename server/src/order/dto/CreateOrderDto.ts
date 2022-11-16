export class CreateOrderDto {
paymentId?: number;
userId: number;
deliveryId?: number;
cartId: number;
finalPrice?: number;
address?: string;
date?: string;
description?: string;
}