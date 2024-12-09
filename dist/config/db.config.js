"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';
const options = {
    autoIndex: true, // 在生产环境可以设为 false
    serverSelectionTimeoutMS: 5000, // 超时时间
    socketTimeoutMS: 45000, // Socket 超时时间
};
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(MONGODB_URI, options);
        // 数据库连接事件监听
        mongoose_1.default.connection.on('connected', () => {
            console.log('MongoDB Connected');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        // 应用退出时关闭数据库连接
        process.on('SIGINT', async () => {
            await mongoose_1.default.connection.close();
            process.exit(0);
        });
        return conn;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
