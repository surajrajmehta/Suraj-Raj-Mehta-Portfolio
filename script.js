// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Typing Effect for Hero Section
const typedTextSpan = document.getElementById("typed-text");
const textArray = ["Cyber Security", "Software Development", "Cyber Security & Software Development"];
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Mobile Navigation Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if(mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        const currentStyle = window.getComputedStyle(navLinks).display;
        if (currentStyle === 'none') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(7, 9, 15, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.background = '';
            navLinks.style.borderBottom = '';
        }
    });
}

// ----------------------------------------------------
// Matrix Rain Canvas Effect
// ----------------------------------------------------
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cyber/Hacker characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const letters = chars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Translucent dark background to create trail effect
    ctx.fillStyle = 'rgba(7, 9, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Classic Neon Green
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    drops.length = 0;
    for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
    }
});

// Initialize Animate On Scroll
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// Certificate Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    let currentSlideIndex = 0;

    function updateSlidePosition() {
        track.style.transform = 'translateX(-' + currentSlideIndex * 100 + '%)';
    }

    nextButton.addEventListener('click', () => {
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        updateSlidePosition();
    });
}

// Custom Cursor Animation
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 300, fill: "forwards" });
    }
});

// Interactive hover effects for the custom cursor
const interactables = document.querySelectorAll('a, button, .mobile-menu-btn, .carousel-btn');
interactables.forEach(interactive => {
    interactive.addEventListener('mouseenter', () => {
        if(cursorOutline) {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.6)";
            cursorOutline.style.backgroundColor = "rgba(0, 243, 255, 0.1)";
            cursorOutline.style.borderColor = "var(--primary)";
        }
    });
    interactive.addEventListener('mouseleave', () => {
        if(cursorOutline) {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.backgroundColor = "transparent";
            cursorOutline.style.borderColor = "var(--secondary)";
        }
    });
});
