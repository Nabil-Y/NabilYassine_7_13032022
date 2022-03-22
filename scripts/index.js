// Initialisation
const template = document.querySelector('template');

// Création des cartes (html)
const createCard = (data) => {
    document.querySelector(".meal-cards-gallery").innerHTML = "";
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

// Création des listes (html)
const createLists = (data) => {
    const ingredientList = [], applianceList = [], ustensilList = []; 
    const lists = [ingredientList, applianceList, ustensilList]
    document.querySelectorAll(".search-list").forEach(searchlist => searchlist.innerHTML ="")
    data.forEach( meal => {
        meal.ingredients.forEach( item => ingredientList.indexOf(item.ingredient) === -1 ? ingredientList.push(item.ingredient) : "" );
        applianceList.indexOf(meal.appliance) === -1 ? applianceList.push(meal.appliance) : "" ;
        meal.ustensils.forEach( ustensil => ustensilList.indexOf(ustensil) === -1 ? ustensilList.push(ustensil) : "" );
    })
    lists.forEach( list => {
        list.sort();
        list.forEach( (item) => {
            const itemLi = template.content.cloneNode(true).children[2];
            itemLi.firstElementChild.textContent = `${item.slice(0,1).toUpperCase()}${item.slice(1).toLowerCase()}`;

            const addItemToList = (listType) => {
                const inputItem = document.getElementById(`${listType}-search`).value.toLowerCase();
                if (itemLi.firstElementChild.textContent.toLowerCase().includes(inputItem)) {
                    return document.getElementById(`${listType}-list`).appendChild(itemLi);
                }
            }
            
            switch(list) {
                case ingredientList:
                    addItemToList("ingredients");
                break;
                case applianceList:
                    addItemToList("appliances");
                break;
                case ustensilList:
                    addItemToList("ustensils");
                break;
            }
        })
    })
}

// Mise à jour des cartes et listes
const updateGallery = (data) => {
    createCard(data);
    createLists(data);
    addLiEvents();
}

// Lancement initial du script
const init = () => {
    updateGallery(recipes);
    mainSearch();
    addSearchboxEvents();
}

init();



