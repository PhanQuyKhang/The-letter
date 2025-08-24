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

    let currentPageIndex = 0;

    // Function to switch between screens
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // --- Loading Logic ---
    setTimeout(() => {
        showScreen('envelope');
    }, 1500); // Simulate loading for 1.5 seconds

    // --- Envelope Logic ---
    openEnvelopeBtn.addEventListener('click', () => {
        envelope.classList.add('open');
        // UPDATED: Wait for the longer fly-out animation to finish
        setTimeout(() => {
            showScreen('postcard');
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
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
        }
    });

    // --- End and Restart Logic ---
    endLetterBtn.addEventListener('click', () => {
        showScreen('thanks');
    });

    readAgainBtn.addEventListener('click', () => {
        // Reset everything to the initial state
        envelope.classList.remove('open');
        currentPageIndex = 0;
        showPage(currentPageIndex);
        showScreen('envelope');
    });

    // Initialize the first page
    showPage(currentPageIndex);
});