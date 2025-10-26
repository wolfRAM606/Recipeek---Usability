document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let pageHistory = ['explore-page'];

    // --- MOCK RECIPE DATABASE (Corrected Image Names) ---
    const recipeDatabase = {
        'masala': {
            name: 'Paneer Butter Masala',
            image: 'panner_butter_masala.png', // Corrected name
            time: 45, type: 'Food',
            description: 'A rich and creamy dish of paneer...',
            ingredients: ['Paneer - 250gm', 'Tomatoes - 100gm']
        },
        'schezwanNoodles': {
            name: 'Schezwan Noodles',
            image: 'schezwan_noodles.jpg', // Corrected name
            time: 60, type: 'Food',
            description: 'A fiery and pungent noodle dish...',
            ingredients: ['Noodles - 200g', 'Schezwan Sauce - 4 tbsp']
        },
        'pasta': {
            name: 'Pasta',
            image: 'pasta.png', // Corrected name
            time: 40, type: 'Food',
            description: 'Classic Italian pasta with a rich tomato sauce.',
            ingredients: ['Penne Pasta - 250g', 'Tomatoes - 400g']
        },
        'upma': {
            name: 'Rava Upma',
            image: 'rava_upma.png', // Corrected name
            time: 20, type: 'Breakfast',
            description: 'A traditional South Indian breakfast dish.',
            ingredients: ['Rava (Semolina) - 1 cup', 'Onion - 1']
        }
    };

    // --- NAVIGATION FUNCTIONS ---
    function showPage(pageId, isBack = false) {
        if (!isBack) pageHistory.push(pageId);
        pages.forEach(p => p.classList.remove('active-page'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active-page');
    }

    function goBack() {
        if (pageHistory.length > 1) {
            pageHistory.pop();
            const prevPage = pageHistory[pageHistory.length - 1];
            pages.forEach(p => p.classList.remove('active-page'));
            const targetPage = document.getElementById(prevPage);
             if (targetPage) targetPage.classList.add('active-page');
        } else {
             // Go back to Home-Search if at the start of Explore history
             window.location.href = '../Home-Search/index.html';
        }
    }

    // --- DYNAMIC CONTENT FUNCTIONS ---
    function renderRecipeDetails(recipeKey) {
        const recipe = recipeDatabase[recipeKey];
        const container = document.getElementById('recipe-detail-content');
        if (!recipe || !container) {
             container.innerHTML = `<div class="page-content"><p>Recipe details not found.</p></div>`;
             return;
        }
        container.innerHTML = `
            <div class="detail-header">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div class="back-btn detail-back-btn"><span class="material-symbols-outlined">arrow_back</span></div>
            </div>
            <div class="detail-content">
                <h2>${recipe.name}</h2>
                <p>${recipe.type} • ${recipe.time} mins</p>
                <p>${recipe.description}</p>
                <h3>Ingredients</h3>
                <ul>${recipe.ingredients.map(ing => `<li><span class="material-symbols-outlined check">check_circle</span> ${ing}</li>`).join('')}</ul>
            </div>`;
    }

    // --- EVENT LISTENERS ---
    document.body.addEventListener('click', e => {
        if (e.target.closest('.back-btn')) {
            goBack();
        } else if (e.target.closest('.recipe-card')) {
            const card = e.target.closest('.recipe-card');
            const recipeKey = card.dataset.recipe;
            renderRecipeDetails(recipeKey);
            showPage('recipe-details-page');
        } else if (e.target.closest('#back-to-home-btn')) { // Specific button ID from explore page
            window.location.href = '../Home-Search/index.html';
        }
    });

    // --- INITIALIZE ---
    showPage('explore-page');
});