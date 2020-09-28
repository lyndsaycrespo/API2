const baseURL = 'https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/search?token=-7QfdGROE7t-ndyacdi9E-njY6Ii2uRHid7hR1lzPvs'; 

//GENERAL SETUP

const searchBar = document.getElementById('searchBar');

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', fetchPlants);

const titleText = document.getElementById('titleText');

const cardGrid = document.querySelector('#card-grid'); 

const nextButton = document.querySelector('.nextButton'); 
const prevButton = document.querySelector('.prevButton'); 
const nav = document.querySelector('nav'); 
nav.style.display = 'none'; 
let pageNumber = 1; 
nextButton.addEventListener('click', nextPage); 
prevButton.addEventListener('click', previousPage); 

//FETCH SETUP

async function fetchPlants() {
    let url;
    let search = searchBar.value; 
    console.log(search);

    url = `${baseURL}&q=${search}&page=${pageNumber}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    displayPlants(json);
} 

//DISPLAY SETUP

async function displayPlants(json) {
    searchBar.style.display = 'none';
    submitButton.style.display = 'none';

    while (cardGrid.firstChild) {
        cardGrid.removeChild(cardGrid.firstChild);
    } 

    let plants = json.data;
    //console.log(plants);

    if (plants.length === 0) { 
        titleText.innerText = 'Sorry, there were no results';
    } else {
        titleText.innerText = 'Here are your results!';
        titleText.style.margin = '30px';
        for (let i = 0; i < plants.length; i++) {
            //console.log(i);
            let cardParent = document.createElement('div');
            cardParent.className = 'col-3';

            let card = document.createElement('div');
            card.className = 'card h-100';
            card.id = 'card' + i;

            let image = plants[i].image_url;
            let commonName = plants[i].common_name;
            let scientificName = plants[i].scientific_name;

            let picture = document.createElement('img');
            picture.className = 'card-img-top'; 
            picture.src = image;

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            let name = document.createElement('h5');
            name.className = 'common name';
            name.innerText = commonName;

            let fancyName = document.createElement('p'); 
            fancyName.className = 'scientific name';
            fancyName.innerText = scientificName;

            cardBody.appendChild(name);
            cardBody.appendChild(fancyName);

            card.appendChild(picture);
            card.appendChild(cardBody);

            cardParent.appendChild(card);
            cardGrid.appendChild(cardParent);

            if (plants.length === 20) { 
            nav.style.display = 'block'; 
            } else { 
                nav.style.display = 'none'; 
            }
        }
    } 
}

function nextPage(e) { 
    // console.log('Next button clicked');
    pageNumber++; 
    fetchPlants(e); 
    //console.log('Page Number:', pageNumber); 
}

function previousPage(e) { 
    // console.log('Previous button clicked');
    if (pageNumber > 1) { 
        pageNumber--; 
    } else { 
        return; 
    }    
    fetchPlants(e); //if the pageNumber has decreased by one, the fetchResults function runs again
    //console.log('Page:', pageNumber); //this logs the new pageNumber value in the console
}

