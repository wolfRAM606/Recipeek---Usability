document.addEventListener('DOMContentLoaded', () => {
    // Default data
    const defaultInventory = [
        // UPDATED: Image extensions changed to .png to match your files
        { id: 1, name: 'Eggs', image: 'eggs.png', expiryDays: 10, quantity: 12, unit: 'pcs' },
        { id: 2, name: 'Curd', image: 'curd.png', expiryDays: 3, quantity: 500, unit: 'g' },
        { id: 3, name: 'Oil', image: 'oil.png', expiryDays: 90, quantity: 1, unit: 'Lt' },
        { id: 4, name: 'Chicken', image: 'chicken.png', expiryDays: 3, quantity: 1, unit: 'Kg' },
        { id: 5, name: 'Onion', image: 'onion.png', expiryDays: 7, quantity: 1, unit: 'Kg' },
        { id: 6, name: 'Mutton', image: 'mutton.png', expiryDays: 3, quantity: 1, unit: 'Kg' },
        { id: 7, name: 'Tomato', image: 'tomato.png', expiryDays: 5, quantity: 5, unit: 'Kg' },
        { id: 8, name: 'Rice', image: 'rice.png', expiryDays: 270, quantity: 5, unit: 'Kg' }
    ];

    let inventoryData = [];
    let currentSortOrder = 'expiry';
    let selectedSortOption = 'expiry';

    // --- Data Management with localStorage ---
    function loadInventory() {
        const savedInventory = localStorage.getItem('recipeekInventory');
        if (savedInventory) {
            inventoryData = JSON.parse(savedInventory);
        } else {
            inventoryData = defaultInventory; // Use default if nothing is saved
            saveInventory();
        }
    }
    function saveInventory() {
        localStorage.setItem('recipeekInventory', JSON.stringify(inventoryData));
    }

    // --- Rendering ---
    function renderInventory() {
        const inventoryList = document.getElementById('inventory-list');
        
        inventoryData.sort((a, b) => {
            if (currentSortOrder === 'expiry') return a.expiryDays - b.expiryDays;
            if (currentSortOrder === 'quantity') return b.quantity - a.quantity;
            return 0;
        });

        inventoryList.innerHTML = inventoryData.map(item => {
            let expiryText = `Expires in ${item.expiryDays} days`;
            let expiryClass = '';
            if (item.expiryDays > 30) {
                 const months = Math.floor(item.expiryDays / 30);
                 expiryText = `Expires in ${months} months`;
            }
            if (item.expiryDays <= 7) expiryClass = 'expires-soon';
            if (item.expiryDays <= 3) expiryClass = 'expired';

            return `
                <div class="inventory-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p class="${expiryClass}">${expiryText}</p>
                    </div>
                    <div class="quantity-stepper">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}${item.unit}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>`;
        }).join('');
    }

    // --- Event Listeners ---
    function initializeEventListeners() {
        const inventoryList = document.getElementById('inventory-list');
        const sortModal = document.getElementById('sort-modal');

        // Quantity buttons (+/-)
        inventoryList.addEventListener('click', (e) => {
            if (e.target.matches('.quantity-btn')) {
                const id = parseInt(e.target.dataset.id);
                const item = inventoryData.find(i => i.id === id);
                if (e.target.classList.contains('plus')) {
                    item.quantity++;
                } else if (item.quantity > 0) {
                    item.quantity--;
                }
                saveInventory();
                renderInventory();
            }
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            window.location.href = '../Home-Search/index.html';
        });

        // Sort Modal
        document.getElementById('sort-btn').addEventListener('click', () => {
            sortModal.classList.add('visible');
            document.querySelectorAll('.sort-option').forEach(opt => {
                opt.classList.toggle('active', opt.dataset.sort === currentSortOrder);
            });
        });
        document.getElementById('sort-cancel-btn').addEventListener('click', () => sortModal.classList.remove('visible'));
        document.querySelectorAll('.sort-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.sort-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedSortOption = option.dataset.sort;
            });
        });
        document.getElementById('sort-done-btn').addEventListener('click', () => {
            currentSortOrder = selectedSortOption;
            sortModal.classList.remove('visible');
            renderInventory();
        });
    }

    // --- Initial Load ---
    loadInventory();
    renderInventory();
    initializeEventListeners();
});

// Add this inside initializeEventListeners() in Inventory/script.js
document.getElementById('plan-my-meal-btn').addEventListener('click', () => {
    window.location.href = '../Meal-Planner/index.html';
});