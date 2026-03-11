# PieckyWD 部署指南

## 一键部署

```bash
pnpm run deploy
```

这条命令会依次执行两步：

1. `opennextjs-cloudflare build` — 把 Next.js 打包为 Cloudflare Workers 格式，输出到 `.open-next/`
2. `opennextjs-cloudflare deploy` — 调用 wrangler 推送到 Cloudflare

## 首次使用前

需要先登录 Cloudflare 账号（只需要做一次）：

```bash
pnpm wrangler login
```

浏览器会弹出授权页面，完成后凭证会自动保存。

## 本地预览（可选）

部署前可以在本地模拟 Cloudflare Workers 环境：

```bash
pnpm preview
```

## 本地开发

```bash
pnpm dev
```

默认访问 http://localhost:3000
