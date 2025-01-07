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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const auth_user_schema_1 = require("../auth/schemas/auth-user.schema");
let AuthMiddleware = class AuthMiddleware {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async use(req, res, next) {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');
        try {
            if (bearer !== 'Bearer') {
                throw new common_1.UnauthorizedException('Not authorized');
            }
            const { id } = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_SECRET_KEY);
            const user = await this.userModel.findById(id);
            if (!user || !user.accessToken) {
                throw new common_1.UnauthorizedException('Not authorized');
            }
            req.user = user;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                res
                    .status(401)
                    .json({ message: 'Token expired. Please log in again.' });
            }
            else {
                next(error);
            }
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map