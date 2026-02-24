# 四川飞豹救援官网项目

四川飞豹救援官方网站及后台管理系统。

## 快速开始

```bash
# 后端服务
cd backend && npm run start:dev

# 管理后台
cd admin && npm run dev
```

访问地址：
- 管理后台：http://localhost:5176
- 后端API：http://localhost:3003
- API文档：http://localhost:3003/api-docs

测试账号：`testuser` / `admin123`

## 项目文档

- **[项目开发状态](./项目开发状态.md)** - 当前开发进度与系统状态
- **[快速启动指南](./快速启动指南.md)** - 详细的环境配置与启动说明
- **[后端API接口文档](./后端API接口文档.md)** - 完整的API接口说明
- **[CLAUDE.md](./CLAUDE.md)** - AI辅助开发指南
- **[README_DEV.md](./README_DEV.md)** - 开发规范与技术文档

## 技术栈

- **前端**: Vue 3 + TypeScript + Vite + Element Plus
- **后端**: NestJS + TypeORM + MySQL
- **认证**: JWT

## 项目结构

```
├── admin/          # 后台管理系统
├── backend/        # 后端API服务
├── public/         # 官网前端
└── *.md           # 项目文档
```

---

**当前状态**: ✅ 核心功能已完成，系统可用
