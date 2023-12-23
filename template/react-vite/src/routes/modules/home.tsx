import { RouteProps } from '@/routes/routes.types';
import DefaultLayout from '@/layouts';
import Home from '@/pages/Home';

const homeRoute: RouteProps[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
        meta: {
          auth: true,
          title: '首页',
          key: 'home',
        },
      },
    ],
  },
];

export default homeRoute;
