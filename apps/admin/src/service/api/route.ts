import type { ElegantConstRoute } from '@elegant-router/types';
import { request } from '../request';

/**
 * RuoYi-Vue-Plus router response format
 * Based on RouterVo.java and MetaVo.java from RuoYi-Vue-Plus backend
 */
interface RuoYiRouterVo {
  /** Route name */
  name: string;
  /** Route path */
  path: string;
  /** Whether to hide route in sidebar */
  hidden?: boolean;
  /** Redirect path, 'noRedirect' means not clickable in breadcrumb */
  redirect?: string;
  /** Component path: 'Layout' | 'ParentView' | 'InnerLink' | actual component path */
  component?: string;
  /** Route query params as JSON string */
  query?: string;
  /** Always show root menu even if only one child */
  alwaysShow?: boolean;
  /** Route meta information */
  meta?: {
    /** Display title in sidebar and breadcrumb */
    title: string;
    /** Icon name from src/assets/icons/svg */
    icon?: string;
    /** If true, will not be cached by keep-alive */
    noCache?: boolean;
    /** External link URL (http(s)://) */
    link?: string;
    /** Active menu path for highlighting */
    activeMenu?: string;
  };
  /** Child routes */
  children?: RuoYiRouterVo[];
}

/** Counter for generating unique route order */
let routeOrderCounter = 0;

/**
 * Generate a valid route name from path
 * Converts /system/user to system_user
 */
function generateRouteName(path: string, existingName?: string): string {
  if (existingName) {
    return existingName;
  }
  // Remove leading slash and replace remaining slashes with underscores
  return path.replace(/^\//, '').replace(/\//g, '_') || 'root';
}

/**
 * Map RuoYi icon names to Iconify icon names
 * RuoYi uses custom SVG icons, we map common ones to Iconify equivalents
 */
function mapRuoYiIconToIconify(icon?: string): string {
  if (!icon) return '';
  
  // Common RuoYi icon to Iconify mappings
  const iconMap: Record<string, string> = {
    'system': 'carbon:settings',
    'user': 'carbon:user',
    'peoples': 'carbon:group',
    'tree-table': 'carbon:tree-view',
    'tree': 'carbon:tree-view-alt',
    'menu': 'carbon:menu',
    'role': 'carbon:user-role',
    'dict': 'carbon:book',
    'post': 'carbon:document',
    'log': 'carbon:document-tasks',
    'logininfor': 'carbon:login',
    'online': 'carbon:status-partial-fail',
    'job': 'carbon:time',
    'druid': 'carbon:data-base',
    'server': 'carbon:server-dns',
    'cache': 'carbon:data-backup',
    'monitor': 'carbon:dashboard',
    'tool': 'carbon:tools',
    'build': 'carbon:build-tool',
    'code': 'carbon:code',
    'swagger': 'carbon:api',
    'guide': 'carbon:help',
    'star': 'carbon:star',
    'message': 'carbon:email',
    'email': 'carbon:email',
    'chart': 'carbon:chart-line',
    'form': 'carbon:document-blank',
    'table': 'carbon:table',
    'edit': 'carbon:edit',
    'list': 'carbon:list',
    'search': 'carbon:search',
    'date': 'carbon:calendar',
    'money': 'carbon:currency-dollar',
    'shopping': 'carbon:shopping-cart',
    'lock': 'carbon:locked',
    'unlock': 'carbon:unlocked',
    'download': 'carbon:download',
    'upload': 'carbon:upload',
    'clipboard': 'carbon:copy',
    'component': 'carbon:cube',
    'skill': 'carbon:skill-level',
    'international': 'carbon:earth',
    'documentation': 'carbon:document',
    'excel': 'carbon:document-export',
    'pdf': 'carbon:document-pdf',
    'zip': 'carbon:zip',
    'bug': 'carbon:debug',
    'link': 'carbon:link',
    'tab': 'carbon:tabs',
    'example': 'carbon:template',
    'eye-open': 'carbon:view',
    'eye': 'carbon:view',
    'education': 'carbon:education',
    'nested': 'carbon:folder',
    'dashboard': 'carbon:dashboard',
    'question': 'carbon:help',
    'validCode': 'carbon:checkmark-outline',
    'drag': 'carbon:drag-vertical',
    'size': 'carbon:fit-to-screen',
    'language': 'carbon:translate',
    'theme': 'carbon:color-palette',
    'fullscreen': 'carbon:fit-to-screen',
    'exit-fullscreen': 'carbon:minimize',
    'github': 'carbon:logo-github',
    'gitee': 'simple-icons:gitee',
    'qq': 'simple-icons:tencentqq',
    'wechat': 'carbon:logo-wechat',
    'alipay': 'simple-icons:alipay',
    'taobao': 'simple-icons:taobao',
    'weibo': 'simple-icons:sinaweibo',
    'dingtalk': 'simple-icons:dingtalk',
    'redis': 'simple-icons:redis',
    'time-range': 'carbon:time',
    'date-range': 'carbon:calendar',
    'number': 'carbon:character-whole-number',
    'textarea': 'carbon:text-align-left',
    'radio': 'carbon:radio-button',
    'checkbox': 'carbon:checkbox',
    'select': 'carbon:list-dropdown',
    'input': 'carbon:text-input',
    'slider': 'carbon:slider',
    'rate': 'carbon:star',
    'color': 'carbon:color-palette',
    'switch': 'carbon:toggle-on',
    'cascader': 'carbon:flow-cascade',
    'time': 'carbon:time',
    'upload-filled': 'carbon:cloud-upload',
    'icon': 'carbon:image',
    'row': 'carbon:row',
    '404': 'carbon:warning-alt',
    'password': 'carbon:password',
    'phone': 'carbon:phone',
    'peoples-two': 'carbon:group',
    'dept': 'carbon:enterprise',
    'client': 'carbon:application',
    'tenant': 'carbon:enterprise',
    'oss': 'carbon:object-storage',
    'workflow': 'carbon:flow',
    'category': 'carbon:category',
    'leave': 'carbon:calendar-heat-map',
    'process-definition': 'carbon:flow-data',
    'process-instance': 'carbon:flow-stream',
    'task': 'carbon:task',
    'form-designer': 'carbon:document-add',
  };
  
  // Return mapped icon or use the original with a prefix
  return iconMap[icon] || `local-icon:${icon}`;
}

/**
 * Transform RuoYi-Vue-Plus router format to Soybean Admin ElegantConstRoute format
 *
 * RuoYi-Vue-Plus uses:
 * - 'Layout' for root layout component
 * - 'ParentView' for nested parent routes
 * - 'InnerLink' for iframe embedded pages
 * - Actual component paths like 'system/user/index' for views
 *
 * Soybean Admin uses:
 * - 'layout.base' for base layout
 * - 'layout.blank' for blank layout
 * - 'view.{name}' for view components
 */
function transformRuoYiRouteToElegant(
  route: RuoYiRouterVo,
  parentPath = '',
  level = 0
): ElegantConstRoute | null {
  // Skip hidden routes (they won't appear in menu but may still be accessible)
  // For now, we include them but mark hideInMenu
  const isHidden = route.hidden === true;

  // Calculate full path for nested routes
  const fullPath = route.path.startsWith('/')
    ? route.path
    : `${parentPath}/${route.path}`.replace(/\/+/g, '/');

  // Generate route name
  const routeName = generateRouteName(fullPath, route.name);

  // Increment order counter for menu ordering
  const order = routeOrderCounter++;

  const elegantRoute: ElegantConstRoute = {
    name: routeName,
    path: route.path,
    meta: {
      title: route.meta?.title || routeName,
      icon: mapRuoYiIconToIconify(route.meta?.icon),
      order,
      keepAlive: route.meta?.noCache !== true,
      hideInMenu: isHidden
    }
  };

  // Handle activeMenu for highlighting parent menu
  // Note: activeMenu expects RouteKey type, but for dynamic routes we use string
  // The type system will handle this at runtime
  if (route.meta?.activeMenu) {
    const activeMenuKey = route.meta.activeMenu.replace(/^\//, '').replace(/\//g, '_');
    elegantRoute.meta!.activeMenu = activeMenuKey as any;
  }

  // Handle component mapping
  if (route.component) {
    const component = route.component;

    if (component === 'Layout') {
      // Root layout component
      elegantRoute.component = 'layout.base';
    } else if (component === 'ParentView') {
      // Nested parent view - use base layout for first level, otherwise no component
      elegantRoute.component = level === 0 ? 'layout.base' : undefined;
    } else if (component === 'InnerLink') {
      // Iframe embedded page
      if (route.meta?.link) {
        elegantRoute.component = 'layout.base$view.iframe-page';
        elegantRoute.meta!.href = route.meta.link;
      }
    } else {
      // Actual view component
      // RuoYi format: system/user/index -> view.system_user_index
      // We need to map this to dynamically loaded views
      const viewName = component.replace(/\//g, '_');

      // For first level routes with component, wrap with layout
      if (level === 0) {
        elegantRoute.component = `layout.base$view.${viewName}`;
      } else {
        elegantRoute.component = `view.${viewName}`;
      }
    }
  }

  // Handle redirect
  if (route.redirect && route.redirect !== 'noRedirect') {
    elegantRoute.redirect = route.redirect;
  }

  // Handle children
  if (route.children && route.children.length > 0) {
    const children = route.children
      .map(child => transformRuoYiRouteToElegant(child, fullPath, level + 1))
      .filter((child): child is ElegantConstRoute => child !== null);

    if (children.length > 0) {
      elegantRoute.children = children;

      // If parent has children but no redirect, redirect to first child
      if (!elegantRoute.redirect && children.length > 0) {
        elegantRoute.redirect = { name: children[0].name };
      }
    }
  }

  return elegantRoute;
}

/**
 * Find the first accessible route (non-hidden leaf route)
 */
function findFirstAccessibleRoute(routes: ElegantConstRoute[]): string {
  for (const route of routes) {
    // Skip hidden routes
    if (route.meta?.hideInMenu) continue;
    
    // If has children, recurse
    if (route.children && route.children.length > 0) {
      const childRoute = findFirstAccessibleRoute(route.children);
      if (childRoute) return childRoute;
    } else {
      // Leaf route found
      return route.name as string;
    }
  }
  return 'home'; // fallback
}

/**
 * Get user routes from RuoYi-Vue-Plus backend
 * Transforms the response to Soybean Admin format
 */
export async function fetchGetUserRoutes() {
  // Reset order counter for each fetch
  routeOrderCounter = 0;

  const response = await request<RuoYiRouterVo[]>({
    url: '/system/menu/getRouters',
    method: 'get'
  });

  if (response.error || !response.data) {
    return {
      data: null,
      error: response.error
    };
  }

  // Transform RuoYi routes to Soybean Admin format
  const transformedRoutes: (ElegantConstRoute | null)[] = response.data.map((route: RuoYiRouterVo) =>
    transformRuoYiRouteToElegant(route)
  );
  const routes = transformedRoutes.filter((r): r is ElegantConstRoute => r !== null);

  // Find home route (first non-hidden accessible route)
  const home = findFirstAccessibleRoute(routes);

  return {
    data: {
      routes,
      home
    } as Api.Route.UserRoute,
    error: null
  };
}

/** get constant routes - use static routes for now */
export function fetchGetConstantRoutes() {
  return request<Api.Route.MenuRoute[]>({ url: '/route/getConstantRoutes' });
}

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ url: '/route/isRouteExist', params: { routeName } });
}
