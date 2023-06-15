export default async function RandomRecipe() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    { cache: "no-store" }
  );

  const data = await res.json();
  const recipe = data.meals[0];
  // {recipe.strMeal}
  return <h1>Sorry this page is broken</h1>;
}
