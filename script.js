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
            benefitElement.classList.remove('drag-enter');

            if (id === food.id) {
                benefitElement.textContent += ` - ${food.name}`;
                const foodElement = document.getElementById(`food-${id}`);
                foodElement.classList.add('matched');
                foodElement.draggable = false;
            } else {
                // Marque la tentative comme échouée
                benefitElement.classList.add('drag-fail');
                // Optionnel: Réinitialise la couleur après un court délai
                setTimeout(() => {
                    benefitElement.classList.remove('drag-fail');
                }, 1500);
            }
        });

        foodsContainer.appendChild(foodElement);
        benefitsContainer.appendChild(benefitElement);
    });
}

setupGame();


