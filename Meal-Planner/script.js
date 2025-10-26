document.addEventListener('DOMContentLoaded', () => {

    // --- Screen Management ---
    const screens = document.querySelectorAll('.screen');
    function showScreen(screenId) {
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    // --- Mock Recipe Database ---
    const recipes = [
        // UPDATED: Filenames now match your folder
        { id: 1, name: 'Chicken Biriyani', image: 'chickenbiriyani.jpeg', time: 80, description: 'A savory chicken and rice dish, perfect for a hearty meal, layered with aromatic spices.', requiredIngredients: ['Chicken', 'Rice', 'Onion', 'Tomato', 'Curd', 'Oil'] },
        { id: 2, name: 'Mutton Biriyani', image: 'muttonbiriyani.jpeg', time: 90, description: 'Aromatic rice dish with tender mutton pieces, slow-cooked to perfection for a rich flavor.', requiredIngredients: ['Mutton', 'Rice', 'Onion', 'Tomato', 'Curd', 'Oil'] },
        { id: 3, name: 'Tomato Rice', image: 'tomatorice.png', time: 30, description: 'A simple and tangy rice dish made with ripe tomatoes and fragrant spices. A quick meal for any day.', requiredIngredients: ['Tomato', 'Rice', 'Onion', 'Oil'] },
        { id: 4, name: 'Egg Biriyani', image: 'eggbiriyani.jpg', time: 60, description: 'Flavorful basmati rice cooked with boiled eggs and a blend of traditional Indian spices.', requiredIngredients: ['Eggs', 'Rice', 'Onion', 'Tomato', 'Curd', 'Oil'] }
    ];

    // --- Main Logic ---

    // 1. Read inventory from browser storage
    const inventoryData = JSON.parse(localStorage.getItem('recipeekInventory')) || [];
    const availableIngredients = inventoryData.filter(item => item.quantity > 0).map(item => item.name);

    // 2. Function to generate meal suggestions
    function generateSuggestions() {
        // Filter recipes to find what you can make
        const possibleRecipes = recipes.filter(recipe => 
            recipe.requiredIngredients.every(ing => availableIngredients.includes(ing))
        );

        // Sort by ingredient with the soonest expiry date
        possibleRecipes.sort((a, b) => {
            const getMinExpiry = (recipe) => {
                let minDays = Infinity;
                recipe.requiredIngredients.forEach(ingName => {
                    const inventoryItem = inventoryData.find(item => item.name === ingName);
                    if (inventoryItem && inventoryItem.expiryDays < minDays) {
                        minDays = inventoryItem.expiryDays;
                    }
                });
                return minDays;
            };
            return getMinExpiry(a) - getMinExpiry(b);
        });

        renderSuggestions(possibleRecipes);
        showScreen('suggestions-screen');
    }

    // 3. Function to display suggestions on the page
    function renderSuggestions(suggestedRecipes) {
        const grid = document.getElementById('suggestions-grid');
        if (suggestedRecipes.length === 0) {
            grid.innerHTML = "<p>No recipes can be made with your current inventory.</p>";
            return;
        }
        grid.innerHTML = suggestedRecipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div class="recipe-card-info">
                    <h4>${recipe.name}</h4>
                    <p>Food • >${recipe.time} mins</p>
                </div>
            </div>
        `).join('');
        
        // Add click listeners to the new cards
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                renderRecipeDetail(card.dataset.id);
            });
        });
    }

    // 4. Function to display a single recipe's details
    function renderRecipeDetail(recipeId) {
        const recipe = recipes.find(r => r.id === parseInt(recipeId));
        const content = document.getElementById('recipe-detail-content');
        
        content.innerHTML = `
            <div class="detail-header">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div id="detail-back-btn" class="detail-back-btn">
                    <span class="material-symbols-outlined">arrow_back</span>
                </div>
            </div>
            <div class="detail-content">
                <div class="detail-title">
                    <h2>${recipe.name}</h2>
                </div>
                <div class="detail-meta">
                    <span>Food • >${recipe.time} mins</span>
                </div>
                <p class="detail-description">${recipe.description}</p>
                <div class="detail-ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.requiredIngredients.map(ing => `<li><span class="material-symbols-outlined check">check_circle</span> ${ing}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        document.getElementById('detail-back-btn').addEventListener('click', () => showScreen('suggestions-screen'));
        showScreen('detail-screen');
    }

    // --- Event Listeners ---
    document.getElementById('ai-back-btn').addEventListener('click', () => {
        window.location.href = '../Inventory/index.html'; // Go back to Inventory
    });
    document.getElementById('plan-meal-ai-btn').addEventListener('click', generateSuggestions);
    document.getElementById('suggestions-back-btn').addEventListener('click', () => showScreen('ai-chef-screen'));
});
