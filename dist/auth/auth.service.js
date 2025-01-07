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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_user_schema_1 = require("./schemas/auth-user.schema");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(registerUserDto) {
        const { phone, email, password } = registerUserDto;
        const userEmail = await this.userModel.findOne({ email });
        if (userEmail)
            throw new common_1.ConflictException(`Email ${email} is already in use`);
        const userPhone = await this.userModel.findOne({ phone });
        if (userPhone)
            throw new common_1.ConflictException(`Phone ${phone} is already in use`);
        const newUser = new this.userModel(registerUserDto);
        newUser.setPassword(password);
        return await newUser.save();
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userModel.findOne({ email });
        if (!user || !user.comparePassword(password))
            throw new common_1.UnauthorizedException('Email or password is wrong or not registered');
        const payload = { id: user._id };
        const accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.ACCESS_SECRET_KEY, {
            expiresIn: '1h',
        });
        const updatedUser = await this.userModel.findByIdAndUpdate(user._id, { accessToken }, { new: true });
        const { _id, name, phone, role, productsInCart } = updatedUser;
        return {
            accessToken,
            user: {
                _id: _id,
                name,
                phone,
                email,
                role,
                productsInCart,
            },
        };
    }
    async logout(user) {
        const { _id } = user;
        await this.userModel.findByIdAndUpdate(_id, { accessToken: null });
    }
    async getCurrent(user) {
        const { _id, name, phone, email, role, productsInCart } = user;
        return {
            _id,
            name,
            phone,
            email,
            role,
            productsInCart,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map