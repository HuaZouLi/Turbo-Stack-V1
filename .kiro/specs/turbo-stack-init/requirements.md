# Requirements Document

## Introduction

Turbo-Stack-V1 是一个 2026 年工业级、AI 原生的全栈通用开发底座 (Boilerplate)。通过集成三个顶级开源项目（RuoYi-Vue-Plus、Soybean Admin、Uni-best）并进行深度改造，构建一个能够让 AI Agent 高效开发的标准化框架。

## Glossary

- **Turbo_Stack**: 本项目的全栈开发底座框架
- **Backend_Module**: 基于 RuoYi-Vue-Plus 的 Java 后端服务
- **Admin_Module**: 基于 Soybean Admin 的管理后台前端
- **Mobile_Module**: 基于 Uni-best 的移动端应用
- **AI_Context**: 存放 AI 规范和上下文的 .ai 目录
- **Shared_Layer**: 前后端共享的类型定义和工具层
- **Virtual_Threads**: JDK 21 的虚拟线程特性
- **Type_Bridge**: 后端 Swagger 到前端 TypeScript 类型的自动同步机制

## Requirements

### Requirement 1: 项目目录结构初始化

**User Story:** As a 开发者, I want 一个标准化的 Monorepo 目录结构, so that AI Agent 和人类开发者都能快速理解和导航项目。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 创建符合规范的根目录结构，包含 .ai、.kiro、apps、shared、deploy 五个核心目录
2. THE Turbo_Stack SHALL 创建 pnpm-workspace.yaml 配置文件以支持 Monorepo 管理
3. THE Turbo_Stack SHALL 创建 .gitignore 文件，排除 node_modules、target、dist 等构建产物
4. WHEN 目录结构创建完成 THEN THE Turbo_Stack SHALL 确保所有子目录包含必要的占位文件

### Requirement 2: AI 规范资产层 (.ai)

**User Story:** As a AI Agent, I want 一个结构化的规范资产库, so that 我能在任何时候快速理解项目架构和开发规范。

#### Acceptance Criteria

1. THE AI_Context SHALL 包含 MASTER.md 文件，记录顶层架构决策（JDK21、Undertow、MapStruct 等）
2. THE AI_Context SHALL 包含 rules/ 目录，存放各端开发规范（java-backend.md、vue-frontend.md、mobile.md）
3. THE AI_Context SHALL 包含 context/ 目录，存放业务上下文（术语表、架构图）
4. THE AI_Context SHALL 包含 prompts/ 目录，存放专用 Prompt 模板（gen-crud、gen-convert 等）
5. WHEN AI Agent 需要理解项目时 THEN THE AI_Context SHALL 提供完整的上下文信息

### Requirement 3: 后端技术栈配置 (Backend)

**User Story:** As a 后端开发者, I want 一个基于 JDK 21 + Virtual Threads + Undertow 的高性能后端框架, so that 系统能够高效处理高并发请求。

#### Acceptance Criteria

1. THE Backend_Module SHALL 基于 RuoYi-Vue-Plus 最新版本进行初始化
2. THE Backend_Module SHALL 配置 JDK 21 LTS 作为编译和运行环境
3. THE Backend_Module SHALL 启用 Virtual Threads（虚拟线程）特性
4. THE Backend_Module SHALL 使用 Undertow 替代默认的 Tomcat 作为 Web 服务器
5. THE Backend_Module SHALL 集成 MapStruct 替代 BeanUtils 进行对象映射
6. THE Backend_Module SHALL 使用 MyBatis-Flex 作为 ORM 框架
7. WHEN 后端启动时 THEN THE Backend_Module SHALL 在日志中显示 Undertow 和 Virtual Threads 已启用

### Requirement 4: 管理后台前端配置 (Admin)

**User Story:** As a 前端开发者, I want 一个基于 Vue 3 + Naive UI 的现代化管理后台, so that 能够快速构建美观且功能完善的管理界面。

#### Acceptance Criteria

1. THE Admin_Module SHALL 基于 Soybean Admin 最新版本进行初始化
2. THE Admin_Module SHALL 使用 Vue 3 + Vite + TypeScript 技术栈
3. THE Admin_Module SHALL 使用 Naive UI 作为 UI 组件库
4. THE Admin_Module SHALL 使用 UnoCSS 作为原子化 CSS 方案
5. THE Admin_Module SHALL 配置 .env 环境变量文件
6. WHEN 前端构建时 THEN THE Admin_Module SHALL 生成优化后的生产包

### Requirement 5: 移动端配置 (Mobile)

**User Story:** As a 移动端开发者, I want 一个基于 Uni-app + Vue 3 的跨平台移动应用框架, so that 能够一套代码发布到多个平台。

#### Acceptance Criteria

1. THE Mobile_Module SHALL 基于 Uni-best 最新版本进行初始化
2. THE Mobile_Module SHALL 使用 Uni-app + Vue 3 Setup + TypeScript 技术栈
3. THE Mobile_Module SHALL 使用 Wot Design Uni 作为 UI 组件库
4. WHEN 移动端构建时 THEN THE Mobile_Module SHALL 支持编译到 H5、微信小程序、App 等多端

### Requirement 6: 类型桥接层 (Type Bridge)

**User Story:** As a 全栈开发者, I want 后端 API 类型自动同步到前端, so that 前后端类型保持一致，减少接口对接错误。

#### Acceptance Criteria

1. THE Type_Bridge SHALL 使用 openapi-typescript 工具实现类型同步
2. THE Shared_Layer SHALL 包含 types/api.d.ts 文件，由脚本自动生成
3. THE Shared_Layer SHALL 包含 utils/ 目录，存放环境无关的工具函数
4. THE Shared_Layer SHALL 包含 constants/ 目录，存放核心枚举定义
5. WHEN 后端 Swagger 文档更新时 THEN THE Type_Bridge SHALL 能够重新生成前端类型定义

### Requirement 7: 运维部署层 (Deploy)

**User Story:** As a 运维工程师, I want 标准化的 Docker 编排和 Nginx 配置, so that 能够快速部署和扩展服务。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 包含 deploy/docker-compose.yml 文件，编排中间件服务
2. THE Turbo_Stack SHALL 包含 deploy/nginx/ 目录，存放反向代理配置
3. WHEN 执行 docker-compose up 时 THEN THE Turbo_Stack SHALL 启动所有必要的中间件服务

### Requirement 8: Kiro Agent 适配

**User Story:** As a AI Agent (Kiro), I want 项目配置适配 Kiro 的工作方式, so that 能够高效地理解和开发项目。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 在 .kiro/steering/ 目录配置规则路由
2. THE Turbo_Stack SHALL 在 .kiro/specs/ 目录存放需求文档
3. WHEN Kiro 读取项目时 THEN THE Turbo_Stack SHALL 提供清晰的导航和上下文

### Requirement 9: 业务模块生成规范 (CRUD Generator)

**User Story:** As a AI Agent, I want 标准化的业务模块生成规范, so that 能够根据需求文档快速生成完整的 CRUD 模块。

#### Acceptance Criteria

1. THE AI_Context SHALL 包含 gen-crud Prompt 模板，定义从需求到代码的转换规则
2. THE Turbo_Stack SHALL 定义标准的实体类、DTO、VO、Controller、Service、Mapper 生成规范
3. THE Turbo_Stack SHALL 定义前端页面（列表、表单、详情）的生成规范
4. WHEN AI Agent 收到业务需求时 THEN THE Turbo_Stack SHALL 提供清晰的代码生成指引
5. THE Turbo_Stack SHALL 支持批量生成多个关联模块

### Requirement 10: 第三方服务集成规范

**User Story:** As a 开发者, I want 标准化的第三方服务集成方式, so that 能够快速对接短信、支付、推送等外部服务。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供统一的第三方服务抽象层（SPI 模式）
2. THE Backend_Module SHALL 内置短信服务集成模板（阿里云、腾讯云等）
3. THE Backend_Module SHALL 提供配置化的服务参数管理
4. WHEN 需要对接新的第三方服务时 THEN THE Turbo_Stack SHALL 提供标准的集成指南
5. THE AI_Context SHALL 包含第三方服务集成的 Prompt 模板

### Requirement 11: 定时任务与消息队列

**User Story:** As a 后端开发者, I want 内置的定时任务和消息队列支持, so that 能够处理签到提醒、统计分析等异步任务。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成定时任务框架（如 XXL-Job 或 Spring Scheduler）
2. THE Backend_Module SHALL 支持动态配置定时任务参数
3. THE Backend_Module SHALL 提供消息队列集成（可选 Redis Stream 或 RabbitMQ）
4. WHEN 需要创建定时任务时 THEN THE Turbo_Stack SHALL 提供标准的任务定义模板
5. THE AI_Context SHALL 包含定时任务生成的 Prompt 模板

### Requirement 12: 数据统计与报表

**User Story:** As a 产品经理, I want 灵活的数据统计和报表功能, so that 能够快速生成各类业务分析报表。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供统计查询的标准模式（按日/周/月/年）
2. THE Admin_Module SHALL 集成图表组件（ECharts）
3. THE Turbo_Stack SHALL 定义统计报表的前后端联动规范
4. WHEN AI Agent 收到统计需求时 THEN THE Turbo_Stack SHALL 提供清晰的报表生成指引
5. THE AI_Context SHALL 包含统计报表生成的 Prompt 模板

### Requirement 13: 移动端核心功能支持

**User Story:** As a 移动端开发者, I want 框架内置常用移动端功能, so that 能够快速实现用户协议、隐私政策、一键求助等功能。

#### Acceptance Criteria

1. THE Mobile_Module SHALL 提供用户协议/隐私政策页面模板
2. THE Mobile_Module SHALL 提供简化注册流程的组件
3. THE Mobile_Module SHALL 支持调用系统短信功能
4. THE Mobile_Module SHALL 支持本地通知和推送通知
5. WHEN 需要实现紧急求助功能时 THEN THE Mobile_Module SHALL 提供一键触发模板

### Requirement 14: 权限与多租户（权限在主干，多租户在独立分支）

**User Story:** As a 系统架构师, I want 灵活的权限控制, so that 系统能够满足不同的权限需求。

#### Acceptance Criteria

1. THE Backend_Module SHALL 继承 RuoYi-Vue-Plus 的 RBAC 权限体系
2. THE Backend_Module SHALL 支持数据权限（部门级、个人级）
3. THE Backend_Module 主干 SHALL 不包含多租户代码（多租户在 feature/saas 分支）
4. WHEN 生成新模块时 THEN THE Turbo_Stack SHALL 自动集成权限注解
5. THE AI_Context SHALL 包含权限配置的标准指南

### Requirement 15: 代码风格与质量保障

**User Story:** As a 技术负责人, I want 统一的代码风格和质量检查, so that 无论是 AI 还是人类生成的代码都保持一致。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成 Checkstyle 和 SpotBugs
2. THE Admin_Module SHALL 集成 ESLint + Prettier
3. THE Mobile_Module SHALL 集成 ESLint + Prettier
4. THE Turbo_Stack SHALL 提供 pre-commit hooks 进行代码检查
5. WHEN 代码提交时 THEN THE Turbo_Stack SHALL 自动执行代码质量检查


### Requirement 16: 通用业务模式抽象

**User Story:** As a AI Agent, I want 框架预置常见业务模式的抽象, so that 能够快速识别需求并套用正确的实现模式。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义以下通用业务模式：
   - 状态机模式（订单流转、审批流程、状态切换）
   - 树形结构模式（组织架构、分类目录、菜单管理）
   - 主从表模式（订单-订单项、表单-明细）
   - 配置管理模式（系统参数、业务规则）
   - 日志审计模式（操作日志、数据变更）
2. THE AI_Context SHALL 为每种模式提供标准的数据模型和 API 设计
3. WHEN AI Agent 分析需求时 THEN THE AI_Context SHALL 帮助识别适用的业务模式
4. THE Turbo_Stack SHALL 提供每种模式的代码生成模板

### Requirement 17: 需求文档解析规范

**User Story:** As a AI Agent, I want 标准化的需求文档格式, so that 能够准确解析用户的自然语言需求。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义需求文档的标准结构（模块、功能点、字段、规则）
2. THE AI_Context SHALL 提供需求澄清的 Prompt 模板，引导用户补充缺失信息
3. THE AI_Context SHALL 定义从需求到数据模型的映射规则
4. WHEN 需求描述模糊时 THEN THE AI_Context SHALL 提供标准的澄清问题列表
5. THE AI_Context SHALL 支持中文需求文档的解析

### Requirement 18: 代码生成元数据

**User Story:** As a AI Agent, I want 完整的代码生成元数据, so that 能够生成风格统一、结构规范的代码。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义后端代码生成的元数据格式（实体、字段、关联、校验）
2. THE AI_Context SHALL 定义前端代码生成的元数据格式（页面、组件、表单、表格）
3. THE AI_Context SHALL 定义 API 接口的元数据格式（路径、方法、参数、响应）
4. WHEN 生成代码时 THEN THE Turbo_Stack SHALL 基于元数据生成完整的前后端代码
5. THE AI_Context SHALL 支持元数据的增量更新

### Requirement 19: 项目上下文恢复

**User Story:** As a AI Agent, I want 快速恢复项目上下文的能力, so that 即使忘记了之前的对话也能继续开发。

#### Acceptance Criteria

1. THE AI_Context SHALL 维护项目的当前状态文档（已完成模块、进行中任务）
2. THE AI_Context SHALL 提供项目结构的快速索引（模块清单、API 清单、页面清单）
3. THE Turbo_Stack SHALL 在每个模块目录下维护 README.md 说明文件
4. WHEN AI Agent 需要恢复上下文时 THEN THE AI_Context SHALL 提供标准的上下文加载流程
5. THE AI_Context SHALL 支持通过关键词快速定位相关代码

### Requirement 20: 错误处理与调试支持

**User Story:** As a AI Agent, I want 标准化的错误处理和调试指南, so that 能够快速定位和修复问题。

#### Acceptance Criteria

1. THE Backend_Module SHALL 定义统一的异常处理体系（业务异常、系统异常、第三方异常）
2. THE Backend_Module SHALL 提供标准的错误码体系
3. THE AI_Context SHALL 包含常见错误的排查指南
4. WHEN 出现错误时 THEN THE Turbo_Stack SHALL 提供清晰的错误信息和修复建议
5. THE AI_Context SHALL 包含调试技巧和日志分析指南


### Requirement 21: 数据库版本管理

**User Story:** As a 开发者, I want 数据库变更的版本化管理, so that 数据库结构能够安全地演进和回滚。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成 Flyway 进行数据库版本管理
2. THE Turbo_Stack SHALL 定义 SQL 脚本的命名规范（V{version}__{description}.sql）
3. THE Turbo_Stack SHALL 提供初始化脚本，将 RuoYi 现有 SQL 转换为 Flyway 基线（V1.0.0__init.sql）
4. THE Backend_Module SHALL 配置 Flyway 首次启动时忽略基线检查（baseline-on-migrate: true）
5. THE AI_Context SHALL 提供数据库变更的生成模板
6. WHEN 新增或修改表结构时 THEN THE Turbo_Stack SHALL 自动生成版本化的迁移脚本
7. THE Turbo_Stack SHALL 支持多环境的数据库初始化

### Requirement 22: API 版本管理（简化，非核心）

**User Story:** As a 架构师, I want API 的版本化管理, so that 能够平滑升级接口而不影响现有客户端。

#### Acceptance Criteria

1. THE Backend_Module SHALL 默认使用单版本 API（/api/）
2. THE AI_Context SHALL 提供 API 版本升级的指南（当真正需要时）
3. THE Turbo_Stack SHALL 不强制要求 /api/v1、/api/v2 的版本路径
4. WHEN 项目确实需要多版本 API 时 THEN THE AI_Context SHALL 提供版本迁移方案

### Requirement 23: 国际化支持 (i18n)

**User Story:** As a 产品经理, I want 系统支持多语言, so that 能够服务不同地区的用户。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供多语言消息管理
2. THE Admin_Module SHALL 集成 vue-i18n 支持前端国际化
3. THE Mobile_Module SHALL 支持多语言切换
4. THE AI_Context SHALL 定义国际化文案的管理规范
5. WHEN 生成新模块时 THEN THE Turbo_Stack SHALL 自动生成国际化占位符

### Requirement 24: 文件存储抽象

**User Story:** As a 开发者, I want 统一的文件存储接口, so that 能够灵活切换本地存储、OSS、S3 等存储方案。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供文件存储的统一抽象层
2. THE Backend_Module SHALL 内置本地存储、阿里云 OSS、MinIO 的实现
3. THE Backend_Module SHALL 支持配置化切换存储方案
4. THE AI_Context SHALL 提供文件上传功能的生成模板
5. WHEN 需要文件上传功能时 THEN THE Turbo_Stack SHALL 提供前后端完整方案

### Requirement 25: 缓存策略抽象

**User Story:** As a 后端开发者, I want 统一的缓存管理, so that 能够灵活使用本地缓存或分布式缓存。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供缓存的统一抽象层（支持 Caffeine、Redis）
2. THE Backend_Module SHALL 定义标准的缓存注解使用规范
3. THE AI_Context SHALL 定义缓存策略的选择指南（何时用本地、何时用分布式）
4. WHEN 生成查询接口时 THEN THE Turbo_Stack SHALL 提供缓存配置建议
5. THE Backend_Module SHALL 支持缓存预热和主动失效

### Requirement 26: 安全防护体系

**User Story:** As a 安全工程师, I want 完善的安全防护机制, so that 系统能够抵御常见的安全攻击。

#### Acceptance Criteria

1. THE Backend_Module SHALL 内置 XSS、SQL 注入、CSRF 防护
2. THE Backend_Module SHALL 提供接口限流和防刷机制
3. THE Backend_Module SHALL 支持敏感数据加密存储（手机号、身份证等）
4. THE Backend_Module SHALL 提供操作审计日志
5. THE AI_Context SHALL 定义安全编码规范
6. WHEN 生成涉及敏感数据的模块时 THEN THE Turbo_Stack SHALL 自动应用安全策略

### Requirement 27: 性能监控与链路追踪

**User Story:** As a 运维工程师, I want 完善的监控和追踪能力, so that 能够快速定位性能问题。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成 Micrometer 暴露监控指标
2. THE Backend_Module SHALL 支持链路追踪（可选 SkyWalking 或 Jaeger）
3. THE Backend_Module SHALL 提供慢 SQL 监控
4. THE AI_Context SHALL 定义性能优化的检查清单
5. WHEN 出现性能问题时 THEN THE AI_Context SHALL 提供排查指南

### Requirement 28: 测试体系

**User Story:** As a 质量工程师, I want 完善的测试支持, so that 能够保证代码质量。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供单元测试的基础设施（JUnit 5 + Mockito）
2. THE Backend_Module SHALL 提供集成测试的基础设施（Testcontainers）
3. THE Admin_Module SHALL 提供组件测试支持（Vitest）
4. THE AI_Context SHALL 定义测试用例的生成规范
5. WHEN 生成新模块时 THEN THE Turbo_Stack SHALL 同时生成基础测试用例

### Requirement 29: 文档自动化

**User Story:** As a 技术文档工程师, I want 文档自动生成, so that 文档能够与代码保持同步。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成 Swagger/OpenAPI 自动生成 API 文档
2. THE Backend_Module SHALL 支持 Javadoc 注释规范
3. THE AI_Context SHALL 定义代码注释的标准格式
4. WHEN 生成代码时 THEN THE Turbo_Stack SHALL 同时生成规范的注释
5. THE Turbo_Stack SHALL 支持生成 Markdown 格式的模块文档

### Requirement 30: 开发环境一键启动

**User Story:** As a 新加入的开发者, I want 一键启动开发环境, so that 能够快速开始开发工作。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 提供 docker-compose 一键启动所有中间件
2. THE Turbo_Stack SHALL 提供开发环境的初始化脚本
3. THE Turbo_Stack SHALL 提供示例数据的导入脚本
4. THE AI_Context SHALL 提供环境搭建的完整指南
5. WHEN 新开发者加入时 THEN THE Turbo_Stack SHALL 支持 30 分钟内完成环境搭建

### Requirement 31: 灰度发布与特性开关

**User Story:** As a 产品经理, I want 灰度发布能力, so that 能够安全地发布新功能。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供特性开关（Feature Toggle）机制
2. THE Backend_Module SHALL 支持按用户、租户、百分比进行灰度
3. THE AI_Context SHALL 定义灰度发布的标准流程
4. WHEN 发布新功能时 THEN THE Turbo_Stack SHALL 支持渐进式放量

### Requirement 32: 数据导入导出

**User Story:** As a 业务用户, I want 数据的批量导入导出, so that 能够高效处理大量数据。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供 Excel 导入导出的通用组件
2. THE Backend_Module SHALL 支持大数据量的异步导出
3. THE Admin_Module SHALL 提供导入导出的 UI 组件
4. THE AI_Context SHALL 提供导入导出功能的生成模板
5. WHEN 生成列表页面时 THEN THE Turbo_Stack SHALL 可选生成导入导出功能

### Requirement 33: WebSocket 实时通信

**User Story:** As a 开发者, I want 实时通信能力, so that 能够实现消息推送、在线状态等功能。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供 WebSocket 的基础设施
2. THE Backend_Module SHALL 支持消息广播和点对点通信
3. THE Admin_Module SHALL 提供 WebSocket 客户端封装
4. THE Mobile_Module SHALL 支持 WebSocket 连接
5. THE AI_Context SHALL 提供实时通信功能的生成模板

### Requirement 34: 工作流引擎集成（独立扩展包，不在主干）

**User Story:** As a 业务分析师, I want 可视化的工作流配置, so that 能够灵活定义审批流程。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 不在主干代码中集成 Flowable
2. THE Turbo_Stack SHALL 提供独立的 `feature/flowable` 分支
3. THE AI_Context SHALL 提供 Flowable 集成的 Prompt 模板
4. WHEN 项目需要工作流时 THEN THE AI_Context SHALL 指导从扩展分支合并
5. THE AI_Context SHALL 明确说明 Flowable 会增加几十张表和启动时间

### Requirement 35: 多端适配策略

**User Story:** As a 产品经理, I want 统一的多端适配策略, so that 同一功能在不同端有一致的体验。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义功能在 Admin/Mobile/H5 的差异化规范
2. THE AI_Context SHALL 定义 API 复用和差异化的策略
3. THE Turbo_Stack SHALL 支持同一需求生成多端代码
4. WHEN 生成新功能时 THEN THE AI_Context SHALL 明确各端的实现范围
5. THE AI_Context SHALL 提供多端联调的检查清单


### Requirement 36: 分布式事务支持

**User Story:** As a 架构师, I want 分布式事务的支持, so that 跨服务的数据一致性得到保障。

#### Acceptance Criteria

1. THE Backend_Module SHALL 可选集成 Seata 分布式事务框架
2. THE AI_Context SHALL 定义分布式事务的使用场景和最佳实践
3. THE AI_Context SHALL 提供最终一致性方案的设计模板
4. WHEN 需求涉及跨模块数据操作时 THEN THE AI_Context SHALL 评估事务需求

### Requirement 37: 幂等性设计

**User Story:** As a 后端开发者, I want 接口的幂等性保障, so that 重复请求不会产生副作用。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供幂等性注解和拦截器
2. THE Backend_Module SHALL 支持基于 Token 和业务键的幂等校验
3. THE AI_Context SHALL 定义需要幂等性保护的接口类型
4. WHEN 生成写操作接口时 THEN THE Turbo_Stack SHALL 自动评估幂等性需求

### Requirement 38: 数据脱敏

**User Story:** As a 安全工程师, I want 敏感数据的自动脱敏, so that 日志和接口返回不泄露隐私。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供数据脱敏注解（手机号、身份证、银行卡等）
2. THE Backend_Module SHALL 支持日志自动脱敏
3. THE Backend_Module SHALL 支持 API 响应自动脱敏
4. THE AI_Context SHALL 定义敏感字段的识别规则
5. WHEN 生成包含敏感字段的模块时 THEN THE Turbo_Stack SHALL 自动应用脱敏策略

### Requirement 39: 租户数据隔离（独立分支 feature/saas，不在主干）

**User Story:** As a SaaS 架构师, I want 严格的租户数据隔离, so that 不同租户的数据绝对安全。

#### Acceptance Criteria

1. THE Turbo_Stack 主干 SHALL 保持纯净单体架构，不包含任何多租户代码
2. THE Turbo_Stack SHALL 提供独立的 `feature/saas` 分支
3. THE feature/saas 分支 SHALL 支持多种隔离模式（共享表、独立 Schema、独立数据库）
4. THE AI_Context SHALL 提供 SaaS 模式的集成指南
5. WHEN 项目需要多租户时 THEN THE AI_Context SHALL 指导从 feature/saas 分支合并
6. THE AI_Context SHALL 明确说明多租户会增加约 30% 代码复杂度

### Requirement 40: 接口防重放攻击

**User Story:** As a 安全工程师, I want 接口防重放攻击, so that 系统能抵御请求重放攻击。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供请求签名验证机制
2. THE Backend_Module SHALL 支持时间戳和 Nonce 校验
3. THE AI_Context SHALL 定义需要防重放保护的接口类型
4. WHEN 生成敏感操作接口时 THEN THE Turbo_Stack SHALL 评估防重放需求

### Requirement 41: 配置中心集成（微服务模式专用，可选）

**User Story:** As a 运维工程师, I want 配置的集中管理和动态刷新, so that 能够不重启服务修改配置。

#### Acceptance Criteria

1. THE Backend_Module SHALL 默认使用本地配置文件（application.yml）
2. THE Backend_Module SHALL 可选集成 Nacos 配置中心（微服务场景）
3. WHEN 启用配置中心时 THEN THE Backend_Module SHALL 支持配置的动态刷新
4. WHEN 禁用配置中心时 THEN THE Backend_Module SHALL 作为普通单体应用运行
5. THE AI_Context SHALL 定义配置分类规范（静态配置 vs 动态配置）

### Requirement 42: 服务注册与发现（微服务模式专用，可选）

**User Story:** As a 架构师, I want 服务的自动注册和发现, so that 系统能够平滑扩展。

#### Acceptance Criteria

1. THE Backend_Module SHALL 默认作为单体应用运行，无需服务注册
2. THE Backend_Module SHALL 可选集成 Nacos 服务注册（微服务场景）
3. WHEN 启用服务注册时 THEN THE Backend_Module SHALL 支持服务健康检查
4. WHEN 禁用服务注册时 THEN THE Backend_Module SHALL 作为独立服务运行
5. THE AI_Context SHALL 定义微服务拆分的指导原则
6. WHEN 系统需要拆分微服务时 THEN THE Turbo_Stack SHALL 提供迁移指南

### Requirement 43: 代码热更新

**User Story:** As a 开发者, I want 开发时代码热更新, so that 能够快速看到修改效果。

#### Acceptance Criteria

1. THE Backend_Module SHALL 支持 Spring DevTools 热重载
2. THE Admin_Module SHALL 支持 Vite HMR 热更新
3. THE Mobile_Module SHALL 支持热重载
4. THE AI_Context SHALL 定义热更新的最佳实践

### Requirement 44: 代码生成器 UI

**User Story:** As a 开发者, I want 可视化的代码生成器, so that 能够快速生成标准模块。

#### Acceptance Criteria

1. THE Admin_Module SHALL 提供代码生成器页面
2. THE Turbo_Stack SHALL 支持从数据库表反向生成代码
3. THE Turbo_Stack SHALL 支持自定义代码模板
4. THE AI_Context SHALL 与代码生成器共享元数据格式
5. WHEN 使用代码生成器时 THEN THE Turbo_Stack SHALL 生成符合规范的完整模块

### Requirement 45: 依赖版本统一管理

**User Story:** As a 技术负责人, I want 依赖版本的统一管理, so that 避免版本冲突和安全漏洞。

#### Acceptance Criteria

1. THE Backend_Module SHALL 使用 BOM 统一管理依赖版本
2. THE Turbo_Stack SHALL 定义前端依赖的版本锁定策略
3. THE AI_Context SHALL 维护推荐的依赖版本清单
4. THE Turbo_Stack SHALL 提供依赖升级的检查脚本
5. WHEN 引入新依赖时 THEN THE AI_Context SHALL 检查版本兼容性


---

## 附录 A：三大框架内置功能清单

### RuoYi-Vue-Plus 5.x 内置功能（后端）

| 功能分类 | 内置功能 | 状态 |
|---------|---------|------|
| **Web 容器** | Undertow (已内置) | ✅ 保留 |
| **权限认证** | Sa-Token + JWT | ✅ 保留 |
| **三方登录** | JustAuth (微信、钉钉等) | ✅ 保留 |
| **数据库** | MySQL, Oracle, PostgreSQL, SQLServer | ✅ 保留 |
| **Redis 客户端** | Redisson | ✅ 保留 |
| **缓存注解** | Spring-Cache 扩展 | ✅ 保留 |
| **ORM** | MyBatis-Plus | ✅ 保留 |
| **SQL 监控** | p6spy | ✅ 保留 |
| **数据权限** | MyBatis-Plus 插件 | ✅ 保留 |
| **数据脱敏** | 注解 + Jackson | ✅ 保留 |
| **数据加解密** | BASE64, AES, RSA, SM2, SM4 | ✅ 保留 |
| **接口传输加密** | 动态 AES + RSA | ✅ 保留 |
| **数据翻译** | 注解 + Jackson | ✅ 保留 |
| **多数据源** | dynamic-datasource | ✅ 保留 |
| **多数据源事务** | 支持 | ✅ 保留 |
| **连接池** | HikariCP | ✅ 保留 |
| **主键策略** | 雪花 ID | ✅ 保留 |
| **WebSocket** | Spring 封装 + Token 认证 | ✅ 保留 |
| **序列化** | Jackson | ✅ 保留 |
| **分布式幂等** | 类似美团 GTIS | ✅ 保留 |
| **分布式锁** | Lock4j + Redisson | ✅ 保留 |
| **分布式任务** | SnailJob | ✅ 保留 |
| **文件存储** | MinIO | ✅ 保留 |
| **云存储** | AWS S3 协议 (七牛、阿里、腾讯) | ✅ 保留 |
| **短信** | sms4j (支持数十家) | ✅ 保留 |
| **邮件** | mail-api | ✅ 保留 |
| **接口文档** | SpringDoc + Javadoc | ✅ 保留 |
| **校验框架** | Validation | ✅ 保留 |
| **Excel** | EasyExcel | ✅ 保留 |
| **工具类** | Hutool + Lombok | ✅ 保留 |
| **监控** | SpringBoot-Admin | ✅ 保留 |
| **链路追踪** | SkyWalking (可选) | ✅ 保留 |
| **代码生成器** | 内置 | ✅ 保留 |
| **多租户** | MyBatis-Plus 插件 | ✅ 保留 |
| **国际化** | 内置 | ✅ 保留 |

### Soybean Admin 内置功能（管理后台前端）

| 功能分类 | 内置功能 | 状态 |
|---------|---------|------|
| **技术栈** | Vue3 + Vite6 + TypeScript + Pinia | ✅ 保留 |
| **UI 组件** | Naive UI | ✅ 保留 |
| **CSS 方案** | UnoCSS | ✅ 保留 |
| **主题配置** | 丰富的主题定制 | ✅ 保留 |
| **国际化** | vue-i18n | ✅ 保留 |
| **路由系统** | Elegant Router (文件路由) | ✅ 保留 |
| **权限路由** | 前端静态 + 后端动态 | ✅ 保留 |
| **页面组件** | 403/404/500 + 布局组件 | ✅ 保留 |
| **命令行工具** | git 提交、发布等 | ✅ 保留 |
| **移动端适配** | 响应式布局 | ✅ 保留 |

### Uni-best 内置功能（移动端）

| 功能分类 | 内置功能 | 状态 |
|---------|---------|------|
| **技术栈** | Uni-app + Vue3 + TypeScript | ✅ 保留 |
| **UI 组件** | Wot Design Uni | ✅ 保留 |
| **多端支持** | H5、微信小程序、App | ✅ 保留 |
| **组件自动导入** | easycom | ✅ 保留 |
| **类型支持** | TypeScript 完整支持 | ✅ 保留 |

---

## 附录 B：需求与框架功能映射

### 已由框架内置的需求（无需额外开发）

| 需求编号 | 需求名称 | 框架支持 |
|---------|---------|---------|
| R10 | 第三方服务集成 | RuoYi-Vue-Plus (sms4j, JustAuth, S3) |
| R11 | 定时任务 | RuoYi-Vue-Plus (SnailJob) |
| R21 | 数据库版本管理 | 需确认是否内置 Flyway |
| R23 | 国际化 | 三端均内置 |
| R24 | 文件存储 | RuoYi-Vue-Plus (MinIO + S3) |
| R25 | 缓存策略 | RuoYi-Vue-Plus (Redisson + Spring-Cache) |
| R26 | 安全防护 | RuoYi-Vue-Plus (加密、脱敏、传输加密) |
| R27 | 性能监控 | RuoYi-Vue-Plus (SpringBoot-Admin, SkyWalking) |
| R32 | 数据导入导出 | RuoYi-Vue-Plus (EasyExcel) |
| R33 | WebSocket | RuoYi-Vue-Plus (内置) |
| R36 | 分布式事务 | RuoYi-Vue-Plus (dynamic-datasource) |
| R37 | 幂等性 | RuoYi-Vue-Plus (内置) |
| R38 | 数据脱敏 | RuoYi-Vue-Plus (内置) |
| R39 | 租户数据隔离 | RuoYi-Vue-Plus (MyBatis-Plus 插件) |
| R44 | 代码生成器 UI | RuoYi-Vue-Plus (内置) |

### 需要改造或增强的需求

| 需求编号 | 需求名称 | 改造内容 |
|---------|---------|---------|
| R3 | 后端技术栈 | 升级 JDK 21 + 启用 Virtual Threads |
| R3 | 后端技术栈 | 强制集成 MapStruct |
| R6 | 类型桥接 | 新增 openapi-typescript 自动同步 |
| R9 | CRUD 生成规范 | 扩展代码生成器，适配 AI Agent |
| R16 | 业务模式抽象 | 新增 AI 可识别的模式库 |
| R17 | 需求解析规范 | 新增 AI 专用的需求模板 |
| R18 | 代码生成元数据 | 扩展代码生成器元数据格式 |
| R19 | 上下文恢复 | 新增项目状态文档机制 |
| R35 | 多端适配策略 | 新增三端联动规范 |

### 需要新增的需求

| 需求编号 | 需求名称 | 新增原因 |
|---------|---------|---------|
| R2 | AI 规范资产层 | 框架无此概念，AI 原生需求 |
| R8 | Kiro Agent 适配 | 框架无此概念，AI 原生需求 |
| R20 | 错误处理指南 | 框架有实现但缺少 AI 可读的指南 |
| R29 | 文档自动化 | 需要增强 AI 可读性 |
| R34 | 工作流引擎 | 需要集成 Flowable |

---

## 附录 C：改造优先级

### P0 - 必须改造（框架核心）

1. **JDK 21 + Virtual Threads** - 性能基础
2. **MapStruct 集成** - 代码质量
3. **AI 规范资产层 (.ai)** - AI 原生核心
4. **类型桥接 (openapi-typescript)** - 前后端协作

### P1 - 重要改造（开发效率）

1. **需求解析规范** - AI 理解需求
2. **业务模式抽象** - AI 识别模式
3. **代码生成元数据扩展** - AI 生成代码
4. **上下文恢复机制** - AI 连续开发

### P2 - 增强功能（可选）

1. **工作流引擎集成** - 按需启用
2. **多端适配策略** - 按需启用
3. **灰度发布** - 按需启用


### Requirement 46: 三框架适配与集成

**User Story:** As a 全栈开发者, I want 三个框架无缝协作, so that 前后端和移动端能够高效联调。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 统一三端的 API 请求封装（axios/uni.request）
2. THE Turbo_Stack SHALL 统一三端的 Token 认证机制（与 Sa-Token 对接）
3. THE Turbo_Stack SHALL 统一三端的错误码和错误处理
4. THE Admin_Module SHALL 与 RuoYi-Vue-Plus 的权限体系完全对接
5. THE Mobile_Module SHALL 复用 Admin_Module 的 API 类型定义
6. THE Type_Bridge SHALL 同时为 Admin 和 Mobile 生成类型文件
7. WHEN 后端 API 变更时 THEN THE Type_Bridge SHALL 同步更新两端类型
8. THE AI_Context SHALL 定义三端联调的标准流程

### Requirement 47: 统一登录与会话管理

**User Story:** As a 用户, I want 在不同端使用统一的账号体系, so that 能够无缝切换设备。

#### Acceptance Criteria

1. THE Backend_Module SHALL 使用 Sa-Token 管理所有端的会话
2. THE Backend_Module SHALL 支持多端同时在线（Admin + Mobile）
3. THE Backend_Module SHALL 支持单端踢出（可配置）
4. THE Admin_Module SHALL 使用 Token 进行身份认证
5. THE Mobile_Module SHALL 使用相同的 Token 机制
6. WHEN 用户在一端登出时 THEN THE Backend_Module SHALL 可配置是否踢出其他端

### Requirement 48: 统一数据字典

**User Story:** As a 开发者, I want 三端共享数据字典, so that 下拉选项、状态码等保持一致。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供数据字典管理功能（RuoYi-Vue-Plus 内置）
2. THE Admin_Module SHALL 从后端获取字典数据并缓存
3. THE Mobile_Module SHALL 从后端获取字典数据并缓存
4. THE Type_Bridge SHALL 将字典枚举同步为 TypeScript 类型
5. WHEN 字典数据变更时 THEN THE Turbo_Stack SHALL 通知前端刷新缓存


### Requirement 49: 前端组件库扩展

**User Story:** As a 前端开发者, I want 预置常用业务组件, so that 能够快速搭建页面而不是从零开始。

#### Acceptance Criteria

1. THE Admin_Module SHALL 提供表格增强组件（可编辑表格、虚拟滚动）
2. THE Admin_Module SHALL 提供表单增强组件（动态表单、表单联动）
3. THE Admin_Module SHALL 提供图表组件封装（ECharts 二次封装）
4. THE Admin_Module SHALL 提供富文本编辑器组件
5. THE Mobile_Module SHALL 提供下拉刷新、上拉加载组件
6. THE Mobile_Module SHALL 提供扫码组件
7. THE AI_Context SHALL 定义组件使用的标准指南

### Requirement 50: API Mock 与联调

**User Story:** As a 前端开发者, I want 在后端未完成时也能开发, so that 前后端可以并行开发。

#### Acceptance Criteria

1. THE Admin_Module SHALL 集成 Mock 服务（ApiFox 或 MSW）
2. THE Mobile_Module SHALL 支持 Mock 数据
3. THE Turbo_Stack SHALL 定义 Mock 数据的标准格式
4. WHEN 后端 API 未就绪时 THEN THE Admin_Module SHALL 自动切换到 Mock 模式
5. THE AI_Context SHALL 提供 Mock 数据生成的 Prompt 模板

### Requirement 51: 前端状态管理规范

**User Story:** As a 前端开发者, I want 清晰的状态管理规范, so that 代码结构统一且易维护。

#### Acceptance Criteria

1. THE Admin_Module SHALL 使用 Pinia 进行状态管理
2. THE Mobile_Module SHALL 使用 Pinia 进行状态管理
3. THE AI_Context SHALL 定义 Store 的命名和结构规范
4. THE AI_Context SHALL 定义何时使用全局状态 vs 组件状态
5. WHEN 生成新模块时 THEN THE Turbo_Stack SHALL 自动生成对应的 Store

### Requirement 52: 前端请求封装规范

**User Story:** As a 前端开发者, I want 统一的请求封装, so that 错误处理、loading、缓存等逻辑不需要重复写。

#### Acceptance Criteria

1. THE Admin_Module SHALL 提供统一的 axios 封装（请求/响应拦截）
2. THE Mobile_Module SHALL 提供统一的 uni.request 封装
3. THE Turbo_Stack SHALL 统一错误码处理逻辑
4. THE Turbo_Stack SHALL 提供请求缓存机制
5. THE Turbo_Stack SHALL 提供请求重试机制
6. THE AI_Context SHALL 定义 API 调用的标准模式

### Requirement 53: 前端路由与权限

**User Story:** As a 前端开发者, I want 路由与权限自动关联, so that 不需要手动维护权限配置。

#### Acceptance Criteria

1. THE Admin_Module SHALL 支持后端动态路由（RuoYi-Vue-Plus 菜单管理）
2. THE Admin_Module SHALL 支持按钮级权限控制
3. THE Mobile_Module SHALL 支持页面级权限控制
4. THE AI_Context SHALL 定义权限配置的标准流程
5. WHEN 生成新页面时 THEN THE Turbo_Stack SHALL 自动配置路由和权限

### Requirement 54: 环境配置管理

**User Story:** As a 开发者, I want 清晰的多环境配置, so that 开发、测试、生产环境能够轻松切换。

#### Acceptance Criteria

1. THE Backend_Module SHALL 支持 dev/test/prod 多环境配置
2. THE Admin_Module SHALL 支持 .env.development/.env.production 配置
3. THE Mobile_Module SHALL 支持多环境配置
4. THE Turbo_Stack SHALL 提供环境变量的标准命名规范
5. THE AI_Context SHALL 定义敏感配置的处理方式

### Requirement 55: 日志规范

**User Story:** As a 运维工程师, I want 结构化的日志输出, so that 能够快速定位问题。

#### Acceptance Criteria

1. THE Backend_Module SHALL 使用结构化日志（JSON 格式可选）
2. THE Backend_Module SHALL 支持日志分级（DEBUG/INFO/WARN/ERROR）
3. THE Backend_Module SHALL 支持请求链路 ID 追踪
4. THE Admin_Module SHALL 提供前端错误上报机制
5. THE Mobile_Module SHALL 提供前端错误上报机制
6. THE AI_Context SHALL 定义日志打印的标准规范

### Requirement 56: 数据库设计规范

**User Story:** As a 数据库设计师, I want 统一的数据库设计规范, so that 表结构清晰且易于维护。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义表命名规范（前缀、大小写）
2. THE AI_Context SHALL 定义字段命名规范（下划线、类型后缀）
3. THE AI_Context SHALL 定义必备字段（id、create_time、update_time、del_flag 等）
4. THE AI_Context SHALL 定义索引设计规范
5. THE AI_Context SHALL 定义外键使用规范（推荐逻辑外键）
6. WHEN AI Agent 设计数据库时 THEN THE AI_Context SHALL 提供标准模板

### Requirement 57: 接口设计规范

**User Story:** As a 后端开发者, I want 统一的 RESTful API 设计规范, so that 接口风格一致且易于理解。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义 URL 命名规范（资源名、版本号）
2. THE AI_Context SHALL 定义 HTTP 方法使用规范（GET/POST/PUT/DELETE）
3. THE AI_Context SHALL 定义请求参数规范（Query/Body/Path）
4. THE AI_Context SHALL 定义响应格式规范（code/msg/data）
5. THE AI_Context SHALL 定义分页参数规范（pageNum/pageSize/total）
6. WHEN AI Agent 设计接口时 THEN THE AI_Context SHALL 提供标准模板

### Requirement 58: 异常处理规范

**User Story:** As a 后端开发者, I want 统一的异常处理机制, so that 错误信息清晰且便于排查。

#### Acceptance Criteria

1. THE Backend_Module SHALL 定义业务异常类（ServiceException）
2. THE Backend_Module SHALL 定义全局异常处理器
3. THE Backend_Module SHALL 定义标准错误码体系（模块+错误类型+序号）
4. THE AI_Context SHALL 定义异常抛出的标准方式
5. THE AI_Context SHALL 定义错误码分配规则
6. WHEN 生成新模块时 THEN THE Turbo_Stack SHALL 自动分配错误码段

### Requirement 59: 单元测试规范

**User Story:** As a 开发者, I want 清晰的测试规范, so that 能够编写有效的单元测试。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成 JUnit 5 + Mockito
2. THE Backend_Module SHALL 提供测试基类和工具类
3. THE AI_Context SHALL 定义测试用例的命名规范
4. THE AI_Context SHALL 定义测试覆盖率要求
5. THE AI_Context SHALL 定义 Mock 数据的生成规范
6. WHEN 生成新模块时 THEN THE Turbo_Stack SHALL 可选生成测试用例

### Requirement 60: Git 工作流规范

**User Story:** As a 团队负责人, I want 统一的 Git 工作流, so that 代码管理有序且可追溯。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义分支命名规范（feature/bugfix/hotfix）
2. THE AI_Context SHALL 定义 Commit Message 规范（Conventional Commits）
3. THE AI_Context SHALL 定义 PR/MR 模板
4. THE Turbo_Stack SHALL 集成 commitlint 和 husky
5. WHEN 提交代码时 THEN THE Turbo_Stack SHALL 自动校验 Commit Message


---

## 核心设计原则（AI 友好）

### Requirement 61: 单一数据源原则

**User Story:** As a AI Agent, I want 每个信息只在一个地方定义, so that 修改时只需要改一处。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 遵循"单一数据源"原则
2. 数据库表结构 → 唯一定义在 SQL 文件
3. API 类型 → 唯一定义在后端 Swagger，前端自动生成
4. 数据字典 → 唯一定义在后端，前端自动同步
5. 权限配置 → 唯一定义在后端菜单管理
6. WHEN 修改字段时 THEN THE Turbo_Stack SHALL 只需修改一处，其他自动同步

### Requirement 62: 分层清晰原则

**User Story:** As a AI Agent, I want 代码分层清晰, so that 知道该改哪个文件。

#### Acceptance Criteria

1. THE Backend_Module SHALL 严格遵循分层架构：
   - Controller → 只做参数校验和响应封装
   - Service → 只做业务逻辑
   - Mapper → 只做数据访问
   - DTO/VO → 只做数据传输
2. THE Admin_Module SHALL 严格遵循分层架构：
   - views → 页面组件
   - api → 接口调用
   - stores → 状态管理
   - components → 通用组件
3. THE AI_Context SHALL 提供"改什么功能改哪个文件"的快速索引

### Requirement 63: 约定优于配置

**User Story:** As a AI Agent, I want 遵循约定而不是大量配置, so that 能够快速理解项目结构。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 定义标准的文件命名约定
2. THE Turbo_Stack SHALL 定义标准的目录结构约定
3. THE AI_Context SHALL 提供约定速查表
4. WHEN AI Agent 需要创建新文件时 THEN THE AI_Context SHALL 明确告知放在哪里
5. 示例约定：
   - 用户模块 → `ruoyi-system/src/main/java/.../user/`
   - 用户页面 → `src/views/system/user/`
   - 用户 API → `src/api/system/user.ts`

### Requirement 64: 最小改动原则

**User Story:** As a AI Agent, I want 改动范围最小化, so that 不会引入意外的 bug。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 设计高内聚低耦合的模块结构
2. THE AI_Context SHALL 提供"影响范围分析"指南
3. WHEN 修改某个功能时 THEN THE AI_Context SHALL 列出可能影响的文件
4. THE Turbo_Stack SHALL 避免全局状态的滥用
5. THE Turbo_Stack SHALL 使用依赖注入而非硬编码

### Requirement 65: 上下文快速恢复

**User Story:** As a AI Agent, I want 快速理解项目当前状态, so that 即使丢失上下文也能继续开发。

#### Acceptance Criteria

1. THE AI_Context SHALL 维护 `PROJECT_STATUS.md` 文件，记录：
   - 已完成的模块列表
   - 进行中的任务
   - 待办事项
2. THE AI_Context SHALL 维护 `MODULE_INDEX.md` 文件，记录：
   - 每个模块的功能描述
   - 关键文件路径
   - 依赖关系
3. WHEN AI Agent 开始新会话时 THEN THE AI_Context SHALL 提供快速上下文加载流程
4. THE Turbo_Stack SHALL 在每个模块目录下维护 `README.md`

### Requirement 66: 错误自愈指南

**User Story:** As a AI Agent, I want 遇到错误时知道如何修复, so that 不会卡在问题上。

#### Acceptance Criteria

1. THE AI_Context SHALL 维护常见错误的解决方案库
2. THE AI_Context SHALL 提供错误排查的标准流程
3. WHEN 遇到编译错误时 THEN THE AI_Context SHALL 提供修复建议
4. WHEN 遇到运行时错误时 THEN THE AI_Context SHALL 提供排查步骤
5. THE AI_Context SHALL 记录项目特有的"坑"和解决方案

### Requirement 67: 渐进式复杂度

**User Story:** As a AI Agent, I want 从简单到复杂渐进式开发, so that 不会一开始就被复杂度压垮。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 支持最小化启动（只启用核心功能）
2. THE Turbo_Stack SHALL 支持按需启用高级功能（多租户、工作流等）
3. THE AI_Context SHALL 定义功能的依赖关系图
4. WHEN 开发新项目时 THEN THE AI_Context SHALL 推荐从核心功能开始
5. THE AI_Context SHALL 提供功能启用的标准流程

---

## AI Agent 快速参考

### 文件定位速查表

| 要改什么 | 后端文件位置 | 前端文件位置 |
|---------|-------------|-------------|
| 新增表 | `sql/` | - |
| 新增实体 | `domain/entity/` | - |
| 新增接口 | `controller/` | `api/` |
| 新增业务逻辑 | `service/impl/` | - |
| 新增页面 | - | `views/` |
| 新增组件 | - | `components/` |
| 修改权限 | 后台菜单管理 | 自动同步 |
| 修改字典 | 后台字典管理 | 自动同步 |

### 改动影响范围

| 改动类型 | 影响文件数 | 说明 |
|---------|-----------|------|
| 新增字段 | 3-5 | Entity + DTO + VO + 前端类型 |
| 新增接口 | 2-3 | Controller + Service + 前端 API |
| 新增页面 | 2-4 | 页面 + 路由 + API + Store(可选) |
| 修改业务逻辑 | 1-2 | Service + 测试 |
| 修改 UI | 1 | 页面组件 |


---

## 附录 D：主干 vs 扩展分支

### 主干（main）- 纯净轻量底座

**包含：**
- 核心技术栈（JDK 21 + Virtual Threads + Undertow）
- 基础权限（RBAC，无多租户）
- 代码生成器
- 文件存储（MinIO）
- 缓存（Redis）
- 定时任务（SnailJob）
- 短信/邮件
- 第三方登录（JustAuth）
- AI 规范资产层（.ai）
- 类型桥接（openapi-typescript）

**不包含：**
- ❌ 多租户代码
- ❌ 工作流引擎
- ❌ 微服务组件（Nacos）

**启动时间目标：** < 30 秒

### 扩展分支（可选，按需合并）

| 分支名 | 功能 | 适用场景 | 可组合 |
|-------|------|---------|--------|
| `feature/saas` | 多租户 + 数据隔离 | SaaS 平台 | ✅ 可与微服务组合 |
| `feature/flowable` | 工作流引擎 | 审批流程 | ✅ 可与任意分支组合 |
| `feature/microservice` | 微服务拆分 (Nacos) | 大型系统 | ✅ 可与多租户组合 |

### 分支组合矩阵

| 组合 | 适用场景 | 复杂度 |
|-----|---------|--------|
| main | 普通单体应用 | ⭐ |
| main + flowable | 带审批流的单体应用 | ⭐⭐ |
| main + saas | 多租户 SaaS（单体） | ⭐⭐ |
| main + microservice | 微服务架构（无多租户） | ⭐⭐⭐ |
| main + saas + microservice | 多租户 SaaS（微服务） | ⭐⭐⭐⭐ |
| main + saas + flowable | 多租户 SaaS + 工作流 | ⭐⭐⭐ |
| main + saas + microservice + flowable | 全功能企业级 SaaS | ⭐⭐⭐⭐⭐ |

### 分支合并顺序（重要！）

如果需要组合多个扩展，建议按以下顺序合并：

```bash
# 1. 基于主干创建项目
git clone turbo-stack-v1 my-project
cd my-project

# 2. 先合并 saas（如果需要多租户）
git merge origin/feature/saas

# 3. 再合并 microservice（如果需要微服务）
git merge origin/feature/microservice

# 4. 最后合并 flowable（如果需要工作流）
git merge origin/feature/flowable
```

**合并顺序原因：**
- `saas` 会修改数据模型（增加 tenant_id）
- `microservice` 会拆分模块结构
- `flowable` 是独立功能，最后合并冲突最少

### 分支维护策略

1. **主干优先**：所有 bug 修复先在 main 修复，再同步到扩展分支
2. **定期同步**：扩展分支定期 rebase main，保持同步
3. **独立测试**：每个扩展分支有独立的 CI/CD 测试


### Requirement 68: 枚举跨端同步

**User Story:** As a 全栈开发者, I want Java 枚举自动同步到前端, so that 下拉框选项和状态码不需要手动维护。

#### Acceptance Criteria

1. THE Backend_Module SHALL 提供 `/system/dict/enum` 接口，暴露所有业务枚举
2. THE Backend_Module SHALL 使用注解标记需要暴露的枚举（如 @DictEnum）
3. THE Type_Bridge SHALL 在生成 TS 类型时包含枚举的字面量值
4. THE Admin_Module SHALL 提供枚举到下拉框的自动转换工具
5. THE Mobile_Module SHALL 复用相同的枚举类型定义
6. WHEN 后端枚举变更时 THEN THE Type_Bridge SHALL 自动更新前端类型
7. 示例：
   ```java
   @DictEnum(name = "用户状态")
   public enum UserStatus {
       NORMAL(0, "正常"),
       DISABLED(1, "禁用");
   }
   ```
   生成的 TS：
   ```typescript
   export const UserStatus = {
       NORMAL: { value: 0, label: '正常' },
       DISABLED: { value: 1, label: '禁用' }
   } as const;
   ```

### Requirement 69: 字典与枚举的统一管理

**User Story:** As a 开发者, I want 字典和枚举有统一的管理方式, so that 不会混乱。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义何时使用数据库字典 vs Java 枚举：
   - 数据库字典：运营可配置的选项（如：商品分类、地区）
   - Java 枚举：代码逻辑依赖的状态（如：订单状态、用户状态）
2. THE Backend_Module SHALL 提供统一的字典/枚举查询接口
3. THE Admin_Module SHALL 提供统一的字典/枚举选择组件
4. THE AI_Context SHALL 在生成代码时自动判断使用字典还是枚举


### Requirement 70: 代码风格强制统一

**User Story:** As a 技术负责人, I want AI 生成的代码风格与现有代码完全一致, so that 代码库保持统一。

#### Acceptance Criteria

1. THE Backend_Module SHALL 集成 Checkstyle + SpotBugs，强制代码风格
2. THE Admin_Module SHALL 集成 ESLint + Prettier，强制代码风格
3. THE Mobile_Module SHALL 集成 ESLint + Prettier，强制代码风格
4. THE Turbo_Stack SHALL 配置 pre-commit hooks，提交前自动格式化
5. THE AI_Context SHALL 提供代码风格示例文件（每种文件类型一个示例）
6. WHEN AI Agent 生成代码时 THEN THE AI_Context SHALL 要求参考示例文件的风格
7. THE Turbo_Stack SHALL 提供 `npm run lint:fix` 和 `mvn checkstyle:check` 命令

### Requirement 71: 页面 UI 风格统一

**User Story:** As a 产品经理, I want 所有页面的 UI 风格保持一致, so that 用户体验统一。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义 UI 设计规范文档，包含：
   - 颜色规范（主色、辅色、状态色）
   - 间距规范（margin、padding 标准值）
   - 字体规范（字号、字重）
   - 组件使用规范（何时用 Table、何时用 Card）
2. THE Admin_Module SHALL 提供标准页面模板：
   - 列表页模板（搜索 + 表格 + 分页）
   - 表单页模板（新增/编辑）
   - 详情页模板
   - 统计页模板（图表 + 数据卡片）
3. THE Mobile_Module SHALL 提供标准页面模板：
   - 列表页模板
   - 表单页模板
   - 详情页模板
4. WHEN AI Agent 生成页面时 THEN THE AI_Context SHALL 要求基于模板生成
5. THE AI_Context SHALL 提供"页面截图参考"，让 AI 理解视觉效果

### Requirement 72: 组件使用规范

**User Story:** As a 前端开发者, I want 组件使用有明确规范, so that 不会出现同一功能用不同组件实现。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义组件选择决策树：
   - 选择一个 → Select
   - 选择多个 → Checkbox / Transfer
   - 是/否 → Switch
   - 日期 → DatePicker
   - 日期范围 → RangePicker
   - 长文本 → Textarea
   - 富文本 → Editor
2. THE AI_Context SHALL 定义表格列类型规范：
   - 状态 → Tag
   - 操作 → Button Group
   - 图片 → Image Preview
   - 时间 → 格式化显示
3. WHEN AI Agent 生成表单时 THEN THE AI_Context SHALL 根据字段类型自动选择组件

### Requirement 73: 命名规范强制

**User Story:** As a 开发者, I want 命名规范被强制执行, so that 代码可读性高。

#### Acceptance Criteria

1. THE AI_Context SHALL 定义后端命名规范：
   - 类名：PascalCase（UserController）
   - 方法名：camelCase（getUserById）
   - 常量：UPPER_SNAKE_CASE（MAX_PAGE_SIZE）
   - 数据库表：snake_case（sys_user）
   - 数据库字段：snake_case（create_time）
2. THE AI_Context SHALL 定义前端命名规范：
   - 组件名：PascalCase（UserList.vue）
   - 变量名：camelCase（userList）
   - CSS 类名：kebab-case（user-list-item）
   - 常量：UPPER_SNAKE_CASE（API_BASE_URL）
3. THE Turbo_Stack SHALL 配置 ESLint 规则强制命名规范
4. WHEN AI Agent 生成代码时 THEN THE AI_Context SHALL 检查命名是否符合规范

### Requirement 74: 代码模板库

**User Story:** As a AI Agent, I want 有现成的代码模板可以参考, so that 生成的代码风格一致。

#### Acceptance Criteria

1. THE AI_Context SHALL 提供后端代码模板：
   - Controller 模板（CRUD 完整示例）
   - Service 模板
   - Mapper 模板
   - Entity/DTO/VO 模板
2. THE AI_Context SHALL 提供前端代码模板：
   - 列表页模板（.vue 完整示例）
   - 表单页模板
   - API 调用模板
   - Store 模板
3. THE AI_Context SHALL 提供移动端代码模板：
   - 列表页模板
   - 表单页模板
4. WHEN AI Agent 生成新模块时 THEN THE AI_Context SHALL 要求基于模板生成
5. THE Turbo_Stack SHALL 在 `.ai/templates/` 目录存放所有模板

### Requirement 75: 风格一致性检查

**User Story:** As a 技术负责人, I want 自动检查风格一致性, so that 不一致的代码无法合并。

#### Acceptance Criteria

1. THE Turbo_Stack SHALL 配置 CI/CD 流水线，包含：
   - 后端：Checkstyle 检查
   - 前端：ESLint 检查
   - 提交信息：Commitlint 检查
2. WHEN 代码风格不符合规范时 THEN THE Turbo_Stack SHALL 阻止合并
3. THE Turbo_Stack SHALL 提供 `npm run lint` 和 `mvn checkstyle:check` 本地检查命令
4. THE AI_Context SHALL 要求 AI Agent 在生成代码后运行风格检查
