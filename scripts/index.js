import recipes from '/data/recipes.js';

const template = document.querySelector('template');
const ingredientList = []; 
const applianceList = []; 
const ustensilList = []; 

const createCard = (data) => {
    data.forEach(meal => {
        const card = template.content.cloneNode(true).children[0];
        const title = card.querySelector(".meal-title");
        const time = card.querySelector(".meal-time");
        const ingredientsList = card.querySelector(".meal-ingredients-list");
        const recipe = card.querySelector(".meal-recipe");
        
        title.innerText = meal.name;
        time.innerText = `${meal.time}min`;
        recipe.innerText = meal.description;

        meal.ingredients.forEach( ingredient => {
            const li = template.content.cloneNode(true).children[1];
            li.querySelector(".bold").innerText = `${ingredient.ingredient}:` ;
            ingredient.quantity ?  li.querySelector(".quantity").innerText = ` ${ingredient.quantity}` : li.querySelector(".bold").innerText = `${ingredient.ingredient}`  ;
            ingredient.unit ? li.querySelector(".unit").innerText = ` ${ingredient.unit}` : "" ;
            Array.from(li.children).forEach(child => child.innerText ? "" : li.removeChild(child));
            ingredientsList.appendChild(li);
        })
        document.querySelector(".meal-cards-gallery").appendChild(card);
    })
}

const getLists = () => {
    recipes.forEach( meal => {
        meal.ingredients.forEach( item => ingredientList.indexOf(item.ingredient) === -1 ? ingredientList.push(item.ingredient) : "" );
        applianceList.indexOf(meal.appliance) === -1 ? applianceList.push(meal.appliance) : "" ;
        meal.ustensils.forEach( ustensil => ustensilList.indexOf(ustensil) === -1 ? ustensilList.push(ustensil) : "" );
    })
    ingredientList.sort()
    applianceList.sort()
    ustensilList.sort()
}

const addEvents = () => {
    const searchBoxes = document.querySelectorAll(".secondary-search-wrapper input");
    searchBoxes.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.width = "450px"
            input.previousElementSibling.classList.toggle("sr-only")
            input.parentElement.classList.toggle("rotate-pseudo")
        } )
        input.addEventListener("focusout", () => {
            input.style.width = "150px"
            input.previousElementSibling.classList.toggle("sr-only")
            input.parentElement.classList.toggle("rotate-pseudo")
            input.value = ""
        })
    } ) 
}

const init = () => {
    createCard(recipes);
    getLists();
    addEvents();
}

init();