import apiClient from "./http-common";
import { ApiKey } from "../const/const";

const KEY = ApiKey;

// const direction = "asc";

export async function getRecipes(
  search,
  diet,
  intolerances,
  type,
  number,
  offset,
  maxReadyTime,
  sort,
  direction
) {
  const numberString = number?.toString();

  const { data, error } = await apiClient.get(
    `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${KEY}&query=${search}&diet=${diet}&intolerances=${intolerances}&type=${type}&maxReadyTime=${maxReadyTime}&sort=${sort}&sortDirection=${direction}&addRecipeNutrition=true&instructionsRequired=true&number=${numberString}&offset=${offset}`
  );
  // const { data, error } = await apiClient.get(
  //   `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${KEY}&sustainable=true&addRecipeNutrition=true`
  // );

  if (error) {
    console.error(error);
    throw new Error("Recipes could not be loaded");
  }

  return data;
}
