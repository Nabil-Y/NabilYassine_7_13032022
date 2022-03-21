// Initialisation

const template = document.querySelector('template');
const ingredientList = []; 
const applianceList = []; 
const ustensilList = []; 
let tagFilteredRecipes;


// Création des cartes (html)

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

// Création des listes (html)

const createLists = () => {
    recipes.forEach( meal => {
        meal.ingredients.forEach( item => ingredientList.indexOf(item.ingredient) === -1 ? ingredientList.push(item.ingredient) : "" );
        applianceList.indexOf(meal.appliance) === -1 ? applianceList.push(meal.appliance) : "" ;
        meal.ustensils.forEach( ustensil => ustensilList.indexOf(ustensil) === -1 ? ustensilList.push(ustensil) : "" );
    })
    document.querySelectorAll(".search-list").forEach(searchlist => searchlist.innerHTML ="")
    const lists = [ingredientList, applianceList, ustensilList]
    lists.forEach( list => {
        list.sort();
        list.forEach( (item) => {
            const itemLi = template.content.cloneNode(true).children[2];
            itemLi.firstElementChild.textContent = `${item.slice(0,1).toUpperCase()}${item.slice(1).toLowerCase()}`;
            switch(list) {
                case ingredientList:
                    const inputIngredient = document.getElementById(`ingredients-search`).value.toLowerCase();
                    if ( !inputIngredient || itemLi.firstElementChild.textContent.toLowerCase().includes(inputIngredient)) {
                        return document.getElementById(`ingredients-list`).appendChild(itemLi);
                    }
                break;
                case applianceList:
                    const inputAppliance = document.getElementById(`appliances-search`).value.toLowerCase();
                    if ( !inputAppliance || itemLi.firstElementChild.textContent.toLowerCase().includes(inputAppliance)) {
                        return document.getElementById(`appliances-list`).appendChild(itemLi);
                    }
                break;
                case ustensilList:
                    const inputUstensil = document.getElementById(`ustensils-search`).value.toLowerCase();
                    if ( !inputUstensil || itemLi.firstElementChild.textContent.toLowerCase().includes(inputUstensil)) {
                        return document.getElementById(`ustensils-list`).appendChild(itemLi);
                    }
                break;
            }
        })
    })
    addLiEvents();
}

// Ajouter evenements des barres de recherches (elements fixes)

const addSearchboxEvents = () => {
    const searchBoxes = document.querySelectorAll(".secondary-search-wrapper input");
    searchBoxes.forEach(input => {
        input.addEventListener("focus", (event) => {focusSecondarySearch(event, "450px");createLists;} )
        input.addEventListener("focusout", (event) => focusSecondarySearch(event, "150px"))
        input.addEventListener("input", createLists)
    }) 
}

const addLiEvents = () => {
    document.querySelectorAll(".search-list li").forEach( li => li.addEventListener("click", (event) => {
        const tag = event.target.cloneNode(true);
        switch(li.closest("ul").id) {
            case "ingredients-list":
                if (document.querySelectorAll(".ig-tag").length > 0) {
                    document.querySelectorAll(".ig-tag").forEach( item => document.getElementById("filters").removeChild(item))
                }
                tag.classList.add("ig-tag")
                tag.addEventListener("click", event => {
                    event.target.parentElement.removeChild(event.target)
                    document.querySelector(".meal-cards-gallery").innerHTML = "";
                    createCard(filteredRecipes)
                    if (document.querySelectorAll("#filters a").length === 0) return createCard(recipes)
                })
                document.getElementById("filters").appendChild(tag)
                filteredRecipes.length === 0 
                    ? tagFilteredRecipes = recipes.filter( meal=> meal.ingredients.some(item => item.ingredient.toLowerCase().includes(tag.innerText.toLowerCase()))) 
                    : tagFilteredRecipes = filteredRecipes.filter( meal=> meal.ingredients.some(item => item.ingredient.toLowerCase().includes(tag.innerText.toLowerCase()))) 
                ;
                filteredRecipes=tagFilteredRecipes
                document.querySelector(".meal-cards-gallery").innerHTML = "";
                createCard(tagFilteredRecipes)   
            break;
            case "appliances-list":
                if (document.querySelectorAll(".ap-tag").length > 0) {
                    document.querySelectorAll(".ap-tag").forEach( item => document.getElementById("filters").removeChild(item))
                }
                tag.classList.add("ap-tag")
                tag.addEventListener("click", event => {
                    event.target.parentElement.removeChild(event.target)
                    document.querySelector(".meal-cards-gallery").innerHTML = "";
                    createCard(filteredRecipes)
                    if (document.querySelectorAll("#filters a").length === 0) return createCard(recipes)
                })
                document.getElementById("filters").appendChild(tag)    
                filteredRecipes.length === 0 
                    ? tagFilteredRecipes = recipes.filter( meal => meal.appliance.toLowerCase().includes(tag.innerText.toLowerCase()))
                    : tagFilteredRecipes = filteredRecipes.filter( meal => meal.appliance.toLowerCase().includes(tag.innerText.toLowerCase()))
                ; 
                filteredRecipes=tagFilteredRecipes
                document.querySelector(".meal-cards-gallery").innerHTML = "";
                createCard(tagFilteredRecipes)  
            break;
            case "ustensils-list":
                if (document.querySelectorAll(".us-tag").length > 0) {
                    document.querySelectorAll(".us-tag").forEach( item => document.getElementById("filters").removeChild(item))
                }
                tag.classList.add("us-tag")
                tag.addEventListener("click", event => {
                    event.target.parentElement.removeChild(event.target)
                    document.querySelector(".meal-cards-gallery").innerHTML = "";
                    createCard(filteredRecipes)
                    if (document.querySelectorAll("#filters a").length === 0) return createCard(recipes)
                })
                document.getElementById("filters").appendChild(tag)  
                filteredRecipes.length === 0 
                    ? tagFilteredRecipes = recipes.filter( meal=> meal.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.innerText.toLowerCase())))
                    : tagFilteredRecipes = filteredRecipes.filter( meal=> meal.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.innerText.toLowerCase())))
                ;
                filteredRecipes=tagFilteredRecipes
                document.querySelector(".meal-cards-gallery").innerHTML = "";
                createCard(tagFilteredRecipes)     
            break;
        }
    }))
}

// change style des barres de recherches selectionnées

const focusSecondarySearch = (event, data) => {
    const input = event.currentTarget;
    input.style.width = data
    input.previousElementSibling.classList.toggle("sr-only")
    input.parentElement.classList.toggle("rotate-pseudo")
    input.parentElement.nextElementSibling.classList.toggle("hide-search")
    input.value = ""
}

// Mise à jour des cartes et listes
const updateGallery = (data) => {
    document.querySelector(".meal-cards-gallery").innerHTML = "";
    createCard(data);
    createLists();
}

// Lancement initial du script
const init = () => {
    updateGallery(recipes);
    search();
    addSearchboxEvents();
}

init();



