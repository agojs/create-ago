import { Navigate, useRoutes } from 'react-router-dom';
import { RouteProps } from '@/routes/routes.types';

// 导入所有路由
const metaRoutes = import.meta.glob('./modules/*.tsx', { eager: true });

const routeArray: RouteProps[] = [];
// 转成路由数组
Object.keys(metaRoutes).forEach((item) => {
  const routesObj = metaRoutes[item] as Record<string, RouteProps[]>;
  Object.keys(routesObj).forEach((key: string) => {
    routeArray.push(...routesObj[key]);
  });
});

const rootRoute: RouteProps[] = [
  ...routeArray,
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

const Route = () => {
  const routes = useRoutes(rootRoute);
  return routes;
};

export default Route;
