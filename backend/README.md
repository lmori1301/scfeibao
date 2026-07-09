# 四川飞豹救援后端系统

基于 NestJS + TypeScript + MySQL 构建的后端 API 系统。

## 技术栈

- **框架**: NestJS 11.x
- **语言**: TypeScript 5.x
- **数据库**: MySQL 8.0
- **ORM**: TypeORM 0.3.x
- **认证**: JWT (JSON Web Token)
- **文档**: Swagger/OpenAPI
- **验证**: class-validator + class-transformer

## 项目结构

```
backend/
├── src/
│   ├── common/              # 公共模块
│   │   ├── decorators/      # 装饰器
│   │   ├── dto/             # 通用DTO
│   │   ├── filters/         # 异常过滤器
│   │   ├── guards/          # 守卫
│   │   └── interceptors/    # 拦截器
│   ├── config/              # 配置文件
│   ├── database/            # 数据库相关
│   │   └── entities/        # 实体模型
│   ├── modules/             # 业务模块
│   │   ├── auth/            # 认证模块
│   │   ├── news/            # 新闻模块
│   │   ├── certificates/    # 证书查询模块
│   │   ├── personnel/       # 人员查询模块
│   │   └── vehicles/        # 车辆查询模块
│   ├── app.module.ts        # 根模块
│   └── main.ts              # 应用入口
├── .env                     # 环境变量
├── .env.example             # 环境变量示例
├── nest-cli.json            # NestJS CLI配置
├── tsconfig.json            # TypeScript配置
└── package.json             # 项目依赖

## 快速开始

### 1. 环境要求

- Node.js >= 18.x
- MySQL >= 8.0
- npm >= 9.x

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 文件为 `.env`，并根据实际情况修改配置：

```bash
cp .env.example .env
```

配置说明：

```env
# 应用配置
NODE_ENV=development          # 环境：development/production
PORT=3003                     # 端口号

# 数据库配置
DB_HOST=localhost             # 数据库地址
DB_PORT=3308                  # 数据库端口
DB_USERNAME=root              # 数据库用户名
DB_PASSWORD=your_password     # 数据库密码
DB_DATABASE=feibao_rescue     # 数据库名称

# JWT配置
JWT_SECRET=your_jwt_secret    # JWT密钥（生产环境请使用强密码）
JWT_EXPIRES_IN=7d             # Token过期时间

# CORS配置
CORS_ORIGIN=http://localhost:5173  # 前端地址

# API前缀
API_PREFIX=api                # API路由前缀
```

### 4. 创建数据库

登录 MySQL，创建数据库：

```sql
CREATE DATABASE feibao_rescue CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. 启动应用

开发模式（热重载）：

```bash
npm run start:dev
```

生产模式：

```bash
# 构建
npm run build

# 启动
npm run start:prod
```

### 6. 访问应用

- API 地址: http://localhost:3003/api
- Swagger 文档: http://localhost:3003/api-docs
- 健康检查: http://localhost:3003/api

## API 文档

启动应用后，访问 http://localhost:3003/api-docs 查看完整的 API 文档。

### 主要接口模块

#### 1. 认证模块 (`/api/auth`)

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取当前用户信息（需要认证）

#### 2. 新闻模块 (`/api/news`)

- `GET /api/news` - 获取新闻列表（公开）
- `GET /api/news/:id` - 获取新闻详情（公开）
- `POST /api/news` - 创建新闻（需要认证）
- `PATCH /api/news/:id` - 更新新闻（需要认证）
- `DELETE /api/news/:id` - 删除新闻（需要认证）

#### 3. 证书查询模块 (`/api/certificates`)

- `GET /api/certificates` - 获取证书列表（公开）
- `GET /api/certificates/search?certificateNumber=xxx` - 搜索证书（公开）
- `GET /api/certificates/:id` - 获取证书详情（公开）
- `POST /api/certificates` - 创建证书（需要认证）
- `PATCH /api/certificates/:id` - 更新证书（需要认证）
- `DELETE /api/certificates/:id` - 删除证书（需要认证）

#### 4. 人员查询模块 (`/api/personnel`)

- `GET /api/personnel` - 获取人员列表（公开）
- `GET /api/personnel/search?idCard=xxx` - 搜索人员（公开）
- `GET /api/personnel/:id` - 获取人员详情（公开）
- `POST /api/personnel` - 创建人员（需要认证）
- `PATCH /api/personnel/:id` - 更新人员（需要认证）
- `DELETE /api/personnel/:id` - 删除人员（需要认证）

#### 5. 车辆查询模块 (`/api/vehicles`)

- `GET /api/vehicles` - 获取车辆列表（公开）
- `GET /api/vehicles/search?plateNumber=xxx` - 搜索车辆（公开）
- `GET /api/vehicles/:id` - 获取车辆详情（公开）
- `POST /api/vehicles` - 创建车辆（需要认证）
- `PATCH /api/vehicles/:id` - 更新车辆（需要认证）
- `DELETE /api/vehicles/:id` - 删除车辆（需要认证）

### 认证说明

需要认证的接口需要在请求头中携带 JWT Token：

```
Authorization: Bearer <your_token>
```

获取 Token 的步骤：

1. 调用 `/api/auth/register` 注册用户
2. 调用 `/api/auth/login` 登录，获取 token
3. 在后续请求中携带 token

### 响应格式

所有接口统一返回格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": 1234567890
}
```

### 分页参数

列表接口支持分页参数：

- `page`: 页码（默认：1）
- `pageSize`: 每页数量（默认：10，最大：100）

示例：`GET /api/news?page=1&pageSize=10`

分页响应格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "items": [],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  },
  "timestamp": 1234567890
}
```

## 数据库说明

### 自动同步

开发环境下，TypeORM 会自动同步数据库表结构（`synchronize: true`）。

**注意**：生产环境请设置 `synchronize: false`，使用迁移脚本管理数据库变更。

### 数据表

系统包含以下数据表：

- `users` - 用户表
- `news` - 新闻表
- `certificates` - 证书表
- `personnel` - 人员表
- `vehicles` - 车辆表
- `party_building` - 党建专栏表（待实现）
- `team_building` - 队伍建设表（待实现）
- `info_public` - 信息公开表（待实现）
- `policies` - 政策法规表（待实现）

### 初始化数据

首次启动后，建议创建管理员账号：

```bash
# 使用 Swagger 文档或 API 工具调用注册接口
POST /api/auth/register
{
  "username": "admin",
  "password": "admin123",
  "realName": "管理员"
}
```

## 开发指南

### 添加新模块

1. 创建模块目录：`src/modules/your-module/`
2. 创建实体：`src/database/entities/your-entity.entity.ts`
3. 创建 DTO：`src/modules/your-module/dto/`
4. 创建服务：`src/modules/your-module/your-module.service.ts`
5. 创建控制器：`src/modules/your-module/your-module.controller.ts`
6. 创建模块：`src/modules/your-module/your-module.module.ts`
7. 在 `app.module.ts` 中导入新模块

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 NestJS 官方最佳实践
- 使用 class-validator 进行数据验证
- 使用 Swagger 装饰器生成 API 文档
- 统一使用 ResponseDto 包装响应数据

## 部署说明

### 生产环境配置

1. 修改 `.env` 文件：
   - 设置 `NODE_ENV=production`
   - 使用强密码配置 `JWT_SECRET`
   - 配置生产数据库连接
   - 设置正确的 `CORS_ORIGIN`

2. 构建应用：

```bash
npm run build
```

3. 启动应用：

```bash
npm run start:prod
```

### 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start dist/main.js --name feibao-backend

# 查看日志
pm2 logs feibao-backend

# 重启应用
pm2 restart feibao-backend
```

### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
```

构建和运行：

```bash
docker build -t feibao-backend .
docker run -p 3000:3000 --env-file .env feibao-backend
```

## 常见问题

### 1. 数据库连接失败

- 检查 MySQL 服务是否启动
- 检查 `.env` 中的数据库配置是否正确
- 确认数据库已创建

### 2. JWT 认证失败

- 检查 `JWT_SECRET` 配置
- 确认 Token 格式正确：`Bearer <token>`
- 检查 Token 是否过期

### 3. CORS 错误

- 检查 `.env` 中的 `CORS_ORIGIN` 配置
- 确认前端地址与配置一致

## 技术支持

如有问题，请联系开发团队。

## 许可证

ISC
