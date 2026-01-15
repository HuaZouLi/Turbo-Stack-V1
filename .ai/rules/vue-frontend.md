# Vue 前端开发规范

> 适用于 apps/admin/ 目录下的所有 Vue/TypeScript 代码

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Naive UI 组件库
- Pinia 状态管理
- UnoCSS 原子化 CSS

## 目录结构

```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
├── constants/      # 常量定义
├── hooks/          # 自定义 Hooks
│   ├── business/   # 业务 Hooks
│   └── common/     # 通用 Hooks
├── layouts/        # 布局组件
├── locales/        # 国际化
├── router/         # 路由配置
├── service/        # API 服务
│   ├── api/        # API 定义
│   └── request/    # 请求封装
├── store/          # 状态管理
├── styles/         # 全局样式
├── utils/          # 工具函数
└── views/          # 页面组件
```

## 命名规范

### 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserList.vue` |
| Hook | camelCase + use 前缀 | `useDict.ts` |
| API | camelCase | `user.ts` |
| Store | camelCase | `auth.ts` |
| 工具 | camelCase | `storage.ts` |

### 变量命名

```typescript
// 常量：UPPER_SNAKE_CASE
const MAX_COUNT = 100;

// 变量/函数：camelCase
const userName = 'admin';
function getUserInfo() {}

// 组件：PascalCase
const UserList = defineComponent({});

// 类型/接口：PascalCase
interface UserInfo {}
type UserStatus = 'active' | 'inactive';
```

## 组件规范

### 单文件组件结构

```vue
<script setup lang="ts">
// 1. 导入
import { ref, computed } from 'vue';
import { useDict } from '@/hooks/business/dict';

// 2. Props & Emits
interface Props {
  userId: number;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  update: [value: string];
}>();

// 3. 响应式数据
const loading = ref(false);
const data = ref<UserInfo | null>(null);

// 4. 计算属性
const displayName = computed(() => data.value?.name ?? '');

// 5. 方法
async function fetchData() {
  loading.value = true;
  try {
    data.value = await getUserInfo(props.userId);
  } finally {
    loading.value = false;
  }
}

// 6. 生命周期
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="user-detail">
    <n-spin :show="loading">
      <n-descriptions>
        <n-descriptions-item label="用户名">
          {{ displayName }}
        </n-descriptions-item>
      </n-descriptions>
    </n-spin>
  </div>
</template>

<style scoped>
.user-detail {
  padding: 16px;
}
</style>
```

### Props 定义

```typescript
// 推荐：使用 TypeScript 接口
interface Props {
  /** 用户ID */
  userId: number;
  /** 是否只读 */
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
});
```

### Emits 定义

```typescript
const emit = defineEmits<{
  /** 更新事件 */
  update: [value: string];
  /** 删除事件 */
  delete: [id: number];
}>();
```

## API 规范

### API 定义

```typescript
// service/api/user.ts
import { request } from '../request';

/** 获取用户列表 */
export async function fetchUserList(params: UserQueryParams): Promise<UserInfo[]> {
  const { data, error } = await request<UserInfo[]>({
    url: '/system/user/list',
    method: 'get',
    params
  });
  
  if (error) {
    console.error('获取用户列表失败', error);
    return [];
  }
  
  return data || [];
}

/** 获取用户详情 */
export async function fetchUserInfo(userId: number): Promise<UserInfo | null> {
  const { data, error } = await request<UserInfo>({
    url: `/system/user/${userId}`,
    method: 'get'
  });
  
  return error ? null : data;
}
```

## Hook 规范

### 业务 Hook

```typescript
// hooks/business/user.ts
import { ref, computed } from 'vue';
import { fetchUserList } from '@/service/api';

export function useUserList() {
  const loading = ref(false);
  const data = ref<UserInfo[]>([]);
  
  async function load(params?: UserQueryParams) {
    loading.value = true;
    try {
      data.value = await fetchUserList(params);
    } finally {
      loading.value = false;
    }
  }
  
  return {
    loading,
    data,
    load
  };
}
```

### 使用共享层 Hook

```typescript
// 字典 Hook（从共享层适配）
import { useDict } from '@/hooks/business/dict';

const { options, getLabel, getType } = useDict('sys_user_status');
```

## Store 规范

```typescript
// store/modules/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref<UserInfo | null>(null);
  
  // Getters
  const isLogin = computed(() => !!userInfo.value);
  
  // Actions
  async function login(params: LoginParams) {
    const data = await fetchLogin(params);
    userInfo.value = data;
  }
  
  function logout() {
    userInfo.value = null;
  }
  
  return {
    userInfo,
    isLogin,
    login,
    logout
  };
});
```

## 类型规范

### 类型定义位置

- API 响应类型：`@shared/types/`
- 组件 Props：组件文件内
- Store 状态：Store 文件内
- 通用类型：`src/typings/`

### 类型导入

```typescript
// 从共享层导入
import type { DictDataItem, DictOption } from '@shared/types/dict';

// 从本地导入
import type { UserInfo } from '@/typings/user';
```

## 样式规范

### UnoCSS 优先

```vue
<template>
  <!-- 推荐：使用 UnoCSS -->
  <div class="flex items-center gap-4 p-4">
    <span class="text-lg font-bold">标题</span>
  </div>
</template>
```

### Scoped 样式

```vue
<style scoped>
/* 组件特定样式 */
.custom-class {
  /* ... */
}
</style>
```

## 注释规范

```typescript
/**
 * 用户列表组件
 * 
 * @description 展示用户列表，支持分页和搜索
 */

/** 获取用户信息 */
function getUserInfo() {}

// 单行注释
const count = 0;
```
