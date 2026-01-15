declare namespace Api {
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   * Adapted for RuoYi-Vue-Plus Sa-Token authentication
   */
  namespace Auth {
    /** Login token response from RuoYi-Vue-Plus */
    interface LoginToken {
      /** Access token (Sa-Token) */
      access_token: string;
      /** Refresh token */
      refresh_token: string;
      /** Access token expiration time in seconds */
      expire_in: number;
      /** Refresh token expiration time in seconds */
      refresh_expire_in: number;
      /** Client ID */
      client_id: string;
      /** Token scope */
      scope: string;
      /** User openid */
      openid: string;
    }

    /** User info response from RuoYi-Vue-Plus /system/user/getInfo */
    interface UserInfo {
      user: {
        userId: number;
        tenantId: string;
        deptId: number;
        userName: string;
        nickName: string;
        userType: string;
        email: string;
        phonenumber: string;
        sex: string;
        avatar: string;
        status: string;
        loginIp: string;
        loginDate: string;
        remark: string;
        dept: {
          deptId: number;
          deptName: string;
        };
        roles: RoleInfo[];
      };
      /** Role keys (e.g., ['admin', 'common']) */
      roles: string[];
      /** Permission keys (e.g., ['*:*:*', 'system:user:list']) */
      permissions: string[];
    }

    /** Role info */
    interface RoleInfo {
      roleId: number;
      roleName: string;
      roleKey: string;
      dataScope: string;
    }

    /** Tenant list response */
    interface TenantList {
      tenantEnabled: boolean;
      voList: TenantInfo[];
    }

    /** Tenant info */
    interface TenantInfo {
      tenantId: string;
      companyName: string;
      domain: string | null;
    }

    /** Captcha image response */
    interface CaptchaImage {
      captchaEnabled: boolean;
      uuid: string;
      img: string;
    }
  }
}
