document.addEventListener('DOMContentLoaded', function() {

    const screens = document.querySelectorAll('.screen');
    const allInputs = document.querySelectorAll('input');

    // --- Navigation Logic ---
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Clear all input fields when navigating
    function clearInputs() {
        allInputs.forEach(input => input.value = '');
    }

    // --- Event Listeners for Navigation ---
    document.getElementById('get-started-btn').addEventListener('click', () => {
        showScreen('login-screen');
    });

    document.getElementById('go-to-signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('signup-screen');
    });
    
    document.getElementById('go-to-login-link').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('login-screen');
    });

    document.getElementById('forgot-password-link').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('recovery-screen');
    });
    
    document.getElementById('send-recovery-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert("Recovery code sent to your email!");
        showScreen('verification-screen');
    });
    
    document.getElementById('verify-code-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('profile-creation-screen');
    });
    
    document.getElementById('profile-next-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('preference-screen');
    });
    
    document.getElementById('save-preferences-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('confirmation-screen');
    });

    document.getElementById('go-home-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert("Entering the main app!");
        clearInputs();
        showScreen('splash-screen');
        window.location.href='../../Home-Search/index.html';
    });


    // --- Form Validation & Specific Logic ---
    
    // Sign Up Form Username Validation
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('signup-username');
    const usernameError = document.getElementById('username-error');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        
        // Validation Checks
        if (username.length < 6) {
            usernameError.textContent = 'Username must be at least 6 characters long.';
            return; // Stop the function
        }
        if (!/\d/.test(username)) {
            usernameError.textContent = 'Username must contain at least one number.';
            return; // Stop the function
        }
        if (!/^[A-Za-z0-9_]+$/.test(username)) {
            usernameError.textContent = 'Username can only have letters, numbers and _';
            return; // Stop the function
        }

        // If all checks pass
        usernameError.textContent = ''; // Clear any previous errors
        console.log('Username is valid:', username);
        alert("Sign up successful! Please verify your email.");
        showScreen('verification-screen');
    });

    // Profile Photo Upload Logic
    const photoUploadInput = document.getElementById('photo-upload');
    const uploadPhotoButton = document.getElementById('upload-photo-btn');
    const profilePreview = document.getElementById('profile-preview');

    uploadPhotoButton.addEventListener('click', () => photoUploadInput.click());

    photoUploadInput.addEventListener('change', function(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePreview.src = e.target.result;
                uploadPhotoButton.textContent = 'Photo Uploaded Successfully';
                uploadPhotoButton.classList.add('success');
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    });

    // Preference Selection Logic
    const preferenceItems = document.querySelectorAll('.preference-item');
    preferenceItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });

    // Auto-tab for verification code inputs
    const codeInputs = document.querySelectorAll('.code-inputs input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            if (e.key >= 0 && e.key <= 9 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            } else if (e.key === 'Backspace' && index > 0) {
                 codeInputs[index - 1].focus();
            }
        });
    });

    // --- Initial State ---
    showScreen('splash-screen');

});