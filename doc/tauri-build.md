# PieckyWD Tauri 桌面应用打包指南

## 前置条件

- Rust 工具链（`rustup`、`rustc`、`cargo`）
- pnpm
- Xcode Command Line Tools（macOS）

## 一键打包（Mac M 系列芯片）

```bash
CI=false pnpm tauri:build --target aarch64-apple-darwin
```

> 如果环境中没有 `CI` 变量，可以直接运行 `pnpm tauri:build --target aarch64-apple-darwin`。
> 加 `CI=false` 是为了防止 CI 环境变量干扰 Tauri CLI 的参数解析。

打包产物在：

| 文件 | 路径 |
|------|------|
| .app 应用 | `src-tauri/target/aarch64-apple-darwin/release/bundle/macos/PieckyWD.app` |
| .dmg 安装包 | `src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/PieckyWD_0.1.0_aarch64.dmg` |

## 工作原理

打包时 Tauri 会先执行 `beforeBuildCommand`（配置在 `src-tauri/tauri.conf.json`）：

```
TAURI_BUILD=1 pnpm build
```

`TAURI_BUILD=1` 让 `next.config.ts` 启用 `output: "export"` 模式，将 Next.js 导出为纯静态 HTML 到 `out/` 目录，Tauri 再将其打包进桌面应用。

这样不会影响 Cloudflare Workers 的正常部署（`pnpm run deploy` 不带该环境变量）。

## 本地开发调试

```bash
CI=false pnpm tauri:dev
```

会同时启动 Next.js 开发服务器和 Tauri 窗口，支持热更新。
