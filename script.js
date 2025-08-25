document.addEventListener('DOMContentLoaded', () => {
    // Get all screen and interactive elements
    const screens = {
        loading: document.getElementById('loading-screen'),
        envelope: document.getElementById('envelope-screen'),
        postcard: document.getElementById('postcard-screen'),
        thanks: document.getElementById('thanks-screen'),
    };
    
    const envelope = document.getElementById('envelope');
    const openEnvelopeBtn = document.getElementById('open-envelope-btn');
    
    const postcardPages = document.querySelectorAll('.page');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const endLetterBtn = document.getElementById('end-letter-btn');
    
    const readAgainBtn = document.getElementById('read-again-btn');

    // ★★★ NEW: Get the audio elements from the HTML ★★★
    const openSound = document.getElementById('open-sound');
    const turnSound = document.getElementById('turn-sound');
    const backgroundMusic = document.getElementById('music');
    backgroundMusic.volume = 0.5; // Optional: Set a comfortable volume (from 0.0 to 1.0)

    let currentPageIndex = 0;

    // Function to switch between screens
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // --- Loading Logic ---
    setTimeout(() => {
        showScreen('envelope');
    }, 2500); // Simulate loading for 2.5 seconds

    // --- Envelope Logic ---
    openEnvelopeBtn.addEventListener('click', () => {
        // ★★★ NEW: Play the envelope opening sound ★★★
        openSound.currentTime = 0; // Rewind to the start
        openSound.play();

        envelope.classList.add('open');
        
        // Wait for animation to finish before switching screens
        setTimeout(() => {
            showScreen('postcard');
            // ★★★ NEW: Start the background music ★★★
            backgroundMusic.play();
        }, 1500); // 1.5 second delay
    });

    // --- Postcard Navigation Logic ---
    function showPage(index) {
        postcardPages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        
        // Update button visibility
        prevPageBtn.disabled = index === 0;
        nextPageBtn.style.display = index === postcardPages.length - 1 ? 'none' : 'inline-block';
        endLetterBtn.style.display = index === postcardPages.length - 1 ? 'inline-block' : 'none';
    }

    nextPageBtn.addEventListener('click', () => {
        if (currentPageIndex < postcardPages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
            // ★★★ NEW: Play the page turn sound ★★★
            turnSound.currentTime = 0; // Rewind to the start
            turnSound.play();
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
            // ★★★ NEW: Play the page turn sound ★★★
            turnSound.currentTime = 0; // Rewind to the start
            turnSound.play();
        }
    });

    // --- End and Restart Logic ---
    endLetterBtn.addEventListener('click', () => {
        showScreen('thanks');
        // ★★★ NEW: Stop the music at the end ★★★
        backgroundMusic.pause();
    });

    readAgainBtn.addEventListener('click', () => {
        // ★★★ NEW: Reset music when reading again ★★★
        backgroundMusic.currentTime = 0; // Rewind the music to the start

        // Reset everything to the initial state
        envelope.classList.remove('open');
        currentPageIndex = 0;
        showPage(currentPageIndex);
        showScreen('envelope');
    });

    // Initialize the first page
    showPage(currentPageIndex);
});