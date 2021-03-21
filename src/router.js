import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/senators",
      name: "senators",
      component: () => import("./components/AddSenators")
    },
    {
      path: "/home",
      alias: "/senators",
      name: "senators",
      component: () => import("./components/Button")
    },
    {
      path: "/senators/:id",
      name: "tutorial-details",
      component: () => import("./components/Senator")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddSenators")
    }
  ]
});