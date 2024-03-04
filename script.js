const foods = [
    { id: "fromage", name: "Fromage", benefit: "L-Tyrosine: Améliore l'humeur et la réactivité au stress, aide à la concentration." },
    { id: "dinde", name: "Dinde", benefit: "Tryptophane: Améliore la qualité du sommeil, promeut une sensation de bien-être." },
    { id: "saumon", name: "Saumon", benefit: "Omega-3: Réduit l'inflammation, soutient la santé cardiovasculaire et cérébrale." },
    { id: "oranges", name: "Oranges", benefit: "Vitamine C: Antioxydant, nécessaire pour la croissance et la réparation des tissus." },
    { id: "lentilles", name: "Lentilles", benefit: "Fibres: Améliorent la digestion, régulent le taux de sucre dans le sang." },
    { id: "bananes", name: "Bananes", benefit: "Potassium: Fonctionnement du système nerveux et des muscles, abaisse la pression artérielle." },
    { id: "epinards", name: "Épinards", benefit: "Fer: Nécessaire à la formation de l'hémoglobine, réduit la fatigue et l'anémie." },
    { id: "amandes", name: "Amandes", benefit: "Calcium: Crucial pour les os et les dents, fonction musculaire et coagulation sanguine." }
];
    // Vous pouvez continuer à ajouter d'autres aliments et bienfaits ici
    let currentDraggedElementId = null;

function setupGame() {
    const foodsContainer = document.getElementById('foods');
    const benefitsContainer = document.getElementById('benefits');

    foods.forEach(food => {
        const foodElement = document.createElement('div');
        foodElement.classList.add('item');
        foodElement.textContent = food.name;
        foodElement.id = `food-${food.id}`;
        makeDraggable(foodElement);

        const benefitElement = document.createElement('div');
        benefitElement.classList.add('item', 'benefit');
        benefitElement.textContent = food.benefit;
        benefitElement.setAttribute('data-food-id', food.id);
        makeDroppable(benefitElement);

        foodsContainer.appendChild(foodElement);
        benefitsContainer.appendChild(benefitElement);
    });
}

function makeDraggable(element) {
    element.draggable = true;
    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', element.id);
    });

    element.addEventListener('touchstart', (e) => {
        currentDraggedElementId = element.id;
    }, false);

    element.addEventListener('touchend', (e) => {
        currentDraggedElementId = null;
    }, false);
}

function makeDroppable(element) {
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        element.classList.add('drag-enter');
    });

    element.addEventListener('dragleave', () => {
        element.classList.remove('drag-enter');
    });

    element.addEventListener('drop', (e) => {
        handleDrop(element, e.dataTransfer.getData('text/plain').replace('food-', ''));
    });

    element.addEventListener('touchend', (e) => {
        if (currentDraggedElementId) {
            handleDrop(element, currentDraggedElementId.replace('food-', ''));
        }
    }, false);
}

function handleDrop(element, id) {
    if (id === element.getAttribute('data-food-id')) {
        element.textContent += ` - ${document.getElementById(`food-${id}`).textContent}`;
        document.getElementById(`food-${id}`).style.display = 'none';
    } else {
        element.classList.add('drag-wrong');
        setTimeout(() => {
            element.classList.remove('drag-wrong');
        }, 1500);
    }
    element.classList.remove('drag-enter');
    currentDraggedElementId = null;
}

setupGame();
