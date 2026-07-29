# 四川飞豹救援官网部署配置

## 官网 Nginx

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
