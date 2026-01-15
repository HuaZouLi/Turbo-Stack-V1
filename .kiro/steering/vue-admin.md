---
inclusion: fileMatch
fileMatchPattern: "apps/admin/**/*.{vue,ts,tsx}"
---

# Admin 前端开发规范

当修改 `apps/admin/` 下的 Vue/TS 文件时，遵循以下规范。

## 技术栈

- Vue 3.5 + Composition API
- TypeScript 5.x
- Naive UI 组件库
- UnoCSS 原子化 CSS
- Pinia 状态管理

## 目录结构

```
src/
├── views/          # 页面组件
├── components/     # 公共组件
├── hooks/          # 组合式函数
├── service/api/    # API 定义
├── store/          # Pinia stores
└── typings/        # 类型定义
```

## 代码规范

### 组件命名

- 页面: `kebab-case` 目录 + `index.vue`
- 组件: `PascalCase.vue`
- hooks: `useXxx.ts`

### Vue 组件结构

```vue
<script setup lang="ts">
// 1. imports
// 2. props/emits
// 3. composables (useXxx)
// 4. reactive state
// 5. computed
// 6. methods
// 7. lifecycle hooks
</script>

<template>
  <!-- 模板内容 -->
</template>

<style scoped>
/* 样式 (优先使用 UnoCSS) */
</style>
```

### API 调用

```typescript
// service/api/xxx.ts
import { request } from '../request';

export function fetchXxxList(params: XxxQuery) {
  return request<PageResult<XxxVo>>({
    url: '/xxx/list',
    method: 'get',
    params
  });
}
```

### 字典使用

```vue
<script setup>
import { useDict } from '@/hooks/business/dict';
const { options, getLabel, getType } = useDict('sys_xxx_status');
</script>

<template>
  <n-select :options="options" />
  <n-tag :type="getType(row.status)">{{ getLabel(row.status) }}</n-tag>
</template>
```

## 样式

- 优先使用 UnoCSS 原子类
- 避免深层嵌套选择器
- 组件样式使用 `scoped`

## 类型

- 从 `@shared/types` 导入共享类型
- API 响应类型定义在 `service/api/` 对应文件
