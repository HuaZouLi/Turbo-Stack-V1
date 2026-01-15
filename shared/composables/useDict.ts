/**
 * 字典 Composable - 共享层核心逻辑
 *
 * 设计原则：
 * 1. 平台无关：不依赖具体 HTTP 实现，通过依赖注入获取数据
 * 2. 高内聚：缓存、转换、查询逻辑集中管理
 * 3. 低耦合：各端只需注入自己的请求方法
 *
 * @example
 * ```ts
 * // Admin 端适配
 * import { createUseDict } from '@shared/composables/useDict';
 * import { fetchDictDataByType } from '@/service/api';
 * export const useDict = createUseDict(fetchDictDataByType);
 *
 * // Mobile 端适配
 * import { createUseDict } from '@shared/composables/useDict';
 * import { httpGet } from '@/http/http';
 * export const useDict = createUseDict((type) => httpGet(`/system/dict/data/type/${type}`));
 * ```
 */

import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { DictDataItem, DictFetcher, DictOption, UseDictReturn } from '../types/dict';

/** 字典缓存（全局共享） */
const dictCache = new Map<string, DictDataItem[]>();

/** 正在请求的字典类型（防止重复请求） */
const pendingRequests = new Map<string, Promise<DictDataItem[]>>();

/**
 * 映射 listClass 到组件类型
 */
function mapListClass(listClass?: string): DictOption['type'] {
  const map: Record<string, DictOption['type']> = {
    default: 'default',
    primary: 'primary',
    success: 'success',
    info: 'info',
    warning: 'warning',
    danger: 'error'
  };
  return map[listClass || ''] || 'default';
}

/**
 * 获取字典数据（带缓存）
 */
async function getDictData(dictType: string, fetcher: DictFetcher): Promise<DictDataItem[]> {
  // 1. 检查缓存
  if (dictCache.has(dictType)) {
    return dictCache.get(dictType)!;
  }

  // 2. 检查是否有正在进行的请求（防止重复请求）
  if (pendingRequests.has(dictType)) {
    return pendingRequests.get(dictType)!;
  }

  // 3. 发起请求
  const promise = fetcher(dictType)
    .then(data => {
      const result = data || [];
      dictCache.set(dictType, result);
      return result;
    })
    .finally(() => {
      pendingRequests.delete(dictType);
    });

  pendingRequests.set(dictType, promise);
  return promise;
}

/**
 * 创建 useDict Hook 工厂函数
 *
 * @param fetcher 字典数据请求函数（由各端注入）
 * @returns useDict hook
 */
export function createUseDict(fetcher: DictFetcher) {
  /**
   * 字典 Hook
   *
   * @param dictType 字典类型，可以是字符串或响应式引用
   * @returns 字典操作方法和数据
   */
  return function useDict(dictType: string | Ref<string>): UseDictReturn {
    const loading = ref(false);
    const data = ref<DictDataItem[]>([]);

    /** 获取当前字典类型 */
    const currentType = computed(() => (typeof dictType === 'string' ? dictType : dictType.value));

    /** 转换为下拉选项 */
    const options = computed<DictOption[]>(() =>
      data.value.map((item: DictDataItem) => ({
        label: item.dictLabel,
        value: item.dictValue,
        class: item.cssClass,
        type: mapListClass(item.listClass)
      }))
    );

    /** 加载字典数据 */
    async function load() {
      if (!currentType.value) return;

      loading.value = true;
      try {
        data.value = await getDictData(currentType.value, fetcher);
      } finally {
        loading.value = false;
      }
    }

    /** 根据值获取标签 */
    function getLabel(value: string | number | undefined | null): string {
      if (value === undefined || value === null) return '';
      const strValue = String(value);
      const item = data.value.find((d: DictDataItem) => d.dictValue === strValue);
      return item?.dictLabel ?? strValue;
    }

    /** 根据标签获取值 */
    function getValue(label: string): string {
      const item = data.value.find((d: DictDataItem) => d.dictLabel === label);
      return item?.dictValue ?? label;
    }

    /** 根据值获取样式类型（用于 Tag 组件） */
    function getType(value: string | number | undefined | null): DictOption['type'] {
      if (value === undefined || value === null) return 'default';
      const strValue = String(value);
      const item = data.value.find((d: DictDataItem) => d.dictValue === strValue);
      return mapListClass(item?.listClass);
    }

    // 监听字典类型变化，自动重新加载
    if (typeof dictType !== 'string') {
      watch(dictType, () => load(), { immediate: true });
    } else {
      load();
    }

    return {
      loading,
      data,
      options,
      getLabel,
      getValue,
      getType,
      reload: load
    };
  };
}

/**
 * 清除字典缓存
 * @param dictType 字典类型，不传则清除所有
 */
export function clearDictCache(dictType?: string) {
  if (dictType) {
    dictCache.delete(dictType);
  } else {
    dictCache.clear();
  }
}

/**
 * 预加载字典数据
 * @param dictTypes 字典类型列表
 * @param fetcher 请求函数
 */
export async function preloadDicts(dictTypes: string[], fetcher: DictFetcher) {
  await Promise.all(dictTypes.map(type => getDictData(type, fetcher)));
}
