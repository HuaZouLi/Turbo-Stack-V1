import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { fetchGetUserInfo, fetchLogin, fetchLogout } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import { SetupStoreId } from '@/enum';
import { $t } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getToken } from './shared';

/** Simplified user info for store state */
interface StoreUserInfo {
  userId: string;
  userName: string;
  nickName: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  /** User info adapted for RuoYi-Vue-Plus */
  const userInfo: StoreUserInfo = reactive({
    userId: '',
    userName: '',
    nickName: '',
    avatar: '',
    roles: [],
    permissions: []
  });

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    recordUserId();

    clearAuthStorage();

    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  /** Record the user ID of the previous login session Used to compare with the current user ID on next login */
  function recordUserId() {
    if (!userInfo.userId) {
      return;
    }

    // Store current user ID locally for next login comparison
    localStg.set('lastLoginUserId', userInfo.userId);
  }

  /**
   * Check if current login user is different from previous login user If different, clear all tabs
   *
   * @returns {boolean} Whether to clear all tabs
   */
  function checkTabClear(): boolean {
    if (!userInfo.userId) {
      return false;
    }

    const lastLoginUserId = localStg.get('lastLoginUserId');

    // Clear all tabs if current user is different from previous user
    if (!lastLoginUserId || lastLoginUserId !== userInfo.userId) {
      localStg.remove('globalTabs');
      tabStore.clearTabs();

      localStg.remove('lastLoginUserId');
      return true;
    }

    localStg.remove('lastLoginUserId');
    return false;
  }

  /**
   * Login to RuoYi-Vue-Plus backend
   *
   * @param userName User name
   * @param password Password
   * @param code Captcha code (optional)
   * @param uuid Captcha UUID (optional)
   * @param tenantId Tenant ID (optional)
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(
    userName: string,
    password: string,
    code?: string,
    uuid?: string,
    tenantId?: string,
    redirect = true
  ) {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(
      userName,
      password,
      'e5cd7e4891bf95d1d19206ce24a7b32e', // PC client ID
      'password',
      tenantId,
      code,
      uuid
    );

    if (!error) {
      const pass = await loginByToken(loginToken);

      if (pass) {
        // Check if the tab needs to be cleared
        const isClear = checkTabClear();
        let needRedirect = redirect;

        if (isClear) {
          // If the tab needs to be cleared,it means we don't need to redirect.
          needRedirect = false;
        }
        await redirectFromLogin(needRedirect);

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { userName: userInfo.nickName || userInfo.userName }),
          duration: 4500
        });
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  /**
   * Login by token - adapted for RuoYi-Vue-Plus Sa-Token format
   */
  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    // RuoYi-Vue-Plus uses access_token and refresh_token
    localStg.set('token', loginToken.access_token);
    localStg.set('refreshToken', loginToken.refresh_token);

    // 2. get user info
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.access_token;

      return true;
    }

    return false;
  }

  /** Logout from RuoYi-Vue-Plus backend */
  async function logout() {
    await fetchLogout();
    await resetStore();
  }

  /**
   * Get user info from RuoYi-Vue-Plus backend
   * Transforms the response to match store format
   */
  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // Transform RuoYi-Vue-Plus user info to store format
      const transformedInfo: StoreUserInfo = {
        userId: String(info.user.userId),
        userName: info.user.userName,
        nickName: info.user.nickName,
        avatar: info.user.avatar || '',
        roles: info.roles || [],
        permissions: info.permissions || []
      };

      // update store
      Object.assign(userInfo, transformedInfo);

      return true;
    }

    return false;
  }

  async function initUserInfo() {
    const hasToken = getToken();

    if (hasToken) {
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    logout,
    initUserInfo
  };
});
