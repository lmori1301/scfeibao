# 四川飞豹救援测试环境部署手册

本文档用于将当前项目部署到测试环境，服务器公网 IP 为 `116.62.6.23`，测试访问域名为 `www.scfb.org.cn`。

## 一、部署目标

- 官网前端：`https://www.scfb.org.cn/`
- 后端 API：`https://www.scfb.org.cn/api/`
- 上传资源：`https://www.scfb.org.cn/uploads/`
- Swagger 文档：`https://www.scfb.org.cn/api-docs`
- 后台管理：测试阶段建议先用独立端口访问，例如 `http://116.62.6.23:8081/`

说明：当前后台 Vite 构建未配置 `/admin/` base，直接挂到 `https://www.scfb.org.cn/admin/` 容易出现静态资源路径冲突。测试环境先用独立端口或独立子域名更稳。

## 二、服务器前置条件

在 HexHub 中新建 SSH 连接并登录服务器：

```bash
ssh <ssh_user>@116.62.6.23
```

服务器需要具备：

- Docker / Docker Compose
- Node.js 18 或更高版本
- npm 9 或更高版本
- Nginx
- Git
- MySQL 8 容器或可访问的 MySQL 服务
- 已开放端口：`80`、`443`、`3003`、`8081`

检查命令：

```bash
docker --version
docker compose version
node -v
npm -v
nginx -v
git --version
```

## 三、域名解析

在域名 DNS 控制台添加记录：

```text
主机记录：www
记录类型：A
记录值：116.62.6.23
```

验证解析：

```bash
ping www.scfb.org.cn
```

应解析到 `116.62.6.23`。

## 四、目录规划

建议测试环境使用以下目录：

```bash
sudo mkdir -p /opt/scfb
sudo mkdir -p /var/www/scfb/website
sudo mkdir -p /var/www/scfb/admin
sudo mkdir -p /var/log/scfb
sudo chown -R $USER:$USER /opt/scfb /var/www/scfb /var/log/scfb
```

## 五、获取代码

如果服务器可以访问 GitHub：

```bash
cd /opt/scfb
git clone https://github.com/lmori1301/sc_feibao.git app
cd app
git checkout dev/sichuan-feibao-official-website
```

后续更新：

```bash
cd /opt/scfb/app
git pull origin dev/sichuan-feibao-official-website
```

如果服务器无法访问 GitHub，可从本地通过 `rsync` 上传：

```bash
rsync -avh --exclude node_modules --exclude dist --exclude .git \
  /Users/yusenn/ProCode/demo-aistone/四川飞豹_副本/ \
  <ssh_user>@116.62.6.23:/opt/scfb/app/
```

## 六、MySQL 测试库

如果使用 Docker MySQL：

```bash
docker run -d \
  --name feibao-mysql \
  --restart unless-stopped \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD='<mysql_root_password>' \
  -e MYSQL_USER=scfeibao \
  -e MYSQL_PASSWORD='<mysql_password>' \
  -e MYSQL_DATABASE=scfeibao \
  mysql:8.0 \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

检查：

```bash
docker ps
docker exec -it feibao-mysql mysql -uscfeibao -p
```

如果已有数据库容器，确认库名和字符集：

```sql
SHOW DATABASES;
SHOW CREATE DATABASE scfeibao;
```

导入备份示例：

```bash
mysql -h127.0.0.1 -P3306 -uscfeibao -p"$MYSQL_PASSWORD" scfeibao < /opt/scfb/app/backend/backups/mysql/pre_restore_20260707_1145.sql
```

## 七、后端部署

创建后端环境变量：

```bash
cd /opt/scfb/app/backend
cp .env.example .env
```

编辑 `.env`：

```env
NODE_ENV=production
PORT=3003

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=scfeibao
DB_PASSWORD=<mysql_password>
DB_DATABASE=scfeibao

JWT_SECRET=<strong_random_secret>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://www.scfb.org.cn
API_PREFIX=api
```

安装、构建、启动：

```bash
cd /opt/scfb/app/backend
npm install
npm run build
npm run start:prod
```

建议测试环境使用 Docker 或 systemd 托管进程，避免 SSH 断开后进程退出。

systemd 示例：

```bash
sudo tee /etc/systemd/system/scfb-backend.service >/dev/null <<'EOF'
[Unit]
Description=Sichuan Feibao Backend
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/scfb/app/backend
ExecStart=/usr/bin/npm run start:prod
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable scfb-backend
sudo systemctl restart scfb-backend
sudo systemctl status scfb-backend
```

后端验证：

```bash
curl -i http://127.0.0.1:3003/api
curl -i http://127.0.0.1:3003/api/search?keyword=%E6%95%91%E6%8F%B4
```

## 八、官网前端部署

构建官网：

```bash
cd /opt/scfb/app/website
npm install
npm run build
rsync -avh --delete dist/ /var/www/scfb/website/
```

## 九、后台管理部署

测试阶段建议用独立端口：

```bash
cd /opt/scfb/app/admin
npm install
npm run build
rsync -avh --delete dist/ /var/www/scfb/admin/
```

后台 Nginx 可先监听 `8081`：

```nginx
server {
    listen 8081;
    server_name 116.62.6.23;

    root /var/www/scfb/admin;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:3003/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        proxy_pass http://127.0.0.1:3003/uploads/;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

后续如果要改成 `https://www.scfb.org.cn/admin/`，需要同步调整后台 Vite `base` 和路由部署路径。

## 十、Nginx 官网配置

复制配置：

```bash
sudo cp /opt/scfb/app/deploy/nginx/feibao-website.conf /etc/nginx/conf.d/scfb-website.conf
sudo vim /etc/nginx/conf.d/scfb-website.conf
```

测试环境需要改：

```nginx
server_name www.scfb.org.cn;
root /var/www/scfb/website;
```

确认以下代理保持一致：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3003/api/;
}

location /uploads/ {
    proxy_pass http://127.0.0.1:3003/uploads/;
}

location /_AMapService/ {
    proxy_pass http://127.0.0.1:3003/_AMapService/;
}
```

检查并重载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 十一、HTTPS 配置

建议使用 Certbot：

```bash
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.scfb.org.cn
```

验证自动续期：

```bash
sudo certbot renew --dry-run
```

如果服务器是 CentOS / Alibaba Cloud Linux，安装命令按系统包管理器调整。

## 十二、测试验收

本机或服务器执行：

```bash
curl -I https://www.scfb.org.cn/
curl -I https://www.scfb.org.cn/api
curl -s 'https://www.scfb.org.cn/api/search?keyword=%E6%95%91%E6%8F%B4'
curl -s 'https://www.scfb.org.cn/api/party/work-list?page=1&pageSize=2'
curl -s 'https://www.scfb.org.cn/api/party/team-work?page=1&pageSize=2'
curl -s 'https://www.scfb.org.cn/api/team/cases?page=1&pageSize=2'
```

浏览器检查：

- 官网首页能打开
- 动态要闻详情能打开
- 队伍建设、党建专栏、信息公开均走接口数据
- `/uploads/` 图片可访问
- 后台 `http://116.62.6.23:8081/` 可打开并能登录
- 登录后列表、新增、编辑、导入功能能正常访问 `/api`

## 十三、回滚

回滚代码：

```bash
cd /opt/scfb/app
git log --oneline -5
git checkout <last_good_commit>
```

重新构建并发布：

```bash
cd /opt/scfb/app/backend
npm run build
sudo systemctl restart scfb-backend

cd /opt/scfb/app/website
npm run build
rsync -avh --delete dist/ /var/www/scfb/website/

sudo nginx -t
sudo systemctl reload nginx
```

回滚数据库前必须先备份：

```bash
mysqldump -h127.0.0.1 -P3306 -uscfeibao -p"$MYSQL_PASSWORD" scfeibao > /opt/scfb/backup-before-rollback.sql
```

## 十四、生产环境注意事项

- 测试环境通过后，再部署生产环境。
- 生产环境不要使用测试数据库。
- 生产 HTTPS 证书、Nginx 配置、数据库密码、JWT 密钥需要独立配置。
- 后端 `.env` 不提交 Git。
- 数据库上线前先做 `mysqldump` 备份。
- 大版本发布建议保留上一版 `dist` 和后端 commit，便于快速回滚。
