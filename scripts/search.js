/**
 * Search function that filters the array that will be used to display content
 */
const mainSearch = () => {
    let filteredRecipes = recipes;
    const result = document.getElementById("main-search").value.toLowerCase();

    // Tag filters - Secondary Search
    document.querySelectorAll("#filters a").forEach(tag => {
        const tagInput = tag.textContent.toLocaleLowerCase();
        filteredRecipes = filteredRecipes.filter( meal =>
            meal.ingredients.some(item => item.ingredient.toLowerCase().includes(tagInput)) ||
            meal.appliance.toLowerCase().includes(tagInput) ||
            meal.ustensils.some(ustensil => ustensil.toLowerCase().includes(tagInput))
        )
        updateContent(filteredRecipes);
    })

    // Main Search
    if (result.length >= 3) {   
        filteredRecipes = filteredRecipes.filter( meal => 
            meal.name.toLowerCase().includes(result) ||
            meal.description.toLowerCase().includes(result) ||
            meal.ingredients.some(item => item.ingredient.toLowerCase().includes(result)) 
        )

        filteredRecipes.length === 0 
            ? document.querySelector(".meal-cards-gallery").textContent = 'Aucune recette ne correspond à vos critères' 
            : updateContent(filteredRecipes)
        ;
    } else {
        updateContent(filteredRecipes)
    }
}



