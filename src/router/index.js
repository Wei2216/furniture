import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 用戶端路由 (不須驗證皆放此)
  {
    path: '/',
    name: 'UserBoard',
    component: () => import('../views/frontend/UserBoard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/IndexView.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/frontend/AboutView.vue'),
      },
      {
        path: 'productList',
        component: () => import('../views/frontend/ProductsList.vue'),
      },
      {
        path: 'productList/:productId',
        component: () => import('../views/frontend/ProductDetail.vue'),
      },
      {
        path: 'faq',
        component: () => import('../views/frontend/FaqView.vue'),
      },
      {
        path: 'favorite',
        component: () => import('../views/frontend/FavoriteView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/UserCart.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/frontend/UserCheckout.vue'),
      },
      {
        path: 'checkInfo',
        component: () => import('../views/frontend/UserCheckInfo.vue'),
      },
    ],
  },
  // 管理者路由
  {
    path: '/login',
    component: () => import('../views/backend/LoginPage.vue'),
  },
  {
    path: '/dashBoard',
    component: () => import('../views/backend/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/ProductsManger.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/OrdersManger.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/CouponsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  // 每次切換路由頁面滾至頂部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
