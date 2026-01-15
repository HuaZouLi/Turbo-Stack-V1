/**
 * Mobile 端字典 Hook - 适配层
 *
 * 基于 shared/composables/useDict 核心逻辑，注入 Mobile 的请求方法
 */

import type { DictDataItem } from '@shared/types/dict'
import { clearDictCache, createUseDict, preloadDicts } from '@shared/composables/useDict'
import { httpGet } from '@/http/http'

// 导出类型（方便使用）
export type { DictDataItem, DictOption, UseDictReturn } from '@shared/types/dict'

/** Mobile 端字典请求函数 */
function fetchDictDataByType(dictType: string) {
  return httpGet<DictDataItem[]>(`/system/dict/data/type/${dictType}`)
}

/**
 * 字典 Hook
 *
 * @param dictType 字典类型，可以是字符串或响应式引用
 * @returns 字典操作方法和数据
 *
 * @example
 * ```vue
 * <script setup>
 * import { useDict } from '@/hooks/useDict';
 *
 * const { options, getLabel, loading } = useDict('sys_user_status');
 * </script>
 *
 * <template>
 *   <wd-picker :columns="options" :loading="loading" />
 *   <text>{{ getLabel(item.status) }}</text>
 * </template>
 * ```
 */
export const useDict = createUseDict(fetchDictDataByType)

/**
 * 清除字典缓存
 * @param dictType 字典类型，不传则清除所有
 */
export { clearDictCache }

/**
 * 预加载字典数据（可在应用启动时调用）
 * @param dictTypes 字典类型列表
 */
export function preloadMobileDicts(dictTypes: string[]) {
  return preloadDicts(dictTypes, fetchDictDataByType)
}

export default useDict
