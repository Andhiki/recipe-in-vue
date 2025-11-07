import { ref, computed } from "vue";

const STORAGE_KEY = "recipe-favorites";

const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
  }
  return [];
};

const favoriteIds = ref<number[]>(loadFavorites());

const saveFavorites = (ids: number[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

export function useFavorites() {
  const isFavorite = (recipeId: number): boolean => {
    return favoriteIds.value.includes(recipeId);
  };

  const toggleFavorite = (recipeId: number): void => {
    const index = favoriteIds.value.indexOf(recipeId);
    if (index > -1) {
      favoriteIds.value.splice(index, 1);
    } else {
      favoriteIds.value.push(recipeId);
    }
    saveFavorites(favoriteIds.value);
  };

  const addFavorite = (recipeId: number): void => {
    if (!isFavorite(recipeId)) {
      favoriteIds.value.push(recipeId);
      saveFavorites(favoriteIds.value);
    }
  };

  const removeFavorite = (recipeId: number): void => {
    const index = favoriteIds.value.indexOf(recipeId);
    if (index > -1) {
      favoriteIds.value.splice(index, 1);
      saveFavorites(favoriteIds.value);
    }
  };

  const favorites = computed(() => favoriteIds.value);

  const favoritesCount = computed(() => favoriteIds.value.length);

  return {
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    favorites,
    favoritesCount,
  };
}
