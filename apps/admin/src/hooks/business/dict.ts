/**
 * Admin 端字典 Hook - 适配层
 *
 * 基于 shared/composables/useDict 核心逻辑，注入 Admin 的请求方法
 */

import { createUseDict, clearDictCache, preloadDicts } from '@shared/composables/useDict';
import { fetchDictDataByType } from '@/service/api';

// 导出类型（方便使用）
export type { DictDataItem, DictOption, UseDictReturn } from '@shared/types/dict';

/**
 * 字典 Hook
 *
 * @param dictType 字典类型，可以是字符串或响应式引用
 * @returns 字典操作方法和数据
 *
 * @example
 * ```vue
 * <script setup>
 * import { useDict } from '@/hooks/business/dict';
 *
 * const { options, getLabel, getType, loading } = useDict('sys_user_status');
 * </script>
 *
 * <template>
 *   <n-select :options="options" :loading="loading" />
 *   <n-tag :type="getType(row.status)">{{ getLabel(row.status) }}</n-tag>
 * </template>
 * ```
 */
export const useDict = createUseDict(fetchDictDataByType);

/**
 * 清除字典缓存
 * @param dictType 字典类型，不传则清除所有
 */
export { clearDictCache };

/**
 * 预加载字典数据（可在应用启动时调用）
 * @param dictTypes 字典类型列表
 */
export const preloadAdminDicts = (dictTypes: string[]) => preloadDicts(dictTypes, fetchDictDataByType);
