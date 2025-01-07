"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
exports.regex = {
    name: /^[A-Za-z]{2,25}(-[A-Za-z]{2,25})?$/,
    email: /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9_-]{1,30}(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/,
    phone: /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
};
//# sourceMappingURL=regex.js.map