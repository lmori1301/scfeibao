# 四川飞豹救援官网部署配置

## Docker Compose 部署（推荐）

仓库根目录已提供 `docker-compose.yaml`，统一编排官网、管理后台、NestJS 后端和 MySQL。

首次部署：

```bash
cp .env.example .env
# 编辑 .env，替换数据库密码、Root 密码、JWT 密钥和公网域名
docker compose config --quiet
docker compose build
docker compose up -d
docker compose ps
```

默认访问地址：

- 官网：`http://服务器地址/`
- 管理后台：默认仅监听 `127.0.0.1:8080`，必须通过服务器的 HTTPS 反向代理访问。
- API：通过官网或后台同源的 `/api/` 访问，后端端口不直接暴露。

首次启动时，MySQL 会执行 `docker/mysql/init/10-schema.sql`，创建当前 27 张业务表。该脚本仅包含表结构，不包含历史业务数据或管理员账号。MySQL 仅在 `mysql_data` 数据卷为空时执行初始化目录。

如需迁移现有数据，请使用经过审核的备份恢复流程，不要将含个人信息或密码哈希的 SQL 提交到仓库。

升级已有数据库时，先备份数据库，再执行令牌版本字段迁移；全新空数据卷无需执行：

```bash
docker compose exec -T mysql sh -lc 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' \
  < backend/src/database/migrations/add-admin-user-token-version.sql
docker compose exec mysql sh -lc 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -N -e \
  "SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '\''admin_users'\'' AND COLUMN_NAME = '\''tokenVersion'\'' AND DATA_TYPE = '\''int'\'' AND IS_NULLABLE = '\''NO'\'' AND COLUMN_DEFAULT = '\''0'\''" "$MYSQL_DATABASE"'
```

验证命令必须输出 `1`。该字段用于在密码修改或重置后立即吊销旧 JWT；迁移完成后再重启后端容器。

首次启动后，使用一次性环境变量创建初始管理员。密码不得写入 `.env`、命令历史或 Git：

```bash
read -r -p "初始管理员用户名: " ADMIN_USERNAME
read -r -s -p "初始管理员密码: " ADMIN_PASSWORD
echo
export ADMIN_USERNAME ADMIN_PASSWORD
docker compose exec -e ADMIN_USERNAME -e ADMIN_PASSWORD backend npm run admin:create
unset ADMIN_USERNAME ADMIN_PASSWORD
```

初始密码必须为 12-72 字节，包含大小写字母、数字和特殊字符，且不得包含首尾空白。脚本只允许在尚无管理员时执行，不会覆盖现有账号；初始管理员登录后必须先改密才能访问其他后台接口。

常用命令：

```bash
docker compose logs -f backend
docker compose exec mysql sh -lc 'exec mysql -u"$MYSQL_USER" -p "$MYSQL_DATABASE"'
docker compose down
```

`docker compose down` 不会删除数据卷。只有明确需要清空全部数据库和上传文件时才可执行 `docker compose down -v`。生产环境不得执行该命令。

## 非 Docker 部署的官网 Nginx

以下配置模板仅适用于后端直接运行在宿主机 `127.0.0.1:3003` 的传统部署，不适用于本页上方的 Compose 内网。Compose 生产环境应由宿主机或云负载均衡器统一终止 HTTPS；管理后台不得直接开放 `8080` 端口。

测试环境完整部署手册：`deploy/TEST_DEPLOY.md`

生产配置模板：`deploy/nginx/feibao-website.conf`

后端生产环境变量模板：`deploy/backend.production.env.example`

上线前需要确认：

1. `server_name` 使用正式域名：`scfb.org.cn www.scfb.org.cn`。
2. `root` 改为官网前端 `dist` 的实际部署目录。
3. 后端服务监听地址保持为 `127.0.0.1:3003`，如端口调整，需要同步修改 `/api/`、`/uploads/`、`/_AMapService/` 代理。
4. 后端生产 `.env` 使用公网地址：

```env
PORTAL_PUBLIC_URL=https://www.scfb.org.cn
PERSONNEL_QRCODE_PUBLIC_URL=https://www.scfb.org.cn
```

人员二维码上线后应生成：

```text
https://www.scfb.org.cn/api/personnel/{id}/mobile
```

部署检查：

```bash
nginx -t
nginx -s reload
```

人员二维码上线验证：

```bash
curl -I https://www.scfb.org.cn/api/personnel/3/mobile
curl -s https://www.scfb.org.cn/api/personnel/3/qrcode
```

二维码返回的 `url` 应为公网 HTTPS 地址，不能出现 `192.168.x.x`、`5174`、`3003`。

缓存策略：

- `/assets/`：一年强缓存，配合 Vite hash 文件名。
- `/index.html`：不缓存，保证发布后入口文件及时更新。
- `/uploads/`：代理到后端，保留浏览器 `Accept` 头，支持后端 WebP 旁路，缓存 30 天。
- `/api/`：不设置静态缓存，保持接口实时。

前端构建已配置 `assetsInlineLimit: 16 * 1024`，16KB 以下 Pixso 小切片会在构建期内联，减少上线后的零碎图片请求。
