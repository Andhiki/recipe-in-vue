export interface Ingredient {
  id: number;
  name: string;
}

export interface Step {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  ingredients: Ingredient[];
  steps: Step[];
}
