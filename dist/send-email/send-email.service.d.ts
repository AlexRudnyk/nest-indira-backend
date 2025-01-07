import { OnModuleInit } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class SendEmailService implements OnModuleInit {
    onModuleInit(): void;
    sendEmail(createOrderDto: CreateOrderDto): Promise<[sgMail.ClientResponse, {}]>;
}
