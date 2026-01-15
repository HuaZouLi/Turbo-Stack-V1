import { request } from '../request';

/**
 * Login to RuoYi-Vue-Plus backend
 *
 * @param username User name
 * @param password Password
 * @param clientId Client ID (default: 'e5cd7e4891bf95d1d19206ce24a7b32e' for PC)
 * @param grantType Grant type (default: 'password')
 * @param tenantId Tenant ID (optional)
 * @param code Captcha code (optional)
 * @param uuid Captcha UUID (optional)
 */
export function fetchLogin(
  username: string,
  password: string,
  clientId: string = 'e5cd7e4891bf95d1d19206ce24a7b32e',
  grantType: string = 'password',
  tenantId?: string,
  code?: string,
  uuid?: string
) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password,
      clientId,
      grantType,
      tenantId,
      code,
      uuid
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/system/user/getInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/** Logout */
export function fetchLogout() {
  return request<void>({
    url: '/auth/logout',
    method: 'post'
  });
}

/**
 * Get tenant list for login page
 */
export function fetchTenantList() {
  return request<Api.Auth.TenantList>({
    url: '/auth/tenant/list',
    method: 'get'
  });
}

/**
 * Get captcha image
 */
export function fetchCaptchaImage() {
  return request<Api.Auth.CaptchaImage>({
    url: '/auth/code',
    method: 'get'
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
