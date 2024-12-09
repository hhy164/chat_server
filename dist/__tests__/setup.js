"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.test' });
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
afterEach(async () => {
    if (mongoose_1.default.connection.db) {
        const collections = await mongoose_1.default.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});
