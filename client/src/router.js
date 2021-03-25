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
      component: () => import("./components/AllSenators")
    },
    {
      path: "/add-senator",
      alias: "/add-senator",
      name: "add-senator",
      component: () => import("./components/AddSenators")
    },
    {
      path: "/senators/:id",
      name: "edit-senator",
      component: () => import("./components/EditSenator"), props: true
    },
    {
      path: "/become-an-admin",
      name: "become-an-admin",
      component: () => import("./components/Admin")
    },
  ]
});