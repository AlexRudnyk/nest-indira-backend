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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bcryptjs_1 = require("bcryptjs");
const cart_item_schema_1 = require("../../cart-item/schemas/cart-item.schema");
let User = class User {
    setPassword(password) {
        this.password = (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)(10));
    }
    comparePassword(password) {
        return (0, bcryptjs_1.compareSync)(password, this.password);
    }
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'USER' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [cart_item_schema_1.CartItemSchema], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "productsInCart", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
        timestamps: true,
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.methods.setPassword = function (password) {
    this.password = (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)(10));
};
exports.UserSchema.methods.comparePassword = function (password) {
    return (0, bcryptjs_1.compareSync)(password, this.password);
};
//# sourceMappingURL=auth-user.schema.js.map