# gpt-image-2 接口参考

遵循 OpenAI Images API 形式，通过可配置的 baseURL 调用（OpenAI 官方或任意兼容服务，见 `config.json` / 环境变量 `GPT_IMAGE_*`）。

## 目录

- [认证](#认证)
- [生图 /images/generations](#生图-imagesgenerations)
- [改图 /images/edits](#改图-imagesedits)
- [公共参数取值](#公共参数取值)
- [响应结构](#响应结构)
- [错误处理](#错误处理)

## 认证

所有请求带 `Authorization: Bearer <apiKey>`。apiKey 存于技能内 `config.json`，不入库。

## 生图 /images/generations

`Content-Type: application/json`，body 字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| model | 是 | 默认 `gpt-image-2`，可用 `--model` 覆盖 |
| prompt | 是 | 文本描述 |
| size | 否 | 图片尺寸，见下 |
| quality | 否 | 质量档位，见下 |
| n | 否 | 生成张数，默认 1 |
| background | 否 | `transparent` / `opaque` / `auto`；透明需配合 png/webp |
| output_format | 否 | `png` / `jpeg` / `webp`，默认 png |
| output_compression | 否 | 0-100，仅 jpeg/webp 生效 |
| moderation | 否 | `low` / `auto`，内容审核宽严 |

## 改图 /images/edits

`multipart/form-data`，字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| model | 是 | `gpt-image-2` |
| prompt | 是 | 编辑指令 |
| image | 是 | 参考图文件，可传多个 `image` 字段（脚本用 `--image a.png,b.jpg`） |
| size | 否 | 输出尺寸 |
| quality | 否 | 质量档位 |
| response_format | 否 | `b64_json` 或 `url`，脚本固定用 `b64_json` |

## 公共参数取值

### size

gpt-image-2 **不是固定白名单**，而是接受任意满足下列约束的分辨率
（官方原文：accepts any resolution in the `size` parameter when it satisfies the constraints below）：

| 约束 | 值 |
|------|-----|
| 最长边 | ≤ 3840px |
| 两边都必须是 | 16 的倍数 |
| 长边:短边 | ≤ 3:1 |
| 总像素 | 655,360 ~ 8,294,400 |

常用档位：

| 值 | 说明 |
|------|------|
| `1024x1024` | 方形 |
| `1536x1024` / `1024x1536` | 横版 / 竖版 |
| `2048x2048` | 2K 方形 |
| `2048x1152` | 2K 横版 |
| `3840x2160` | **4K 横版** |
| `2160x3840` | **4K 竖版** |
| `auto` | 由模型按提示词自行决定（默认） |

超过 `2560x1440`（约 369 万像素）的输出官方标注为实验性（experimental），
4K 横版约 829 万像素，刚好卡在像素上限内——可用，但更容易超时或触发服务端容量错误。

旧模型（gpt-image-1.5 / gpt-image-1 / gpt-image-1-mini）官方文档未给出白名单，
仅在计费表里覆盖 1024x1024 / 1024x1536 / 1536x1024 三种，其余尺寸能否用需实测。

### quality

`low` / `medium` / `high` / `auto`（默认 auto，由模型按提示词决定）。

### 尺寸别名（脚本本地功能，非接口参数）

脚本接受一批口语化别名并在发请求前换成实际像素值，见 SKILL.md 的别名表。
`--size 4k` 等价于 `--size 3840x2160`。

本地校验：脚本会在发请求前按上表四条约束检查尺寸，不合法直接报错并给出最近的合法建议，
避免白等一次网络往返才拿到 400。传 `auto` 或本地校验通过后，最终仍以服务端为准。

## 响应结构

```json
{
  "created": 1234567890,
  "data": [
    { "b64_json": "iVBORw0KGgo..." }
  ]
}
```

`data` 数组每项含 `b64_json`（base64 PNG）或 `url`（临时链接）。脚本两者都能落盘。

## 错误处理

非 2xx 时响应体形如 `{"error":{"message":"..."}}`，脚本提取 `error.message` 抛出。常见：

- 401：apiKey 无效或未填
- 400：参数不合法（size/quality 取值错误、prompt 为空）
- 429：限流，稍后重试
