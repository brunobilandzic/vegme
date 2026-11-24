import { REGULAR, SPECIAL } from "../Shared/Constants/MealTypes";

export const isStaticDemo = process.env.REACT_APP_STATIC_DEMO === "true";

const cooks = [
  {
    _id: "mia",
    user: { username: "mia", name: "Mia Kovač" },
    min_days_to_edit_order: 2,
    order_times: [1, 4],
    allowed_order_times: [1, 4],
  },
  {
    _id: "luka",
    user: { username: "luka", name: "Luka Horvat" },
    min_days_to_edit_order: 1,
    order_times: [2, 5],
    allowed_order_times: [2, 5],
  },
];

const meals = [
  ["lentil-bowl", "Roasted Vegetable and Lentil Bowl", REGULAR, cooks[0], ["Lentils", "Carrots", "Tahini"]],
  ["tomato-pasta", "Tomato and Basil Pasta", REGULAR, cooks[0], ["Pasta", "Tomatoes", "Basil"]],
  ["mushroom-risotto", "Mushroom Risotto", SPECIAL, cooks[0], ["Rice", "Mushrooms", "Parmesan"]],
  ["chickpea-curry", "Chickpea and Spinach Curry", REGULAR, cooks[1], ["Chickpeas", "Spinach", "Coconut milk"]],
  ["stuffed-peppers", "Stuffed Peppers", REGULAR, cooks[1], ["Bell peppers", "Brown rice", "Black beans"]],
  ["sesame-noodles", "Sesame Noodles with Tofu", SPECIAL, cooks[1], ["Noodles", "Tofu", "Sesame seeds"]],
].map(([_id, name, type, cook, ingredients]) => ({
  _id,
  name,
  type,
  cook,
  date_created: "2026-11-01T12:00:00",
  ingredients: ingredients.map((name) => ({
    name,
    allergen: ["Tahini", "Pasta", "Parmesan", "Noodles", "Tofu", "Sesame seeds"].includes(name),
  })),
}));

export function getDemoMeals(pageNumber, pageSize, specialOnly = false) {
  const matching = specialOnly ? meals.filter((meal) => meal.type === SPECIAL) : meals;
  const start = (pageNumber - 1) * pageSize;
  return {
    items: matching.slice(start, start + pageSize),
    totalItems: matching.length,
    totalPages: Math.ceil(matching.length / pageSize),
  };
}

export function getDemoMeal(mealId) {
  return meals.find((meal) => meal._id === mealId) ?? null;
}

export function getDemoCooks() {
  return cooks.map((cook) => ({
    ...cook,
    cooks: meals.filter((meal) => meal.cook._id === cook._id),
  }));
}
