# 项目状态

> 记录项目当前状态、进度和待办事项

## 当前版本

- **版本号**: 1.0.0-SNAPSHOT
- **更新日期**: 2026-01-15
- **状态**: 开发中

## 已完成功能

### 基础架构

- [x] Monorepo 目录结构
- [x] 后端 RuoYi-Vue-Plus 集成
- [x] 管理后台 Soybean Admin 集成
- [x] 移动端 Uni-best 集成
- [x] 共享层 (shared/) 架构

### 后端改造

- [x] JDK 21 升级
- [x] Virtual Threads 启用
- [x] MapStruct 集成
- [x] Flyway 数据库版本管理
- [x] MyBatis-Flex 支持（新模块）

### 前端对接

- [x] Sa-Token 认证对接
- [x] 动态路由加载
- [x] 类型桥接层 (openapi-typescript)
- [x] 字典 Hook (useDict)

### AI 规范

- [x] .ai 目录结构
- [x] MASTER.md 主文档
- [x] 开发规范文档
- [x] 架构原则 (steering)

## 进行中

- [ ] Prompt 模板
- [ ] 代码模板
- [ ] 代码风格检查配置
- [ ] Docker 部署配置

## 待开始

- [ ] CI/CD 配置
- [ ] 单元测试框架
- [ ] E2E 测试框架

## 已知问题

1. **SnailJob Server 未运行** - gRPC 连接失败，不影响核心功能
2. **Spring Boot Admin 未运行** - 监控功能暂不可用

## 技术债务

1. 现有模块仍使用 MyBatis-Plus，新模块使用 MyBatis-Flex
2. 部分 RuoYi 原有代码风格与新规范不一致

## 下一步计划

1. 完成 AI 规范资产层
2. 配置代码风格检查
3. 配置 Docker 部署
4. 编写使用文档
