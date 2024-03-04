const foods = [
    { id: "fromage", name: "Fromage", benefit: "L-Tyrosine: Améliore l'humeur et la réactivité au stress, aide à la concentration." },
    { id: "dinde", name: "Dinde", benefit: "Tryptophane: Améliore la qualité du sommeil, promeut une sensation de bien-être." },
    { id: "saumon", name: "Saumon", benefit: "Omega-3: Réduit l'inflammation, soutient la santé cardiovasculaire et cérébrale." },
    { id: "oranges", name: "Oranges", benefit: "Vitamine C: Antioxydant, nécessaire pour la croissance et la réparation des tissus." },
    { id: "lentilles", name: "Lentilles", benefit: "Fibres: Améliorent la digestion, régulent le taux de sucre dans le sang." },
    { id: "bananes", name: "Bananes", benefit: "Potassium: Fonctionnement du système nerveux et des muscles, abaisse la pression artérielle." },
    { id: "epinards", name: "Épinards", benefit: "Fer: Nécessaire à la formation de l'hémoglobine, réduit la fatigue et l'anémie." },
    { id: "amandes", name: "Amandes", benefit: "Calcium: Crucial pour les os et les dents, fonction musculaire et coagulation sanguine." }
    // Vous pouvez continuer à ajouter d'autres aliments et bienfaits ici
];

function setupGame() {
    const foodsContainer = document.getElementById('foods');
    const benefitsContainer = document.getElementById('benefits');

    foods.forEach(food => {
        const foodElement = document.createElement('div');
        foodElement.classList.add('item');
        foodElement.textContent = food.name;
        foodElement.draggable = true;
        foodElement.id = `food-${food.id}`;

        foodElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', food.id);
        });

        const benefitElement = document.createElement('div');
        benefitElement.classList.add('item', 'benefit');
        benefitElement.textContent = food.benefit;
        benefitElement.id = `benefit-${food.id}`;

        benefitElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            benefitElement.classList.add('drag-enter');
        });

        benefitElement.addEventListener('dragleave', () => {
            benefitElement.classList.remove('drag-enter');
        });

        benefitElement.addEventListener('drop', (e) => {
            const id = e.dataTransfer.getData('text/plain');
            if (id === food.id) {
                benefitElement.textContent += ` - ${food.name}`;
                benefitElement.classList.remove('drag-enter');
                const foodElement = document.getElementById(`food-${id}`);
                foodElement.style.display = 'none'; // Cache l'élément de l'aliment
                foodElement.draggable = false;
            } else {
                // Gestion d'une association incorrecte
                benefitElement.classList.add('drag-wrong');
                setTimeout(() => { benefitElement.classList.remove('drag-wrong'); }, 1500); // Enlève le rouge après 1.5 secondes
            }
        });

        foodsContainer.appendChild(foodElement);
        benefitsContainer.appendChild(benefitElement);
    });
}

function makeDraggable(element) {
    let dragItem = null;

    element.addEventListener('touchstart', function(e) {
        dragItem = this;
        e.dataTransfer = { data: {} }; // Simuler dataTransfer pour les événements tactiles
        e.dataTransfer.setData('text/plain', dragItem.id);
    }, false);

    element.addEventListener('touchend', function(e) {
        dragItem = null;
    }, false);
}

function makeDroppable(element) {
    element.addEventListener('touchmove', function(e) {
        if (dragItem) {
            e.preventDefault(); // Prévenir le scroll pendant le drag
        }
    }, false);

    element.addEventListener('touchend', function(e) {
        if (!dragItem) return;

        // Simuler un événement drop
        const id = e.dataTransfer.getData('text/plain');
        if (id === element.getAttribute('data-food-id')) {
            element.textContent += ` - ${dragItem.textContent}`;
            element.classList.remove('drag-enter');
            dragItem.style.display = 'none'; // Cacher l'élément aliment après l'association réussie
        } else {
            // Ajout pour gérer une association incorrecte
            element.classList.add('drag-wrong');
            setTimeout(() => { element.classList.remove('drag-wrong'); }, 1500); // Enlève le rouge après 1.5 secondes
        }
        dragItem = null; // Réinitialiser l'élément en cours de déplacement
    }, false);
}

foods.forEach(food => {
    const foodElement = document.createElement('div');
    // Configuration initiale de foodElement...
    makeDraggable(foodElement);

    const benefitElement = document.createElement('div');
    // Configuration initiale de benefitElement...
    makeDroppable(benefitElement);
    benefitElement.setAttribute('data-food-id', food.id); // Associer l'ID pour vérifier la correspondance
});

// Assurez-vous de mettre à jour le reste de votre code pour utiliser makeDraggable et makeDroppable sur les éléments appropriés.

setupGame();

------

let currentDraggedElementId = null; // Stocke l'ID de l'élément actuellement déplacé

function setupGame() {
    const foodsContainer = document.getElementById('foods');
    const benefitsContainer = document.getElementById('benefits');

    foods.forEach(food => {
        const foodElement = document.createElement('div');
        foodElement.classList.add('item');
        foodElement.textContent = food.name;
        foodElement.draggable = true;
        foodElement.id = `food-${food.id}`;

        foodElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', food.id);
        });

        const benefitElement = document.createElement('div');
        benefitElement.classList.add('item', 'benefit');
        benefitElement.textContent = food.benefit;
        benefitElement.id = `benefit-${food.id}`;

        benefitElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            benefitElement.classList.add('drag-enter');
        });

        benefitElement.addEventListener('dragleave', () => {
            benefitElement.classList.remove('drag-enter');
        });

        benefitElement.addEventListener('drop', (e) => {
            const id = e.dataTransfer.getData('text/plain');
            if (id === food.id) {
                benefitElement.textContent += ` - ${food.name}`;
                benefitElement.classList.remove('drag-enter');
                const foodElement = document.getElementById(`food-${id}`);
                foodElement.style.display = 'none'; // Cache l'élément de l'aliment
                foodElement.draggable = false;
            } else {
                // Gestion d'une association incorrecte
                benefitElement.classList.add('drag-wrong');
                setTimeout(() => { benefitElement.classList.remove('drag-wrong'); }, 1500); // Enlève le rouge après 1.5 secondes
            }
        });

        foodsContainer.appendChild(foodElement);
        benefitsContainer.appendChild(benefitElement);
    });
}


function makeDraggable(element) {
    element.addEventListener('touchstart', function(e) {
        currentDraggedElementId = this.id; // Stocke l'ID de l'élément en cours de déplacement
    }, false);

    element.addEventListener('touchend', function(e) {
        currentDraggedElementId = null; // Réinitialise après le déplacement
    }, false);
}

function makeDroppable(element) {
    element.addEventListener('touchend', function(e) {
        if (!currentDraggedElementId) return;

        // Utilisez currentDraggedElementId au lieu de dataTransfer
        const id = currentDraggedElementId.split('-')[1]; // Assumant l'ID est de la forme "food-{id}"
        if (id === element.getAttribute('data-food-id')) {
            // Gestion de la correspondance réussie
            // La logique de mise à jour de l'interface utilisateur reste inchangée
        } else {
            // Gestion d'une correspondance incorrecte
            // La logique reste inchangée
        }
    }, false);
}

// Initialisation du jeu
setupGame();
