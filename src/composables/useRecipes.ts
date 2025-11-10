import { computed } from "vue";
import { useRecipesStore } from "@/stores/recipes";
import type { Recipe } from "@/types/recipe";

export function useRecipes() {
  const store = useRecipesStore();

  const recipes = computed(() => store.allRecipes);
  const userRecipes = computed(() => store.userRecipes);
  const filteredRecipes = computed(() => store.filteredRecipes);
  const categories = computed(() => store.categories);
  const searchQuery = computed({
    get: () => store.searchQuery,
    set: (value: string) => store.setSearchQuery(value),
  });
  const selectedCategory = computed({
    get: () => store.selectedCategory,
    set: (value: string | null) => store.setCategory(value),
  });
  const showFavoritesOnly = computed({
    get: () => store.showFavoritesOnly,
    set: () => store.toggleFavoritesOnly(),
  });

  const addRecipe = (recipe: Omit<Recipe, "id">): Recipe => {
    return store.addRecipe(recipe);
  };

  const updateRecipe = (id: number, recipe: Partial<Recipe>): void => {
    store.updateRecipe(id, recipe);
  };

  const deleteRecipe = (id: number): void => {
    store.deleteRecipe(id);
  };

  const getRecipe = (id: number): Recipe | undefined => {
    return store.allRecipes.find((r) => r.id === id);
  };

  const isUserRecipe = (id: number): boolean => {
    return store.isUserRecipe(id);
  };

  const toggleCategory = (category: string): void => {
    store.toggleCategory(category);
  };

  const resetFilters = (): void => {
    store.resetFilters();
  };

  return {
    recipes,
    userRecipes,
    filteredRecipes,
    categories,
    searchQuery,
    selectedCategory,
    showFavoritesOnly,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    isUserRecipe,
    toggleCategory,
    resetFilters,
  };
}
