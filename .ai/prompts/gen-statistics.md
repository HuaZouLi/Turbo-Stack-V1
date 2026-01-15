# 统计报表生成 Prompt

> 用于生成统计报表功能的 Prompt 模板

## 使用方式

复制以下模板，替换 `{变量}` 后发送给 AI 代理。

---

## Prompt 模板

```
请为 {报表名称} 生成统计报表功能。

## 报表信息

- 报表名称: {报表名称}
- 数据来源: {表名/视图名}
- 统计维度: {时间/地区/分类等}
- 刷新频率: {实时/定时}

## 统计指标

| 指标名称 | 计算方式 | 数据类型 | 说明 |
|----------|----------|----------|------|
| {指标名} | {SUM/COUNT/AVG等} | {Number/Percent} | {说明} |

## 筛选条件

| 条件名称 | 字段 | 类型 | 默认值 |
|----------|------|------|--------|
| {条件名} | {field} | {日期范围/下拉/输入} | {默认值} |

## 图表需求

- [ ] 折线图 (趋势)
- [ ] 柱状图 (对比)
- [ ] 饼图 (占比)
- [ ] 数据表格
- [ ] 汇总卡片

## 生成要求

1. 后端
   - 统计 Service: 聚合查询逻辑
   - 统计 Controller: 报表接口
   - VO: 统计结果对象

2. 前端
   - 报表页面: ECharts 图表
   - 筛选组件: 条件筛选
   - 数据表格: 明细数据

3. 性能优化
   - 大数据量考虑分页
   - 复杂统计考虑缓存
```

---

## 示例

```
请为 销售统计报表 生成统计报表功能。

## 报表信息

- 报表名称: 销售统计报表
- 数据来源: biz_order, biz_order_item
- 统计维度: 时间（日/周/月）、商品分类
- 刷新频率: 实时

## 统计指标

| 指标名称 | 计算方式 | 数据类型 | 说明 |
|----------|----------|----------|------|
| 订单数 | COUNT | Number | 订单总数 |
| 销售额 | SUM(amount) | Number | 销售总金额 |
| 客单价 | AVG(amount) | Number | 平均订单金额 |
| 同比增长 | (本期-上期)/上期 | Percent | 与去年同期对比 |
| 环比增长 | (本期-上期)/上期 | Percent | 与上一周期对比 |

## 筛选条件

| 条件名称 | 字段 | 类型 | 默认值 |
|----------|------|------|--------|
| 时间范围 | createTime | 日期范围 | 最近7天 |
| 商品分类 | categoryId | 下拉多选 | 全部 |
| 统计粒度 | granularity | 下拉单选 | 日 |

## 图表需求

- [x] 折线图 (销售趋势)
- [x] 柱状图 (分类对比)
- [x] 饼图 (分类占比)
- [x] 数据表格
- [x] 汇总卡片

## 生成要求

1. 后端
   - 统计 Service: 聚合查询逻辑
   - 统计 Controller: 报表接口
   - VO: 统计结果对象

2. 前端
   - 报表页面: ECharts 图表
   - 筛选组件: 条件筛选
   - 数据表格: 明细数据

3. 性能优化
   - 大数据量考虑分页
   - 复杂统计考虑缓存
```

---

## 生成文件清单

### 后端

```
apps/backend/ruoyi-modules/ruoyi-{module}/
├── src/main/java/org/dromara/{module}/
│   ├── controller/StatisticsController.java
│   ├── service/IStatisticsService.java
│   ├── service/impl/StatisticsServiceImpl.java
│   └── domain/vo/
│       ├── StatsSummaryVo.java      # 汇总数据
│       ├── StatsTrendVo.java        # 趋势数据
│       └── StatsDistributionVo.java # 分布数据
```

### 前端

```
apps/admin/src/views/{module}/statistics/
├── index.vue                  # 报表主页
├── components/
│   ├── SummaryCards.vue       # 汇总卡片
│   ├── TrendChart.vue         # 趋势图表
│   ├── DistributionChart.vue  # 分布图表
│   └── DataTable.vue          # 数据表格
└── hooks/
    └── useStatistics.ts       # 统计数据 Hook
```
