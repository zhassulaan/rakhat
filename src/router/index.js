import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {layout: 'default'},
    component: HomeView,
  },
  {
    path: "/:name",
    name: "homeName",
    meta: {layout: 'default'},
    component: HomeView,
  },
  {
    path: "/image/:id",
    name: "image",
    meta: {layout: 'image'},
    component: () => import('../views/Image.vue'),
  },
  {
    path: "/popup/:id",
    name: "popup",
    meta: {layout: 'image'},
    component: () => import('../views/Popup.vue'),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/modals",
    name: "ModalsView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ModalsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;