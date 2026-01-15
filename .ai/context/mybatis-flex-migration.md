# MyBatis-Flex 迁移指南

## 概述

Turbo-Stack-V1 计划从 MyBatis-Plus 迁移到 MyBatis-Flex。由于 RuoYi-Vue-Plus 深度集成了 MyBatis-Plus，采用渐进式迁移策略。

## 当前状态

- **现有模块**: 继续使用 MyBatis-Plus
- **新模块**: 推荐使用 MyBatis-Flex
- **依赖**: 两个框架并存，通过 Maven 依赖管理

## 注解映射表

| MyBatis-Plus | MyBatis-Flex | 说明 |
|-------------|--------------|------|
| `@TableName("table")` | `@Table("table")` | 表名注解 |
| `@TableId` | `@Id` | 主键注解 |
| `@TableField` | `@Column` | 字段注解 |
| `@TableLogic` | `@Column(isLogicDelete = true)` | 逻辑删除 |
| `@Version` | `@Column(version = true)` | 乐观锁 |

## 实体类示例

### MyBatis-Plus 风格 (现有)

```java
@Data
@TableName("sys_user")
public class SysUser {
    @TableId(type = IdType.ASSIGN_ID)
    private Long userId;
    
    @TableField("user_name")
    private String userName;
    
    @TableLogic
    private String delFlag;
}
```

### MyBatis-Flex 风格 (新模块)

```java
@Data
@Table("sys_user")
public class SysUser {
    @Id(keyType = KeyType.Generator, value = "snowFlakeId")
    private Long userId;
    
    @Column("user_name")
    private String userName;
    
    @Column(isLogicDelete = true)
    private String delFlag;
    
    @Column(onInsertValue = "now()")
    private LocalDateTime createTime;
    
    @Column(onUpdateValue = "now()")
    private LocalDateTime updateTime;
}
```

## Mapper 接口对比

### MyBatis-Plus

```java
public interface SysUserMapper extends BaseMapper<SysUser> {
}
```

### MyBatis-Flex

```java
public interface SysUserMapper extends BaseMapper<SysUser> {
}
```

## 查询方式对比

### MyBatis-Plus QueryWrapper

```java
List<SysUser> users = userMapper.selectList(
    new LambdaQueryWrapper<SysUser>()
        .like(SysUser::getUserName, "test")
        .eq(SysUser::getStatus, "0")
        .orderByDesc(SysUser::getCreateTime)
);
```

### MyBatis-Flex QueryWrapper

```java
List<SysUser> users = userMapper.selectListByQuery(
    QueryWrapper.create()
        .where(SYS_USER.USER_NAME.like("test"))
        .and(SYS_USER.STATUS.eq("0"))
        .orderBy(SYS_USER.CREATE_TIME.desc())
);
```

## 迁移步骤

### 1. 新模块使用 MyBatis-Flex

在新业务模块的 pom.xml 中添加依赖：

```xml
<dependency>
    <groupId>com.mybatis-flex</groupId>
    <artifactId>mybatis-flex-spring-boot3-starter</artifactId>
</dependency>
<dependency>
    <groupId>com.mybatis-flex</groupId>
    <artifactId>mybatis-flex-processor</artifactId>
    <scope>provided</scope>
</dependency>
```

### 2. 配置 MyBatis-Flex

在 application.yml 中添加：

```yaml
mybatis-flex:
  mapper-locations: classpath*:mapper/**/*Mapper.xml
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
```

### 3. 逐步迁移现有模块

1. 选择一个独立模块开始迁移
2. 修改实体类注解
3. 修改 Mapper 接口
4. 修改 Service 层查询代码
5. 测试验证

## 注意事项

1. **多租户**: MyBatis-Flex 有自己的多租户实现，需要重新配置
2. **数据权限**: 需要重新实现数据权限拦截器
3. **工作流模块**: warm-flow 依赖 MyBatis-Plus，暂不迁移
4. **代码生成器**: 需要更新模板以生成 MyBatis-Flex 风格代码

## 参考资料

- [MyBatis-Flex 官方文档](https://mybatis-flex.com/)
- [MyBatis-Plus 官方文档](https://baomidou.com/)
