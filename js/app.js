const searchbutton = document.getElementById("searchButton");
//Search button event handler
searchbutton.addEventListener("click", function () {
  const searchItem = document.getElementById("searchBar").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
});
const searchResults = document.getElementById("searchResults");
//this function process the data from api
const displayMeals = (data) => {
  //clears previous search result and set to default style
  searchResults.innerHTML = "";
  searchResults.style.display = "";

  //creates and appends elements to searchResult div for each meal item
  if (data.meals === null) {
    const errorMessage = "<h3 id='error-message'>No matching food found</h3>";
    searchResults.style.display = "block";
    searchResults.style.textAlign = "center";
    searchResults.innerHTML = errorMessage;
  } else {
    data.meals.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.className = "meal";
      mealDiv.value = meal.idMeal;
      const mealTumbnail = `
            <img src="${meal.strMealThumb}" alt="">
            <h6>${meal.strMeal}</h6>
        `;
      mealDiv.innerHTML = mealTumbnail;
      searchResults.appendChild(mealDiv);
    });
  }
};

searchResults.addEventListener("click", function (event) {
  let id = "";
  if (event.target.className !== "meal") {
    id = event.target.parentElement.value;
  } else {
    id = event.target.value;
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data));
});

const displayMealDetail = (data) => {
  //hides searchArea and shows meal-detail area
  document.getElementById("meal-search").style.display = "none";
  const mealDetailArea = document.getElementById("meal-detail-area");
  mealDetailArea.style.display = "block";

  //sets data.meals[0] object to a variable
  const selectedMeal = data.meals[0];

  //creats meal-detail div and add content to it
  const mealDetailDiv = document.createElement("div");
  mealDetailDiv.className = "meal-details container";
  const mealDetails = `
    <img id="meal-detail-image" src="${selectedMeal.strMealThumb}" alt="" />
    <h3 id="meal-detail-name">${selectedMeal.strMeal}</h3>
    <h6>Ingredients</h6>
    <ul id="ingredients"></ul>
  `;
  mealDetailDiv.innerHTML = mealDetails;
  mealDetailArea.appendChild(mealDetailDiv);

  //append List item to ul
  const ingredientsList = document.getElementById("ingredients");
  let allIngredients = "";
  for (let i = 0; i < 20; i++) {
    if (selectedMeal[`strIngredient${i + 1}`] === "") {
      break;
    }
    allIngredients += `<li>${selectedMeal[`strIngredient${i + 1}`]} ${
      selectedMeal[`strMeasure${i + 1}`]
    }</li>`;
  }
  ingredientsList.innerHTML = allIngredients;
};
