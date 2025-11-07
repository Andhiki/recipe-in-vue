import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/Home.vue"),
    },
    {
      path: "/recipe/:id",
      name: "recipe-detail",
      component: () => import("@/pages/RecipeDetail.vue"),
    },
  ],
});

export default router;
