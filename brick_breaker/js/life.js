function createLifeUpEffect(x, y) {
    // Create flying heart
    const heart = document.createElement('div');
    heart.className = 'life-heart';
    heart.innerHTML = '♥';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    
    // Create sparkles
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position around the hit point
        const angle = Math.random() * Math.PI * 2;
        const distance = 5 + Math.random() * 15;
        const sparkleX = x + Math.cos(angle) * distance;
        const sparkleY = y + Math.sin(angle) * distance;
        
        sparkle.style.left = `${sparkleX}px`;
        sparkle.style.top = `${sparkleY}px`;
        
        // Random animation duration
        const duration = 0.5 + Math.random() * 0.5;
        sparkle.style.animation = `sparkle-fade ${duration}s ease-out forwards`;
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation completes
        setTimeout(() => {
            document.body.removeChild(sparkle);
        }, duration * 1000);
    }
    
    // Remove heart after animation completes
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}


export function OnBallHitBrick(brick) {
    
        // Get brick position
        const rect = brick.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Add hit class to trigger animation
        brick.classList.add('hit');
        
        // Create flying heart effect
        createLifeUpEffect(centerX, centerY);
        
        // Increase lives
        let livesElement = document.getElementById("lives");
        let remainingLives = parseInt(livesElement.textContent);
        remainingLives+=1;
        livesElement.textContent=remainingLives;
         
}