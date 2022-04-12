import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/Home.vue";
import FilterMenu from "../components/FilterMenu.vue";
import RandomDisplay from "../components/RandomDisplay.vue"
import Recipe from "../components/Recipe.vue"


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
      path: "/randomdisplay/:tags",
      name: "RandomDisplay",
      component: RandomDisplay
    },
    {
      path: "/Recipe",
      name: "Recipe",
      component: Recipe
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;