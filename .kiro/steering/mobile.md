---
inclusion: fileMatch
fileMatchPattern: "apps/mobile/**/*.{vue,ts,tsx}"
---

# Mobile 端开发规范

当修改 `apps/mobile/` 下的 Vue/TS 文件时，遵循以下规范。

## 技术栈

- Uni-app + Vue 3 + TypeScript + Vite
- Wot Design Uni 组件库
- UnoCSS 原子化 CSS
- Pinia 状态管理

## 目录结构

```
src/
├── pages/          # 页面 (约定式路由)
├── components/     # 全局公共组件
├── hooks/          # 组合式函数
├── http/           # 请求封装
├── store/          # Pinia stores
├── types/          # 类型定义
├── layouts/        # 布局组件
├── tabbar/         # 底部导航栏
└── App.ku.vue      # 全局根组件
```

## Vue SFC 规范

标签顺序必须为：`<script>` → `<template>` → `<style>`

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UserInfo } from '@/types/user'

const userInfo = ref<UserInfo | null>(null)
</script>

<template>
  <view class="container flex flex-col p-4">
    <wd-button>按钮</wd-button>
  </view>
</template>

<style lang="scss" scoped>
/* 优先使用 UnoCSS 原子类，减少自定义样式 */
</style>
```

## 页面配置

使用 `definePage` 宏配置页面，自动生成到 `pages.json`：

```vue
<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: '页面标题' }
})
</script>
```

## API 调用

```typescript
import { httpGet, httpPost } from '@/http/http'

// GET 请求
const data = await httpGet<XxxVo[]>('/xxx/list', { params })

// POST 请求
const result = await httpPost<void>('/xxx/save', body)
```

## 字典使用

```vue
<script setup lang="ts">
import { useDict } from '@/hooks/useDict'
const { options, getLabel } = useDict('sys_xxx_status')
</script>

<template>
  <wd-picker :columns="options" />
  <text>{{ getLabel(item.status) }}</text>
</template>
```

## 跨平台适配

使用条件编译处理平台差异：

```vue
<script setup lang="ts">
// #ifdef H5
import { h5Api } from '@/utils/h5'
// #endif

// #ifdef MP-WEIXIN
import { mpApi } from '@/utils/mp'
// #endif
</script>

<template>
  <!-- #ifdef H5 -->
  <view>H5 特有内容</view>
  <!-- #endif -->
  
  <!-- #ifdef MP-WEIXIN -->
  <view>微信小程序特有内容</view>
  <!-- #endif -->
</template>
```

## 生命周期

- 页面生命周期：`onLoad`, `onShow`, `onReady`, `onHide`, `onUnload`
- 组件生命周期：遵循 Vue 3 规范

## 样式规范

- 优先使用 UnoCSS 原子类
- 样式单位使用 `rpx` 适配不同屏幕
- 使用 `scoped` 限制样式作用域
- 避免使用 DOM 操作

## 开发命令

```bash
pnpm dev          # H5 开发
pnpm dev:mp       # 微信小程序
pnpm dev:mp-alipay # 支付宝小程序
pnpm dev:app      # APP 开发
```

## 性能优化

- 图片懒加载
- 列表使用虚拟滚动 (z-paging)
- 避免频繁 setData
- 使用懒加载和代码分割
