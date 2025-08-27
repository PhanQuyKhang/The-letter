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
    
    const postcard = document.querySelector('.postcard');
    const postcardPages = document.querySelectorAll('.page');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const endLetterBtn = document.getElementById('end-letter-btn');
    
    const readAgainBtn = document.getElementById('read-again-btn');

    // Get the audio elements from the HTML
    const openSound = document.getElementById('open-sound');
    const turnSound = document.getElementById('turn-sound');
    const backgroundMusic = document.getElementById('music');
    backgroundMusic.volume = 0.5;

    let currentPageIndex = 0;
    let musicHasStarted = false;

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
        // Play the opening sound effect (this works because it's immediate)
        openSound.currentTime = 0;
        openSound.play();

        // ★★★ THE SAFARI FIX ★★★
        // "Prime" the background music on the initial user click
        if (!musicHasStarted) {
            backgroundMusic.play(); // Play the music
            backgroundMusic.pause(); // Immediately pause it. The user hears nothing.
                                     // Safari now trusts this audio element.
        }
        
        envelope.classList.add('open');
        
        // Wait for animation to finish before switching screens
        setTimeout(() => {
            showScreen('postcard');
            // Now, this .play() call will work because the audio is "unlocked"
            if (!musicHasStarted) {
                backgroundMusic.play();
                musicHasStarted = true;
            }
        }, 3000); // 3 second delay
    });

    // --- Postcard Navigation Logic ---
    function showPage(index) {
        postcardPages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        
        prevPageBtn.disabled = index === 0;
        nextPageBtn.style.display = index === postcardPages.length - 1 ? 'none' : 'inline-block';
        endLetterBtn.style.display = index === postcardPages.length - 1 ? 'inline-block' : 'none';
    }

    nextPageBtn.addEventListener('click', () => {
        if (currentPageIndex < postcardPages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
            turnSound.currentTime = 0;
            turnSound.play();
            postcard.scrollTop = 0;
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
            turnSound.currentTime = 0;
            turnSound.play();
            postcard.scrollTop = 0;
        }
    });

    // --- End and Restart Logic ---
    endLetterBtn.addEventListener('click', () => {
        showScreen('thanks');
    });

    readAgainBtn.addEventListener('click', () => {
        envelope.classList.remove('open');
        currentPageIndex = 0;
        showPage(currentPageIndex);
        showScreen('envelope');
    });

    // Initialize the first page
    showPage(currentPageIndex);
});