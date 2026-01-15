import { request } from '../request';
import type { DictDataItem } from '@shared/types/dict';

/**
 * 根据字典类型查询字典数据
 * @param dictType 字典类型
 * @returns 字典数据列表
 */
export async function fetchDictDataByType(dictType: string): Promise<DictDataItem[]> {
  const { data, error } = await request<DictDataItem[]>({
    url: `/system/dict/data/type/${dictType}`,
    method: 'get'
  });

  if (error) {
    console.error(`Failed to fetch dict data for type: ${dictType}`, error);
    return [];
  }

  return data || [];
}
