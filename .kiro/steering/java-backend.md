---
inclusion: fileMatch
fileMatchPattern: "apps/backend/**/*.java"
---

# Java 后端开发规范

当修改 `apps/backend/` 下的 Java 文件时，遵循以下规范。

## 技术栈

- JDK 21 + Virtual Threads
- Spring Boot 3.x
- MyBatis-Plus (现有模块) / MyBatis-Flex (新模块)
- Sa-Token 认证
- MapStruct 对象转换

## 代码规范

### 分层架构

```
Controller → Service → Mapper → Entity
     ↓          ↓
    VO        BO/DTO
```

### 命名约定

- Controller: `XxxController`
- Service: `IXxxService` / `XxxServiceImpl`
- Mapper: `XxxMapper`
- Entity: `XxxEntity` 或 `Xxx`
- VO: `XxxVo` (返回前端)
- BO: `XxxBo` (业务对象)

### 注解使用

```java
// Controller
@RestController
@RequestMapping("/xxx")
@RequiredArgsConstructor
@Tag(name = "模块名称")

// Service
@Service
@RequiredArgsConstructor

// 参数校验
@Validated
@NotNull @NotBlank @Size @Pattern
```

### 对象转换

使用 MapStruct，不要手写 BeanUtils.copyProperties：

```java
@Mapper
public interface XxxConvert extends BaseConvert<XxxVo, XxxBo, Xxx> {
    XxxConvert INSTANCE = Mappers.getMapper(XxxConvert.class);
}
```

## 数据库

- 新模块使用 MyBatis-Flex
- 表名前缀: 业务模块缩写 (如 `sys_`, `biz_`)
- 必须字段: `id`, `create_time`, `update_time`, `create_by`, `update_by`
- 逻辑删除: `del_flag`
- 租户隔离: `tenant_id`

## 安全

- 敏感数据加密存储
- SQL 注入防护 (使用参数化查询)
- XSS 防护 (使用框架自带过滤)
- 权限注解: `@SaCheckPermission("xxx:xxx:xxx")`
