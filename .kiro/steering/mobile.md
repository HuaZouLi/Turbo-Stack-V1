---
inclusion: fileMatch
fileMatchPattern: "apps/mobile/**/*.{vue,ts,tsx}"
---

# Mobile 端开发规范

当修改 `apps/mobile/` 下的 Vue/TS 文件时，遵循以下规范。

## 技术栈

- Uni-app + Vue 3
- TypeScript
- Wot Design Uni 组件库
- UnoCSS

## 目录结构

```
src/
├── pages/          # 页面 (pages.json 配置)
├── components/     # 公共组件
├── hooks/          # 组合式函数
├── http/           # 请求封装
├── store/          # Pinia stores
└── types/          # 类型定义
```

## 代码规范

### 页面配置

在 `pages.json` 中配置页面路由：

```json
{
  "pages": [
    {
      "path": "pages/xxx/index",
      "style": { "navigationBarTitleText": "页面标题" }
    }
  ]
}
```

### 组件结构

```vue
<script setup lang="ts">
// 同 Admin 规范
</script>

<template>
  <!-- 使用 wd-xxx 组件 -->
  <wd-button>按钮</wd-button>
</template>
```

### API 调用

```typescript
import { httpGet, httpPost } from '@/http/http';

// GET 请求
const data = await httpGet<XxxVo[]>('/xxx/list', { params });

// POST 请求
const result = await httpPost<void>('/xxx/save', body);
```

### 字典使用

```vue
<script setup>
import { useDict } from '@/hooks/useDict';
const { options, getLabel } = useDict('sys_xxx_status');
</script>

<template>
  <wd-picker :columns="options" />
  <text>{{ getLabel(item.status) }}</text>
</template>
```

## 跨平台注意

- 使用 `uni.xxx` API 而非 Web API
- 条件编译: `#ifdef H5` / `#ifdef MP-WEIXIN`
- 样式单位使用 `rpx`
- 避免使用 DOM 操作

## 性能优化

- 图片懒加载
- 列表使用虚拟滚动 (z-paging)
- 避免频繁 setData
