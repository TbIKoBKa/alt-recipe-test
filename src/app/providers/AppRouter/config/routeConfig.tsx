import { RouteProps } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AppRoutes, getRouteHome } from '@/shared/const/router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: getRouteHome(),
    element: <HomePage />,
  },
  // 404
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
