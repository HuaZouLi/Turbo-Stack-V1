# Design Document: Turbo-Stack-V1

## Overview

Turbo-Stack-V1 是一个 AI 原生的全栈开发底座，通过整合 RuoYi-Vue-Plus、Soybean Admin、Uni-best 三个开源项目，并进行深度改造，构建一个让 AI Agent 能够高效开发的标准化框架。

### 核心设计目标

1. **AI 原生**：AI Agent 能快速理解项目、生成代码、恢复上下文
2. **主干纯净**：启动时间 < 30 秒，不包含重量级扩展
3. **风格统一**：代码风格、UI 风格强制一致
4. **单一数据源**：改一处，其他自动同步

### 技术栈

| 层级 | 技术选型 |
|-----|---------|
| 后端 | JDK 21 + Spring Boot 3.x + Undertow + Virtual Threads |
| ORM | MyBatis-Flex |
| 对象映射 | MapStruct |
| 权限 | Sa-Token + JWT |
| 管理后台 | Vue 3 + Vite + TypeScript + Naive UI + UnoCSS |
| 移动端 | Uni-app + Vue 3 + TypeScript + Wot Design Uni |
| 类型桥接 | openapi-typescript |

## Architecture

### 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        Turbo-Stack-V1                           │
├─────────────────────────────────────────────────────────────────┤
│  .ai/                    │  AI 规范资产层 (Single Source of Truth) │
│  ├── MASTER.md           │  架构决策                              │
│  ├── rules/              │  开发规范                              │
│  ├── context/            │  业务上下文                            │
│  ├── prompts/            │  Prompt 模板                          │
│  └── templates/          │  代码模板                              │
├─────────────────────────────────────────────────────────────────┤
│  apps/                   │  应用层                                │
│  ├── backend/            │  RuoYi-Vue-Plus (JDK 21 + Undertow)   │
│  ├── admin/              │  Soybean Admin (Naive UI)             │
│  └── mobile/             │  Uni-best (Wot Design Uni)            │
├─────────────────────────────────────────────────────────────────┤
│  shared/                 │  共享层                                │
│  ├── types/api.d.ts      │  自动生成的 API 类型                   │
│  ├── constants/          │  枚举常量                              │
│  └── utils/              │  工具函数                              │
├─────────────────────────────────────────────────────────────────┤
│  deploy/                 │  运维层                                │
│  ├── docker-compose.yml  │  中间件编排                            │
│  └── nginx/              │  反向代理                              │
└─────────────────────────────────────────────────────────────────┘
```

### 数据流架构

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Admin      │     │   Mobile     │     │   H5         │
│  (Naive UI)  │     │ (Wot Design) │     │  (Uni-app)   │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
                    ┌───────▼───────┐
                    │  shared/types │  ← openapi-typescript 自动生成
                    │   api.d.ts    │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │    Nginx      │
                    │  (反向代理)    │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   Backend     │
                    │  (Undertow)   │
                    │  Sa-Token     │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │   MySQL   │ │   Redis   │ │   MinIO   │
        └───────────┘ └───────────┘ └───────────┘
```

## Components and Interfaces

### 1. 后端模块 (Backend Module)

#### 1.1 目录结构

```
apps/backend/
├── ruoyi-admin/                 # 启动模块
│   └── src/main/resources/
│       ├── application.yml      # 主配置
│       └── application-dev.yml  # 开发环境配置
├── ruoyi-common/                # 公共模块
│   ├── ruoyi-common-core/       # 核心工具
│   ├── ruoyi-common-redis/      # Redis 封装
│   ├── ruoyi-common-mybatis/    # MyBatis 封装
│   └── ruoyi-common-satoken/    # Sa-Token 封装
├── ruoyi-system/                # 系统模块
│   └── src/main/java/
│       └── com/ruoyi/system/
│           ├── controller/      # 控制器
│           ├── service/         # 服务层
│           ├── mapper/          # 数据访问
│           ├── domain/          # 领域模型
│           │   ├── entity/      # 实体类
│           │   ├── dto/         # 数据传输对象
│           │   └── vo/          # 视图对象
│           └── convert/         # MapStruct 转换器
├── sql/                         # 数据库脚本
│   └── V1.0.0__init.sql         # Flyway 基线
└── pom.xml                      # Maven 配置
```

#### 1.2 JDK 21 + Virtual Threads 配置

```yaml
# application.yml
spring:
  threads:
    virtual:
      enabled: true  # 启用虚拟线程

server:
  undertow:
    threads:
      io: 16
      worker: 200
```

#### 1.3 MapStruct 转换器接口

```java
// BaseConvert.java
public interface BaseConvert<E, D, V> {
    E toEntity(D dto);
    D toDto(E entity);
    V toVo(E entity);
    List<V> toVoList(List<E> entityList);
}

// UserConvert.java
@Mapper(componentModel = "spring")
public interface UserConvert extends BaseConvert<SysUser, UserDto, UserVo> {
}
```

#### 1.4 MyBatis-Flex 配置

```yaml
# application.yml
mybatis-flex:
  mapper-locations: classpath*:mapper/**/*Mapper.xml
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
```

#### 1.5 MyBatis-Flex 实体示例

```java
// SysUser.java
@Table("sys_user")
public class SysUser {
    @Id(keyType = KeyType.Generator, value = "snowFlakeId")
    private Long userId;
    
    private String userName;
    private String nickName;
    private String email;
    private String phonenumber;
    private String status;
    
    @Column(onInsertValue = "now()")
    private LocalDateTime createTime;
    
    @Column(onUpdateValue = "now()")
    private LocalDateTime updateTime;
    
    @Column(isLogicDelete = true)
    private String delFlag;
}
```

#### 1.6 MyBatis-Flex 查询示例

```java
// UserServiceImpl.java
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private SysUserMapper userMapper;
    
    @Override
    public List<SysUser> selectUserList(SysUser user) {
        // 使用 QueryWrapper 链式查询
        return userMapper.selectListByQuery(
            QueryWrapper.create()
                .where(SYS_USER.USER_NAME.like(user.getUserName()))
                .and(SYS_USER.STATUS.eq(user.getStatus()))
                .orderBy(SYS_USER.CREATE_TIME.desc())
        );
    }
    
    @Override
    public Page<SysUser> selectUserPage(SysUser user, int pageNum, int pageSize) {
        // 分页查询
        return userMapper.paginate(
            Page.of(pageNum, pageSize),
            QueryWrapper.create()
                .where(SYS_USER.USER_NAME.like(user.getUserName()))
        );
    }
}
```

### 2. 管理后台模块 (Admin Module)

#### 2.1 目录结构

```
apps/admin/
├── src/
│   ├── api/                     # API 调用
│   │   └── system/
│   │       └── user.ts
│   ├── components/              # 通用组件
│   ├── views/                   # 页面
│   │   └── system/
│   │       └── user/
│   │           ├── index.vue    # 列表页
│   │           └── form.vue     # 表单页
│   ├── stores/                  # 状态管理
│   └── utils/
│       └── request.ts           # 请求封装
├── .env.development             # 开发环境
├── .env.production              # 生产环境
└── package.json
```

#### 2.2 请求封装 (对接 Sa-Token)

```typescript
// utils/request.ts
import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

// 请求拦截器 - 添加 Token
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 统一错误处理
request.interceptors.response.use(
  response => response.data,
  error => {
    // 统一错误处理
    return Promise.reject(error);
  }
);

export default request;
```

### 3. 移动端模块 (Mobile Module)

#### 3.1 目录结构

```
apps/mobile/
├── src/
│   ├── pages/                   # 页面
│   ├── components/              # 组件
│   ├── api/                     # API 调用
│   ├── stores/                  # 状态管理
│   └── utils/
│       └── request.ts           # 请求封装
├── pages.json                   # 页面配置
└── manifest.json                # 应用配置
```

#### 3.2 请求封装 (对接 Sa-Token)

```typescript
// utils/request.ts
const request = (options: UniApp.RequestOptions) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    uni.request({
      ...options,
      header: {
        ...options.header,
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: reject
    });
  });
};

export default request;
```

### 4. 类型桥接层 (Type Bridge)

#### 4.1 自动生成流程

```
后端 Swagger → openapi-typescript → shared/types/api.d.ts → Admin/Mobile
```

#### 4.2 生成脚本

```json
// package.json (根目录)
{
  "scripts": {
    "gen:types": "openapi-typescript http://localhost:8080/v3/api-docs -o shared/types/api.d.ts"
  }
}
```

#### 4.3 生成的类型示例

```typescript
// shared/types/api.d.ts (自动生成)
export interface paths {
  "/system/user/list": {
    get: {
      parameters: {
        query: {
          pageNum?: number;
          pageSize?: number;
          userName?: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["TableDataInfoSysUserVo"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    SysUserVo: {
      userId?: number;
      userName?: string;
      nickName?: string;
      status?: string;
    };
  };
}
```

### 5. AI 规范资产层 (.ai)

#### 5.1 目录结构

```
.ai/
├── MASTER.md                    # 顶层架构决策
├── rules/
│   ├── java-backend.md          # 后端开发规范
│   ├── vue-frontend.md          # 前端开发规范
│   └── mobile.md                # 移动端开发规范
├── context/
│   ├── glossary.md              # 术语表
│   ├── architecture.md          # 架构图
│   ├── PROJECT_STATUS.md        # 项目状态
│   └── MODULE_INDEX.md          # 模块索引
├── prompts/
│   ├── gen-crud.md              # CRUD 生成
│   ├── gen-statistics.md        # 统计报表生成
│   ├── gen-scheduler.md         # 定时任务生成
│   └── gen-state-machine.md     # 状态机生成
└── templates/
    ├── backend/
    │   ├── Controller.java.tpl
    │   ├── Service.java.tpl
    │   └── Entity.java.tpl
    └── frontend/
        ├── ListView.vue.tpl
        └── FormView.vue.tpl
```

#### 5.2 MASTER.md 内容结构

```markdown
# Turbo-Stack-V1 架构决策

## 技术栈
- 后端: JDK 21 + Spring Boot 3.x + Undertow + Virtual Threads
- ORM: MyBatis-Plus
- 对象映射: MapStruct (禁止使用 BeanUtils)
- 权限: Sa-Token + JWT
- 管理后台: Vue 3 + Vite + TypeScript + Naive UI
- 移动端: Uni-app + Vue 3 + Wot Design Uni

## 核心原则
1. 单一数据源：API 类型只在后端定义，前端自动生成
2. 分层清晰：Controller/Service/Mapper 职责分明
3. 约定优于配置：遵循标准目录结构和命名规范

## 文件定位速查表
| 要改什么 | 后端位置 | 前端位置 |
|---------|---------|---------|
| 新增表 | sql/ | - |
| 新增接口 | controller/ | api/ |
| 新增页面 | - | views/ |
```

## Data Models

### 1. 核心实体关系

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  SysUser    │────<│ SysUserRole │>────│  SysRole    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       │                                       │
       ▼                                       ▼
┌─────────────┐                         ┌─────────────┐
│  SysDept    │                         │ SysRoleMenu │
└─────────────┘                         └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  SysMenu    │
                                        └─────────────┘
```

### 2. 数据库设计规范

| 规范项 | 规则 |
|-------|------|
| 表名 | snake_case，带模块前缀（sys_user, biz_order） |
| 字段名 | snake_case（user_name, create_time） |
| 主键 | id，bigint，雪花 ID |
| 必备字段 | create_by, create_time, update_by, update_time, del_flag |
| 外键 | 逻辑外键，不建物理外键 |
| 索引 | 查询字段建索引，联合索引遵循最左原则 |

### 3. Flyway 基线配置

```yaml
# application.yml
spring:
  flyway:
    enabled: true
    baseline-on-migrate: true
    baseline-version: 1.0.0
    locations: classpath:db/migration
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

由于 Turbo-Stack-V1 是一个框架初始化项目，大部分需求都是关于配置和文件创建的验证性测试，而非需要属性测试的业务逻辑。以下是可验证的正确性属性：

### Property 1: 目录结构完整性

*For any* 初始化完成的 Turbo-Stack-V1 项目，根目录必须包含 `.ai`、`.kiro`、`apps`、`shared`、`deploy` 五个核心目录。

**Validates: Requirements 1.1**

### Property 2: 类型同步一致性

*For any* 后端 Swagger 文档中定义的 API 接口，通过 openapi-typescript 生成的 TypeScript 类型必须与后端定义完全一致。

**Validates: Requirements 6.1, 6.5**

### Property 3: 枚举同步一致性

*For any* 后端使用 @DictEnum 注解标记的枚举，前端生成的 TypeScript 枚举必须包含相同的 value 和 label。

**Validates: Requirements 68.1, 68.3, 68.6**

### Property 4: 代码风格一致性

*For any* 提交到仓库的代码，必须通过 Checkstyle（后端）和 ESLint（前端）的检查。

**Validates: Requirements 70.1, 70.2, 75.2**

## Error Handling

### 继承自 RuoYi-Vue-Plus 的错误处理体系

RuoYi-Vue-Plus 已内置完善的错误处理机制，Turbo-Stack-V1 直接继承使用，无需额外开发：

**后端已有：**
- 全局异常处理器 `GlobalExceptionHandler`
- 业务异常类 `ServiceException`
- 统一响应封装 `R<T>`
- 错误码体系

**前端已有：**
- axios 响应拦截器
- 统一错误提示
- Token 过期自动跳转

**Turbo-Stack-V1 的补充：**
- 在 `.ai/context/` 目录维护常见错误解决方案库
- 为 AI Agent 提供错误排查指南

## Testing Strategy

### 1. 测试分层

| 测试类型 | 工具 | 覆盖范围 |
|---------|------|---------|
| 后端单元测试 | JUnit 5 + Mockito | Service 层业务逻辑 |
| 后端集成测试 | Testcontainers | 数据库操作、API 接口 |
| 前端组件测试 | Vitest | Vue 组件 |
| E2E 测试 | Playwright (可选) | 完整业务流程 |

### 2. 测试配置

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>mysql</artifactId>
    <scope>test</scope>
</dependency>
```

### 3. 验证性测试示例

```java
// 验证目录结构
@Test
void shouldHaveCorrectDirectoryStructure() {
    assertTrue(Files.exists(Path.of(".ai")));
    assertTrue(Files.exists(Path.of(".ai/MASTER.md")));
    assertTrue(Files.exists(Path.of("apps/backend")));
    assertTrue(Files.exists(Path.of("apps/admin")));
    assertTrue(Files.exists(Path.of("apps/mobile")));
    assertTrue(Files.exists(Path.of("shared/types")));
}

// 验证 JDK 版本配置
@Test
void shouldConfigureJdk21() {
    // 检查 pom.xml 中的 Java 版本
    String pomContent = Files.readString(Path.of("apps/backend/pom.xml"));
    assertTrue(pomContent.contains("<java.version>21</java.version>"));
}

// 验证 Virtual Threads 配置
@Test
void shouldEnableVirtualThreads() {
    String ymlContent = Files.readString(Path.of("apps/backend/ruoyi-admin/src/main/resources/application.yml"));
    assertTrue(ymlContent.contains("virtual:"));
    assertTrue(ymlContent.contains("enabled: true"));
}
```

---

## 附录：扩展分支设计

### feature/saas 分支改动

1. **数据模型改动**
   - 所有业务表增加 `tenant_id` 字段
   - 增加 `sys_tenant` 租户表

2. **MyBatis-Flex 拦截器**
   ```java
   @Component
   public class TenantInterceptor implements QueryInterceptor {
       @Override
       public void intercept(QueryWrapper queryWrapper) {
           Long tenantId = TenantContextHolder.getTenantId();
           if (tenantId != null) {
               queryWrapper.and(TENANT_ID.eq(tenantId));
           }
       }
   }
   ```

### feature/flowable 分支改动

1. **依赖添加**
   ```xml
   <dependency>
       <groupId>org.flowable</groupId>
       <artifactId>flowable-spring-boot-starter</artifactId>
   </dependency>
   ```

2. **数据库表**
   - Flowable 会自动创建 40+ 张表

### feature/microservice 分支改动

1. **模块拆分**
   - ruoyi-system → 独立服务
   - ruoyi-auth → 独立服务
   - ruoyi-gateway → 网关服务

2. **依赖添加**
   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```
