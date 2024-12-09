"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const conversation_1 = __importDefault(require("./routes/conversation"));
const db_config_1 = require("./config/db.config");
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// 连接数据库
(0, db_config_1.connectDB)();
// 中间件
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// 路由
exports.app.use('/api/conversations', conversation_1.default);
// 错误处理
exports.app.use(error_middleware_1.errorHandler);
// 只在直接运行时启动服务器，测试时不启动
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    exports.app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
// 处理未捕获的异常
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});
