---
inclusion: fileMatch
fileMatchPattern: "shared/**/*.ts"
---

# Shared 共享层开发规范

当修改 `shared/` 下的文件时，遵循以下规范。

## 核心原则

**单一数据源** - shared 是跨端共享代码的唯一位置。

## 目录职责

```
shared/
├── types/        # 类型定义 (纯类型，无运行时代码)
├── composables/  # Vue Composables (平台无关)
├── constants/    # 常量和枚举
└── utils/        # 工具函数 (纯函数)
```

## 编写规范

### types/ - 类型定义

```typescript
// 只包含类型，不包含运行时代码
export interface XxxItem {
  id: string;
  name: string;
}

export type XxxStatus = 'active' | 'inactive';
```

### composables/ - 组合式函数

使用工厂模式，通过依赖注入适配各端：

```typescript
// 工厂函数
export function createUseXxx(fetcher: (id: string) => Promise<XxxItem>) {
  return function useXxx(id: MaybeRef<string>) {
    // 平台无关的逻辑
    const data = ref<XxxItem | null>(null);
    
    watch(() => unref(id), async (newId) => {
      data.value = await fetcher(newId);
    }, { immediate: true });
    
    return { data };
  };
}
```

### constants/ - 常量

```typescript
// 前端专用枚举 (不从后端获取的)
export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const;

export type ThemeModeType = typeof ThemeMode[keyof typeof ThemeMode];
```

### utils/ - 工具函数

```typescript
// 纯函数，无副作用
export function formatDate(date: Date, format: string): string {
  // ...
}
```

## 注意事项

1. **不要引入平台特定 API** - 如 `uni.xxx`, `window.xxx`
2. **不要引入 apps/ 下的代码** - 依赖方向是 apps → shared
3. **保持最小依赖** - 只依赖 Vue 核心 API
4. **导出要完整** - 在 `index.ts` 中统一导出
