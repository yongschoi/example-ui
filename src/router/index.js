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
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue")
  },
  {
    path: "/score",
    name: "score",
    component: () => import(/* webpackChunkName: "score" */ "../views/Score.vue")
  },
  {
    path: "/excludezero",
    name: "excludezero",
    component: () => import(/* webpackChunkName: "excludezero" */ "../views/Excludezero.vue")
  },
  {
    path: "/axiostest",
    name: "axiostest",
    component: () => import(/* webpackChunkName: "axiostest" */ "../views/AxiosTest.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
