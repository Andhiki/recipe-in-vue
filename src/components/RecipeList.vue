<script setup lang="ts">
import { RouterLink } from "vue-router";
import { recipes } from "@/constants/recipe";
import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/recipe-card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

const recipesList = recipes;
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card
      v-for="recipe in recipesList"
      :key="recipe.id"
      class="overflow-hidden"
    >
      <div class="relative h-48 overflow-hidden w-1/2">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-col justify-between p-4 flex-1">
        <CardHeader>
          <CardTitle>{{ recipe.name }}</CardTitle>
          <CardDescription class="line-clamp-3">{{
            recipe.description
          }}</CardDescription>
        </CardHeader>
        <!-- <CardContent>
        <div class="space-y-2">
          <h4 class="text-sm font-semibold">Ingredients:</h4>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="ingredient in recipe.ingredients"
              :key="ingredient.id"
              variant="secondary"
              class="text-xs"
            >
              {{ ingredient.name }}
            </Badge>
          </div>
        </div>
      </CardContent> -->
        <CardFooter>
          <RouterLink :to="`/recipe/${recipe.id}`">
            <Button variant="outline">Cook This</Button>
          </RouterLink>
        </CardFooter>
      </div>
    </Card>
  </div>
</template>
