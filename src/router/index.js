import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import WorkbenchView from "../views/WorkbenchView";

const routes = [
  {
    path: "/",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView,
  },
  {
    path: "/project",
    name: "project",
    component: WorkbenchView,
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/project/account_settings",
        name: "account_settings",
        component: () => import("@/views/PersonalCenterView.vue"),
      },
      {
        path: "/project/postman",
        name: "postman",
        component: () => import("../views/PostManView.vue"),
      },
      {
        path: "/project/test",
        name: "test",
        component: () => import("../views/TestView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
