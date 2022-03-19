import recipes from '/data/recipes.js';

const cardTemplate = document.querySelector("[data-card-template]");
const liTemplate = document.querySelector("[data-li-template]");

const createCard = (data) => {
    data.forEach(meal => {
        const card = cardTemplate.content.cloneNode(true).children[0];
        const title = card.querySelector(".meal-title");
        const time = card.querySelector(".meal-time");
        const ingredientsList = card.querySelector(".meal-ingredients-list");
        const recipe = card.querySelector(".meal-recipe");
        
        title.innerText = meal.name;
        time.innerText = `${meal.time}min`;
        recipe.innerText = meal.description;

        meal.ingredients.forEach( ingredient => {
            const li = liTemplate.content.cloneNode(true).children[0];
            li.querySelector(".bold").innerText = `${ingredient.ingredient}:` ;
            ingredient.quantity ?  li.querySelector(".quantity").innerText = ` ${ingredient.quantity}` : li.querySelector(".bold").innerText = `${ingredient.ingredient}`  ;
            ingredient.unit ? li.querySelector(".unit").innerText = ` ${ingredient.unit}` : "" ;
            Array.from(li.children).forEach(child => child.innerText ? "" : li.removeChild(child));
            ingredientsList.appendChild(li);
        })
        document.querySelector(".meal-cards-gallery").appendChild(card);
    })

}

const init = () => {
    createCard(recipes);
}

init();