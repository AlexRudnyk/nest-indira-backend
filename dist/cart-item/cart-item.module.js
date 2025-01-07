"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModule = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("./cart-item.service");
const cart_item_controller_1 = require("./cart-item.controller");
const mongoose_1 = require("@nestjs/mongoose");
const cart_item_schema_1 = require("./schemas/cart-item.schema");
const auth_user_schema_1 = require("../auth/schemas/auth-user.schema");
let CartItemModule = class CartItemModule {
};
exports.CartItemModule = CartItemModule;
exports.CartItemModule = CartItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: cart_item_schema_1.CartItem.name, schema: cart_item_schema_1.CartItemSchema },
                { name: auth_user_schema_1.User.name, schema: auth_user_schema_1.UserSchema },
            ]),
        ],
        controllers: [cart_item_controller_1.CartItemController],
        providers: [cart_item_service_1.CartItemService],
    })
], CartItemModule);
//# sourceMappingURL=cart-item.module.js.map