import recipes from '/data/recipes.js';
import createCard from './index.js';
let filteredRecipes = [];

document.getElementById("main-search").addEventListener('input', (event) => mainSearch(event) )

const mainSearch = (event) => {
    const result = event.target.value.toLowerCase();
    const cardGallery = document.querySelector(".meal-cards-gallery");
    if (result.length >= 3) {
        filteredRecipes = recipes.filter(meal => 
            meal.name.toLowerCase().includes(result) || meal.description.toLowerCase().includes(result) || meal.ingredients.some(item => item.ingredient.toLowerCase().includes(result)) )
    } else {
        cardGallery.innerHTML = '';
        return createCard(recipes);
    }
    cardGallery.innerHTML = '';
    filteredRecipes.length === 0 ? cardGallery.textContent = 'Aucune recette ne correspond à vos critères' : createCard(filteredRecipes);
}