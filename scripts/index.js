// Initialisation

import recipes from '/data/recipes.js';
import { search, filteredRecipes } from './search.js';

const template = document.querySelector('template');

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

const createLists = (data) => {
    const ingredientList = []; 
    const applianceList = []; 
    const ustensilList = []; 
    data.forEach( meal => {
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

// Ajouter evenements des barres de recherches (elements fixes)

const addSearchboxEvents = () => {
    const searchBoxes = document.querySelectorAll(".secondary-search-wrapper input");
    searchBoxes.forEach(input => {
        input.addEventListener("focus", (event) => focusSecondarySearch(event, "450px") )
        input.addEventListener("focusout", (event) => focusSecondarySearch(event, "150px"))
    }) 

    document.getElementById("ingredients-search").addEventListener("input", (event) => {
        const ingredientResult = event.target.value.toLowerCase();
        let newFilteredRecipes = filteredRecipes.filter( meal => meal.ingredients.some(item => item.ingredient.toLowerCase().includes(ingredientResult)))
        newFilteredRecipes.length === 0 ? createLists(recipes) : createLists(newFilteredRecipes);
        addLiEvents()
    })

    document.getElementById("appliances-search").addEventListener("input", (event) => {
        const applianceResult = event.target.value.toLowerCase();
        let newFilteredRecipes = filteredRecipes.filter( meal => meal.appliance.toLowerCase().includes(applianceResult))
        newFilteredRecipes.length === 0 ? createLists(recipes) : createLists(newFilteredRecipes);
        addLiEvents()
    })

    document.getElementById("ustensils-search").addEventListener("input", (event) => {
        const ustensilResult = event.target.value.toLowerCase();
        let newFilteredRecipes = filteredRecipes.filter( meal => meal.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensilResult)))
        newFilteredRecipes.length === 0 ? createLists(recipes) : createLists(newFilteredRecipes);
        addLiEvents()
    })

    addLiEvents();
}

// Ajouter evenements des listes (elements supprimables)
const addLiEvents = () => {
    document.querySelectorAll(".search-list li").forEach(li => li.addEventListener("click", (event) => {
        document.getElementById('filters').appendChild(event.currentTarget)
        filterSearch()
        
        document.querySelectorAll("#filters li").forEach(item => item.addEventListener("click", (event) => {
                document.querySelector('.search-list').appendChild(event.currentTarget)
                document.querySelectorAll(".search-list").forEach(searchlist => searchlist.innerHTML ="")
                createLists(filteredRecipes);
                addLiEvents();
        }))
    }))
}

// test li Event 
const filterSearch = () => {
    document.querySelector(".meal-cards-gallery").innerHTML = "";
    createCard(filteredRecipes)
}

// change style des barres de recherches selectionnées

const focusSecondarySearch = (event, data) => {
    const input = event.currentTarget;
    input.style.width = data
    input.previousElementSibling.classList.toggle("sr-only")
    input.parentElement.classList.toggle("rotate-pseudo")
    input.value = ""
    input.parentElement.nextElementSibling.classList.toggle("hide-search")
}

// Mise à jour des cartes et listes
export const updateGallery = (data) => {
    document.querySelector(".meal-cards-gallery").innerHTML = "";
    document.querySelectorAll(".search-list").forEach(searchlist => searchlist.innerHTML ="")
    createCard(data);
    createLists(data);
    addLiEvents();
}

// Lancement initial du script
const init = () => {
    updateGallery(recipes);
    search();
    addSearchboxEvents();
}

init();



