import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/Home.vue";
import FilterMenu from "../components/FilterMenu.vue";
import RandomDisplay from "../components/RandomDisplay.vue"


const routes = [
    {
      path: "/",
      name: "Home",

      component: Home,
    },
    {
      path: "/filtermenu",
      name: "FilterMenu",
      component: FilterMenu,
    },
    {
      path: "/randomdisplay",
      name: "RandomDisplay",
      component: RandomDisplay
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;