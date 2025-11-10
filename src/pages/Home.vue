<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { CookingPotIcon, Heart, Trash2 } from "lucide-vue-next";
import Container from "@/components/Container.vue";
import Navbar from "@/components/Navbar.vue";
import RecipeList from "@/components/RecipeList.vue";
import AddRecipeDialog from "@/components/AddRecipeDialog.vue";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/recipe-card";
import { useRecipes } from "@/composables/useRecipes";
import { useFavorites } from "@/composables/useFavorites";

const { userRecipes, deleteRecipe } = useRecipes();
const { isFavorite, toggleFavorite } = useFavorites();
const dialogOpen = ref(false);

const handleRecipeAdded = () => {};
</script>

<template>
  <Navbar />
  <Container>
    <div class="h-13" />
    <h1 class="text-4xl font-bold my-8">find your favorite recipe</h1>
    <h2 class="text-2xl font-bold my-4">Your own recipe</h2>
    <div>
      <Empty v-if="userRecipes.length === 0">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CookingPotIcon />
          </EmptyMedia>
          <EmptyTitle>No recipes yet</EmptyTitle>
          <EmptyDescription>Add your first recipe</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button @click="dialogOpen = true">Add recipe</Button>
        </EmptyContent>
      </Empty>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="recipe in userRecipes"
          :key="recipe.id"
          class="overflow-hidden"
        >
          <div class="relative h-48 overflow-hidden w-1/2">
            <img
              :src="recipe.image"
              :alt="recipe.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-2 right-2 flex gap-2">
              <Button
                @click.stop="toggleFavorite(recipe.id)"
                variant="ghost"
                size="icon"
                class="bg-background/80 backdrop-blur-sm hover:bg-background/90"
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
              <Button
                @click.stop="deleteRecipe(recipe.id)"
                variant="ghost"
                size="icon"
                class="bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:text-destructive"
                aria-label="Delete recipe"
              >
                <Trash2 class="size-5" />
              </Button>
            </div>
          </div>
          <div class="flex flex-col justify-between p-4 flex-1">
            <CardHeader>
              <CardTitle>{{ recipe.name }}</CardTitle>
              <CardDescription class="line-clamp-3">{{
                recipe.description
              }}</CardDescription>
            </CardHeader>
            <CardFooter>
              <RouterLink :to="`/recipe/${recipe.id}`">
                <Button variant="outline">Cook This</Button>
              </RouterLink>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">All recipes</h2>
        <Button @click="dialogOpen = true" variant="outline">
          Add Your Recipe
        </Button>
      </div>
      <RecipeList />
    </div>

    <AddRecipeDialog
      :open="dialogOpen"
      @update:open="dialogOpen = $event"
      @recipe-added="handleRecipeAdded"
    />
  </Container>
</template>
