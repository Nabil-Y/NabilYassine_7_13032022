/**
 * Add events to main and secondary searchbars
 */
const addSearchboxEvents = () => {
    const searchBoxes = document.querySelectorAll(".secondary-search-wrapper input");
    searchBoxes.forEach(input => {
        input.addEventListener("focus", (event) => focusSecondarySearch(event) );
        input.addEventListener("focusout", (event) => focusSecondarySearch(event) );
        input.addEventListener("input", mainSearch);
    }) 

    document.getElementById("main-search").addEventListener('input', mainSearch);
}

/**
 * Toggle styles and reset input value when a secondary searchbar gains/lose focus
 * @param {FocusEvent} event 
 */
const focusSecondarySearch = (event) => {
    const input = event.currentTarget;
    input.classList.toggle("secondary-input__focus");
    input.previousElementSibling.classList.toggle("sr-only");
    input.parentElement.classList.toggle("rotate-pseudo");
    input.parentElement.nextElementSibling.classList.toggle("hide-search");
    input.value = "";
}

/**
 * Add events for secondary searchbox list items
 */
const addLiEvents = () => {
    document.querySelectorAll(".search-list a").forEach( li => li.addEventListener("mousedown", (event) => {
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
        })
    )
}

/**
 * Creates a new tag and filters again when a list item is clicked. Also add "close" event to created tag
 * @param {string} tagType 
 * @param {HTMLElement} tag 
 */
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


