# Requirements Document

## Introduction

为 Soybean Admin 前端搭建完整的系统管理模块，对接 RuoYi-Vue-Plus 后端 API。目标是打造一套高质量、可复用、体验极致的管理后台页面。

## Glossary

- **Admin**: Soybean Admin 管理后台前端
- **Backend**: RuoYi-Vue-Plus 后端服务
- **CRUD_Page**: 标准的增删改查页面组件
- **Table_Pro**: 增强型表格组件，支持虚拟滚动、列配置、导出等
- **Form_Pro**: 增强型表单组件，支持动态表单、校验、联动等
- **Tree_Select**: 树形选择器组件
- **Dict_Tag**: 字典标签组件

## Requirements

### Requirement 1: 通用 CRUD 组件体系

**User Story:** As a 开发者, I want 一套可复用的 CRUD 组件, so that 快速构建管理页面且保持一致性。

#### Acceptance Criteria

1. THE Table_Pro SHALL 支持虚拟滚动，渲染 10000 行数据无卡顿
2. THE Table_Pro SHALL 支持列配置持久化（显示/隐藏、宽度、顺序）
3. THE Table_Pro SHALL 支持多选、单选、行展开
4. THE Table_Pro SHALL 支持导出 Excel（前端导出 + 后端导出）
5. THE Form_Pro SHALL 支持 JSON Schema 动态渲染表单
6. THE Form_Pro SHALL 支持表单联动（字段显隐、选项过滤）
7. THE Form_Pro SHALL 支持异步校验（如用户名唯一性检查）
8. THE CRUD_Page SHALL 提供标准布局：搜索区 + 工具栏 + 表格 + 分页
9. THE CRUD_Page SHALL 支持抽屉/弹窗两种编辑模式

### Requirement 2: 用户管理模块

**User Story:** As a 管理员, I want 管理系统用户, so that 控制谁可以访问系统。

#### Acceptance Criteria

1. WHEN 访问用户管理页面 THEN Admin SHALL 显示左侧部门树 + 右侧用户列表
2. WHEN 点击部门节点 THEN Admin SHALL 筛选该部门及子部门的用户
3. THE Admin SHALL 支持用户搜索（用户名、手机号、状态、时间范围）
4. THE Admin SHALL 支持新增用户（基本信息、部门、角色、岗位）
5. THE Admin SHALL 支持编辑用户信息
6. THE Admin SHALL 支持重置用户密码
7. THE Admin SHALL 支持启用/禁用用户
8. THE Admin SHALL 支持批量删除用户
9. THE Admin SHALL 支持导入/导出用户 Excel
10. THE Admin SHALL 显示用户头像，支持上传修改

### Requirement 3: 角色管理模块

**User Story:** As a 管理员, I want 管理角色和权限, so that 实现细粒度的访问控制。

#### Acceptance Criteria

1. THE Admin SHALL 显示角色列表（角色名、权限字符、状态、创建时间）
2. THE Admin SHALL 支持新增角色（基本信息、菜单权限、数据权限）
3. WHEN 配置菜单权限 THEN Admin SHALL 显示树形菜单选择器，支持全选/反选
4. WHEN 配置数据权限 THEN Admin SHALL 支持选择数据范围（全部/自定义/本部门/本部门及以下/仅本人）
5. IF 选择自定义数据权限 THEN Admin SHALL 显示部门树选择器
6. THE Admin SHALL 支持分配用户到角色
7. THE Admin SHALL 支持启用/禁用角色
8. THE Admin SHALL 支持批量删除角色

### Requirement 4: 菜单管理模块

**User Story:** As a 管理员, I want 管理系统菜单, so that 动态配置系统功能入口。

#### Acceptance Criteria

1. THE Admin SHALL 以树形表格展示菜单层级结构
2. THE Admin SHALL 支持新增菜单（目录/菜单/按钮三种类型）
3. WHEN 菜单类型为目录 THEN Admin SHALL 显示图标、路由地址配置
4. WHEN 菜单类型为菜单 THEN Admin SHALL 显示组件路径、权限标识、缓存配置
5. WHEN 菜单类型为按钮 THEN Admin SHALL 仅显示权限标识配置
6. THE Admin SHALL 支持拖拽排序菜单
7. THE Admin SHALL 支持快速启用/禁用菜单
8. THE Admin SHALL 支持展开/折叠全部菜单

### Requirement 5: 部门管理模块

**User Story:** As a 管理员, I want 管理组织架构, so that 建立清晰的部门层级。

#### Acceptance Criteria

1. THE Admin SHALL 以树形表格展示部门层级结构
2. THE Admin SHALL 支持新增部门（上级部门、部门名称、负责人、排序）
3. THE Admin SHALL 支持编辑部门信息
4. THE Admin SHALL 支持删除部门（有子部门或用户时提示）
5. THE Admin SHALL 支持展开/折叠全部部门
6. THE Admin SHALL 支持部门搜索过滤

### Requirement 6: 岗位管理模块

**User Story:** As a 管理员, I want 管理岗位信息, so that 定义用户的职位。

#### Acceptance Criteria

1. THE Admin SHALL 显示岗位列表（岗位编码、岗位名称、排序、状态）
2. THE Admin SHALL 支持新增/编辑/删除岗位
3. THE Admin SHALL 支持启用/禁用岗位
4. THE Admin SHALL 支持导出岗位 Excel

### Requirement 7: 字典管理模块

**User Story:** As a 管理员, I want 管理数据字典, so that 统一维护系统中的枚举值。

#### Acceptance Criteria

1. THE Admin SHALL 显示字典类型列表（字典名称、字典类型、状态）
2. WHEN 点击字典类型 THEN Admin SHALL 显示该类型下的字典数据列表
3. THE Admin SHALL 支持新增/编辑/删除字典类型
4. THE Admin SHALL 支持新增/编辑/删除字典数据
5. THE Admin SHALL 支持字典数据排序
6. THE Admin SHALL 支持刷新字典缓存
7. THE Admin SHALL 支持导出字典 Excel

### Requirement 8: 参数设置模块

**User Story:** As a 管理员, I want 管理系统参数, so that 动态配置系统行为。

#### Acceptance Criteria

1. THE Admin SHALL 显示参数列表（参数名称、参数键名、参数键值、系统内置）
2. THE Admin SHALL 支持新增/编辑/删除参数
3. THE Admin SHALL 支持刷新参数缓存
4. THE Admin SHALL 支持导出参数 Excel
5. IF 参数为系统内置 THEN Admin SHALL 禁止删除

### Requirement 9: 通知公告模块

**User Story:** As a 管理员, I want 发布通知公告, so that 向用户传达重要信息。

#### Acceptance Criteria

1. THE Admin SHALL 显示公告列表（标题、类型、状态、创建时间）
2. THE Admin SHALL 支持新增公告（标题、类型、内容富文本）
3. THE Admin SHALL 支持编辑/删除公告
4. THE Admin SHALL 支持公告状态切换（正常/关闭）
5. THE Admin SHALL 集成富文本编辑器（支持图片上传）

### Requirement 10: 文件管理模块

**User Story:** As a 管理员, I want 管理上传的文件, so that 查看和清理系统文件。

#### Acceptance Criteria

1. THE Admin SHALL 显示文件列表（文件名、文件类型、大小、上传时间）
2. THE Admin SHALL 支持文件预览（图片、PDF、视频）
3. THE Admin SHALL 支持文件下载
4. THE Admin SHALL 支持批量删除文件
5. THE Admin SHALL 支持按文件类型/时间范围筛选

### Requirement 11: 在线用户监控

**User Story:** As a 管理员, I want 查看在线用户, so that 监控系统使用情况。

#### Acceptance Criteria

1. THE Admin SHALL 显示在线用户列表（用户名、部门、IP、登录时间）
2. THE Admin SHALL 支持强制下线用户
3. THE Admin SHALL 支持按用户名/IP 搜索
4. THE Admin SHALL 实时刷新在线状态

### Requirement 12: 登录日志模块

**User Story:** As a 管理员, I want 查看登录日志, so that 追踪用户登录行为。

#### Acceptance Criteria

1. THE Admin SHALL 显示登录日志列表（用户名、IP、地点、浏览器、状态、时间）
2. THE Admin SHALL 支持按用户名/IP/状态/时间范围搜索
3. THE Admin SHALL 支持导出登录日志 Excel
4. THE Admin SHALL 支持批量删除/清空日志
5. THE Admin SHALL 支持解锁被锁定的用户

### Requirement 13: 操作日志模块

**User Story:** As a 管理员, I want 查看操作日志, so that 审计用户操作行为。

#### Acceptance Criteria

1. THE Admin SHALL 显示操作日志列表（模块、操作类型、操作人、IP、时间、状态）
2. WHEN 点击日志详情 THEN Admin SHALL 显示请求参数和响应结果
3. THE Admin SHALL 支持按模块/操作类型/操作人/状态/时间范围搜索
4. THE Admin SHALL 支持导出操作日志 Excel
5. THE Admin SHALL 支持批量删除/清空日志

### Requirement 14: 缓存管理模块

**User Story:** As a 管理员, I want 管理系统缓存, so that 查看和清理 Redis 缓存。

#### Acceptance Criteria

1. THE Admin SHALL 显示缓存统计信息（命中率、内存使用、Key 数量）
2. THE Admin SHALL 显示缓存名称列表（按前缀分组）
3. WHEN 点击缓存名称 THEN Admin SHALL 显示该前缀下的所有 Key
4. THE Admin SHALL 支持查看缓存内容
5. THE Admin SHALL 支持删除单个缓存
6. THE Admin SHALL 支持清空指定前缀的缓存

### Requirement 15: 代码生成模块

**User Story:** As a 开发者, I want 根据数据库表生成代码, so that 快速创建 CRUD 功能。

#### Acceptance Criteria

1. THE Admin SHALL 显示数据库表列表（表名、表描述、创建时间）
2. THE Admin SHALL 支持导入数据库表
3. WHEN 配置生成信息 THEN Admin SHALL 支持配置基本信息、字段信息、生成信息
4. THE Admin SHALL 支持预览生成的代码
5. THE Admin SHALL 支持下载生成的代码（ZIP 包）
6. THE Admin SHALL 支持同步数据库表结构变更

### Requirement 16: 系统接口文档

**User Story:** As a 开发者, I want 查看 API 文档, so that 了解后端接口定义。

#### Acceptance Criteria

1. THE Admin SHALL 内嵌 Swagger UI 或 Knife4j 文档
2. THE Admin SHALL 支持在线调试接口
3. THE Admin SHALL 支持按模块分组展示接口
