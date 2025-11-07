import { ref, computed } from "vue";
import type { Recipe } from "@/types/recipe";

const STORAGE_KEY = "user-recipes";
const USER_RECIPE_ID_PREFIX = 10000;

const loadUserRecipes = (): Recipe[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading user recipes from local storage:", error);
  }
  return [];
};

const userRecipes = ref<Recipe[]>(loadUserRecipes());

const saveUserRecipes = (recipes: Recipe[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error("Error saving recipes to local storage:", error);
  }
};

const getNextId = (): number => {
  if (userRecipes.value.length === 0) {
    return USER_RECIPE_ID_PREFIX;
  }
  const maxId = Math.max(...userRecipes.value.map((r) => r.id));
  return maxId + 1;
};

export function useUserRecipes() {
  const addRecipe = (recipe: Omit<Recipe, "id">): Recipe => {
    const newRecipe: Recipe = {
      ...recipe,
      id: getNextId(),
    };
    userRecipes.value.push(newRecipe);
    saveUserRecipes(userRecipes.value);
    return newRecipe;
  };

  const updateRecipe = (id: number, recipe: Partial<Recipe>): void => {
    const index = userRecipes.value.findIndex((r) => r.id === id);
    if (index > -1) {
      userRecipes.value[index] = {
        ...userRecipes.value[index],
        ...recipe,
      } as Recipe;
      saveUserRecipes(userRecipes.value);
    }
  };

  const deleteRecipe = (id: number): void => {
    const index = userRecipes.value.findIndex((r) => r.id === id);
    if (index > -1) {
      userRecipes.value.splice(index, 1);
      saveUserRecipes(userRecipes.value);
    }
  };

  const getRecipe = (id: number): Recipe | undefined => {
    return userRecipes.value.find((r) => r.id === id);
  };

  const recipes = computed(() => userRecipes.value);

  const recipesCount = computed(() => userRecipes.value.length);

  const isUserRecipe = (id: number): boolean => {
    return id >= USER_RECIPE_ID_PREFIX;
  };

  return {
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    recipes,
    recipesCount,
    isUserRecipe,
  };
}
