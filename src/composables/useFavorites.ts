import { computed } from "vue";
import { useRecipesStore } from "@/stores/recipes";

export function useFavorites() {
  const store = useRecipesStore();

  const isFavorite = (recipeId: number): boolean => {
    return store.isFavorite(recipeId);
  };

  const toggleFavorite = (recipeId: number): void => {
    store.toggleFavorite(recipeId);
  };

  const addFavorite = (recipeId: number): void => {
    store.addFavorite(recipeId);
  };

  const removeFavorite = (recipeId: number): void => {
    store.removeFavorite(recipeId);
  };

  const favorites = computed(() => store.favoriteIds);
  const favoritesCount = computed(() => store.favoritesCount);

  return {
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    favorites,
    favoritesCount,
  };
}
