const searchbutton = document.getElementById("searchButton");
//Search button event handler
searchbutton.addEventListener("click", function () {
  const searchItem = document.getElementById("searchBar").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
});

const displayMeals = (data) => {
  //   console.log(meals);
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";
  data.meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    const mealTumbnail = `
          <img src="${meal.strMealThumb}" alt="">
          <h6>${meal.strMeal}</h6>
      `;
    mealDiv.innerHTML = mealTumbnail;
    searchResults.appendChild(mealDiv);
  });
};
