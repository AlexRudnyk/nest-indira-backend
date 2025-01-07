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
exports.CartItemController = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("./cart-item.service");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const mongoose_1 = require("mongoose");
let CartItemController = class CartItemController {
    constructor(cartItemService) {
        this.cartItemService = cartItemService;
    }
    addToCart(req, addToCartDto) {
        const user = req.user;
        return this.cartItemService.addToCart(addToCartDto, user);
    }
    increment(id, req) {
        const user = req.user;
        return this.cartItemService.increment(id, user);
    }
    decrement(id, req) {
        const user = req.user;
        return this.cartItemService.decrement(id, user);
    }
    removeFromCart(id, req) {
        const user = req.user;
        return this.cartItemService.removeFromCart(id, user);
    }
    clearCart(req) {
        const user = req.user;
        return this.cartItemService.clearCart(user);
    }
};
exports.CartItemController = CartItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Post)('increment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "increment", null);
__decorate([
    (0, common_1.Post)('decrement/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "decrement", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Post)('clear'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "clearCart", null);
exports.CartItemController = CartItemController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_item_service_1.CartItemService])
], CartItemController);
//# sourceMappingURL=cart-item.controller.js.map