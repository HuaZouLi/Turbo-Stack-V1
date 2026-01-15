/**
 * Shared constants for Turbo-Stack
 */

// 枚举定义（高内聚：所有静态枚举集中管理）
export * from './enums';

// ============ HTTP 相关常量 ============

/** HTTP response codes */
export const HTTP_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

/** Business response codes */
export const BIZ_CODE = {
  SUCCESS: 200,
  FAIL: 500,
  UNAUTHORIZED: 401,
  TOKEN_EXPIRED: 401
} as const;
