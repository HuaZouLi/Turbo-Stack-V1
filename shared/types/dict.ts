/**
 * 字典类型定义 - 共享层
 *
 * 所有前端项目共用的字典类型定义
 */

/** 字典数据项（对应后端 SysDictData） */
export interface DictDataItem {
  /** 字典编码 */
  dictCode: number;
  /** 字典排序 */
  dictSort: number;
  /** 字典标签 */
  dictLabel: string;
  /** 字典键值 */
  dictValue: string;
  /** 字典类型 */
  dictType: string;
  /** 样式属性（其他样式扩展） */
  cssClass: string;
  /** 表格回显样式 */
  listClass: string;
  /** 是否默认（Y是 N否） */
  isDefault: string;
  /** 创建时间 */
  createTime: string;
  /** 备注 */
  remark: string;
}

/** 字典选项（用于下拉框/选择器） */
export interface DictOption {
  label: string;
  value: string;
  /** 样式类名 */
  class?: string;
  /** 表格回显样式类型 */
  type?: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}

/** 字典请求函数类型 */
export type DictFetcher = (dictType: string) => Promise<DictDataItem[]>;

/** useDict 返回类型 */
export interface UseDictReturn {
  /** 是否加载中 */
  loading: import('vue').Ref<boolean>;
  /** 原始字典数据 */
  data: import('vue').Ref<DictDataItem[]>;
  /** 下拉选项 */
  options: import('vue').ComputedRef<DictOption[]>;
  /** 根据值获取标签 */
  getLabel: (value: string | number | undefined | null) => string;
  /** 根据标签获取值 */
  getValue: (label: string) => string;
  /** 根据值获取样式类型 */
  getType: (value: string | number | undefined | null) => DictOption['type'];
  /** 重新加载 */
  reload: () => Promise<void>;
}
