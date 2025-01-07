import { SendEmailService } from './send-email.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class SendEmailController {
    private readonly sendEmailService;
    constructor(sendEmailService: SendEmailService);
    sendEmail(createOrderDto: CreateOrderDto): Promise<[import("@sendgrid/mail").ClientResponse, {}]>;
}
