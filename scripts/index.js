const cardTemplate = document.querySelector("[data-card-template]");

const getData = async () => {
    await fetch("./data/recipes.js")
        .then(res => res.json() )
        .then(data => createCard(data) )
        .catch(error => console.log(error) )
}

const createCard = (data) => {
    data.forEach(meal => {
        const card = cardTemplate.content.cloneNode(true).children[0];
        const title = card.querySelector(".meal-title");
        const time = card.querySelector(".meal-time");
        const ingredientsList = card.querySelector(".meal-ingredients-list");
        const recipe = card.querySelector(".meal-recipe");
        title.innerText = meal.name;
        time.innerText = `${meal.time} min`;
        recipe.innerText = meal.description;
        let list = "";
        meal.ingredients.forEach( ingredient => 
            list += `${ingredient.ingredient}: ${ingredient.unit ? ingredient.quantity + " " + ingredient.unit : ingredient.quantity} \r`)
        ingredientsList.innerText = list;
        document.querySelector(".meal-cards-gallery").appendChild(card);
    })

}

const init = () => {
    getData();
}

init();