# 移动端开发规范

> 适用于 apps/mobile/ 目录下的所有 Uni-app/Vue 代码

## 技术栈

- Uni-app + Vue 3
- TypeScript
- Wot Design Uni 组件库
- Pinia 状态管理

## 目录结构

```
src/
├── api/            # API 类型定义
├── components/     # 公共组件
├── hooks/          # 自定义 Hooks
├── http/           # 请求封装
├── layouts/        # 布局组件
├── pages/          # 页面组件
├── router/         # 路由配置
├── service/        # API 服务
├── static/         # 静态资源
├── store/          # 状态管理
├── types/          # 类型定义
└── utils/          # 工具函数
```

## 页面规范

### 页面结构

```vue
<script setup lang="ts">
// 1. 导入
import { ref, onMounted } from 'vue';
import { useDict } from '@/hooks/useDict';

// 2. 响应式数据
const loading = ref(false);
const list = ref<Item[]>([]);

// 3. 方法
async function loadData() {
  loading.value = true;
  try {
    list.value = await fetchList();
  } finally {
    loading.value = false;
  }
}

// 4. 生命周期
onMounted(() => {
  loadData();
});

// 5. 页面生命周期（Uni-app 特有）
onLoad((options) => {
  console.log('页面参数:', options);
});

onShow(() => {
  // 页面显示时刷新
});
</script>

<template>
  <view class="page">
    <wd-loading v-if="loading" />
    <view v-else class="list">
      <view v-for="item in list" :key="item.id" class="item">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  padding: 20rpx;
}

.list {
  .item {
    padding: 20rpx;
    border-bottom: 1rpx solid #eee;
  }
}
</style>
```

### 页面配置 (pages.json)

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ]
}
```

## 组件规范

### 组件命名

```
components/
├── common/           # 通用组件
│   ├── AppHeader.vue
│   └── AppFooter.vue
└── business/         # 业务组件
    ├── UserCard.vue
    └── OrderItem.vue
```

### 组件示例

```vue
<script setup lang="ts">
interface Props {
  title: string;
  showBack?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showBack: true
});

function handleBack() {
  uni.navigateBack();
}
</script>

<template>
  <view class="header">
    <view v-if="showBack" class="back" @click="handleBack">
      <wd-icon name="arrow-left" />
    </view>
    <text class="title">{{ title }}</text>
  </view>
</template>
```

## API 规范

### 请求封装

```typescript
// http/http.ts 已封装，直接使用
import { httpGet, httpPost } from '@/http/http';

// 获取列表
const list = await httpGet<Item[]>('/api/list');

// 提交数据
const result = await httpPost<Result>('/api/submit', { name: 'test' });
```

### API 定义

```typescript
// service/user.ts
import { httpGet, httpPost } from '@/http/http';

export async function getUserInfo(userId: number) {
  return httpGet<UserInfo>(`/system/user/${userId}`);
}

export async function updateUser(data: UserUpdateDto) {
  return httpPost<void>('/system/user', data);
}
```

## Hook 规范

### 使用共享层 Hook

```typescript
// hooks/useDict.ts 已适配，直接使用
import { useDict } from '@/hooks/useDict';

const { options, getLabel } = useDict('sys_user_status');
```

### 自定义 Hook

```typescript
// hooks/useList.ts
import { ref } from 'vue';

export function useList<T>(fetchFn: () => Promise<T[]>) {
  const loading = ref(false);
  const list = ref<T[]>([]);
  const finished = ref(false);

  async function load() {
    if (loading.value || finished.value) return;
    
    loading.value = true;
    try {
      const data = await fetchFn();
      list.value = data;
      finished.value = data.length === 0;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    list.value = [];
    finished.value = false;
  }

  return { loading, list, finished, load, reset };
}
```

## Store 规范

```typescript
// store/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const userInfo = ref<UserInfo | null>(null);

  const isLogin = computed(() => !!token.value);

  function setToken(value: string) {
    token.value = value;
    uni.setStorageSync('token', value);
  }

  function logout() {
    token.value = '';
    userInfo.value = null;
    uni.removeStorageSync('token');
  }

  return { token, userInfo, isLogin, setToken, logout };
});
```

## 样式规范

### 单位使用

```scss
// 推荐：使用 rpx（响应式单位）
.container {
  padding: 20rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
}

// 固定尺寸：使用 px
.icon {
  width: 24px;
  height: 24px;
}
```

### 主题变量

```scss
// 使用 Wot Design 主题变量
.custom {
  color: var(--wot-color-primary);
  background: var(--wot-color-bg);
}
```

## 平台差异处理

### 条件编译

```vue
<template>
  <!-- #ifdef MP-WEIXIN -->
  <button open-type="getUserInfo">微信登录</button>
  <!-- #endif -->
  
  <!-- #ifdef H5 -->
  <button @click="h5Login">H5登录</button>
  <!-- #endif -->
</template>

<script setup lang="ts">
// #ifdef MP-WEIXIN
function wxLogin() {
  uni.login({ provider: 'weixin' });
}
// #endif

// #ifdef H5
function h5Login() {
  // H5 登录逻辑
}
// #endif
</script>
```

### 平台 API

```typescript
// 统一使用 uni API
uni.showToast({ title: '成功' });
uni.navigateTo({ url: '/pages/detail/detail' });
uni.setStorageSync('key', 'value');
```

## 性能优化

### 图片懒加载

```vue
<image :src="item.image" lazy-load mode="aspectFill" />
```

### 列表优化

```vue
<!-- 使用 z-paging 组件 -->
<z-paging ref="paging" v-model="list" @query="queryList">
  <view v-for="item in list" :key="item.id">
    {{ item.name }}
  </view>
</z-paging>
```

### 分包加载

```json
// pages.json
{
  "subPackages": [
    {
      "root": "pages-sub",
      "pages": [
        { "path": "detail/detail" }
      ]
    }
  ]
}
```
