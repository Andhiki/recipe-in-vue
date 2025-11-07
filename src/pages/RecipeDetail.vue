<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { recipes } from "@/constants/recipe";
import Container from "@/components/Container.vue";
import Navbar from "@/components/Navbar.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Heart } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/composables/useFavorites";

const route = useRoute();
const recipeId = computed(() => Number(route.params.id));
const { isFavorite, toggleFavorite } = useFavorites();

const recipe = computed(() => {
  return recipes.find((r) => r.id === recipeId.value);
});

const hasSteps = computed(() => {
  return recipe.value?.steps && recipe.value.steps.length > 0;
});
</script>

<template>
  <Navbar />
  <Container>
    <div class="h-13" />
    <div v-if="recipe" class="py-8">
      <RouterLink to="/" class="inline-block mb-6">
        <Button variant="ghost" class="gap-2">
          <ArrowLeftIcon class="size-4" />
          Back to Recipes
        </Button>
      </RouterLink>

      <div class="mb-8 flex items-start justify-start gap-8">
        <div class="mb-8 rounded-lg overflow-hidden">
          <img
            :src="recipe.image"
            :alt="recipe.name"
            class="w-[200px] object-cover aspect-square"
          />
        </div>
        <div class="flex-1">
          <div class="flex items-start justify-between gap-4 mb-4">
            <h1 class="text-4xl font-bold">{{ recipe.name }}</h1>
            <Button
              @click="toggleFavorite(recipe.id)"
              variant="outline"
              size="icon"
              class="shrink-0"
              :aria-label="
                isFavorite(recipe.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              "
            >
              <Heart
                :class="
                  isFavorite(recipe.id) ? 'fill-red-500 text-red-500' : ''
                "
                class="size-5"
              />
            </Button>
          </div>
          <p class="text-lg text-muted-foreground">{{ recipe.description }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>What you'll need</CardDescription>
          </CardHeader>
          <CardContent>
            <ul class="space-y-3 list-disc list-inside">
              <li
                v-for="ingredient in recipe.ingredients"
                :key="ingredient.id"
                class="list-item"
              >
                <span class="flex-1">{{ ingredient.name }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card v-if="hasSteps">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>Step-by-step guide</CardDescription>
          </CardHeader>
          <CardContent>
            <ol class="space-y-4">
              <li
                v-for="step in recipe.steps"
                :key="step.id"
                class="flex gap-4"
              >
                <Badge
                  variant="secondary"
                  class="h-6 w-6 rounded-full flex items-center justify-center p-0 shrink-0"
                >
                  {{ step.id }}
                </Badge>
                <span class="flex-1">{{ step.name }}</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>

    <div v-else class="py-8">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Not Found</CardTitle>
          <CardDescription>
            The recipe you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RouterLink to="/">
            <Button>Back to Recipes</Button>
          </RouterLink>
        </CardContent>
      </Card>
    </div>
  </Container>
</template>
