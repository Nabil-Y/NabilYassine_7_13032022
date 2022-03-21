let filteredRecipes = [];

const search = () => {
    const result = document.getElementById("main-search").value.toLowerCase();
    if (result.length >= 3) {
        filteredRecipes = recipes.filter(meal => 
            meal.name.toLowerCase().includes(result) || meal.description.toLowerCase().includes(result) || meal.ingredients.some(item => item.ingredient.toLowerCase().includes(result)) )
            filteredRecipes.length === 0 ? document.querySelector(".meal-cards-gallery").textContent = 'Aucune recette ne correspond à vos critères' : updateGallery(filteredRecipes);
    } else {
        updateGallery(recipes)
    }
}

document.getElementById("main-search").addEventListener('input', search)