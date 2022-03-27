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
        const newRecipeTable = [];
        for (let i = 0; i < filteredRecipes.length; i++) {
            const meal = filteredRecipes[i];
            let ingredientsIncluded = false;
            for (let j=0; j < meal.ingredients.length; j++) {
                if ( meal.ingredients[j].ingredient.toLowerCase().includes(result)) {
                    ingredientsIncluded = true;
                }
            }
            if (meal.name.toLowerCase().includes(result) ||
                meal.description.toLowerCase().includes(result) ||
                ingredientsIncluded ) { 
                    newRecipeTable.push(meal);
                }
        }

        if ( filteredRecipes.length === 0 ) {
            document.querySelector(".meal-cards-gallery").textContent = 'Aucune recette ne correspond à vos critères' 
        } else {
            updateContent(newRecipeTable)
        }

    } else {
        updateContent(filteredRecipes)
    }
}



