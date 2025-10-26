document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // ===================== DUMMY DATA =====================
    // ======================================================
    const recipes = [
        { id: 1, name: 'Pan Noodles', image: 'pan_noodles.webp', time: 30, type: 'Food', likes: 450, description: 'Delicious and savory pan-fried noodles with fresh vegetables. A quick and satisfying meal.', ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Soy Sauce', amount: '3 tbsp'}, { name: 'Mixed Veggies', amount: '1 cup'} ] },
        { id: 2, name: 'Pasta', image: 'pasta.webp', time: 40, type: 'Food', likes: 680, description: 'Classic Italian pasta with a rich tomato and basil sauce, topped with parmesan cheese.', ingredients: [ { name: 'Penne Pasta', amount: '250g' }, { name: 'Tomatoes', amount: '400g'}, { name: 'Garlic', amount: '2 cloves'} ] },
        { id: 3, name: 'Pancakes', image: 'pancakes.jpg', time: 25, type: 'Breakfast', likes: 820, description: 'Fluffy American-style pancakes served with fresh blueberries and maple syrup.', ingredients: [ { name: 'Flour', amount: '1.5 cups' }, { name: 'Milk', amount: '1.25 cups'}, { name: 'Egg', amount: '1'} ] },
        { id: 4, name: 'Cheese Board', image: 'cheese_board.jpg', time: 15, type: 'Snack', likes: 350, description: 'A curated selection of fine cheeses, fruits, and nuts for sharing.', ingredients: [ { name: 'Assorted Cheeses', amount: '300g' }, { name: 'Figs', amount: '1 cup'}, { name: 'Walnuts', amount: '0.5 cup'} ] },
        { id: 6, name: 'Chicken Hakka Noodles', image: 'chicken_hakka_noodles.jpg', time: 90, type: 'Food', likes: 720, description: 'Spicy and flavorful Hakka noodles tossed with tender chicken pieces and crisp vegetables.', ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Chicken Breast', amount: '150g'}, { name: 'Bell Peppers', amount: '1 cup'} ] },
        { id: 7, name: 'Schezwan Noodles', image: 'schezwan_noodles.jpg', time: 60, type: 'Food', likes: 630, description: 'A fiery and pungent noodle dish tossed in a bold Schezwan sauce with stir-fried vegetables.', ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Schezwan Sauce', amount: '4 tbsp'}, { name: 'Onion', amount: '1'} ] },
        { id: 8, name: 'Paneer Butter Masala', image: 'paneer_butter_masala.jpg', time: 45, type: 'Food', likes: 570, description: 'A rich and creamy North Indian curry with soft paneer in a tomato and butter gravy.', ingredients: [ { name: 'Paneer', amount: '250gm' }, { name: 'Tomatoes', amount: '100gm'}, { name: 'Curd', amount: '500ml'} ] },
    ];

    // ======================================================
    // =================== PAGE ELEMENTS ====================
    // ======================================================
    const pages = document.querySelectorAll('.page');
    const homeSearchBar = document.getElementById('home-search-bar');
    const backButtons = document.querySelectorAll('.back-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const suggestedRecipesContainer = document.getElementById('suggested-recipes');
    const searchResultsGrid = document.getElementById('search-results-grid');
    
    // ======================================================
    // ============ INTERNAL PAGE NAVIGATION ================
    // ======================================================
    let navigationStack = ['home-page'];

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active');
    }
    
    function navigateTo(pageId) {
        if (navigationStack[navigationStack.length - 1] !== pageId) {
            navigationStack.push(pageId);
        }
        showPage(pageId);
    }
    
    function goBack() {
        if (navigationStack.length > 1) {
            navigationStack.pop();
            showPage(navigationStack[navigationStack.length - 1]);
        }
    }

    // ======================================================
    // ============= DYNAMIC CONTENT RENDERING ==============
    // ======================================================
    function createRecipeCard(recipe) {
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <div class="img-container">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <div class="heart-icon">
                        <span class="material-symbols-outlined">favorite</span>
                    </div>
                </div>
                <h4>${recipe.name}</h4>
                <p>${recipe.type} • >${recipe.time} mins</p>
            </div>
        `;
    }

    function renderHomePage() {
        if (suggestedRecipesContainer) {
            suggestedRecipesContainer.innerHTML = recipes.slice(0, 4).map(createRecipeCard).join('');
            addCardClickListeners();
        }
    }

    function renderSearchResults(query) {
        const results = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        document.getElementById('search-results-title').textContent = `Search Results for "${query}"`;
        document.getElementById('search-results-input').value = query;
        
        if (results.length > 0) {
            searchResultsGrid.innerHTML = results.map(createRecipeCard).join('');
        } else {
            searchResultsGrid.innerHTML = '<p>No recipes found.</p>';
        }
        addCardClickListeners();
    }
    
    function renderRecipeDetail(recipeId) {
        const recipe = recipes.find(r => r.id === parseInt(recipeId));
        if (!recipe) return;
        document.getElementById('recipe-detail-img').src = recipe.image;
        document.getElementById('recipe-detail-title').textContent = recipe.name;
        document.getElementById('recipe-detail-time').textContent = `${recipe.time} mins`;
        document.getElementById('recipe-detail-likes').textContent = `${recipe.likes} Likes`;
        document.getElementById('recipe-detail-desc').textContent = recipe.description;
        const ingredientsList = document.getElementById('recipe-detail-ingredients');
        ingredientsList.innerHTML = recipe.ingredients.map(ing => `
            <li>
                <span class="check-circle material-symbols-outlined">check</span>
                <span>${ing.name} - <strong>${ing.amount}</strong></span>
            </li>
        `).join('');
    }

    // ======================================================
    // ================= EVENT LISTENERS ====================
    // ======================================================
    function addCardClickListeners() {
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const recipeId = card.dataset.recipeId;
                renderRecipeDetail(recipeId);
                navigateTo('recipe-detail-page');
            });
        });
    }

    if (homeSearchBar) homeSearchBar.addEventListener('click', () => navigateTo('search-page'));
    if (backButtons) backButtons.forEach(btn => btn.addEventListener('click', goBack));
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                renderSearchResults(query);
                navigateTo('search-results-page');
            }
        });
    }

    // ======================================================
    // ============ NAVIGATION TO OTHER MODULES =============
    // ======================================================
    const cartButton = document.getElementById('cart-icon');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            window.location.href = '../Inventory/index.html';
        });
    }

    const profileButton = document.getElementById('profile-icon-btn');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            // **CORRECT LINK TO PROFILE MODULE**
            window.location.href = '../Profile/index.html'; 
        });
    }

    const exploreButton = document.getElementById('explore-btn');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            // **CORRECT LINK TO EXPLORE MODULE**
            window.location.href = '../Explore/index.html'; 
        });
    }

    // ======================================================
    // ================== INITIALIZATION ====================
    // ======================================================
    function init() {
        renderHomePage();
        showPage('home-page');
    }

    init();
});