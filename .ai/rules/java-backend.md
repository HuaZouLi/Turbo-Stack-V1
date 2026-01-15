# Java 后端开发规范

> 适用于 apps/backend/ 目录下的所有 Java 代码

## 技术栈

- JDK 21 + Spring Boot 3.x
- MyBatis-Plus (现有模块) / MyBatis-Flex (新模块)
- Sa-Token 权限认证
- MapStruct 对象映射

## 代码规范

### 包结构

```
org.dromara.{module}/
├── controller/     # 控制器层
├── service/        # 服务层
│   └── impl/       # 服务实现
├── mapper/         # 数据访问层
├── domain/         # 领域对象
│   ├── entity/     # 实体类
│   ├── vo/         # 视图对象
│   ├── dto/        # 数据传输对象
│   └── bo/         # 业务对象
└── convert/        # 对象转换器
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| Controller | `{Entity}Controller` | `SysUserController` |
| Service | `I{Entity}Service` | `ISysUserService` |
| ServiceImpl | `{Entity}ServiceImpl` | `SysUserServiceImpl` |
| Mapper | `{Entity}Mapper` | `SysUserMapper` |
| Entity | `Sys{Entity}` | `SysUser` |
| VO | `{Entity}Vo` | `SysUserVo` |
| DTO | `{Entity}Dto` | `SysUserDto` |
| Convert | `{Entity}Convert` | `SysUserConvert` |

### Controller 规范

```java
@RestController
@RequestMapping("/system/user")
@RequiredArgsConstructor
public class SysUserController {

    private final ISysUserService userService;

    @GetMapping("/list")
    public TableDataInfo<SysUserVo> list(SysUserDto dto, PageQuery pageQuery) {
        return userService.selectPageList(dto, pageQuery);
    }

    @GetMapping("/{userId}")
    public R<SysUserVo> getInfo(@PathVariable Long userId) {
        return R.ok(userService.selectById(userId));
    }

    @PostMapping
    public R<Void> add(@Validated @RequestBody SysUserDto dto) {
        return toAjax(userService.insert(dto));
    }

    @PutMapping
    public R<Void> edit(@Validated @RequestBody SysUserDto dto) {
        return toAjax(userService.update(dto));
    }

    @DeleteMapping("/{userIds}")
    public R<Void> remove(@PathVariable Long[] userIds) {
        return toAjax(userService.deleteByIds(Arrays.asList(userIds)));
    }
}
```

### Service 规范

```java
public interface ISysUserService {
    TableDataInfo<SysUserVo> selectPageList(SysUserDto dto, PageQuery pageQuery);
    SysUserVo selectById(Long userId);
    int insert(SysUserDto dto);
    int update(SysUserDto dto);
    int deleteByIds(List<Long> userIds);
}
```

### MapStruct 转换器

```java
@Mapper(componentModel = "spring")
public interface SysUserConvert extends BaseConvert<SysUser, SysUserVo, SysUserDto> {
    // 自定义映射方法
}
```

### MyBatis-Flex 查询 (新模块推荐)

```java
// 链式查询
QueryWrapper query = QueryWrapper.create()
    .select(SYS_USER.ALL_COLUMNS)
    .from(SYS_USER)
    .where(SYS_USER.STATUS.eq("0"))
    .and(SYS_USER.USER_NAME.like(userName));

List<SysUser> users = userMapper.selectListByQuery(query);
```

### MyBatis-Plus 查询 (现有模块)

```java
LambdaQueryWrapper<SysUser> wrapper = Wrappers.lambdaQuery();
wrapper.eq(SysUser::getStatus, "0")
       .like(StringUtils.isNotBlank(userName), SysUser::getUserName, userName);

List<SysUser> users = userMapper.selectList(wrapper);
```

## 数据库规范

### 表命名

- 系统表：`sys_` 前缀
- 业务表：`biz_` 前缀或模块名前缀

### 字段规范

- 主键：`{table}_id` 或 `id`
- 创建时间：`create_time`
- 更新时间：`update_time`
- 创建人：`create_by`
- 更新人：`update_by`
- 删除标志：`del_flag`
- 状态：`status`

### Flyway 迁移

```
db/migration/
├── V1.0.0__init.sql           # 初始化
├── V1.0.1__add_xxx_table.sql  # 新增表
└── V1.0.2__alter_xxx.sql      # 修改表
```

## 注释规范

```java
/**
 * 用户管理服务
 *
 * @author xxx
 * @since 2026-01-15
 */
public interface ISysUserService {

    /**
     * 分页查询用户列表
     *
     * @param dto 查询条件
     * @param pageQuery 分页参数
     * @return 分页结果
     */
    TableDataInfo<SysUserVo> selectPageList(SysUserDto dto, PageQuery pageQuery);
}
```

## 异常处理

```java
// 业务异常
throw new ServiceException("用户不存在");

// 带错误码
throw new ServiceException("用户不存在", HttpStatus.NOT_FOUND);
```

## 日志规范

```java
@Slf4j
public class SysUserServiceImpl {

    public void doSomething() {
        log.info("开始处理用户: {}", userId);
        log.debug("详细参数: {}", dto);
        log.error("处理失败", e);
    }
}
```
