"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailController = void 0;
const common_1 = require("@nestjs/common");
const send_email_service_1 = require("./send-email.service");
const create_order_dto_1 = require("./dto/create-order.dto");
let SendEmailController = class SendEmailController {
    constructor(sendEmailService) {
        this.sendEmailService = sendEmailService;
    }
    async sendEmail(createOrderDto) {
        return this.sendEmailService.sendEmail(createOrderDto);
    }
};
exports.SendEmailController = SendEmailController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], SendEmailController.prototype, "sendEmail", null);
exports.SendEmailController = SendEmailController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [send_email_service_1.SendEmailService])
], SendEmailController);
//# sourceMappingURL=send-email.controller.js.map