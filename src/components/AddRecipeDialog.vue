<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-vue-next";
import { useRecipes } from "@/composables/useRecipes";
import type { Ingredient, Step } from "@/types/recipe";

const props = defineProps<{
  open: boolean;
}>();

const emits = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "recipe-added"): void;
}>();

const { addRecipe } = useRecipes();

const formData = ref({
  name: "",
  description: "",
  image: "",
  category: "",
  ingredients: [] as Ingredient[],
  steps: [] as Step[],
});

const ingredientInput = ref("");
const stepInput = ref("");

const resetForm = () => {
  formData.value = {
    name: "",
    description: "",
    image: "",
    category: "",
    ingredients: [],
    steps: [],
  };
  ingredientInput.value = "";
  stepInput.value = "";
};

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
    }
  }
);

const addIngredient = () => {
  if (ingredientInput.value.trim()) {
    const newId =
      formData.value.ingredients.length > 0
        ? Math.max(...formData.value.ingredients.map((i) => i.id)) + 1
        : 1;
    formData.value.ingredients.push({
      id: newId,
      name: ingredientInput.value.trim(),
    });
    ingredientInput.value = "";
  }
};

const removeIngredient = (id: number) => {
  const index = formData.value.ingredients.findIndex((i) => i.id === id);
  if (index > -1) {
    formData.value.ingredients.splice(index, 1);
  }
};

const addStep = () => {
  if (stepInput.value.trim()) {
    const newId =
      formData.value.steps.length > 0
        ? Math.max(...formData.value.steps.map((s) => s.id)) + 1
        : 1;
    formData.value.steps.push({
      id: newId,
      name: stepInput.value.trim(),
    });
    stepInput.value = "";
  }
};

const removeStep = (id: number) => {
  const index = formData.value.steps.findIndex((s) => s.id === id);
  if (index > -1) {
    formData.value.steps.splice(index, 1);
  }
};

const handleSubmit = () => {
  if (
    !formData.value.name.trim() ||
    !formData.value.description.trim() ||
    !formData.value.category.trim() ||
    formData.value.ingredients.length === 0
  ) {
    return;
  }

  const imageUrl = formData.value.image.trim() || "/placeholder.jpg";

  addRecipe({
    name: formData.value.name.trim(),
    description: formData.value.description.trim(),
    image: imageUrl,
    category: formData.value.category.trim(),
    ingredients: formData.value.ingredients,
    steps: formData.value.steps,
  });

  emits("recipe-added");
  emits("update:open", false);
  resetForm();
};

const handleKeyPress = (event: KeyboardEvent, callback: () => void) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    callback();
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="emits('update:open', $event)">
    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Recipe</DialogTitle>
        <DialogDescription>
          Fill in the details to add your own recipe to the collection.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-6 py-4">
        <div class="space-y-2">
          <Label for="name">Recipe Name *</Label>
          <Input
            id="name"
            v-model="formData.name"
            placeholder="e.g., Chocolate Chip Cookies"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="description">Description *</Label>
          <Textarea
            id="description"
            v-model="formData.description"
            placeholder="Describe your recipe..."
            rows="3"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="category">Category *</Label>
            <Input
              id="category"
              v-model="formData.category"
              placeholder="e.g., Dessert"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="image">Image URL</Label>
            <Input
              id="image"
              v-model="formData.image"
              placeholder="https://..."
              type="url"
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label>Ingredients *</Label>
          <div class="flex gap-2">
            <Input
              v-model="ingredientInput"
              placeholder="e.g., 2 cups flour"
              @keypress="handleKeyPress($event, addIngredient)"
            />
            <Button type="button" @click="addIngredient" size="icon">
              <Plus class="size-4" />
            </Button>
          </div>
          <div v-if="formData.ingredients.length > 0" class="space-y-2 mt-2">
            <div
              v-for="ingredient in formData.ingredients"
              :key="ingredient.id"
              class="flex items-center gap-2 p-2 bg-muted rounded-md"
            >
              <span class="flex-1">{{ ingredient.name }}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                @click="removeIngredient(ingredient.id)"
              >
                <X class="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <Label>Steps (Optional)</Label>
          <div class="flex gap-2">
            <Input
              v-model="stepInput"
              placeholder="e.g., Mix the ingredients"
              @keypress="handleKeyPress($event, addStep)"
            />
            <Button type="button" @click="addStep" size="icon">
              <Plus class="size-4" />
            </Button>
          </div>
          <div v-if="formData.steps.length > 0" class="space-y-2 mt-2">
            <div
              v-for="step in formData.steps"
              :key="step.id"
              class="flex items-center gap-2 p-2 bg-muted rounded-md"
            >
              <span class="flex-1">{{ step.name }}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                @click="removeStep(step.id)"
              >
                <X class="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="emits('update:open', false)">
          Cancel
        </Button>
        <Button
          @click="handleSubmit"
          :disabled="
            !formData.name.trim() ||
            !formData.description.trim() ||
            !formData.category.trim() ||
            formData.ingredients.length === 0
          "
        >
          Add Recipe
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
