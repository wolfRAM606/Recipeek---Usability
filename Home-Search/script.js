document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // ===================== DUMMY DATA =====================
    // ======================================================
    // In a real app, this data would come from a server/API.
    const recipes = [
        {
            id: 1,
            name: 'Pan Noodles',
            image: 'pan_noodles.webp',
            time: 30,
            type: 'Food',
            likes: 450,
            description: 'Delicious and savory pan-fried noodles with fresh vegetables. A quick and satisfying meal for any day of the week.',
            ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Soy Sauce', amount: '3 tbsp'}, { name: 'Mixed Veggies', amount: '1 cup'} ]
        },
        {
            id: 2,
            name: 'Pasta',
            image: 'pasta.webp',
            time: 40,
            type: 'Food',
            likes: 680,
            description: 'Classic Italian pasta with a rich tomato and basil sauce, topped with parmesan cheese. Simple, yet incredibly flavorful.',
            ingredients: [ { name: 'Penne Pasta', amount: '250g' }, { name: 'Tomatoes', amount: '400g'}, { name: 'Garlic', amount: '2 cloves'} ]
        },
        {
            id: 3,
            name: 'Pancakes',
            image: 'pancakes.jpg',
            time: 25,
            type: 'Breakfast',
            likes: 820,
            description: 'Fluffy American-style pancakes served with fresh blueberries and a drizzle of maple syrup. The perfect start to your day.',
            ingredients: [ { name: 'Flour', amount: '1.5 cups' }, { name: 'Milk', amount: '1.25 cups'}, { name: 'Egg', amount: '1'} ]
        },
        {
            id: 4,
            name: 'Cheese Board',
            image: 'cheese_board.jpg',
            time: 15,
            type: 'Snack',
            likes: 350,
            description: 'A curated selection of fine cheeses, fruits, and nuts. Perfect for sharing with friends and family.',
            ingredients: [ { name: 'Assorted Cheeses', amount: '300g' }, { name: 'Figs', amount: '1 cup'}, { name: 'Walnuts', amount: '0.5 cup'} ]
        },
         {
            id: 5,
            name: 'Veg Chowmein',
            image: 'veg_chowmein.jpg',
            time: 80,
            type: 'Food',
            likes: 510,
            description: 'A popular Indo-Chinese dish made from stir-fried noodles with a variety of vegetables in a savory sauce.',
            ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Cabbage', amount: '1 cup'}, { name: 'Carrots', amount: '0.5 cup'} ]
        },
         {
            id: 6,
            name: 'Chicken Hakka Noodles',
            image: 'chicken_hakka_noodles.jpg',
            time: 90,
            type: 'Food',
            likes: 720,
            description: 'Spicy and flavorful Hakka noodles tossed with tender chicken pieces and crisp vegetables.',
            ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Chicken Breast', amount: '150g'}, { name: 'Bell Peppers', amount: '1 cup'} ]
        },
         {
            id: 7,
            name: 'Schezwan Noodles',
            image: 'schezwan_noodles.jpg',
            time: 60,
            type: 'Food',
            likes: 630,
            description: 'A fiery and pungent noodle dish tossed in a bold Schezwan sauce with stir-fried vegetables.',
            ingredients: [ { name: 'Noodles', amount: '200g' }, { name: 'Schezwan Sauce', amount: '4 tbsp'}, { name: 'Onion', amount: '1'} ]
        },
        {
            id: 8,
            name: 'Paneer Butter Masala',
            image: 'images/paneer_butter_masala.jpg',
            time: 45,
            type: 'Food',
            likes: 570,
            description: 'A rich and creamy North Indian curry made with soft paneer (Indian cottage cheese) cooked in a mildly spiced tomato, butter, and cream-based gravy.',
            ingredients: [ { name: 'Paneer', amount: '250gm' }, { name: 'Tomatoes', amount: '100gm'}, { name: 'Curd', amount: '500ml'} ]
        },
    ];

    // ======================================================
    // =================== PAGE ELEMENTS ====================
    // ======================================================
    const pages = document.querySelectorAll('.page');
    const homePage = document.getElementById('home-page');
    const searchPage = document.getElementById('search-page');
    const searchResultsPage = document.getElementById('search-results-page');
    const recipeDetailPage = document.getElementById('recipe-detail-page');

    // ======================================================
    // =================== NAVIGATION =======================
    // ======================================================
    const homeSearchBar = document.getElementById('home-search-bar');
    const backButtons = document.querySelectorAll('.back-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    let navigationStack = ['home-page']; // Start with the home page

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }
    
    function navigateTo(pageId) {
        // Prevent pushing the same page twice
        if (navigationStack[navigationStack.length - 1] !== pageId) {
            navigationStack.push(pageId);
        }
        showPage(pageId);
    }
    
    function goBack() {
        if (navigationStack.length > 1) {
            navigationStack.pop();
            const previousPageId = navigationStack[navigationStack.length - 1];
            showPage(previousPageId);
        }
    }

    // Event Listeners for Navigation
    homeSearchBar.addEventListener('click', () => navigateTo('search-page'));
    backButtons.forEach(btn => btn.addEventListener('click', goBack));

    // ======================================================
    // ============= DYNAMIC CONTENT RENDERING ==============
    // ======================================================
    const suggestedRecipesContainer = document.getElementById('suggested-recipes');
    const searchResultsGrid = document.getElementById('search-results-grid');

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
        // Show first 4 recipes as suggested
        suggestedRecipesContainer.innerHTML = recipes.slice(0, 4).map(createRecipeCard).join('');
        addCardClickListeners();
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
    // ================= EVENT HANDLERS =====================
    // ======================================================
    
    // Search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            renderSearchResults(query);
            navigateTo('search-results-page');
        }
    });

    // Add click listeners to recipe cards
    function addCardClickListeners() {
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const recipeId = card.dataset.recipeId;
                renderRecipeDetail(recipeId);
                navigateTo('recipe-detail-page');
            });
        });
    }

    // ======================================================
    // ================== INITIALIZATION ====================
    // ======================================================
    function init() {
        renderHomePage();
        showPage('home-page'); // Ensure only home page is visible on load
    }

    init();
});