import type { Recipe } from "@/types/recipe";

export const recipesData: Recipe[] = [
  {
    id: 1,
    name: "Magelangan Dewa Rendang Petir",
    description:
      "A traditional Indonesian fried rice dish cooked with sweet soy sauce, garlic, shallots, and chili, often served with a fried egg on top.",
    image: "https://images.pexels.com/photos/6294458/pexels-photo-6294458.jpeg",
    category: "Yogyakartans",
    ingredients: [
      { id: 1, name: "2 cups cooked rice" },
      { id: 2, name: "2 tbsp sweet soy sauce (kecap manis)" },
      { id: 3, name: "2 cloves garlic, minced" },
      { id: 4, name: "1 shallot, sliced" },
      { id: 5, name: "1 egg" },
      { id: 6, name: "1 tbsp cooking oil" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
  {
    id: 2,
    name: "Sate Ayam",
    description:
      "Grilled chicken skewers marinated in spices and served with rich, creamy peanut sauce.",
    image:
      "https://images.pexels.com/photos/12842894/pexels-photo-12842894.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "500g chicken breast, diced" },
      { id: 2, name: "2 tbsp soy sauce" },
      { id: 3, name: "2 cloves garlic, minced" },
      { id: 4, name: "1 tbsp peanut butter" },
      { id: 5, name: "1 tsp chili paste" },
      { id: 6, name: "Skewers for grilling" },
    ],
    steps: [
      { id: 1, name: "Marinate the chicken" },
      { id: 2, name: "Grill the chicken" },
      { id: 3, name: "Serve the chicken" },
    ],
  },
  {
    id: 3,
    name: "Rendang Daging",
    description:
      "A rich and tender beef stew slow-cooked in coconut milk and aromatic spices, originating from West Sumatra.",
    image:
      "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "500g beef" },
      { id: 2, name: "400ml coconut milk" },
      { id: 3, name: "3 cloves garlic" },
      { id: 4, name: "2 lemongrass stalks" },
      { id: 5, name: "3 kaffir lime leaves" },
      { id: 6, name: "2 tbsp chili paste" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
  {
    id: 4,
    name: "Gado-Gado",
    description:
      "A healthy Indonesian salad made of blanched vegetables, tofu, and boiled eggs, served with peanut sauce.",
    image:
      "https://images.pexels.com/photos/19072469/pexels-photo-19072469.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "100g cabbage, blanched" },
      { id: 2, name: "100g bean sprouts" },
      { id: 3, name: "1 boiled egg" },
      { id: 4, name: "1 block tofu, fried" },
      { id: 5, name: "3 tbsp peanut sauce" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
  {
    id: 5,
    name: "Bakso",
    description:
      "A popular Indonesian meatball soup made from beef, served in a flavorful broth with noodles and vegetables.",
    image:
      "https://images.pexels.com/photos/18891889/pexels-photo-18891889.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "300g ground beef" },
      { id: 2, name: "2 tbsp tapioca flour" },
      { id: 3, name: "1 egg" },
      { id: 4, name: "2 cloves garlic" },
      { id: 5, name: "500ml beef broth" },
      { id: 6, name: "100g noodles" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
  {
    id: 6,
    name: "Soto Ayam",
    description:
      "A fragrant Indonesian chicken soup with turmeric, vermicelli noodles, and fresh herbs.",
    image:
      "https://images.pexels.com/photos/18926232/pexels-photo-18926232.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "500g chicken" },
      { id: 2, name: "1L chicken broth" },
      { id: 3, name: "1 tbsp turmeric powder" },
      { id: 4, name: "2 cloves garlic" },
      { id: 5, name: "100g vermicelli noodles" },
      { id: 6, name: "1 boiled egg" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
  {
    id: 7,
    name: "Mie Goreng",
    description:
      "Stir-fried noodles with vegetables, egg, and chicken or shrimp, seasoned with soy sauce and spices.",
    image:
      "https://images.pexels.com/photos/12842896/pexels-photo-12842896.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "200g egg noodles" },
      { id: 2, name: "2 tbsp soy sauce" },
      { id: 3, name: "1 egg" },
      { id: 4, name: "50g cabbage" },
      { id: 5, name: "1 carrot, julienned" },
      { id: 6, name: "50g chicken or shrimp" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
  {
    id: 8,
    name: "Pempek Palembang",
    description:
      "A savory Indonesian fish cake from Palembang, served with sweet and sour vinegar sauce.",
    image:
      "https://images.pexels.com/photos/14394712/pexels-photo-14394712.jpeg",
    category: "Indonesian",
    ingredients: [
      { id: 1, name: "300g fish fillet (mackerel)" },
      { id: 2, name: "100g tapioca flour" },
      { id: 3, name: "2 cloves garlic" },
      { id: 4, name: "1 egg" },
      { id: 5, name: "Vinegar sauce (cuko)" },
    ],
    steps: [
      { id: 1, name: "Boil the noodles" },
      { id: 2, name: "Add the vegetables" },
      { id: 3, name: "Add the chicken" },
      { id: 4, name: "Add the soy sauce" },
      { id: 5, name: "Add the garlic" },
      { id: 6, name: "Add the ginger" },
      { id: 7, name: "Add the salt" },
      { id: 8, name: "Add the pepper" },
    ],
  },
];
