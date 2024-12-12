# 用户认证 API 文档

## 1. 用户注册

### 接口描述
用户通过用户名和密码注册新账号

### 请求信息
- 请求路径: `/api/auth/register`
- 请求方法: POST
- 请求类型: application/json

### 请求参数
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 用户密码 |

### 请求示例
```json
{
    "username": "testuser",
    "password": "password123"
}
```

### 响应参数
| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | number | 状态码 |
| message | string | 响应信息 |
| data | object | 返回数据 |

### 响应示例
```json
{
    "code": 200,
    "message": "注册成功",
    "data": {
        "userId": "12345",
        "username": "testuser"
    }
}
```

## 2. 用户登录

### 接口描述
用户使用用户名和密码登录

### 请求信息
- 请求路径: `/api/auth/login`
- 请求方法: POST
- 请求类型: application/json

### 请求参数
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 用户密码 |

### 请求示例
```json
{
    "username": "testuser",
    "password": "password123"
}
```

### 响应参数
| 参数名 | 类型 | 描述 |
|--------|------|------|
| code | number | 状态码 |
| message | string | 响应信息 |
| data | object | 返回数据 |

### 响应示例
```json
{
    "code": 200,
    "message": "登录成功",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "userId": "12345",
        "username": "testuser"
    }
}
```

### 错误码说明
| 错误码 | 描述 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 用户名或密码错误 |
| 403 | 禁止访问 |
| 500 | 服务器内部错误 |

### 注意事项
1. 密码传输需要进行加密处理
2. token 需要在后续请求的 Header 中携带，格式为：`Authorization: Bearer <token>`
3. 密码长度至少8位，需要包含字母和数字
