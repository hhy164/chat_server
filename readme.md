# AI Chat Server

基于 Node.js + Express + MongoDB 构建的 AI 聊天应用后端服务，集成了 Hugging Face AI API 实现智能对话功能。

## 功能特性

### 核心功能
- 智能对话：集成 Hugging Face AI API，支持自然语言交互
- 多会话管理：支持创建多个对话，每个对话独立保存
- 历史记录：自动保存所有对话历史
- 用户认证：基于 JWT 的用户认证系统

### 技术特点
- TypeScript 支持：完整的类型定义
- RESTful API：标准的 REST 接口设计
- 实时数据库：使用 MongoDB 存储对话数据
- 错误处理：完善的错误处理机制
- 安全性：请求验证、数据加密、CORS 支持

## 快速开始

### 环境要求
- Node.js >= 14
- MongoDB >= 4.4
- TypeScript >= 4.5
- npm 或 yarn

#### 1.1 安装依赖
npm install

#### 1.2 环境配置
运行环境 NODE_ENV=development
服务器配置 PORT=3000
数据库配置 MONGODB_URI=mongodb://localhost:27017/chatapp
JWT配置 JWT_SECRET=your_jwt_secret
Hugging Face API 配置 HUGGING_FACE_API_KEY=your_hugging_face_api_key

### 构建项目
npm run build

### 启动服务
npm run start



