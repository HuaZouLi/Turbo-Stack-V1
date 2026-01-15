# Turbo-Stack-V1

AI 原生的全栈开发底座，整合 RuoYi-Vue-Plus、Soybean Admin、Uni-best 三大开源项目。

## 技术栈

| 层级 | 技术选型 |
|-----|---------|
| 后端 | JDK 21 + Spring Boot 3.x + Undertow + Virtual Threads |
| ORM | MyBatis-Flex |
| 对象映射 | MapStruct |
| 权限 | Sa-Token + JWT |
| 管理后台 | Vue 3 + Vite + TypeScript + Naive UI + UnoCSS |
| 移动端 | Uni-app + Vue 3 + TypeScript + Wot Design Uni |
| 类型桥接 | openapi-typescript |

## 目录结构

```
turbo-stack-v1/
├── .ai/                    # AI 规范资产层
├── .kiro/                  # Kiro Agent 配置
├── apps/                   # 应用层
│   ├── backend/            # RuoYi-Vue-Plus 后端
│   ├── admin/              # Soybean Admin 管理后台
│   └── mobile/             # Uni-best 移动端
├── shared/                 # 共享层
│   ├── types/              # API 类型定义
│   ├── constants/          # 枚举常量
│   └── utils/              # 工具函数
├── deploy/                 # 运维部署层
│   ├── docker-compose.yml  # 中间件编排
│   └── nginx/              # 反向代理配置
└── pnpm-workspace.yaml     # Monorepo 配置
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- JDK 21
- Docker & Docker Compose

### 安装依赖

```bash
pnpm install
```

### 启动中间件

```bash
cd deploy
docker-compose up -d
```

### 启动后端

```bash
cd apps/backend
./mvnw spring-boot:run
```

### 启动管理后台

```bash
cd apps/admin
pnpm dev
```

### 启动移动端

```bash
cd apps/mobile
pnpm dev:h5
```

## 核心原则

1. **AI 原生**：AI Agent 能快速理解项目、生成代码、恢复上下文
2. **主干纯净**：启动时间 < 30 秒，不包含重量级扩展
3. **风格统一**：代码风格、UI 风格强制一致
4. **单一数据源**：改一处，其他自动同步

## 扩展分支

- `feature/saas` - 多租户支持
- `feature/flowable` - 工作流引擎
- `feature/microservice` - 微服务架构

## License

MIT
