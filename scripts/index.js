/**
 * Variable for HTML generation with <template> tag
 */
const template = document.querySelector('template');

/**
 * Generates HTML content for meal cards with <template> tag and data from Array param
 * @param {Array} data 
 */
const createCard = (data) => {
    // Reset HTML of cards gallery
    document.querySelector(".meal-cards-gallery").innerHTML = "";

    // Creates card and set content for each object of Array from data param
    data.forEach(meal => {
        // Initialize variables for readability
        const card = template.content.cloneNode(true).children[0];
        const title = card.querySelector(".meal-title");
        const time = card.querySelector(".meal-time");
        const ingredientsList = card.querySelector(".meal-ingredients-list");
        const recipe = card.querySelector(".meal-recipe");
        
        // Generate card content
        title.innerText = meal.name;
        time.innerText = `${meal.time}min`;
        recipe.innerText = meal.description;

        // Generate card list of ingredients
        meal.ingredients.forEach( ingredient => {
            const li = template.content.cloneNode(true).children[1];
            li.querySelector(".bold").innerText = `${ingredient.ingredient}:` ;
            ingredient.quantity ?  li.querySelector(".quantity").innerText = ` ${ingredient.quantity}` : li.querySelector(".bold").innerText = `${ingredient.ingredient}`  ;
            ingredient.unit ? li.querySelector(".unit").innerText = ` ${ingredient.unit}` : "" ;
            Array.from(li.children).forEach(child => child.innerText ? "" : li.removeChild(child));
            ingredientsList.appendChild(li);
        })

        // Add card to gallery
        document.querySelector(".meal-cards-gallery").appendChild(card);
    })
}

/**
 * Generates HTML content for secondary searchbar list items with <template> tag and data from Array param
 * @param {Array} data 
 */
const createLists = (data) => {
    // Initialize variables
    const ingredientList = [], applianceList = [], ustensilList = []; 
    const lists = [ingredientList, applianceList, ustensilList];
    
    // Reset HTML of secondary search lists
    document.querySelectorAll(".search-list").forEach(searchlist => searchlist.innerHTML ="")

    // Populate each list with Array from data param
    data.forEach( meal => {
        meal.ingredients.forEach( item => ingredientList.indexOf(item.ingredient) === -1 ? ingredientList.push(item.ingredient) : "" );
        applianceList.indexOf(meal.appliance) === -1 ? applianceList.push(meal.appliance) : "" ;
        meal.ustensils.forEach( ustensil => ustensilList.indexOf(ustensil) === -1 ? ustensilList.push(ustensil) : "" );
    })

    // Generate list items depending on value in searchbox input
    lists.forEach( list => {
        list.sort();
        list.forEach( (item) => {
            // Creates list item
            const itemLi = template.content.cloneNode(true).children[2];
            itemLi.firstElementChild.textContent = `${item.slice(0,1).toUpperCase()}${item.slice(1).toLowerCase()}`;

            /**
             * Adds list item to HTML corresponding list only if the input value is included in the list item
             * @param {string} listType 
             */
            const addItemToList = (listType) => {
                const inputItem = document.getElementById(`${listType}-search`).value.toLowerCase();
                if (itemLi.firstElementChild.textContent.toLowerCase().includes(inputItem)) {
                    document.getElementById(`${listType}-list`).appendChild(itemLi);
                }
            }
            
            // Checks for list item type and run function with corresponding param
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

/**
 * Updates content of meal card gallery and search list items accordingly with data from Array param
 * @param {Array} data 
 */
const updateContent = (data) => {
    createCard(data);
    createLists(data);
    addLiEvents();
}

// Lancement initial du script
const init = () => {
    updateContent(recipes);
    mainSearch();
    addSearchboxEvents();
}

/**
 * Launches initial JS on first load
 */
init();



