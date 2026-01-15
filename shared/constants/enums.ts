/**
 * 前端专用枚举定义
 *
 * ⚠️ 重要说明：
 * - 业务枚举（如用户状态、订单状态）应使用后端字典管理，通过 useDict hook 获取
 * - 本文件仅存放前端专用的枚举（如路由类型、主题模式等）
 *
 * 使用方式：
 * ```ts
 * // 后端字典（推荐）
 * import { useDict } from '@/hooks/business/dict';
 * const { options, getLabel } = useDict('sys_user_status');
 *
 * // 前端专用枚举
 * import { ThemeMode, toOptions } from '@shared/constants/enums';
 * const options = toOptions(ThemeMode);
 * ```
 */

// ============ 类型定义 ============

/** 枚举项 */
export interface EnumItem {
  value: string;
  label: string;
}

/** 枚举对象类型 */
export type EnumType = Record<string, EnumItem>;

// ============ 工具函数 ============

/**
 * 枚举转下拉选项
 */
export function toOptions<T extends EnumType>(enumObj: T): EnumItem[] {
  return Object.values(enumObj);
}

/**
 * 根据值获取标签
 */
export function getLabel<T extends EnumType>(enumObj: T, value: string): string {
  const item = Object.values(enumObj).find(i => i.value === value);
  return item?.label ?? value;
}

/**
 * 根据标签获取值
 */
export function getValue<T extends EnumType>(enumObj: T, label: string): string {
  const item = Object.values(enumObj).find(i => i.label === label);
  return item?.value ?? label;
}

// ============ 前端专用枚举 ============

/** 主题模式 */
export const ThemeMode = {
  LIGHT: { value: 'light', label: '浅色' },
  DARK: { value: 'dark', label: '深色' },
  AUTO: { value: 'auto', label: '跟随系统' },
} as const;

/** 布局模式 */
export const LayoutMode = {
  VERTICAL: { value: 'vertical', label: '左侧菜单' },
  HORIZONTAL: { value: 'horizontal', label: '顶部菜单' },
  MIX: { value: 'mix', label: '混合菜单' },
} as const;

/** 页面过渡动画 */
export const PageTransition = {
  FADE: { value: 'fade', label: '淡入淡出' },
  SLIDE: { value: 'slide', label: '滑动' },
  ZOOM: { value: 'zoom', label: '缩放' },
  NONE: { value: 'none', label: '无' },
} as const;
