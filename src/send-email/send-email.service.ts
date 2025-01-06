import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { CreateOrderDto } from './dto/create-order.dto';

console.log('SG_MAIL', sgMail);

@Injectable()
export class SendEmailService implements OnModuleInit {
  onModuleInit() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not set in environment variables');
    }
    sgMail.setApiKey(apiKey);
  }

  async sendEmail(createOrderDto: CreateOrderDto) {
    const msg = {
      to: process.env.EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Indira new order',
      html: `
      <div>
        <h2>Customer</h2>
        <p><strong>Name:</strong> ${createOrderDto.name}</p>
        <p><strong>Phone:</strong> ${createOrderDto.phone}</p>
        <p><strong>Email:</strong> ${createOrderDto.email}</p>
        <h2>Order</h2>
        <ul>
          ${createOrderDto.products
            .map(
              (
                item,
              ) => `<li style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 24px">
        <p><strong>Product title:</strong> ${item.title}</p>
        <p><strong>Price:</strong> ${item.price} UAH</p>
        <p><strong>Ordered quantity:</strong> ${item.quantity} items</p>
          </li>`,
            )
            .join('')}
        </ul>        
        <h2>Total Sum</h2>
        <p>${createOrderDto.totalSum} UAH</p>
      </div>
        `,
    };

    try {
      const response = await sgMail.send(msg);
      return response;
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error);
      throw error;
    }
  }
}
