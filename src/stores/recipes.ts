import { recipesData } from "@/constants/recipes";
import type { Ingredient, Recipe, Step } from "@/types/recipe";
import { defineStore } from "pinia";

const STORAGE_KEY_FAVORITES = "recipe-favorites";
const STORAGE_KEY_USER_RECIPES = "user-recipes";
const USER_RECIPE_ID_PREFIX = 10000;

const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadUserRecipes = (): Recipe[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USER_RECIPES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading user recipes from local storage:", error);
  }
  return [];
};

const saveUserRecipes = (recipes: Recipe[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_USER_RECIPES, JSON.stringify(recipes));
  } catch (error) {
    console.error("Error saving recipes to local storage:", error);
  }
};

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    searchQuery: "",
    selectedCategory: null as string | null,
    showFavoritesOnly: false,
    userRecipes: loadUserRecipes(),
    favoriteIds: loadFavorites(),
    recipes: recipesData,
  }),
  getters: {
    allRecipes(): Recipe[] {
      return [...this.userRecipes, ...this.recipes];
    },
    categories(): string[] {
      return [
        ...new Set(this.allRecipes.map((r) => r.category).filter(Boolean)),
      ].sort();
    },
    filteredRecipes(): Recipe[] {
      let filtered = this.allRecipes;

      if (this.showFavoritesOnly) {
        filtered = filtered.filter((r) => this.favoriteIds.includes(r.id));
      }

      if (this.selectedCategory) {
        filtered = filtered.filter((r) => r.category === this.selectedCategory);
      }

      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.name.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query) ||
            r.category.toLowerCase().includes(query) ||
            r.ingredients.some((i: Ingredient) =>
              i.name.toLowerCase().includes(query)
            ) ||
            r.steps.some((s: Step) => s.name.toLowerCase().includes(query))
        );
      }

      return filtered;
    },
    favoritesCount(): number {
      return this.favoriteIds.length;
    },
  },
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    setCategory(category: string | null) {
      this.selectedCategory = category;
      this.showFavoritesOnly = false;
    },
    toggleFavoritesOnly() {
      this.showFavoritesOnly = !this.showFavoritesOnly;
      if (this.showFavoritesOnly) this.selectedCategory = null;
    },
    resetFilters() {
      this.searchQuery = "";
      this.selectedCategory = null;
      this.showFavoritesOnly = false;
    },
    toggleCategory(category: string) {
      this.selectedCategory =
        this.selectedCategory === category ? null : category;
      this.showFavoritesOnly = false;
    },
    setUserRecipes(recipes: Recipe[]) {
      this.userRecipes = recipes;
    },
    setFavoriteIds(ids: number[]) {
      this.favoriteIds = ids;
      try {
        localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(ids));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    },
    getNextId(): number {
      if (this.userRecipes.length === 0) {
        return USER_RECIPE_ID_PREFIX;
      }
      const maxId = Math.max(...this.userRecipes.map((r) => r.id));
      return maxId + 1;
    },
    addRecipe(recipe: Omit<Recipe, "id">): Recipe {
      const newRecipe: Recipe = {
        ...recipe,
        id: this.getNextId(),
      };
      this.userRecipes.push(newRecipe);
      saveUserRecipes(this.userRecipes);
      return newRecipe;
    },
    updateRecipe(id: number, recipe: Partial<Recipe>): void {
      const index = this.userRecipes.findIndex((r) => r.id === id);
      if (index > -1) {
        this.userRecipes[index] = {
          ...this.userRecipes[index],
          ...recipe,
        } as Recipe;
        saveUserRecipes(this.userRecipes);
      }
    },
    deleteRecipe(id: number): void {
      const index = this.userRecipes.findIndex((r) => r.id === id);
      if (index > -1) {
        this.userRecipes.splice(index, 1);
        saveUserRecipes(this.userRecipes);
      }
    },
    getRecipe(
      id: number,
      getUserRecipe?: (id: number) => Recipe | undefined,
      isUserRecipe?: (id: number) => boolean
    ): Recipe | undefined {
      if (isUserRecipe?.(id) && getUserRecipe) {
        return getUserRecipe(id);
      }
      return this.allRecipes.find((r) => r.id === id);
    },
    toggleFavorite(recipeId: number): void {
      const index = this.favoriteIds.indexOf(recipeId);
      if (index > -1) {
        this.favoriteIds.splice(index, 1);
      } else {
        this.favoriteIds.push(recipeId);
      }
      this.setFavoriteIds(this.favoriteIds);
    },
    addFavorite(recipeId: number): void {
      if (!this.favoriteIds.includes(recipeId)) {
        this.favoriteIds.push(recipeId);
        this.setFavoriteIds(this.favoriteIds);
      }
    },
    removeFavorite(recipeId: number): void {
      const index = this.favoriteIds.indexOf(recipeId);
      if (index > -1) {
        this.favoriteIds.splice(index, 1);
        this.setFavoriteIds(this.favoriteIds);
      }
    },
    isFavorite(recipeId: number): boolean {
      return this.favoriteIds.includes(recipeId);
    },
    isUserRecipe(id: number): boolean {
      return id >= USER_RECIPE_ID_PREFIX;
    },
  },
});
