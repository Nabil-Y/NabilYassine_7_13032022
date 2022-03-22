// Ajouter evenements des barres de recherches (elements fixes)
const addSearchboxEvents = () => {
    const searchBoxes = document.querySelectorAll(".secondary-search-wrapper input");
    searchBoxes.forEach(input => {
        input.addEventListener("focus", (event) => focusSecondarySearch(event, "450px") );
        input.addEventListener("focusout", (event) => focusSecondarySearch(event, "150px") );
        input.addEventListener("input", mainSearch );
    }) 

    document.getElementById("main-search").addEventListener('input', mainSearch);
}

// change style des barres de recherches selectionnées
const focusSecondarySearch = (event, data) => {
    const input = event.currentTarget;
    input.style.width = data;
    input.previousElementSibling.classList.toggle("sr-only");
    input.parentElement.classList.toggle("rotate-pseudo");
    input.parentElement.nextElementSibling.classList.toggle("hide-search");
    input.value = "";
}

// Ajouter events des LI
const addLiEvents = () => {
    document.querySelectorAll(".search-list li").forEach( li => li.addEventListener("click", (event) => {
        const tagElement = event.target.cloneNode(true);
        switch(li.closest("ul").id) {
            case "ingredients-list":
                createTag("ig-tag", tagElement);
            break;
            case "appliances-list":
                createTag("ap-tag", tagElement);
            break;
            case "ustensils-list":
                createTag("us-tag", tagElement);
            break;
        }
    }))
}

// Creer tag lors du click sur un LI
const createTag = (tagType, tag) => {
    const img = document.createElement("img");
    img.setAttribute('alt', "Close tag icon");
    img.setAttribute('src', './assets/remove.png');
    img.classList.add("remove-tag");

    tag.classList.add(tagType);
    tag.appendChild(img);
    tag.addEventListener("click", event => {
        event.target.parentElement.removeChild(event.target)
        mainSearch();
    });
    document.getElementById("filters").appendChild(tag);
    mainSearch();
}

// Fonction d'initialisation pour les evenements
const addEvents = () => {
    addSearchboxEvents();
    addLiEvents();
}


