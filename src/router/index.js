import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [ 
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/HelloHome.vue")
  },
  {
    path: "/axiostest",
    name: "axiostest",
    component: () => import(/* webpackChunkName: "axiostest" */ "../views/AxiosTest.vue")
  },
  {
    path: "/userlist",
    name: "userlist",
    component: () => import(/* webpackChunkName: "userlist" */ "../views/user/UserList.vue")
  },
  {
    path: "/userlistnooffset",
    name: "userlistnooffset",
    component: () => import(/* webpackChunkName: "userlistnooffset" */ "../views/user/UserListNoOffset.vue")
  },
  {
    path: "/userlistnooffsetpage",
    name: "userlistnooffsetpage",
    component: () => import(/* webpackChunkName: "userlistnooffsetpage" */ "../views/user/UserListNoOffsetPage.vue")
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/user/UserInfo.vue")
  },
  {
    path: "/createuser",
    name: "createuser",
    component: () => import(/* webpackChunkName: "createuser" */ "../views/user/CreateUser.vue")
  },
  {
    path: "/updateuser",
    name: "updateuser",
    component: () => import(/* webpackChunkName: "updateuser" */ "../views/user/UpdateUser.vue")
  },
  {
    path: "/score",
    name: "score",
    component: () => import(/* webpackChunkName: "score" */ "../views/user/ScoreIncludeZero.vue")
  },
  {
    path: "/excludezero",
    name: "excludezero",
    component: () => import(/* webpackChunkName: "excludezero" */ "../views/user/ScoreExcludeZero.vue")
  },
  {
    path: "/product",
    name: "product",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductList.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import(/* webpackChunkName: "search" */ "../views/product/NameSearch.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import(/* webpackChunkName: "category" */ "../views/product/CategorySearch.vue")
  },
  {
    path: "/order",
    name: "order",
    component: () => import(/* webpackChunkName: "order" */ "../views/shopping/CreateOrder.vue")
  },
  {
    path: "/orderlist",
    name: "orderlist",
    component: () => import(/* webpackChunkName: "orderlist" */ "../views/shopping/OrderList.vue")
  },
  {
    path: "/updateorder",
    name: "updateorder",
    component: () => import(/* webpackChunkName: "updateorder" */ "../views/shopping/UpdateOrder.vue")
  },
  {
    path: "/trace",
    name: "trace",
    component: () => import(/* webpackChunkName: "treace" */ "../views/shopping/TraceInfo.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
