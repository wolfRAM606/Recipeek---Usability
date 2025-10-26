document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let pageHistory = ['profile-page']; // Start with the profile page in this module

    // --- MOCK RECIPE DATABASE ---
    const recipeDatabase = {
        'masala': { name: 'Paneer Butter Masala', image: 'panner_butter_masala.png', time: 45, type: 'Food', likes: 570, description: 'A rich and creamy dish of paneer...', ingredients: ['Paneer - 250gm', 'Tomatoes - 100gm', 'Butter - 50gm', 'Cashews - 1/4 cup'] },
        'schezwanNoodles': { name: 'Schezwan Noodles', image: 'schezwan_noodles.jpg', time: 60, type: 'Food', likes: 630, description: 'A fiery and pungent noodle dish...', ingredients: ['Noodles - 200g', 'Schezwan Sauce - 4 tbsp', 'Onion - 1', 'Mixed Veggies - 1 cup'] },
        'pasta': { name: 'Pasta', image: 'pasta.png', time: 40, type: 'Food', likes: 680, description: 'Classic Italian pasta...', ingredients: ['Penne Pasta - 250g', 'Tomatoes - 400g', 'Garlic - 2 cloves', 'Basil - 1/2 cup'] },
        'upma': { name: 'Rava Upma', image: 'rava_upma.png', time: 20, type: 'Breakfast', likes: 300, description: 'A traditional South Indian breakfast dish.', ingredients: ['Rava (Semolina) - 1 cup', 'Onion - 1', 'Mustard Seeds - 1 tsp', 'Ghee - 2 tbsp'] },
        'muttonBiryani': { name: 'Mutton Biryani', image: 'mutton_biryani.png', time: 90, type: 'Food', likes: 750, description: 'Aromatic basmati rice and tender mutton...', ingredients: ['Mutton - 500g', 'Basmati Rice - 2 cups', 'Yogurt - 1 cup', 'Onion - 2, sliced'] },
        'panNoodles': { name: 'Pan Noodles', image: 'pan_noodles.webp', time: 30, type: 'Food', likes: 450, description: 'Delicious and savory pan-fried noodles...', ingredients: ['Noodles - 200g', 'Soy Sauce - 3 tbsp', 'Mixed Veggies - 1 cup', 'Sesame Oil - 1 tbsp'] },
        'hakkaNoodles': { name: 'Chicken Hakka Noodles', image: 'chicken_hakka_noodles.jpg', time: 90, type: 'Food', likes: 720, description: 'Spicy and flavorful Hakka noodles...', ingredients: ['Noodles - 200g', 'Chicken Breast - 150g', 'Bell Peppers - 1 cup', 'Ginger-Garlic Paste - 1 tbsp'] }
    };

    // --- NAVIGATION FUNCTIONS ---
    function showPage(pageId, isBack = false) {
        const targetPage = document.getElementById(pageId);
        if (!targetPage) return;
        if (!isBack && pageHistory[pageHistory.length - 1] !== pageId) {
            pageHistory.push(pageId);
        }
        pages.forEach(page => page.classList.remove('active-page'));
        targetPage.classList.add('active-page');
        if (pageId === 'profile-page') {
             const activeTabBtn = document.querySelector('.tab-btn.active');
             if (activeTabBtn) {
                 const activeTabName = activeTabBtn.dataset.tab;
                 document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                 const activeContent = document.getElementById(`${activeTabName}-content`);
                 if(activeContent) activeContent.classList.add('active');
             }
        }
    }

    function goBack() {
        if (pageHistory.length > 1) {
            pageHistory.pop();
            showPage(pageHistory[pageHistory.length - 1], true);
        } else {
            window.location.href = '../Home-Search/index.html';
        }
    }

    // --- DYNAMIC CONTENT FUNCTIONS ---
    function renderRecipeDetails(recipeKey) {
        const recipe = recipeDatabase[recipeKey];
        const container = document.getElementById('recipe-detail-content');
        if (!recipe || !container) {
            container.innerHTML = `<div class="page-content"><p>Recipe details not found.</p></div>`; return;
        }

        container.innerHTML = `
            <div class="recipe-detail-header">
                <img src="${recipe.image}" alt="${recipe.name}">
                <span class="back-btn detail-back-btn material-symbols-outlined">arrow_back_ios</span>
            </div>
            <div class="recipe-detail-content">
                <div class="drag-indicator"></div>
                <h1>${recipe.name}</h1>
                <div class="recipe-meta">
                    <span>${recipe.type}</span> • <span>${recipe.time} mins</span>
                </div>
                <div class="author-likes-container">
                    <div class="author-info">
                        <img src="https://i.pravatar.cc/50?img=1" alt="Author">
                        <span>Elena Shelby</span>
                    </div>
                    <div class="likes-info">
                        <span class="material-symbols-outlined">favorite</span>
                        <span>${recipe.likes} Likes</span>
                    </div>
                </div>
                <h3>Description</h3>
                <p>${recipe.description}</p>
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ing => `<li><span class="material-symbols-outlined check">check_circle</span> <span>${ing}</span></li>`).join('')}
                </ul>
            </div>
        `;
    }

    // --- EVENT LISTENERS ---
    function bindEventListeners() {
        document.body.addEventListener('click', e => {
            // Back button handler (works for any element with .back-btn)
            if (e.target.closest('.back-btn')) {
                goBack();
                return;
            }

            // Other navigation/card clicks etc.
            const navBtn = e.target.closest('[data-target]');
            if (navBtn && !navBtn.classList.contains('recipe-card') && !navBtn.classList.contains('back-btn')) {
                const targetPageId = navBtn.dataset.target;
                if(targetPageId) showPage(targetPageId);
                return;
            }
            const recipeCard = e.target.closest('.recipe-card');
            if (recipeCard) {
                const recipeKey = recipeCard.dataset.recipe;
                if (recipeKey && recipeDatabase[recipeKey]) {
                    renderRecipeDetails(recipeKey);
                    showPage('recipe-details-page');
                }
                return;
            }
            const tabBtn = e.target.closest('.tab-btn');
            if (tabBtn) {
                const tabName = tabBtn.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                tabBtn.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                 const activeContent = document.getElementById(`${tabName}-content`);
                 if(activeContent) activeContent.classList.add('active');
                return;
            }
            const cuisineCard = e.target.closest('.cuisine-card');
            if (cuisineCard) {
                cuisineCard.classList.toggle('selected');
                return;
            }
        });

        // Save preferences button listener
        const savePrefsBtn = document.querySelector('#preferences-page .btn-primary');
        if(savePrefsBtn) {
            savePrefsBtn.addEventListener('click', () => {
                showPage('loading-page');
                setTimeout(() => {
                    alert('Preferences Updated!');
                    pageHistory = pageHistory.filter(pageId => pageId !== 'loading-page' && pageId !== 'preferences-page');
                    showPage('profile-page', true);
                }, 2000);
            });
        }
         // Back to home button listener
        const backToHomeBtn = document.getElementById('back-to-home-btn');
         if (backToHomeBtn) {
             backToHomeBtn.addEventListener('click', () => {
                 window.location.href = '../Home-Search/index.html';
             });
         }
    }

    // --- INITIALIZE APP ---
    bindEventListeners();
    const initialPageHash = window.location.hash.substring(1);
    if (initialPageHash && document.getElementById(initialPageHash)) {
        showPage(initialPageHash);
        if (initialPageHash !== 'profile-page') {
             pageHistory = ['profile-page', initialPageHash];
        } else {
             pageHistory = ['profile-page'];
        }
    } else {
        showPage('profile-page');
    }
});