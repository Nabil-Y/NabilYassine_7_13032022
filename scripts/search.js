const mainSearch = () => {
    let filteredRecipes = recipes;
    const result = document.getElementById("main-search").value.toLowerCase();

    document.querySelectorAll(".ig-tag").forEach( tag => {
        const tagInput = tag.textContent.toLowerCase();
        filteredRecipes = filteredRecipes.filter( meal => meal.ingredients.some(item => item.ingredient.toLowerCase().includes(tagInput)) )
    })

    document.querySelectorAll(".ap-tag").forEach( tag => {
        const tagInput = tag.textContent.toLowerCase();
        filteredRecipes = filteredRecipes.filter( meal => meal.appliance.toLowerCase().includes(tagInput))
    })

    document.querySelectorAll(".us-tag").forEach( tag => {
        const tagInput = tag.textContent.toLowerCase();
        filteredRecipes = filteredRecipes.filter( meal => meal.ustensils.some(ustensil => ustensil.toLowerCase().includes(tagInput)))
    })

    updateGallery(filteredRecipes);

    if (result.length >= 3) {   
        filteredRecipes = filteredRecipes.filter( meal => 
            meal.name.toLowerCase().includes(result) ||
            meal.description.toLowerCase().includes(result) ||
            meal.ingredients.some(item => item.ingredient.toLowerCase().includes(result)) 
        )

        filteredRecipes.length === 0 
            ? document.querySelector(".meal-cards-gallery").textContent = 'Aucune recette ne correspond à vos critères' 
            : updateGallery(filteredRecipes)
        ;
    } else {
        updateGallery(filteredRecipes)
    }
}



