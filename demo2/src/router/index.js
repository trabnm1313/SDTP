import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from "../components/Home.vue";

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      component: HelloWorld,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;