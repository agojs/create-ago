import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

/** 页面扩展 meta */
export interface MetaProps {
  meta?: {
    /** 是否需要认证 */
    auth?: boolean;
    /** 页面标题 */
    title: string;
    /** 页面key */
    key?: string;
  };
}

type AppIndexRouteObject = IndexRouteObject & MetaProps;

type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  MetaProps & {
    children?: (AppIndexRouteObject | AppNonIndexRouteObject)[];
  };

export type RouteProps = AppIndexRouteObject | AppNonIndexRouteObject;
