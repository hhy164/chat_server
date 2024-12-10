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



### 测试用例


我明白了，你想要类似 curl 的 API 测试示例。我来为每个接口提供具体的测试示例：

1. **创建新对话**
```bash
# 成功创建对话
curl -X POST 'http://localhost:3001/api/conversations' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_JWT_TOKEN' \
-d '{
  "message": "Hello, AI!"
}'

# 预期成功响应 (200)
{
  "code": 200,
  "data": {
    "conversationId": "507f1f77bcf86cd799439011",
    "title": "Hello, AI!",
    "message": {
      "content": "Hello, AI!"
    },
    "reply": {
      "content": "Hello! How can I help you today?"
    }
  }
}

# 未授权请求 (401)
curl -X POST 'http://localhost:3001/api/conversations' \
-H 'Content-Type: application/json' \
-d '{
  "message": "Hello, AI!"
}'
```

2. **获取所有对话**
```bash
# 获取用户的所有对话
curl -X GET 'http://localhost:3001/api/conversations' \
-H 'Authorization: Bearer YOUR_JWT_TOKEN'

# 预期成功响应 (200)
{
  "code": 200,
  "data": {
    "conversations": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Hello, AI!",
        "messageCount": 2,
        "createdAt": "2024-02-10T12:00:00.000Z",
        "updatedAt": "2024-02-10T12:00:00.000Z"
      }
    ]
  }
}
```

3. **获取单个对话详情**
```bash
# 获取特定对话的详情
curl -X GET 'http://localhost:3001/api/conversations/507f1f77bcf86cd799439011' \
-H 'Authorization: Bearer YOUR_JWT_TOKEN'

# 预期成功响应 (200)
{
  "code": 200,
  "data": {
    "conversation": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Hello, AI!",
      "createdAt": "2024-02-10T12:00:00.000Z",
      "updatedAt": "2024-02-10T12:00:00.000Z"
    },
    "messages": [
      {
        "content": "Hello, AI!",
        "role": "user",
        "createdAt": "2024-02-10T12:00:00.000Z"
      },
      {
        "content": "Hello! How can I help you today?",
        "role": "assistant",
        "createdAt": "2024-02-10T12:00:00.000Z"
      }
    ]
  }
}
```

4. **添加消息到对话**
```bash
# 向现有对话添加新消息
curl -X POST 'http://localhost:3001/api/conversations/507f1f77bcf86cd799439011/messages' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_JWT_TOKEN' \
-d '{
  "message": "What is Node.js?"
}'

# 预期成功响应 (200)
{
  "code": 200,
  "data": {
    "message": {
      "content": "What is Node.js?",
      "role": "user",
      "createdAt": "2024-02-10T12:01:00.000Z"
    },
    "reply": {
      "content": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
      "role": "assistant",
      "createdAt": "2024-02-10T12:01:00.000Z"
    }
  }
}
```

错误响应示例：
```bash
# 401 未授权
{
  "code": 401,
  "message": "No token provided"
}

# 404 对话不存在
{
  "code": 404,
  "message": "Conversation not found"
}

# 400 消息为空
{
  "code": 400,
  "message": "Message cannot be empty"
}
```

要测试这些 API，你需要：
1. 先获取一个有效的 JWT token（通过登录接口）
2. 替换上面示例中的 `YOUR_JWT_TOKEN`
3. 确保服务器在运行（默认端口 3001）

curl -X POST 'http://localhost:3000/api/auth/register' \
-H 'Content-Type: application/json' \
-d '{
  "username": "admin",
  "password": "123123"
}'

curl -X POST 'http://localhost:3000/api/auth/login' \
-H 'Content-Type: application/json' \
-d '{
  "username": "admin",
  "password": "123123"
}'