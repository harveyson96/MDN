//fetch to retrieve the products and pass them to init
// report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a json object 
// using response.json() run the init function
fetch('product.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);

        }
        return response.json();
    })
    .then((json) => initialize(json))
    .catch((err) => console.error(`Fetch error: ${err.message}`))
// set up the app logic, declares required variables, contains all the other functions

function initialize() { 
    // declare UI elements
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');
    // keep records of what last searched category
    let lastCategory = category.ariaValueMax;
    let lastSearch = '';
    // These contain the results after filtering by category and `finalGroup` will contain the products 
    // that need to be diplayed after the searching has been done. [objects]
    let categoryGroup;
    let finalGroup;
    // init display, show all products
    finalGroup = products;
    updateDisplay();
    
    categoryGroup = [];
    finalGroup = [];

    searchBtn.addEventListener('click', selectCategory);

    function selectCategory(e) {
        // stop the form submitting 
        e.preventDefault();
        // clear out previous search
        categoryGroup = [];
        finalGroup = [];
        // if search the same thing(category and search term) , no need to run
        if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else {
            // update the last category record
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();
            // if search for all, return all
            if (category.value === 'All') {
                categoryGroup = products;
                selectProducts();

            } else {
                //!! Remember before searching, the json always needs lower case
                const lowerCaseType = category.value.toLowerCase();
                categoryGroup = products.filter(product => product.type === lowerCaseType);

                selectProducts();
            }
        }

    }
    // selectProducts takes the products from selectCategory and filter
    // them by tiered search term(if needed)
    function selectProducts() {
        // No search term
        if (searchTerm.value.trim() === '') {
            finalGroup = categoryGroup;

        } else {
            //search before converted to lowercase
            const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();

            finalGroup = categoryGroup.filter(product => product.name.includes(lowerCaseSearchTerm));
        }
        updateDisplay();
    }

    // start the process of updating 
    function updateDisplay() {
        // remove the previous content on <main> element
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
  

    //if no products matchs term, display 'No result to display'
        if (finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No result to display';
            main.appendChild(para);
        }
        else {
            // for each product to display, pass its product object to fetchBlob()
            for (const product of finalGroup) {
                fetchBlob(product);
            }
        }
    }
    // Use fetch to retrieve the image for each product
    // Send the results to showProduct() to finally display it.
    function fetchBlob(product) {
        // image url 
        const url = `images/${product.image}`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);

                }
        return response.blob();

            })
            .then((blob) => {
                showProduct(blob, product)
            })
            .catch((err)=> console.error(`Fetch problem: ${err.message}`))

    }
    // Display the product in Main 
    function showProduct(blob, product) {
        // convert the blob to an object URL
        const objectURL = URL.createObjectURL(blob);
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const para = document.createElement('p');
        const image = document.createElement('img');

        section.setAttribute('class', product.type);

        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
        para.textContent = `$${product.price.toFixed(2)}`;

        image.src = objectURL;
        image.alt = product.name;

        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
    }
}
