"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const common_1 = require("@nestjs/common");
const mail_1 = __importDefault(require("@sendgrid/mail"));
let SendEmailService = class SendEmailService {
    onModuleInit() {
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY is not set in environment variables');
        }
        mail_1.default.setApiKey(apiKey);
    }
    async sendEmail(createOrderDto) {
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
                .map((item) => `<li style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 24px">
        <p><strong>Product title:</strong> ${item.title}</p>
        <p><strong>Price:</strong> ${item.price} UAH</p>
        <p><strong>Ordered quantity:</strong> ${item.quantity} items</p>
          </li>`)
                .join('')}
        </ul>        
        <h2>Total Sum</h2>
        <p>${createOrderDto.totalSum} UAH</p>
      </div>
        `,
        };
        try {
            const response = await mail_1.default.send(msg);
            return response;
        }
        catch (error) {
            console.error('Error sending email:', error.response?.body || error);
            throw error;
        }
    }
};
exports.SendEmailService = SendEmailService;
exports.SendEmailService = SendEmailService = __decorate([
    (0, common_1.Injectable)()
], SendEmailService);
//# sourceMappingURL=send-email.service.js.map