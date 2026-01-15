# Turbo-Stack-V1 Master Document

> AI 代理的项目总览文档，包含架构决策、技术栈和核心原则

## 项目概述

Turbo-Stack-V1 是一个 AI-native 全栈开发脚手架，整合了企业级后端框架和现代前端技术栈。

### 核心目标

1. **AI-native**：AI 代理可快速理解和生成代码
2. **纯净轻量**：主干启动 < 30 秒，无冗余代码
3. **统一规范**：三端代码风格一致
4. **单一数据源**：类型、枚举、常量集中管理

## 技术栈

### 后端 (apps/backend/)

| 技术 | 版本 | 说明 |
|------|------|------|
| JDK | 21 | LTS 版本，支持 Virtual Threads |
| Spring Boot | 3.x | 最新稳定版 |
| Undertow | - | 高性能 Web 服务器 |
| MyBatis-Plus | - | 现有模块 ORM |
| MyBatis-Flex | - | 新模块 ORM（推荐） |
| Sa-Token | - | 权限认证框架 |
| MapStruct | - | 对象映射 |
| Flyway | - | 数据库版本管理 |

### 管理后台 (apps/admin/)

| 技术 | 说明 |
|------|------|
| Vue 3 | Composition API |
| Naive UI | 组件库 |
| Pinia | 状态管理 |
| Vue Router | 路由 |
| UnoCSS | 原子化 CSS |
| TypeScript | 类型安全 |

### 移动端 (apps/mobile/)

| 技术 | 说明 |
|------|------|
| Uni-app | 跨端框架 |
| Vue 3 | Composition API |
| Wot Design Uni | 组件库 |
| Pinia | 状态管理 |
| TypeScript | 类型安全 |

### 共享层 (shared/)

| 目录 | 说明 |
|------|------|
| types/ | TypeScript 类型定义 |
| composables/ | 平台无关的 Vue Composables |
| constants/ | 常量和枚举 |
| utils/ | 工具函数 |

## 架构决策记录 (ADR)

### ADR-001: ORM 策略

**决策**：现有模块保持 MyBatis-Plus，新模块使用 MyBatis-Flex

**原因**：
- 避免大规模重构风险
- MyBatis-Flex 更轻量、类型安全
- 两者可共存

### ADR-002: 字典管理

**决策**：使用 RuoYi 内置字典功能，前端通过 useDict hook 获取

**原因**：
- 零后端改动
- 数据库是单一数据源
- 前端自动缓存，性能优良

### ADR-003: 共享层架构

**决策**：核心逻辑放 shared/composables，各端通过依赖注入适配

**原因**：
- 高内聚：相关代码集中
- 低耦合：不依赖具体 HTTP 实现
- DRY：避免代码重复

## 核心原则

详见 `.kiro/steering/architecture-principles.md`

1. **参考业界最先进方案**
2. **高内聚，低耦合**
3. **维护性和扩展性**
4. **合理性和方便性**
5. **单一数据源**

## 目录结构

```
turbo-stack-v1/
├── .ai/                    # AI 规范资产
│   ├── MASTER.md           # 本文档
│   ├── context/            # 上下文文档
│   ├── rules/              # 开发规范
│   ├── prompts/            # Prompt 模板
│   └── templates/          # 代码模板
├── .kiro/                  # Kiro Agent 配置
│   ├── steering/           # 全局指导规则
│   └── specs/              # 功能规格
├── apps/
│   ├── backend/            # RuoYi-Vue-Plus 后端
│   ├── admin/              # Soybean Admin 管理后台
│   └── mobile/             # Uni-best 移动端
├── shared/                 # 共享代码
│   ├── types/              # 类型定义
│   ├── composables/        # Vue Composables
│   ├── constants/          # 常量枚举
│   └── utils/              # 工具函数
└── deploy/                 # 部署配置
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动后端
cd apps/backend && mvn spring-boot:run

# 启动管理后台
cd apps/admin && pnpm dev

# 启动移动端
cd apps/mobile && pnpm dev
```

## 相关文档

- [架构原则](.kiro/steering/architecture-principles.md)
- [后端开发规范](.ai/rules/java-backend.md)
- [前端开发规范](.ai/rules/vue-frontend.md)
- [移动端开发规范](.ai/rules/mobile.md)
