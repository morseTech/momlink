import { createRouter, createWebHistory } from 'vue-router'; // 从 'vue-router' 导入 createRouter 和 createWebHistory
import HomePage from '../views/HomePage.vue'; // 导入 Home 组件
import ChainPage from '../views/ChainPage.vue'; // 导入 Home 组件

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage, // 使用 HomePage 组件
  },
  {
    path: '/ChainPage',
    name: 'ChainPage',
    component: ChainPage,
  },
];

const router = createRouter({
  history: createWebHistory(), // 使用 createWebHistory 创建路由历史
  routes, // 路由配置
});

export default router; // 导出 router 实例