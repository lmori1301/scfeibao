# 四川飞豹救援官网部署配置

## 官网 Nginx

生产配置模板：`deploy/nginx/feibao-website.conf`

上线前需要确认：

1. `server_name` 改为正式域名。
2. `root` 改为官网前端 `dist` 的实际部署目录。
3. 后端服务监听地址保持为 `127.0.0.1:3003`，如端口调整，需要同步修改 `/api/`、`/uploads/`、`/_AMapService/` 代理。

部署检查：

```bash
nginx -t
nginx -s reload
```

缓存策略：

- `/assets/`：一年强缓存，配合 Vite hash 文件名。
- `/index.html`：不缓存，保证发布后入口文件及时更新。
- `/uploads/`：代理到后端，保留浏览器 `Accept` 头，支持后端 WebP 旁路，缓存 30 天。
- `/api/`：不设置静态缓存，保持接口实时。

前端构建已配置 `assetsInlineLimit: 16 * 1024`，16KB 以下 Pixso 小切片会在构建期内联，减少上线后的零碎图片请求。
