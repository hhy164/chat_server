"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = void 0;
const error_middleware_1 = require("./error.middleware");
const validateMessage = (req, res, next) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return next(new error_middleware_1.AppError('Message is required', 400));
    }
    if (message.length > 5000) {
        return next(new error_middleware_1.AppError('Message is too long (max 5000 characters)', 400));
    }
    next();
};
exports.validateMessage = validateMessage;
