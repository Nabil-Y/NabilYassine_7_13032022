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

const createLists = (data) => {
    data.forEach( meal => {
        meal.ingredients.forEach( item => ingredientList.indexOf(item.ingredient) === -1 ? ingredientList.push(item.ingredient) : "" );
        applianceList.indexOf(meal.appliance) === -1 ? applianceList.push(meal.appliance) : "" ;
        meal.ustensils.forEach( ustensil => ustensilList.indexOf(ustensil) === -1 ? ustensilList.push(ustensil) : "" );
    })
    // ingredientList.sort()
    // applianceList.sort()
    // ustensilList.sort()

    // ingredientList.forEach(ingredient => {
    //     const ingredientLi = template.content.cloneNode(true).children[2];
    //     ingredientLi.innerText = ingredient
    //     document.getElementById("ingredients-list").appendChild(ingredientLi)
    // })
    // applianceList.forEach(appliance => {
    //     const applianceLi = template.content.cloneNode(true).children[2];
    //     applianceLi.innerText = appliance
    //     document.getElementById("appliances-list").appendChild(applianceLi)
    // })
    // ustensilList.forEach( ustensil => {
    //     const ustensilLi = template.content.cloneNode(true).children[2];
    //     ustensilLi.innerText = ustensil
    //     document.getElementById("ustensils-list").appendChild(ustensilLi)
    // })
    const lists = [ingredientList, applianceList, ustensilList]
    lists.forEach( list => {
        list.sort();
        list.forEach( (item) => {
            const itemLi = template.content.cloneNode(true).children[2];
            itemLi.children[0].textContent = `${item.slice(0,1).toUpperCase()}${item.slice(1).toLowerCase()}`;
            switch(list) {
                case ingredientList:
                    document.getElementById(`ingredients-list`).appendChild(itemLi);
                break;
                case applianceList:
                    document.getElementById(`appliances-list`).appendChild(itemLi);
                break;
                case ustensilList:
                    document.getElementById(`ustensils-list`).appendChild(itemLi);
                break;
            }
        })
    })
}

const addEvents = () => {
    const searchBoxes = document.querySelectorAll(".secondary-search-wrapper input");
    searchBoxes.forEach(input => {
        input.addEventListener("focus", (event) => focusSecondarySearch(event, "450px") )
        input.addEventListener("focusout", (event) => focusSecondarySearch(event, "150px"))
    }) 
}

const focusSecondarySearch = (event, data) => {
    const input = event.currentTarget;
    input.style.width = data
    input.previousElementSibling.classList.toggle("sr-only")
    input.parentElement.classList.toggle("rotate-pseudo")
    input.value = ""
    input.parentElement.nextElementSibling.classList.toggle("hide-search")
}

const init = () => {
    createCard(recipes);
    createLists(recipes);
    addEvents();
}

init();

export default createCard;