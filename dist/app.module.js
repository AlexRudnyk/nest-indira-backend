"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const products_module_1 = require("./products/products.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const comments_module_1 = require("./comments/comments.module");
const send_email_module_1 = require("./send-email/send-email.module");
const cart_item_module_1 = require("./cart-item/cart-item.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'auth/register', method: common_1.RequestMethod.POST }, { path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'products', method: common_1.RequestMethod.GET }, { path: 'products/:id', method: common_1.RequestMethod.GET }, { path: 'order', method: common_1.RequestMethod.POST }, { path: 'comments/:id', method: common_1.RequestMethod.GET })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_HOST),
            products_module_1.ProductsModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            send_email_module_1.SendEmailModule,
            cart_item_module_1.CartItemModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map