// ===================================
// CUSTOM CURSOR GLOW TRAIL
// ===================================
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===================================
// ANIMATED STAR BACKGROUND
// ===================================
const starCanvas = document.getElementById('starCanvas');
const ctx = starCanvas.getContext('2d');

starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const stars = [];
const starCount = 150;

class Star {
    constructor() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random();
        this.fadeSpeed = (Math.random() * 0.02) + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = starCanvas.width;
        if (this.x > starCanvas.width) this.x = 0;
        if (this.y < 0) this.y = starCanvas.height;
        if (this.y > starCanvas.height) this.y = 0;

        // Twinkle effect
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 1 || this.opacity <= 0) {
            this.fadeSpeed = -this.fadeSpeed;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(200, 150, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize stars
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

animateStars();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
});

// ===================================
// TYPING ANIMATION
// ===================================
const typingText = document.getElementById('typingText');
const subtitleText = document.getElementById('subtitleText');

const mainText = "To the one who makes my heart skip a beat: Your Cupcake";
const subtitle = "A love story written in the stars";

let charIndex = 0;

function typeWriter() {
    if (charIndex < mainText.length) {
        typingText.textContent += mainText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

// Start typing after a brief delay
setTimeout(typeWriter, 500);

// ===================================
// SCROLL-BASED CHAPTER REVEALS
// ===================================
const chapters = document.querySelectorAll('.chapter');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

chapters.forEach(chapter => {
    chapterObserver.observe(chapter);
});

// ===================================
// HIDDEN BUTTON INTERACTION
// ===================================
const trustButton = document.getElementById('trustButton');
const finalReveal = document.getElementById('finalReveal');

trustButton.addEventListener('click', () => {
    // Fade out everything
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '0';

    setTimeout(() => {
        // Show final reveal
        finalReveal.classList.add('active');
        document.body.style.opacity = '1';
        document.body.classList.add('final-active');

        // Make cursor VERY visible - use cssText for direct override
        cursorGlow.style.cssText = `
            position: fixed;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 182, 193, 0.9) 40%, rgba(200, 150, 255, 0.6) 70%, transparent);
            box-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 182, 193, 1), 0 0 70px rgba(200, 150, 255, 0.8);
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            display: block;
            opacity: 1;
        `;

        // Start confetti
        startConfetti();
    }, 1000);
});

// ===================================
// MINIMAL CONFETTI ANIMATION
// ===================================
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];
const confettiCount = 80;

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 5;
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 182, 193, 0.8)',
            'rgba(200, 150, 255, 0.8)',
            'rgba(255, 107, 157, 0.8)',
            'rgba(255, 215, 0, 0.8)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > confettiCanvas.height) {
            this.y = -10;
            this.x = Math.random() * confettiCanvas.width;
        }
    }

    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate((this.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        confettiCtx.restore();
    }
}

function startConfetti() {
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    animateConfetti();
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });
    requestAnimationFrame(animateConfetti);
}

// ===================================
// FINAL BUTTONS INTERACTION
// ===================================
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

yesBtn.addEventListener('click', () => {
    // Celebrate!
    yesBtn.textContent = '❤️ I love you too! ❤️';
    noBtn.style.display = 'none';

    setTimeout(() => {
        alert('❤️ You just made me the happiest person alive! ❤️');
    }, 300);
});

// Make the No button run away from cursor
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const container = document.querySelector('.final-content');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    // Generate random position
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    // Make sure it's far enough from current position
    const currentX = noBtn.offsetLeft || 0;
    const currentY = noBtn.offsetTop || 0;
    const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));

    // If too close, try again
    if (distance < 100) {
        newX = (newX + maxX / 2) % maxX;
        newY = (newY + maxY / 2) % maxY;
    }

    // Apply position
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    // Add a little shake animation
    noBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 100);
}

// ===================================
// CHAPTER-BASED MUSIC SYSTEM
// ===================================
const musicToggle = document.getElementById('musicToggle');
const musicInfo = document.getElementById('musicInfo');
const currentSongName = document.getElementById('currentSongName');

// Audio elements for each chapter
const chapterAudios = {
    1: document.getElementById('chapterAudio1'),
    2: document.getElementById('chapterAudio2'),
    3: document.getElementById('chapterAudio3'),
    4: document.getElementById('chapterAudio4')
};

// Song names for each chapter (you can customize these)
const songNames = {
    1: "Before We Began - Chapter 1",
    2: "When Silence Found a Voice - Chapter 2",
    3: "Choosing Us - Chapter 3",
    4: "Always - Chapter 4"
};

// Song file paths (you'll need to add your actual song files)
const songPaths = {
    1: "songs/chapter1.mp3.mpeg",
    2: "songs/chapter2.mp3.mpeg",
    3: "songs/chapter3.mp3.mpeg",
    4: "songs/chapter4.mp3.mpeg"
};

// Set audio sources
Object.keys(chapterAudios).forEach(chapter => {
    chapterAudios[chapter].src = songPaths[chapter];
    chapterAudios[chapter].volume = 0.4;
});

let musicEnabled = false;
let currentChapter = null;

// Toggle music on/off
musicToggle.addEventListener('click', () => {
    musicEnabled = !musicEnabled;

    if (musicEnabled) {
        musicToggle.classList.add('playing');
        // Play the current chapter's music if we're in a chapter
        if (currentChapter) {
            playChapterMusic(currentChapter);
        }
    } else {
        musicToggle.classList.remove('playing');
        // Stop all music
        Object.values(chapterAudios).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        hideMusicInfo();
    }
});

// Function to play chapter music
function playChapterMusic(chapterNum) {
    if (!musicEnabled) return;

    // Pause all other chapters
    Object.keys(chapterAudios).forEach(chapter => {
        if (parseInt(chapter) !== chapterNum) {
            chapterAudios[chapter].pause();
            chapterAudios[chapter].currentTime = 0;
        }
    });

    // Play the current chapter's music
    const audio = chapterAudios[chapterNum];
    if (audio && audio.src) {
        audio.play().catch(err => {
            console.log('Audio playback failed:', err);
        });

        // Update music info display
        currentSongName.textContent = songNames[chapterNum];
        showMusicInfo();
    }
}

// Function to show music info
function showMusicInfo() {
    musicInfo.classList.add('visible');
}

// Function to hide music info
function hideMusicInfo() {
    musicInfo.classList.remove('visible');
}

// Enhanced chapter observer to detect which chapter is in view
const chapterMusicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chapterNum = parseInt(entry.target.dataset.chapter);
            if (chapterNum && currentChapter !== chapterNum) {
                currentChapter = chapterNum;
                playChapterMusic(chapterNum);
            }
        }
    });
}, {
    threshold: 0.5,  // Trigger when 50% of chapter is visible
    rootMargin: '0px'
});

// Observe all chapters for music changes
chapters.forEach(chapter => {
    if (chapter.dataset.chapter) {
        chapterMusicObserver.observe(chapter);
    }
});


// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// RESIZE HANDLERS
// ===================================
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});
