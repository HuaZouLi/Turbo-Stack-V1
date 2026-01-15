# 定时任务生成 Prompt

> 用于生成定时任务功能的 Prompt 模板

## 使用方式

复制以下模板，替换 `{变量}` 后发送给 AI 代理。

---

## Prompt 模板

```
请生成 {任务名称} 定时任务。

## 任务信息

- 任务名称: {任务名称}
- 任务描述: {任务描述}
- 执行频率: {Cron 表达式}
- 所属模块: {module}

## 任务逻辑

{详细描述任务执行的业务逻辑}

## 依赖数据

| 数据源 | 表/接口 | 说明 |
|--------|---------|------|
| {数据源} | {表名/接口} | {说明} |

## 执行要求

- 并发控制: {是否允许并发执行}
- 失败重试: {重试次数}
- 超时时间: {超时秒数}
- 告警通知: {是否需要告警}

## 生成要求

1. 任务类
   - 实现 SnailJob 任务接口
   - 包含完整的日志记录
   - 异常处理和重试逻辑

2. 配置
   - 任务注册配置
   - Cron 表达式配置

3. 测试
   - 手动触发接口
   - 单元测试
```

---

## 示例

```
请生成 订单超时自动取消 定时任务。

## 任务信息

- 任务名称: OrderTimeoutCancelJob
- 任务描述: 自动取消超过30分钟未支付的订单
- 执行频率: 0 */5 * * * ? (每5分钟执行一次)
- 所属模块: order

## 任务逻辑

1. 查询所有状态为"待支付"且创建时间超过30分钟的订单
2. 批量更新订单状态为"已取消"
3. 恢复商品库存
4. 记录取消日志
5. 发送取消通知（可选）

## 依赖数据

| 数据源 | 表/接口 | 说明 |
|--------|---------|------|
| 订单表 | biz_order | 查询待支付订单 |
| 商品表 | biz_product | 恢复库存 |
| 日志表 | biz_order_log | 记录操作日志 |

## 执行要求

- 并发控制: 不允许并发执行
- 失败重试: 3次
- 超时时间: 300秒
- 告警通知: 失败时发送告警

## 生成要求

1. 任务类
   - 实现 SnailJob 任务接口
   - 包含完整的日志记录
   - 异常处理和重试逻辑

2. 配置
   - 任务注册配置
   - Cron 表达式配置

3. 测试
   - 手动触发接口
   - 单元测试
```

---

## 生成文件清单

### 后端

```
apps/backend/ruoyi-modules/ruoyi-{module}/
├── src/main/java/org/dromara/{module}/
│   ├── job/
│   │   └── {JobName}Job.java          # 任务实现类
│   └── service/
│       └── impl/{JobName}Service.java # 任务业务逻辑
```

### 任务类模板

```java
@Slf4j
@Component
public class OrderTimeoutCancelJob {

    @Autowired
    private IOrderService orderService;

    /**
     * 执行订单超时取消任务
     */
    @XxlJob("orderTimeoutCancelJob")
    public void execute() {
        log.info("开始执行订单超时取消任务");
        
        try {
            // 1. 查询超时订单
            List<Order> timeoutOrders = orderService.findTimeoutOrders();
            log.info("查询到 {} 个超时订单", timeoutOrders.size());
            
            // 2. 批量取消
            int cancelCount = 0;
            for (Order order : timeoutOrders) {
                try {
                    orderService.cancelOrder(order.getOrderId(), "超时自动取消");
                    cancelCount++;
                } catch (Exception e) {
                    log.error("取消订单失败: {}", order.getOrderId(), e);
                }
            }
            
            log.info("订单超时取消任务完成，成功取消 {} 个订单", cancelCount);
            
        } catch (Exception e) {
            log.error("订单超时取消任务执行失败", e);
            throw e;
        }
    }
}
```

---

## Cron 表达式参考

| 表达式 | 说明 |
|--------|------|
| `0 0 * * * ?` | 每小时执行 |
| `0 */5 * * * ?` | 每5分钟执行 |
| `0 0 0 * * ?` | 每天凌晨执行 |
| `0 0 0 * * MON` | 每周一凌晨执行 |
| `0 0 0 1 * ?` | 每月1号凌晨执行 |
| `0 0 2 * * ?` | 每天凌晨2点执行 |
