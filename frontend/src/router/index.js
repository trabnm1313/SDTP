import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/Home.vue";
import FilterMenu from "../components/FilterMenu.vue";
import RandomDisplay from "../components/RandomDisplay.vue"
import SearchRecipe from "../components/SearchRecipe.vue"
import DetailRecipe from "../components/DetailRecipe.vue"


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
      path: "/SearchRecipe",
      name: "SearchRecipe",
      component: SearchRecipe
    },
    {
      path: "/DetailRecipe",
      name: "DetailRecipe",
      component: DetailRecipe
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;