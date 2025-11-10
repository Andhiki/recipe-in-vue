<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Search, Heart } from "lucide-vue-next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/recipe-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/composables/useFavorites";
import { useRecipes } from "@/composables/useRecipes";

const { isFavorite, toggleFavorite } = useFavorites();
const {
  searchQuery,
  selectedCategory,
  showFavoritesOnly,
  categories,
  filteredRecipes,
  toggleCategory,
  resetFilters,
} = useRecipes();
</script>

<template>
  <div class="space-y-6">
    <div class="relative">
      <Search
        class="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground"
      />
      <Input
        v-model="searchQuery"
        placeholder="Search recipes by name, description, ingredients, or steps..."
        class="pl-10 w-full"
      />
    </div>

    <div class="flex flex-wrap gap-2">
      <Button
        @click="resetFilters"
        :variant="
          selectedCategory === null && !showFavoritesOnly
            ? 'default'
            : 'outline'
        "
        size="sm"
      >
        All
      </Button>
      <Button
        @click="showFavoritesOnly = !showFavoritesOnly"
        :variant="showFavoritesOnly ? 'default' : 'outline'"
        size="sm"
        class="gap-2"
      >
        <Heart
          :class="showFavoritesOnly ? 'fill-current' : ''"
          class="size-4"
        />
        Favorites
      </Button>
      <Button
        v-for="category in categories"
        :key="category"
        @click="toggleCategory(category)"
        :variant="selectedCategory === category ? 'default' : 'outline'"
        size="sm"
      >
        {{ category }}
      </Button>
    </div>

    <div v-if="filteredRecipes.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">
        No recipes found matching your search.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="overflow-hidden"
      >
        <div class="relative h-48 overflow-hidden w-full max-w-1/2">
          <img
            :src="recipe.image"
            :alt="recipe.name"
            class="w-full h-full object-cover"
          />
          <Button
            @click.stop="toggleFavorite(recipe.id)"
            variant="ghost"
            size="icon"
            class="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            :aria-label="
              isFavorite(recipe.id)
                ? 'Remove from favorites'
                : 'Add to favorites'
            "
          >
            <Heart
              :class="isFavorite(recipe.id) ? 'fill-red-500 text-red-500' : ''"
              class="size-5"
            />
          </Button>
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
  </div>
</template>
