const newColors = ['#f8c8d8', '#f3e0c0', '#a3c9a8', '#a0d6d3', '#c0e8f9', '#e0f8ce', '#d1cef8', '#f08cb5'];
let gamevalue = 0;
//const animalNames = ['Lion', 'Cheetah', 'Tiger', 'Hyena', 'Wandering Spider', 'Scorpion', 'Mosquito', 'Poison Dart Frog', 'Crocodile', 'Cobra', 'Komodo Dragon', 'Galapagos Tortoise', 'Swordfish', 'Snail', 'Colossal Squid', 'Walrus', 'Whale Shark', 'White Shark', 'Blue Whale', 'Orca', 'Elephant', 'Buffalo', 'Polar Bear', 'Hippopotamus', 'Gorilla', 'Grizzly', 'Giraffe', 'Wolf', 'Ostrich', 'Peregrine Falcon', 'Albatross', 'Peacock']; // Beispiel-Tiernamen
//let playerCardIds = [];
//let computerCardIds = [];

document.addEventListener('DOMContentLoaded', function () {
    function init() {
        console.log('Die Seite wurde vollständig geladen.');
        document.getElementById('showOverlayButton').addEventListener('click', showOverlay);
        document.getElementById('closeOverlayButton').addEventListener('click', hideOverlay);
        document.getElementById('closeOverlayButton').addEventListener('click', refreshFilter);
        document.getElementById('searchField').addEventListener('input', search);
        document.getElementById('startGameButton').addEventListener('click', startGame);
        refreshFilter();

    }

    function refreshFilter() {
        document.getElementById('selectedFilter').value = '';
        const dropdown = document.getElementById('animal-group-filter');
        const initialSelectedValue = dropdown.value;
        document.getElementById('selectedFilter').innerHTML = initialSelectedValue;
        dataprep(initialSelectedValue);
        deleteCards();
    }

    function search() {
        const searchValue = document.getElementById('searchField').value.trim();
        deleteCards();
        if (searchValue === '') {
            initialSelectedValue = 'All';
        } else if (searchValue.length > 0){
            initialSelectedValue = 'search';
        }
        dataprep(initialSelectedValue);
    }

    function showOverlay() {
        document.getElementById('overlay').style.display = 'block';
    }

    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

    function dataprep(initialSelectedValue) {
        fetch('data/animaldata.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                return response.json();
            })
            .then(data => {
                switch (initialSelectedValue) {
                    case 'search':
                        animals = data.filter(animal => animal.name.toLowerCase().includes(document.getElementById('searchField').value.toLowerCase()));
                        break;
                    case 'All':
                        animals = data;
                        break;
                    case 'game':
                        animals = data.filter(animal => animal.name.toLowerCase().includes('Lion'));
                        console.log('Gamemode activated');
                        break;
                    default:
                        animals = data.filter(animal => animal.groupname === initialSelectedValue);
                        break;
                }

                animals.forEach((animal, i) => {
                    generateCards(animal, i);
                    switch (animal.group) {
                        case 'A':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[0];
                            break;
                        case 'B':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[1];
                            break;
                        case 'C':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[2];
                            break;
                        case 'D':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[3];//10
                            break;
                        case 'E':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[4];//5
                            break;
                        case 'F':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[5];//4
                            break;
                        case 'G':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[6];
                            break;
                        case 'H':
                            document.getElementById(`group-${i}`).style.backgroundColor = newColors[7];
                            break;
                    }
                });
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Daten:', error);
            });
    }

    function generateCards(animal, i) {
        const wrapperContainer = document.getElementById('wrapper-container');
        const wrapper = document.createElement('div');
        wrapper.classList.add('cardwrapper');

        wrapper.innerHTML = `
            <div id="animal-${i}" class="animalCard">
                <img id="animal-image-${i}" src="images/${animal.name.toLowerCase()}.png" alt="Tierbild" class="Tierbild">
                <div class="cardHeader">
                    <div id="group-${i}" class="group">${animal.group}${animal.group_number}</div>
                    <h4 id="animalName-${i}">${animal.name}</h4>
                </div>
                <div class="stats">
                    <div id="sizeIconBox-${i}" class="iconBox">
                        <img id="sizeIcon-${i}" src="icons/ruler.png" alt="Size Icon" class="Icon sizeIcon">
                        <div id="size-${i}" class="Kategorie">${animal.max_length}</div>
                    </div>
                    <div id="weightIconBox-${i}" class="iconBox">
                        <img id="weightIcon-${i}" src="icons/weighing-machine.png" alt="Weight Icon" class="Icon">
                        <div id="weight-${i}" class="Kategorie">${animal.max_weight}</div>
                    </div>
                    <div id="ageIconBox-${i}" class="iconBox">
                        <img id="ageIcon-${i}" src="icons/hourglass.png" alt="Age Icon" class="Icon ageIcon">
                        <div id="age-${i}" class="Kategorie">${animal.max_age}</div>
                    </div>
                    <div id="speedIconBox-${i}" class="iconBox">
                        <img id="speedIcon-${i}" src="icons/deadline.png" alt="Speed Icon" class="Icon speedIcon">
                        <div id="speed-${i}" class="Kategorie">${animal.top_speed}</div>
                    </div>
                    <div id="deathsIconBox-${i}" class="iconBox">
                        <img id="deathsIcon-${i}" src="icons/skull-and-bones.png" alt="Deaths Icon" class="Icon deathIcon">
                        <div id="deaths-${i}" class="Kategorie">${animal.deaths}</div>
                    </div>
                    <div id="litterIconBox-${i}" class="iconBox">
                        <img id="litterIcon-${i}" src="icons/animal.png" alt="Litter Icon" class="Icon litterIcon">
                        <div id="litter-${i}" class="Kategorie">${animal.litter_size}</div>
                    </div>
                </div>
                <div class="trivia"><p id="trivia-${i}" class="triviaContent">${animal.trivia}</p></div>
            </div>
            `;
        wrapperContainer.appendChild(wrapper);
    }
    init();
});

function deleteCards() {
    const wrapperContainer = document.getElementById('wrapper-container');
    wrapperContainer.innerHTML = '';
}

function quartett() {
    const wrapperContainer = document.getElementById('wrapper-container');
    wrapperContainer.style.display = 'flex';
    wrapperContainer.style.flexWrap = 'wrap';
    wrapperContainer.style.justifyContent = 'space-between';
    wrapperContainer.style.alignItems = 'center';
    wrapperContainer.style.height = '100vh';

    const cards = document.querySelectorAll('.cardwrapper');
    cards.forEach((card, index) => {
        card.style.flex = '1 1 45%';
        card.style.margin = '1em';
        if (index < cards.length / 2) {
            card.style.alignSelf = 'flex-start';
        } else {
            card.style.alignSelf = 'flex-end';
        }
    });
}

function generateUniqueRandomNumbers() {
    const numbers = new Set();
    while (numbers.size < 16) {
        const randomNumber = Math.floor(Math.random() * 32) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateCardArrays() {
    const allCardIds = Array.from({ length: 32 }, (_, i) => i + 1);
    const uniqueNumbers = generateUniqueRandomNumbers();
    let uniqueCardIds = uniqueNumbers;
    let remainingCardIds = allCardIds.filter(id => !uniqueCardIds.includes(id));

    playerCardIds = shuffleArray(uniqueCardIds);
    computerCardIds = shuffleArray(remainingCardIds);

    console.log('Player Card IDs:', playerCardIds);
    console.log('Computer Card IDs:', computerCardIds);
}

function startGame() {
    gamevalue = '1';
    switch (gamevalue) {
        case '1':
            console.log('Game started');
            initialSelectedValue = 'game';
            deleteCards();
            generateUniqueRandomNumbers();
            generateCardArrays();
            document.querySelector('footer').style.display = 'none';

            break;
        default:
            console.log('Search started');
            break;
    }

}
