document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. 3D Tilt Effect for Message Card --- */
    const card = document.querySelector('.tilt-card');

    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation. Adjust divisor to change tilt intensity.
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Add smooth transition for reset
            card.style.transition = 'transform 0.5s ease-out';
        });

        card.addEventListener('mouseenter', () => {
            // Remove transition during mousemove for instant feedback
            card.style.transition = 'none';
        });
    }

    /* --- 2. Floating Emojis / Stickers --- */
    const emojis = ['❤️', '✨', '💖', '🎉', '🌹', '😍', '🎂', '🦋', '💐'];
    const emojiContainer = document.getElementById('floating-emojis');

    function createEmoji() {
        const emojiEl = document.createElement('div');
        emojiEl.classList.add('floating-emoji');
        
        // Randomly select emoji
        emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random horizontal position
        emojiEl.style.left = `${Math.random() * 100}vw`;
        
        // Random size
        const size = Math.random() * 1.5 + 1; // Between 1rem and 2.5rem
        emojiEl.style.fontSize = `${size}rem`;
        
        // Random animation duration between 6s and 12s
        const duration = Math.random() * 6 + 6;
        emojiEl.style.animationDuration = `${duration}s`;

        emojiContainer.appendChild(emojiEl);

        // Remove element after animation finishes
        setTimeout(() => {
            emojiEl.remove();
        }, duration * 1000);
    }

    // Create a new emoji every 800ms
    setInterval(createEmoji, 800);
});
