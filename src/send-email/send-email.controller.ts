import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Post()
  async sendEmail(@Body(new ValidationPipe()) createOrderDto: CreateOrderDto) {
    return this.sendEmailService.sendEmail(createOrderDto);
  }
}
