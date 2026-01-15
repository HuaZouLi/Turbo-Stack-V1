# 模块索引

> 项目所有模块的快速索引，帮助 AI 代理快速定位代码

## 目录结构概览

```
turbo-stack-v1/
├── .ai/                    # AI 规范资产
├── .kiro/                  # Kiro Agent 配置
├── apps/
│   ├── backend/            # 后端服务
│   ├── admin/              # 管理后台
│   └── mobile/             # 移动端
├── shared/                 # 共享代码
└── deploy/                 # 部署配置
```

## 后端模块 (apps/backend/)

### 核心模块

| 模块 | 路径 | 说明 |
|------|------|------|
| ruoyi-admin | `ruoyi-admin/` | 启动模块，包含 main 方法 |
| ruoyi-common | `ruoyi-common/` | 公共模块 |
| ruoyi-framework | `ruoyi-framework/` | 框架核心 |
| ruoyi-system | `ruoyi-modules/ruoyi-system/` | 系统管理 |
| ruoyi-generator | `ruoyi-modules/ruoyi-generator/` | 代码生成 |
| ruoyi-job | `ruoyi-modules/ruoyi-job/` | 定时任务 |
| ruoyi-demo | `ruoyi-modules/ruoyi-demo/` | 演示模块 |

### 公共子模块

| 模块 | 路径 | 说明 |
|------|------|------|
| common-core | `ruoyi-common/ruoyi-common-core/` | 核心工具类 |
| common-redis | `ruoyi-common/ruoyi-common-redis/` | Redis 封装 |
| common-mybatis | `ruoyi-common/ruoyi-common-mybatis/` | MyBatis 封装 |
| common-satoken | `ruoyi-common/ruoyi-common-satoken/` | Sa-Token 封装 |
| common-web | `ruoyi-common/ruoyi-common-web/` | Web 封装 |

### 关键文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 启动类 | `ruoyi-admin/src/.../RuoYiApplication.java` | 应用入口 |
| 主配置 | `ruoyi-admin/src/main/resources/application.yml` | 主配置文件 |
| 开发配置 | `ruoyi-admin/src/main/resources/application-dev.yml` | 开发环境配置 |
| Flyway | `ruoyi-admin/src/main/resources/db/migration/` | 数据库迁移脚本 |

## 管理后台 (apps/admin/)

### 目录结构

| 目录 | 说明 |
|------|------|
| `src/components/` | 公共组件 |
| `src/hooks/` | 自定义 Hooks |
| `src/layouts/` | 布局组件 |
| `src/router/` | 路由配置 |
| `src/service/` | API 服务 |
| `src/store/` | 状态管理 |
| `src/views/` | 页面组件 |

### 关键文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 入口 | `src/main.ts` | 应用入口 |
| 路由 | `src/router/index.ts` | 路由配置 |
| 请求 | `src/service/request/index.ts` | 请求封装 |
| 认证 | `src/store/modules/auth/index.ts` | 认证状态 |
| 字典 | `src/hooks/business/dict.ts` | 字典 Hook |

## 移动端 (apps/mobile/)

### 目录结构

| 目录 | 说明 |
|------|------|
| `src/pages/` | 页面组件 |
| `src/components/` | 公共组件 |
| `src/hooks/` | 自定义 Hooks |
| `src/http/` | 请求封装 |
| `src/store/` | 状态管理 |

### 关键文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 入口 | `src/main.ts` | 应用入口 |
| 页面配置 | `src/pages.json` | 页面路由配置 |
| 请求 | `src/http/http.ts` | 请求封装 |
| 字典 | `src/hooks/useDict.ts` | 字典 Hook |

## 共享层 (shared/)

| 目录 | 说明 | 关键文件 |
|------|------|---------|
| `types/` | 类型定义 | `dict.ts`, `api.d.ts` |
| `composables/` | Vue Composables | `useDict.ts` |
| `constants/` | 常量枚举 | `enums.ts` |
| `utils/` | 工具函数 | `index.ts` |

## 配置文件索引

### 根目录

| 文件 | 说明 |
|------|------|
| `pnpm-workspace.yaml` | Monorepo 工作区配置 |
| `package.json` | 根 package.json |
| `.gitignore` | Git 忽略配置 |

### 后端

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 父 POM |
| `application.yml` | Spring Boot 配置 |

### 前端

| 文件 | 说明 |
|------|------|
| `vite.config.ts` | Vite 配置 |
| `tsconfig.json` | TypeScript 配置 |
| `.env.*` | 环境变量 |
