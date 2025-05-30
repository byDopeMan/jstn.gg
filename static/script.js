let musicPlaying = true;

function startExperience() {
    const preview = document.getElementById('videoPreview');
    const video = document.getElementById('backgroundVideo');

    if (video) {
        video.volume = 0.15;
    }
    
    preview.style.opacity = '0';
    preview.style.pointerEvents = 'none';
    
    video.classList.add('unblurred');
    video.muted = false;
    video.play().catch(e => console.log('Video play failed:', e));
    
    setTimeout(() => {
        preview.style.display = 'none';
    }, 800);

    setTimeout(() => {
        typeWriterEffect();
    }, 1000);
}

function typeWriterEffect() {
    const element = document.getElementById('displayName');
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid rgba(255,255,255,0.7)';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    type();
}

function toggleMusic() {
    const video = document.getElementById('backgroundVideo');
    const icon = document.getElementById('musicIcon');
    
    if (musicPlaying) {
        video.muted = true;
        icon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>';
        musicPlaying = false;
    } else {
        video.muted = false;
        icon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>';
        musicPlaying = true;
    }
}

function copyDiscord() {
    const username = window.discordUsername || 'Unknown';
    navigator.clipboard.writeText(username).then(() => {
        showToast('Discord username copied!');
    });
}

function openDiscordProfile() {
    copyDiscord();
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
    // Change toast color based on type
    if (type === 'rainbow') {
        toast.style.cssText = `
            background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
            background-size: 400% 400%;
            animation: rainbow-move 2s ease infinite;
            color: white;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        `;
    } else if (type === 'matrix') {
        toast.style.cssText = `
            background: rgba(0, 255, 0, 0.95);
            color: #000;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            text-shadow: 0 0 10px #00ff00;
            border: 2px solid #00ff00;
        `;
    } else if (type === 'glitch') {
        toast.style.cssText = `
            background: rgba(255, 0, 100, 0.9);
            color: #fff;
            font-family: 'Courier New', monospace;
            animation: glitch-toast 0.5s infinite;
            text-shadow: 2px 0 #ff0000, -2px 0 #00ffff;
        `;
    } else {
        toast.style.cssText = `
            background: rgba(35, 165, 90, 0.9);
            color: white;
        `;
    }
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.style.cssText = '';
    }, 3000);
}

function updateSpotifyProgress() {
    const startTime = window.spotifyStartTime || null;
    const endTime = window.spotifyEndTime || null;
    
    if (startTime && endTime) {
        const currentTime = Date.now();
        
        if (currentTime >= startTime && currentTime <= endTime) {
            const totalDuration = endTime - startTime;
            const elapsed = currentTime - startTime;
            const progress = (elapsed / totalDuration) * 100;
            
            const progressFill = document.getElementById('spotifyProgress');
            if (progressFill) {
                progressFill.style.width = Math.min(progress, 100) + '%';
            }
        }
    }
}

// Enhanced Easter Egg Functions
function triggerMatrixEffect() {
    const matrix = document.createElement('div');
    matrix.id = 'matrix-rain';
    matrix.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.9);
    `;
    document.body.appendChild(matrix);
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrix.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Random green shade for depth effect
            const greenValue = Math.floor(Math.random() * 256);
            ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
            
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 50);
    
    // Add sound effect simulation
    let audioContext;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 2);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
    } catch (e) {
        console.log('Audio context not available');
    }
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(matrix);
        showToast('Welcome to the Matrix, Neo! 🕶️', 'matrix');
    }, 6000);
}

function triggerRainbowMode() {
    // Add dynamic CSS keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg) saturate(1.5) brightness(1.2); }
            25% { filter: hue-rotate(90deg) saturate(2) brightness(1.3); }
            50% { filter: hue-rotate(180deg) saturate(1.8) brightness(1.1); }
            75% { filter: hue-rotate(270deg) saturate(2.2) brightness(1.4); }
            100% { filter: hue-rotate(360deg) saturate(1.5) brightness(1.2); }
        }
        @keyframes rainbow-border {
            0% { border-color: #ff0000; box-shadow: 0 0 20px #ff0000; }
            16% { border-color: #ff8000; box-shadow: 0 0 20px #ff8000; }
            33% { border-color: #ffff00; box-shadow: 0 0 20px #ffff00; }
            50% { border-color: #00ff00; box-shadow: 0 0 20px #00ff00; }
            66% { border-color: #0080ff; box-shadow: 0 0 20px #0080ff; }
            83% { border-color: #8000ff; box-shadow: 0 0 20px #8000ff; }
            100% { border-color: #ff0000; box-shadow: 0 0 20px #ff0000; }
        }
        @keyframes rainbow-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.style.animation = 'rainbow-bg 2s linear infinite';
    const cards = document.querySelectorAll('.profile-card, .discord-card, .tech-badge');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'rainbow-border 1.5s linear infinite';
            card.style.transform = 'scale(1.05)';
        }, index * 100);
    });
    
    // Create rainbow particles
    createRainbowParticles();
    
    showToast('🌈 RAINBOW POWER ACTIVATED! 🌈', 'rainbow');
    
    setTimeout(() => {
        document.body.style.animation = '';
        cards.forEach(card => {
            card.style.animation = '';
            card.style.transform = '';
        });
        document.head.removeChild(style);
    }, 12000);
}

function createRainbowParticles() {
    const colors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0080ff', '#8000ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 9998;
                animation: particle-float 3s ease-out forwards;
            `;
            
            const floatKeyframes = `
                @keyframes particle-float {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    100% { transform: translateY(-200px) scale(0); opacity: 0; }
                }
            `;
            
            if (!document.querySelector('#particle-styles')) {
                const particleStyle = document.createElement('style');
                particleStyle.id = 'particle-styles';
                particleStyle.textContent = floatKeyframes;
                document.head.appendChild(particleStyle);
            }
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }, i * 50);
    }
}

function triggerGravityMode() {
    const elements = document.querySelectorAll('.tech-badge, .social-link, .discord-badges .badge, .avatar');
    
    // Add physics styles
    const gravityStyle = document.createElement('style');
    gravityStyle.textContent = `
        .gravity-fall {
            transition: all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            z-index: 1000;
        }
    `;
    document.head.appendChild(gravityStyle);
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('gravity-fall');
            const rotation = (Math.random() - 0.5) * 1440; // Random rotation between -720 and 720
            const sideways = (Math.random() - 0.5) * 200; // Random horizontal movement
            
            el.style.transform = `translateY(${window.innerHeight + 100}px) translateX(${sideways}px) rotate(${rotation}deg)`;
            el.style.opacity = '0';
            
            // Add bounce effect for some elements
            if (Math.random() > 0.7) {
                setTimeout(() => {
                    el.style.transform = `translateY(${window.innerHeight - 50}px) translateX(${sideways}px) rotate(${rotation * 0.8}deg)`;
                }, 2500);
                setTimeout(() => {
                    el.style.transform = `translateY(${window.innerHeight + 100}px) translateX(${sideways}px) rotate(${rotation}deg)`;
                }, 2800);
            }
        }, index * 150);
    });
    
    showToast('🌍 GRAVITY BOMB! Everything is falling! 💥');
    
    setTimeout(() => {
        elements.forEach(el => {
            el.classList.remove('gravity-fall');
            el.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            el.style.transform = '';
            el.style.opacity = '';
        });
        
        setTimeout(() => {
            document.head.removeChild(gravityStyle);
        }, 1500);
    }, 6000);
}

function triggerGlitchMode() {
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0% { transform: translateX(0); }
            20% { transform: translateX(-2px) skew(-2deg); }
            40% { transform: translateX(2px) skew(2deg); }
            60% { transform: translateX(-1px) skew(1deg); }
            80% { transform: translateX(1px) skew(-1deg); }
            100% { transform: translateX(0); }
        }
        @keyframes glitch-bg {
            0% { background-color: rgba(255, 0, 0, 0.1); }
            25% { background-color: rgba(0, 255, 0, 0.1); }
            50% { background-color: rgba(0, 0, 255, 0.1); }
            75% { background-color: rgba(255, 255, 0, 0.1); }
            100% { background-color: rgba(255, 0, 255, 0.1); }
        }
        @keyframes glitch-toast {
            0% { transform: translateX(0) skew(0deg); }
            10% { transform: translateX(-2px) skew(-1deg); }
            20% { transform: translateX(2px) skew(1deg); }
            30% { transform: translateX(-1px) skew(0deg); }
            40% { transform: translateX(1px) skew(-1deg); }
            50% { transform: translateX(0) skew(1deg); }
            60% { transform: translateX(-2px) skew(0deg); }
            70% { transform: translateX(2px) skew(-1deg); }
            80% { transform: translateX(-1px) skew(1deg); }
            90% { transform: translateX(1px) skew(0deg); }
            100% { transform: translateX(0) skew(0deg); }
        }
    `;
    document.head.appendChild(glitchStyle);
    
    const glitchElements = document.querySelectorAll('.display-name, .discord-name, .tech-badge, .profile-card, .discord-card');
    
    glitchElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'glitch 0.1s infinite, glitch-bg 0.3s infinite';
            el.style.filter = 'contrast(120%) brightness(120%)';
            
            // Add random color shifts
            setTimeout(() => {
                el.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff, 0 2px #ffff00';
            }, 500);
        }, index * 100);
    });
    
    // Glitch the entire screen occasionally
    const screenGlitch = setInterval(() => {
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${100 + Math.random() * 50}%)`;
        setTimeout(() => {
            document.body.style.filter = '';
        }, 100);
    }, 800);
    
    showToast('⚡ SYSTEM GLITCH DETECTED ⚡', 'glitch');
    
    setTimeout(() => {
        clearInterval(screenGlitch);
        glitchElements.forEach(el => {
            el.style.animation = '';
            el.style.filter = '';
            el.style.textShadow = '';
        });
        document.body.style.filter = '';
        document.head.removeChild(glitchStyle);
    }, 8000);
}

function triggerSecretMessage() {
    const messages = [
        { text: "🕵️ Secret Agent Mode Activated!", effect: "spy" },
        { text: "🎮 Achievement Unlocked: Easter Egg Hunter!", effect: "achievement" },
        { text: "🧙‍♂️ You have discovered ancient magic!", effect: "magic" },
        { text: "🚀 Initiating launch sequence... 3... 2... 1...", effect: "rocket" },
        { text: "🎭 Welcome to the secret society!", effect: "mystery" },
        { text: "🔐 Access Level: MAXIMUM CLEARANCE", effect: "clearance" },
        { text: "⭐ You are now part of the elite!", effect: "elite" },
        { text: "🎯 Perfect! You found the hidden treasure!", effect: "treasure" }
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showToast(randomMessage.text, 'rainbow');
    
    // Different effects based on message type
    switch(randomMessage.effect) {
        case "spy":
            document.body.style.filter = 'sepia(1) contrast(1.2)';
            setTimeout(() => document.body.style.filter = '', 3000);
            break;
        case "magic":
            createMagicSparkles();
            break;
        case "rocket":
            launchRocketEffect();
            break;
        case "achievement":
            showAchievementPopup();
            break;
        default:
            createEnhancedSparkles();
    }
}

function createMagicSparkles() {
    const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🔮', '🪄'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: ${Math.random() * 30 + 15}px;
                pointer-events: none;
                z-index: 9999;
                animation: magic-sparkle 3s ease-out forwards;
                text-shadow: 0 0 10px gold;
            `;
            
            if (!document.querySelector('#magic-styles')) {
                const magicStyle = document.createElement('style');
                magicStyle.id = 'magic-styles';
                magicStyle.textContent = `
                    @keyframes magic-sparkle {
                        0% { transform: scale(0) rotate(0deg); opacity: 1; }
                        50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
                        100% { transform: scale(0) rotate(360deg); opacity: 0; }
                    }
                `;
                document.head.appendChild(magicStyle);
            }
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, i * 100);
    }
}

function launchRocketEffect() {
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.style.cssText = `
        position: fixed;
        left: 50%;
        bottom: -50px;
        font-size: 40px;
        pointer-events: none;
        z-index: 9999;
        animation: rocket-launch 4s ease-out forwards;
    `;
    
    const rocketStyle = document.createElement('style');
    rocketStyle.textContent = `
        @keyframes rocket-launch {
            0% { transform: translateX(-50%) translateY(0) rotate(0deg); }
            25% { transform: translateX(-50%) translateY(-200px) rotate(-10deg); }
            50% { transform: translateX(-50%) translateY(-400px) rotate(10deg); }
            75% { transform: translateX(-50%) translateY(-600px) rotate(-5deg); }
            100% { transform: translateX(-50%) translateY(-800px) rotate(0deg); opacity: 0; }
        }
    `;
    document.head.appendChild(rocketStyle);
    
    document.body.appendChild(rocket);
    
    // Add explosion effect at the end
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.innerHTML = '⭐';
            star.style.cssText = `
                position: fixed;
                left: 50%;
                top: 100px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
                animation: explosion-star 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            const angle = (i / 20) * 360;
            star.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 2000);
        }
    }, 3000);
    
    setTimeout(() => {
        if (rocket.parentNode) {
            rocket.parentNode.removeChild(rocket);
        }
        document.head.removeChild(rocketStyle);
    }, 4000);
}

function showAchievementPopup() {
    const achievement = document.createElement('div');
    achievement.style.cssText = `
        position: fixed;
        top: 20px;
        right: -400px;
        width: 350px;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: achievement-slide 4s ease-in-out forwards;
    `;
    
    achievement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 30px;">🏆</div>
            <div>
                <div style="font-size: 16px; margin-bottom: 5px;">Achievement Unlocked!</div>
                <div style="font-size: 14px; opacity: 0.9;">Easter Egg Hunter</div>
            </div>
        </div>
    `;
    
    const achievementStyle = document.createElement('style');
    achievementStyle.textContent = `
        @keyframes achievement-slide {
            0% { right: -400px; }
            20% { right: 20px; }
            80% { right: 20px; }
            100% { right: -400px; }
        }
    `;
    document.head.appendChild(achievementStyle);
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        if (achievement.parentNode) {
            achievement.parentNode.removeChild(achievement);
        }
        document.head.removeChild(achievementStyle);
    }, 4000);
}

function createEnhancedSparkles() {
    const effects = ['✨', '⭐', '🌟', '💫', '🎉', '🎊', '💎', '🔥'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = effects[Math.floor(Math.random() * effects.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: ${Math.random() * 25 + 15}px;
                pointer-events: none;
                z-index: 9999;
                animation: enhanced-sparkle 2.5s ease-out forwards;
            `;
            
            const sparkleStyle = document.createElement('style');
            sparkleStyle.textContent = `
                @keyframes enhanced-sparkle {
                    0% { transform: scale(0) rotate(0deg); opacity: 1; }
                    25% { transform: scale(1.5) rotate(90deg); opacity: 1; }
                    50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
                    75% { transform: scale(1.2) rotate(270deg); opacity: 0.6; }
                    100% { transform: scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            
            if (!document.querySelector('#enhanced-sparkle-styles')) {
                sparkleStyle.id = 'enhanced-sparkle-styles';
                document.head.appendChild(sparkleStyle);
            }
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2500);
        }, i * 100);
    }
}

function triggerDanceMode() {
    const danceStyle = document.createElement('style');
    danceStyle.textContent = `
        @keyframes dance {
            0% { transform: translateY(0) rotate(0deg) scale(1); }
            25% { transform: translateY(-10px) rotate(-5deg) scale(1.05); }
            50% { transform: translateY(0) rotate(5deg) scale(0.95); }
            75% { transform: translateY(-5px) rotate(-3deg) scale(1.02); }
            100% { transform: translateY(0) rotate(0deg) scale(1); }
        }
        @keyframes party-lights {
            0% { background-color: #ff0000; }
            16% { background-color: #ff8000; }
            33% { background-color: #ffff00; }
            50% { background-color: #00ff00; }
            66% { background-color: #0080ff; }
            83% { background-color: #8000ff; }
            100% { background-color: #ff0000; }
        }
    `;
    document.head.appendChild(danceStyle);
    
    const elements = document.querySelectorAll('.profile-card, .discord-card, .tech-badge, .social-link, .avatar');
    
    // Add party lights background
    const partyLights = document.createElement('div');
    partyLights.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        animation: party-lights 0.5s infinite;
        opacity: 0.1;
        pointer-events: none;
    `;
    document.body.appendChild(partyLights);
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'dance 0.8s ease-in-out infinite';
            el.style.animationDelay = `${Math.random() * 0.5}s`;
        }, index * 100);
    });
    
    // Add dancing emojis
    const dancers = ['💃', '🕺', '🎉', '🎊', '🪩'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const dancer = document.createElement('div');
            dancer.innerHTML = dancers[Math.floor(Math.random() * dancers.length)];
            dancer.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: ${Math.random() * 30 + 20}px;
                pointer-events: none;
                z-index: 9999;
                animation: dance 0.6s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            document.body.appendChild(dancer);
            
            setTimeout(() => {
                if (dancer.parentNode) {
                    dancer.parentNode.removeChild(dancer);
                }
            }, 10000);
        }, i * 200);
    }
    
    showToast('🎵 DANCE PARTY MODE! 🎵', 'rainbow');
    
    setTimeout(() => {
        elements.forEach(el => {
            el.style.animation = '';
            el.style.animationDelay = '';
        });
        if (partyLights.parentNode) {
            partyLights.parentNode.removeChild(partyLights);
        }
        document.head.removeChild(danceStyle);
    }, 10000);
}

// ULTIMATE KONAMI CODE EFFECT
function triggerUltimateKonamiMode() {
    showToast('🎮 KONAMI CODE ACTIVATED! ULTIMATE MODE! 🎮', 'rainbow');
    
    // Combine multiple effects in sequence
    setTimeout(() => triggerRainbowMode(), 500);
    setTimeout(() => triggerMatrixEffect(), 2000);
    setTimeout(() => createFireworks(), 4000);
    setTimeout(() => triggerGlitchMode(), 6000);
    setTimeout(() => triggerDanceMode(), 8000);
    
    // Add ultimate screen shake
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes ultimate-shake {
            0% { transform: translateX(0) translateY(0) rotate(0deg); }
            10% { transform: translateX(-5px) translateY(-5px) rotate(-1deg); }
            20% { transform: translateX(5px) translateY(-5px) rotate(1deg); }
            30% { transform: translateX(-5px) translateY(5px) rotate(-1deg); }
            40% { transform: translateX(5px) translateY(5px) rotate(1deg); }
            50% { transform: translateX(-3px) translateY(-3px) rotate(-0.5deg); }
            60% { transform: translateX(3px) translateY(-3px) rotate(0.5deg); }
            70% { transform: translateX(-3px) translateY(3px) rotate(-0.5deg); }
            80% { transform: translateX(3px) translateY(3px) rotate(0.5deg); }
            90% { transform: translateX(-1px) translateY(-1px) rotate(0deg); }
            100% { transform: translateX(0) translateY(0) rotate(0deg); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    document.body.style.animation = 'ultimate-shake 0.5s infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
        document.head.removeChild(shakeStyle);
    }, 15000);
}

function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight * 0.6) + 50;
            
            // Create explosion
            for (let j = 0; j < 20; j++) {
                const spark = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                spark.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    width: 4px;
                    height: 4px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                `;
                
                const angle = (j / 20) * Math.PI * 2;
                const velocity = Math.random() * 100 + 50;
                const gravity = 0.5;
                let posX = centerX;
                let posY = centerY;
                let velX = Math.cos(angle) * velocity;
                let velY = Math.sin(angle) * velocity;
                
                document.body.appendChild(spark);
                
                const animate = () => {
                    posX += velX * 0.02;
                    posY += velY * 0.02;
                    velY += gravity;
                    velX *= 0.99;
                    velY *= 0.99;
                    
                    spark.style.left = posX + 'px';
                    spark.style.top = posY + 'px';
                    spark.style.opacity = Math.max(0, parseFloat(spark.style.opacity || 1) - 0.02);
                    
                    if (parseFloat(spark.style.opacity || 1) > 0 && posY < window.innerHeight) {
                        requestAnimationFrame(animate);
                    } else {
                        if (spark.parentNode) {
                            spark.parentNode.removeChild(spark);
                        }
                    }
                };
                
                spark.style.opacity = '1';
                requestAnimationFrame(animate);
            }
        }, i * 800);
    }
}

// AVATAR TRANSFORMATION EFFECT
function triggerAvatarTransformation() {
    const avatar = document.querySelector('.avatar');
    if (!avatar) return;
    
    showToast('🔮 Avatar Transformation Activated! 🔮', 'matrix');
    
    const transformStyle = document.createElement('style');
    transformStyle.textContent = `
        @keyframes avatar-transform {
            0% { transform: scale(1) rotate(0deg); filter: hue-rotate(0deg); }
            25% { transform: scale(1.2) rotate(90deg); filter: hue-rotate(90deg) brightness(1.5); }
            50% { transform: scale(0.8) rotate(180deg); filter: hue-rotate(180deg) contrast(2); }
            75% { transform: scale(1.1) rotate(270deg); filter: hue-rotate(270deg) saturate(2); }
            100% { transform: scale(1) rotate(360deg); filter: hue-rotate(360deg); }
        }
        @keyframes avatar-glow {
            0% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
            50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6); }
            100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
        }
    `;
    document.head.appendChild(transformStyle);
    
    avatar.style.animation = 'avatar-transform 3s ease-in-out, avatar-glow 1s ease-in-out infinite';
    
    // Add energy particles around avatar
    const avatarRect = avatar.getBoundingClientRect();
    const centerX = avatarRect.left + avatarRect.width / 2;
    const centerY = avatarRect.top + avatarRect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = ['⚡', '✨', '🔥', '💫'][Math.floor(Math.random() * 4)];
            particle.style.cssText = `
                position: fixed;
                left: ${centerX + (Math.random() - 0.5) * 200}px;
                top: ${centerY + (Math.random() - 0.5) * 200}px;
                font-size: ${Math.random() * 20 + 10}px;
                pointer-events: none;
                z-index: 9999;
                animation: orbit-avatar 2s linear infinite;
            `;
            
            const orbitStyle = document.createElement('style');
            orbitStyle.textContent = `
                @keyframes orbit-avatar {
                    from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
                }
            `;
            
            if (!document.querySelector('#orbit-styles')) {
                orbitStyle.id = 'orbit-styles';
                document.head.appendChild(orbitStyle);
            }
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 6000);
        }, i * 100);
    }
    
    setTimeout(() => {
        avatar.style.animation = '';
        document.head.removeChild(transformStyle);
    }, 6000);
}

// SCREEN WARP EFFECT
function triggerScreenWarp() {
    showToast('🌀 Reality is bending... 🌀', 'glitch');
    
    const warpStyle = document.createElement('style');
    warpStyle.textContent = `
        @keyframes screen-warp {
            0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
            25% { transform: perspective(1000px) rotateX(5deg) rotateY(5deg) scale(0.95); }
            50% { transform: perspective(1000px) rotateX(-5deg) rotateY(-5deg) scale(1.05); }
            75% { transform: perspective(1000px) rotateX(3deg) rotateY(-3deg) scale(0.98); }
            100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1); }
        }
        @keyframes warp-distortion {
            0% { filter: blur(0px) contrast(1); }
            50% { filter: blur(2px) contrast(1.2) hue-rotate(180deg); }
            100% { filter: blur(0px) contrast(1); }
        }
    `;
    document.head.appendChild(warpStyle);
    
    document.body.style.animation = 'screen-warp 3s ease-in-out, warp-distortion 2s ease-in-out';
    
    setTimeout(() => {
        document.body.style.animation = '';
        document.head.removeChild(warpStyle);
    }, 6000);
}

// TYPING CHAOS MODE
function triggerTypingChaos() {
    const textElements = document.querySelectorAll('.display-name, .discord-name, .tech-badge, h1, h2, h3, p, span');
    
    showToast('⌨️ TYPING CHAOS ACTIVATED! ⌨️', 'glitch');
    
    const originalTexts = [];
    const chaosChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    textElements.forEach((el, index) => {
        originalTexts[index] = el.textContent;
        
        let iterations = 0;
        const maxIterations = 20;
        
        const chaosInterval = setInterval(() => {
            let chaosText = '';
            for (let i = 0; i < originalTexts[index].length; i++) {
                if (iterations > i) {
                    chaosText += originalTexts[index][i];
                } else {
                    chaosText += chaosChars[Math.floor(Math.random() * chaosChars.length)];
                }
            }
            el.textContent = chaosText;
            iterations++;
            
            if (iterations > maxIterations) {
                clearInterval(chaosInterval);
                el.textContent = originalTexts[index];
            }
        }, 50);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start progress updates
    setInterval(updateSpotifyProgress, 1000);
    updateSpotifyProgress();

    // Add hover effects to tech badges
    document.querySelectorAll('.tech-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-2px) scale(1.05)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ENHANCED EASTER EGGS

    // 1. ULTIMATE KONAMI CODE
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konami.join(',')) {
            triggerUltimateKonamiMode();
            konamiCode = []; // Reset
        }
    });

    // 2. AVATAR TRANSFORMATION (7 clicks)
    let avatarClicks = 0;
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', () => {
            avatarClicks++;
            
            // Visual feedback for each click
            avatar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 100);
            
            if (avatarClicks === 7) {
                triggerAvatarTransformation();
                avatarClicks = 0;
            }
            
            // Reset counter after 3 seconds
            setTimeout(() => {
                if (avatarClicks < 7) avatarClicks = 0;
            }, 3000);
        });
    }

    // 3. ENHANCED SECRET WORD TYPING
    let typedString = '';
    const secretCodes = {
        'matrix': triggerMatrixEffect,
        'rainbow': triggerRainbowMode,
        'gravity': triggerGravityMode,
        'glitch': triggerGlitchMode,
        'dance': triggerDanceMode,
        'secret': triggerSecretMessage,
        'sparkle': createEnhancedSparkles,
        'fireworks': createFireworks,
        'warp': triggerScreenWarp,
        'chaos': triggerTypingChaos,
        'magic': createMagicSparkles,
        'ultimate': triggerUltimateKonamiMode
    };

    document.addEventListener('keypress', (e) => {
        typedString += e.key.toLowerCase();
        
        // Keep only last 15 characters
        if (typedString.length > 15) {
            typedString = typedString.slice(-15);
        }
        
        // Check for secret codes
        Object.keys(secretCodes).forEach(code => {
            if (typedString.includes(code)) {
                secretCodes[code]();
                typedString = ''; // Reset
                
                // Show which code was activated
                setTimeout(() => {
                    showToast(`🎯 "${code.toUpperCase()}" activated!`, 'rainbow');
                }, 500);
            }
        });
    });

    // 4. LONG HOVER ENHANCED
    const displayName = document.getElementById('displayName');
    let hoverTimer;
    if (displayName) {
        displayName.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                triggerSecretMessage();
                
                // Add pulsing effect during hover
                displayName.style.animation = 'pulse 0.5s ease-in-out infinite alternate';
            }, 3000); // Reduced to 3 seconds
        });
        
        displayName.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            displayName.style.animation = '';
        });
    }

    // 5. MUSIC BUTTON RAPID CLICKS ENHANCED
    let musicClickCount = 0;
    let musicClickTimer;
    const musicControl = document.getElementById('musicControl');
    if (musicControl) {
        musicControl.addEventListener('click', () => {
            musicClickCount++;
            
            // Visual feedback
            musicControl.style.transform = 'scale(0.9) rotate(30deg)';
            setTimeout(() => {
                musicControl.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
            
            if (musicClickCount === 10) {
                triggerDanceMode();
                showToast('🎵 DJ MODE ACTIVATED! 🎵', 'rainbow');
                musicClickCount = 0;
            }
            
            // Reset counter after 2 seconds
            clearTimeout(musicClickTimer);
            musicClickTimer = setTimeout(() => {
                musicClickCount = 0;
            }, 2000);
        });
    }

    // 6. ENHANCED SCROLL PATTERNS
    let scrollPattern = [];
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(currentScrollTop - lastScrollTop) > 10) { // Minimum scroll distance
            if (currentScrollTop > lastScrollTop) {
                scrollPattern.push('down');
            } else if (currentScrollTop < lastScrollTop) {
                scrollPattern.push('up');
            }
            
            // Keep only last 8 scroll directions
            if (scrollPattern.length > 8) {
                scrollPattern.shift();
            }
            
            // Check for different patterns
            const patternString = scrollPattern.join(',');
            
            if (patternString === 'up,down,up,down,up,down') {
                triggerGlitchMode();
                scrollPattern = [];
            } else if (patternString === 'down,down,up,up,down,up') {
                triggerScreenWarp();
                scrollPattern = [];
            } else if (patternString.includes('up,up,up,up')) {
                createFireworks();
                scrollPattern = [];
            }
            
            lastScrollTop = currentScrollTop;
        }
    });

    // 7. TAB VISIBILITY ENHANCED
    let tabChangeCount = 0;
    let awayTime;
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            awayTime = Date.now();
            tabChangeCount++;
        } else {
            const timeAway = Date.now() - (awayTime || Date.now());
            
            if (timeAway > 10000) { // Away for more than 10 seconds
                showToast('👋 Welcome back! I missed you! 💙');
                createEnhancedSparkles();
            } else if (tabChangeCount >= 3) {
                showToast('🤔 Stop switching tabs and enjoy the show! 😄');
                triggerDanceMode();
                tabChangeCount = 0;
            }
        }
    });

    // 8. TIME-BASED ENHANCED SURPRISES
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 13:37 = leet time
    if (hour === 13 && minute === 37) {
        setTimeout(() => {
            showToast('🔥 1337 H4X0R TIME! 🔥', 'matrix');
            triggerMatrixEffect();
        }, 1000);
    }
    
    // Midnight magic
    if (hour === 0 && minute === 0) {
        setTimeout(() => {
            showToast('🌙 Midnight Magic Hour! ✨', 'rainbow');
            createMagicSparkles();
        }, 2000);
    }

    // 9. ENHANCED DATE-BASED SURPRISES
    const month = now.getMonth();
    const day = now.getDate();
    
    // Halloween (October 31st)
    if (month === 9 && day === 31) {
        setTimeout(() => {
            showToast('🎃 Happy Halloween! Spooky mode activated! 👻', 'glitch');
            document.body.style.filter = 'sepia(1) hue-rotate(45deg) contrast(1.2)';
            triggerGlitchMode();
        }, 3000);
    }
    
    // Christmas (December 25th)
    if (month === 11 && day === 25) {
        setTimeout(() => {
            showToast('🎄 Merry Christmas! Ho ho ho! 🎅', 'rainbow');
            createFireworks();
            triggerRainbowMode();
        }, 2000);
    }
    
    // New Year (January 1st)
    if (month === 0 && day === 1) {
        setTimeout(() => {
            showToast('🎊 Happy New Year! 🎉', 'rainbow');
            createFireworks();
            setTimeout(() => triggerUltimateKonamiMode(), 2000);
        }, 1000);
    }

    // BONUS: Double-click anywhere for random effect
    let clickCount = 0;
    let clickTimer;
    
    document.addEventListener('click', (e) => {
        clickCount++;
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            if (clickCount >= 5) {
                const randomEffects = [
                    triggerRainbowMode,
                    triggerGlitchMode,
                    createFireworks,
                    triggerDanceMode,
                    createMagicSparkles,
                    triggerScreenWarp
                ];
                
                const randomEffect = randomEffects[Math.floor(Math.random() * randomEffects.length)];
                randomEffect();
                showToast('🎲 Random effect activated! 🎲', 'rainbow');
            }
            clickCount = 0;
        }, 1000);
    });

    // BONUS: Mouse position tracking for special zones
    let mouseIdleTimer;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(mouseIdleTimer);
        
        // Corner magic zones
        const cornerSize = 50;
        const isInCorner = (
            (e.clientX < cornerSize && e.clientY < cornerSize) || // Top-left
            (e.clientX > window.innerWidth - cornerSize && e.clientY < cornerSize) || // Top-right
            (e.clientX < cornerSize && e.clientY > window.innerHeight - cornerSize) || // Bottom-left
            (e.clientX > window.innerWidth - cornerSize && e.clientY > window.innerHeight - cornerSize) // Bottom-right
        );
        
        if (isInCorner) {
            mouseIdleTimer = setTimeout(() => {
                showToast('🧙‍♂️ You found a magic corner! ✨');
                createMagicSparkles();
            }, 2000);
        }
    });
});

// Function to initialize Spotify data (call this from your template)
function initializeSpotifyData(startTime, endTime, username) {
    window.spotifyStartTime = startTime;
    window.spotifyEndTime = endTime;
    window.discordUsername = username;
}