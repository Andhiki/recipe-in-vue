import { recipesData } from "@/constants/recipes";
import type { Recipe } from "@/types/recipe";
import { defineStore } from "pinia";

const STORAGE_KEY = "recipe-favorites";

const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    searchQuery: "",
    selectedCategory: null as string | null,
    showFavoritesOnly: false,
    userRecipes: [] as Recipe[],
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
            r.ingredients.some((i) => i.name.toLowerCase().includes(query)) ||
            r.steps.some((s) => s.name.toLowerCase().includes(query))
        );
      }

      return filtered;
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      } catch (error) {
        console.error("Error saving favorites:", error);
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
  },
});
