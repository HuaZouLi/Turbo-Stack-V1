# CRUD 代码生成 Prompt

> 用于生成标准 CRUD 功能的 Prompt 模板

## 使用方式

复制以下模板，替换 `{变量}` 后发送给 AI 代理。

---

## Prompt 模板

```
请为 {模块名} 模块生成完整的 CRUD 代码。

## 实体信息

- 实体名称: {EntityName}
- 表名: {table_name}
- 模块路径: org.dromara.{module}
- 中文名称: {中文名称}

## 字段定义

| 字段名 | 类型 | 中文名 | 必填 | 备注 |
|--------|------|--------|------|------|
| {fieldName} | {Type} | {中文名} | {是/否} | {备注} |

## 功能需求

- [x] 分页列表查询
- [x] 详情查询
- [x] 新增
- [x] 修改
- [x] 删除（支持批量）
- [ ] 导出 Excel
- [ ] 导入 Excel

## 生成要求

1. 后端代码
   - Controller: 标准 RESTful 接口
   - Service: 接口 + 实现类
   - Mapper: MyBatis-Flex 风格
   - Entity: 包含基础字段
   - VO/DTO: 分离视图和传输对象
   - Convert: MapStruct 转换器

2. 前端代码 (Admin)
   - 列表页面: 表格 + 搜索 + 分页
   - 表单弹窗: 新增/编辑共用
   - API 定义: TypeScript 类型安全

3. 遵循项目规范
   - 参考 .ai/rules/java-backend.md
   - 参考 .ai/rules/vue-frontend.md
```

---

## 示例

```
请为 商品管理 模块生成完整的 CRUD 代码。

## 实体信息

- 实体名称: Product
- 表名: biz_product
- 模块路径: org.dromara.product
- 中文名称: 商品

## 字段定义

| 字段名 | 类型 | 中文名 | 必填 | 备注 |
|--------|------|--------|------|------|
| productId | Long | 商品ID | 是 | 主键 |
| productName | String | 商品名称 | 是 | |
| categoryId | Long | 分类ID | 是 | 关联分类表 |
| price | BigDecimal | 价格 | 是 | |
| stock | Integer | 库存 | 是 | |
| status | String | 状态 | 是 | 0-上架 1-下架 |
| description | String | 描述 | 否 | |
| images | String | 图片 | 否 | JSON 数组 |

## 功能需求

- [x] 分页列表查询
- [x] 详情查询
- [x] 新增
- [x] 修改
- [x] 删除（支持批量）
- [x] 导出 Excel

## 生成要求

1. 后端代码
   - Controller: 标准 RESTful 接口
   - Service: 接口 + 实现类
   - Mapper: MyBatis-Flex 风格
   - Entity: 包含基础字段
   - VO/DTO: 分离视图和传输对象
   - Convert: MapStruct 转换器

2. 前端代码 (Admin)
   - 列表页面: 表格 + 搜索 + 分页
   - 表单弹窗: 新增/编辑共用
   - API 定义: TypeScript 类型安全

3. 遵循项目规范
   - 参考 .ai/rules/java-backend.md
   - 参考 .ai/rules/vue-frontend.md
```

---

## 生成文件清单

执行后应生成以下文件：

### 后端

```
apps/backend/ruoyi-modules/ruoyi-{module}/
├── src/main/java/org/dromara/{module}/
│   ├── controller/{Entity}Controller.java
│   ├── service/I{Entity}Service.java
│   ├── service/impl/{Entity}ServiceImpl.java
│   ├── mapper/{Entity}Mapper.java
│   ├── domain/
│   │   ├── entity/{Entity}.java
│   │   ├── vo/{Entity}Vo.java
│   │   └── dto/{Entity}Dto.java
│   └── convert/{Entity}Convert.java
└── src/main/resources/mapper/{module}/{Entity}Mapper.xml
```

### 前端

```
apps/admin/src/
├── views/{module}/
│   ├── index.vue              # 列表页
│   └── components/
│       └── {Entity}Form.vue   # 表单组件
└── service/api/{module}.ts    # API 定义
```

### 数据库

```
apps/backend/ruoyi-admin/src/main/resources/db/migration/
└── V{version}__{description}.sql
```
