"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateObjectId = exports.createTestUser = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../models/user.model");
const jsonwebtoken_1 = require("jsonwebtoken");
const createTestUser = async () => {
    const user = await user_model_1.User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    });
    const userId = user._id.toString();
    const token = (0, jsonwebtoken_1.sign)({ id: userId }, process.env.JWT_SECRET);
    return { user, token };
};
exports.createTestUser = createTestUser;
const generateObjectId = () => new mongoose_1.Types.ObjectId().toString();
exports.generateObjectId = generateObjectId;
