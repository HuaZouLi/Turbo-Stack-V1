/**
 * ${entityCn} API
 *
 * @author ${author}
 * @since ${date}
 */
import { request } from '../request';

/** ${entityCn}视图对象 */
export interface ${Entity}Vo {
  /** 主键 */
  ${entityId}: ${IdType};
  // TODO: 添加其他字段
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** ${entityCn}数据传输对象 */
export interface ${Entity}Dto {
  /** 主键（编辑时必填） */
  ${entityId}?: ${IdType};
  // TODO: 添加其他字段
}

/** ${entityCn}查询参数 */
export interface ${Entity}QueryParams {
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
  // TODO: 添加查询字段
}

/** 分页结果 */
export interface PageResult<T> {
  rows: T[];
  total: number;
}

/**
 * 查询${entityCn}列表
 */
export async function fetch${Entity}List(params: ${Entity}QueryParams): Promise<PageResult<${Entity}Vo>> {
  const { data, error } = await request<PageResult<${Entity}Vo>>({
    url: '/${module}/${entityPath}/list',
    method: 'get',
    params
  });

  if (error) {
    console.error('查询${entityCn}列表失败', error);
    return { rows: [], total: 0 };
  }

  return data || { rows: [], total: 0 };
}

/**
 * 获取${entityCn}详情
 */
export async function fetch${Entity}Detail(${entityId}: ${IdType}): Promise<${Entity}Vo | null> {
  const { data, error } = await request<${Entity}Vo>({
    url: `/${module}/${entityPath}/${${entityId}}`,
    method: 'get'
  });

  return error ? null : data;
}

/**
 * 新增${entityCn}
 */
export async function add${Entity}(data: ${Entity}Dto): Promise<boolean> {
  const { error } = await request<void>({
    url: '/${module}/${entityPath}',
    method: 'post',
    data
  });

  return !error;
}

/**
 * 修改${entityCn}
 */
export async function update${Entity}(data: ${Entity}Dto): Promise<boolean> {
  const { error } = await request<void>({
    url: '/${module}/${entityPath}',
    method: 'put',
    data
  });

  return !error;
}

/**
 * 删除${entityCn}
 */
export async function delete${Entity}(${entityId}: ${IdType}): Promise<boolean> {
  const { error } = await request<void>({
    url: `/${module}/${entityPath}/${${entityId}}`,
    method: 'delete'
  });

  return !error;
}

/**
 * 批量删除${entityCn}
 */
export async function delete${Entity}Batch(${entityId}s: ${IdType}[]): Promise<boolean> {
  const { error } = await request<void>({
    url: `/${module}/${entityPath}/${${entityId}s.join(',')}`,
    method: 'delete'
  });

  return !error;
}

/**
 * 导出${entityCn}
 */
export async function export${Entity}(params: ${Entity}QueryParams): Promise<void> {
  const { error } = await request<Blob>({
    url: '/${module}/${entityPath}/export',
    method: 'post',
    data: params,
    responseType: 'blob'
  });

  if (error) {
    console.error('导出${entityCn}失败', error);
  }
}
