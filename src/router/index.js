import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/axiostest",
    name: "axiostest",
    component: () => import(/* webpackChunkName: "axiostest" */ "../views/AxiosTest.vue")
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/user/User.vue")
  },
  {
    path: "/score",
    name: "score",
    component: () => import(/* webpackChunkName: "score" */ "../views/user/Score.vue")
  },
  {
    path: "/excludezero",
    name: "excludezero",
    component: () => import(/* webpackChunkName: "excludezero" */ "../views/user/Excludezero.vue")
  },
  {
    path: "/product",
    name: "product",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/Product.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import(/* webpackChunkName: "search" */ "../views/product/Search.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import(/* webpackChunkName: "category" */ "../views/product/Category.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
