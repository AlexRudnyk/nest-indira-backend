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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_item_schema_1 = require("./schemas/cart-item.schema");
const mongoose_2 = require("mongoose");
const auth_user_schema_1 = require("../auth/schemas/auth-user.schema");
let CartItemService = class CartItemService {
    constructor(cartItemModel, userModel) {
        this.cartItemModel = cartItemModel;
        this.userModel = userModel;
    }
    async addToCart(addToCartDto, user) {
        const foundUser = await this.userModel.findById(user._id);
        const isInCart = foundUser.productsInCart.find((product) => product._id.toString() === addToCartDto._id.toString());
        if (isInCart)
            throw new common_1.ConflictException(`Product with id: ${addToCartDto._id} is already in cart`);
        await this.userModel.findByIdAndUpdate(foundUser._id, {
            $push: { productsInCart: addToCartDto },
        });
        return addToCartDto;
    }
    async increment(id, user) {
        const foundUser = await this.userModel.findOneAndUpdate({
            _id: user._id,
            'productsInCart._id': id,
        }, {
            $inc: { 'productsInCart.$.quantity': 1 },
        }, {
            new: true,
        });
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with ID ${user._id} not found`);
        }
        const updatedProduct = foundUser.productsInCart.find((product) => product._id.toString() === id.toString());
        if (!updatedProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found in cart`);
        }
        return updatedProduct.quantity;
    }
    async decrement(id, user) {
        const foundUser = await this.userModel.findOneAndUpdate({
            _id: user._id,
            'productsInCart._id': id,
        }, {
            $inc: { 'productsInCart.$.quantity': -1 },
        }, {
            new: true,
        });
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with ID ${user._id} not found`);
        }
        const updatedProduct = foundUser.productsInCart.find((product) => product._id.toString() === id.toString());
        if (!updatedProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found in cart`);
        }
        return updatedProduct.quantity;
    }
    async removeFromCart(id, user) {
        await this.userModel.findByIdAndUpdate({
            _id: user._id,
            'productsInCart._id': id,
        }, {
            $pull: { productsInCart: { _id: id } },
        }, { new: true });
        return id;
    }
    async clearCart(user) {
        await this.userModel.findByIdAndUpdate(user._id, { productsInCart: [] });
        return { message: 'Cart is cleared' };
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_item_schema_1.CartItem.name)),
    __param(1, (0, mongoose_1.InjectModel)(auth_user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartItemService);
//# sourceMappingURL=cart-item.service.js.map