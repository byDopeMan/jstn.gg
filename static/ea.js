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
            
            setTimeout(() => {
                el.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff, 0 2px #ffff00';
            }, 500);
        }, index * 100);
    });
    
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

function triggerGravityMode() {
    const elements = document.querySelectorAll('.tech-badge, .social-link, .discord-badges .badge, .avatar');
    
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
            const rotation = (Math.random() - 0.5) * 1440; 
            const sideways = (Math.random() - 0.5) * 200; 
            
            el.style.transform = `translateY(${window.innerHeight + 100}px) translateX(${sideways}px) rotate(${rotation}deg)`;
            el.style.opacity = '0';
            
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

function triggerWeedMode() {
    showToast('🌿 HOTBOX MODE ACTIVATED! 420 BLAZEIT! 🚬', 'matrix');
    
    const hotbox = document.createElement('div');
    hotbox.id = 'hotbox-overlay';
    hotbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        background: radial-gradient(circle at center, 
            rgba(200, 255, 200, 0.1) 0%,
            rgba(150, 255, 150, 0.2) 20%,
            rgba(100, 200, 100, 0.3) 40%,
            rgba(80, 150, 80, 0.4) 60%,
            rgba(60, 100, 60, 0.5) 80%,
            rgba(40, 80, 40, 0.7) 100%
        );
        animation: hotbox-pulse 3s ease-in-out infinite;
    `;
    
    const hotboxStyle = document.createElement('style');
    hotboxStyle.textContent = `
        @keyframes hotbox-pulse {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
            100% { opacity: 0.3; transform: scale(1); }
        }
        @keyframes smoke-drift {
            0% { transform: translateY(100px) translateX(0px) rotate(0deg) scale(0.5); opacity: 0; }
            10% { opacity: 0.8; }
            50% { transform: translateY(-50px) translateX(20px) rotate(180deg) scale(1.2); opacity: 0.6; }
            100% { transform: translateY(-200px) translateX(-30px) rotate(360deg) scale(2); opacity: 0; }
        }
        @keyframes weed-glow {
            0% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
            25% { filter: hue-rotate(90deg) saturate(1.5) brightness(1.2); }
            50% { filter: hue-rotate(180deg) saturate(2) brightness(0.9); }
            75% { filter: hue-rotate(270deg) saturate(1.3) brightness(1.1); }
            100% { filter: hue-rotate(360deg) saturate(1) brightness(1); }
        }
        @keyframes chill-float {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-5px) rotate(-1deg); }
            75% { transform: translateY(-15px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
    `;
    document.head.appendChild(hotboxStyle);
    document.body.appendChild(hotbox);
    
    document.body.style.animation = 'weed-glow 4s ease-in-out infinite';
    
    const floatElements = document.querySelectorAll('.profile-card, .discord-card, .tech-badge, .avatar');
    floatElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'chill-float 6s ease-in-out infinite';
            el.style.animationDelay = `${index * 0.5}s`;
        }, index * 200);
    });
    
    const smokeEmojis = ['💨', '☁️', '🌫️'];
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.innerHTML = smokeEmojis[Math.floor(Math.random() * smokeEmojis.length)];
            smoke.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                bottom: 0px;
                font-size: ${Math.random() * 40 + 20}px;
                pointer-events: none;
                z-index: 9998;
                animation: smoke-drift ${Math.random() * 3 + 4}s ease-out forwards;
                filter: blur(${Math.random() * 2}px);
            `;
            document.body.appendChild(smoke);
            
            setTimeout(() => {
                if (smoke.parentNode) {
                    smoke.parentNode.removeChild(smoke);
                }
            }, 7000);
        }, i * 200);
    }
    
    const weedEmojis = ['🌿', '🍃', '🌱'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const leaf = document.createElement('div');
            leaf.innerHTML = weedEmojis[Math.floor(Math.random() * weedEmojis.length)];
            leaf.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: -50px;
                font-size: ${Math.random() * 30 + 15}px;
                pointer-events: none;
                z-index: 9997;
                animation: leaf-fall ${Math.random() * 3 + 5}s linear forwards;
            `;
            
            const leafStyle = document.createElement('style');
            leafStyle.textContent = `
                @keyframes leaf-fall {
                    0% { transform: translateY(-50px) rotate(0deg); }
                    100% { transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg); }
                }
            `;
            
            if (!document.querySelector('#leaf-fall-styles')) {
                leafStyle.id = 'leaf-fall-styles';
                document.head.appendChild(leafStyle);
            }
            
            document.body.appendChild(leaf);
            
            setTimeout(() => {
                if (leaf.parentNode) {
                    leaf.parentNode.removeChild(leaf);
                }
            }, 8000);
        }, i * 300);
    }
    
    
    const textElements = document.querySelectorAll('.display-name, .discord-name, h1, h2, h3');
    textElements.forEach(el => {
        el.style.textShadow = '0 0 10px #00ff00, 0 0 20px #90EE90, 0 0 30px #32CD32';
        el.style.animation = 'weed-glow 3s ease-in-out infinite';
    });
    
    setTimeout(() => {
        document.body.style.animation = '';
        floatElements.forEach(el => {
            el.style.animation = '';
        });
        textElements.forEach(el => {
            el.style.textShadow = '';
            el.style.animation = '';
        });
        
        if (hotbox.parentNode) {
            hotbox.parentNode.removeChild(hotbox);
        }
        if (musicBars.parentNode) {
            musicBars.parentNode.removeChild(musicBars);
        }
        
        document.head.removeChild(hotboxStyle);
        document.head.removeChild(musicBarStyle);
        
        showToast('😎 Chill session ended... come back anytime! 🌿');
    }, 15000);
}

function triggerUltimateKonamiMode() {
    showToast('🎮 KONAMI CODE ACTIVATED! ULTIMATE MODE! 🎮', 'rainbow');
    
    setTimeout(() => triggerRainbowMode(), 500);
    setTimeout(() => triggerMatrixEffect(), 2000);
    setTimeout(() => createFireworks(), 4000);
    setTimeout(() => triggerGlitchMode(), 6000);
    setTimeout(() => triggerDanceMode(), 8000);
    
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

function triggerTypingChaos() {
    const textElements = document.querySelectorAll('.display-name, .discord-name, .tech-badge, h1, h2, h3, p, span');
    
    showToast('⌨️ EXTENDED TYPING CHAOS ACTIVATED! ⌨️', 'glitch');
    
    const originalTexts = [];
    const chaosChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ';
    
    textElements.forEach((el, index) => {
        originalTexts[index] = el.textContent;
        
        let chaosPhase = 0;
        const totalPhases = 4;
        
        const runChaosPhase = () => {
            let iterations = 0;
            const maxIterations = chaosPhase === 0 ? 60 : 40; 
            const speed = chaosPhase === 0 ? 30 : 50; 
            
            const chaosInterval = setInterval(() => {
                let chaosText = '';
                for (let i = 0; i < originalTexts[index].length; i++) {
                    if (chaosPhase > 0 && iterations > i + (chaosPhase * 5)) {
                        chaosText += originalTexts[index][i];
                    } else {
                        chaosText += chaosChars[Math.floor(Math.random() * chaosChars.length)];
                    }
                }
                el.textContent = chaosText;
                iterations++;
                
                if (iterations > maxIterations) {
                    clearInterval(chaosInterval);
                    chaosPhase++;
                    
                    if (chaosPhase < totalPhases) {
                        setTimeout(() => runChaosPhase(), 200);
                    } else {
                        el.textContent = originalTexts[index];
                        
                        el.style.textShadow = '0 0 10px #00ff00, 0 0 20px #00ff00';
                        setTimeout(() => {
                            el.style.textShadow = '';
                        }, 1000);
                    }
                }
            }, speed);
        };
        
        setTimeout(() => runChaosPhase(), index * 100);
    });
}

function triggerCaseOpening() {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;
    
    const backgroundAudio = document.querySelector('audio[src*="background.mp4"], audio[src*="background"]');
    const originalVolume = backgroundAudio ? backgroundAudio.volume : 0.15;
    const reducedVolume = originalVolume * 0.3;
    
    if (backgroundAudio) {
        backgroundAudio.volume = reducedVolume;
    }
    
    const skins = [
        {
            name: "SSG 08 | Abyss",
            rarity: "restricted",
            color: "#4b69ff",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ssg08_aq_leviathan_light_large.0d0ce425b5374642d0d1fbfd0c0ec634eb8570fb.png",
            weight: 40
        },
        {
            name: "UMP-45 | Labyrinth",
            rarity: "restricted", 
            color: "#4b69ff",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ump45_hy_lines_orange_light_large.d004ea389236e6fa5da2f0555ab5b3723bdf36d1.png",
            weight: 40
        },
        {
            name: "Negev | Desert-Strike",
            rarity: "restricted",
            color: "#4b69ff",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_negev_cu_negev_titanstorm_light_large.eb7badc75ecbb1b4cdf35bfb53088731bbe11cb0.png",
            weight: 40
        },
        {
            name: "Nova | Koi",
            rarity: "classified",
            color: "#d32ce6",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_nova_cu_nova_koi_light_large.28c3fe03f736b48dee10e1e88e77ac02132dcba6.png",
            weight: 15
        },
        {
            name: "P250 | Supernova",
            rarity: "classified",
            color: "#d32ce6",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p250_cu_bittersweet_light_large.83cd48968d79412e0cf2233b8e18602ff2790ad4.png",
            weight: 15
        },
        {
            name: "Desert Eagle | Conspiracy",
            rarity: "covert",
            color: "#eb4b4b",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_deagle_cu_deagle_aureus_light_large.7fa76057cb05f2cab829be448f120ae540715d0e.png",
            weight: 4
        },
        {
            name: "M4A1-S | Cyrex",
            rarity: "covert",
            color: "#eb4b4b",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_cyrex_light_large.144b4053eb73b4a47f8128ebb0e808d8e28f5b9c.png",
            weight: 4
        },
        {
            name: "★ Butterfly Knife | Case Hardened",
            rarity: "knife",
            color: "#ffd700",
            image: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_butterfly_aq_oiled_light_large.d53e80b706e7d7fac9d22d265595ea1a959ea79b.png",
            weight: 1
        }
    ];
    
    showToast('📦 Opening CS:GO Case... 🎰', 'rainbow');
    
    // Hauptcontainer
    const caseContainer = document.createElement('div');
    caseContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        border-radius: inherit;
        z-index: 1000;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Arial', sans-serif;
    `;
    
    // CSS Styles
    const caseStyle = document.createElement('style');
    caseStyle.textContent = `
        .case-opening-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        #case-opening-container {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .case-spinner {
            height: 140px;
            width: 90%;
            max-width: 800px;
            position: relative;
            margin: 20px 0;
            border-radius: 8px;
            border: 2px solid #3c3759;
            background: transparent;
            overflow: hidden;
        }
        
        .case-spinner::before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, #d16266, #ff4444, #d16266);
            z-index: 100;
            box-shadow: 0 0 10px #d16266;
            transform: translateX(-50%);
        }
        
        .case-spinner-container {
            height: 100%;
            width: 999999px;
            display: flex;
            align-items: center;
            transition: transform 10s cubic-bezier(0.05, 0.4, 0.1, 1);
            transform: translateX(0px);
        }
        
        .case-item {
            width: 120px;
            height: 110px;
            margin: 0 8px;
            border-radius: 8px;
            border: 2px solid #70677c;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-color: #14202b;
            position: relative;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        
        .case-item.rarity-restricted {
            border-bottom: 4px solid #4b69ff;
            box-shadow: 0 0 15px rgba(75, 105, 255, 0.3);
        }
        
        .case-item.rarity-classified {
            border-bottom: 4px solid #d32ce6;
            box-shadow: 0 0 15px rgba(211, 44, 230, 0.3);
        }
        
        .case-item.rarity-covert {
            border-bottom: 4px solid #eb4b4b;
            box-shadow: 0 0 15px rgba(235, 75, 75, 0.3);
        }
        
        .case-item.rarity-knife {
            border-bottom: 4px solid #ffd700;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            background-image: 
                url('DEIN-KNIFE-URL'),
                linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
            background-blend-mode: overlay;
        }

        
        .case-item.winning-item {
            border: 3px solid #66b233;
            border-bottom: 4px solid #66b233;
            box-shadow: 0 0 25px rgba(102, 178, 51, 0.8);
            transform: scale(1.05);
        }
        
        .case-title {
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .case-result {
            color: #ffd700;
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            text-align: center;
            text-shadow: 0 0 10px #ffd700;
            opacity: 0;
            transition: opacity 1s ease;
        }
        
        .case-result.show {
            opacity: 1;
        }
        
        .knife-celebration {
            animation: knifeGlow 1s ease-in-out infinite;
        }
        
        .rolling-status {
            color: #ffffff;
            font-size: 18px;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
            margin-bottom: 15px;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(caseStyle);
    
    function getRandomFillerSkin() {
        const fillerSkins = skins.slice(0, 4);
        const totalWeight = fillerSkins.reduce((sum, skin) => sum + skin.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const skin of fillerSkins) {
            random -= skin.weight;
            if (random <= 0) return skin;
        }
        return fillerSkins[0];
    }
    
    const originalChildren = Array.from(profileCard.children);
    originalChildren.forEach(child => {
        child.dataset.originalDisplay = child.style.display || '';
        child.style.display = 'none';
    });

    const openingContainer = document.createElement('div');
    openingContainer.className = 'case-opening-container';
    
    const rollingStatus = document.createElement('div');
    rollingStatus.className = 'rolling-status';
    rollingStatus.textContent = 'Rolling...';
    
    const title = document.createElement('div');
    title.className = 'case-title';
    title.textContent = 'CS:GO Case Opening';
    
    const spinner = document.createElement('div');
    spinner.className = 'case-spinner';
    
    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'case-spinner-container';
    
    const spinnerRect = spinner.getBoundingClientRect ? { width: 800 } : { width: 800 }; // Fallback
    const pointerPosition = spinnerRect.width / 2; 
    
    const items = [];
    const winningIndex = 57;
    const knifeItem = skins[skins.length - 1];
    
    for (let i = 0; i < 120; i++) {
        let skin;
        if (i === winningIndex) {
            skin = knifeItem; 
        } else if (i >= winningIndex - 3 && i <= winningIndex + 3) {
            if (Math.random() < 0.3) {
                skin = skins[3];
            } else if (Math.random() < 0.5) {
                skin = skins[2];
            } else {
                skin = getRandomFillerSkin();
            }
        } else {
            skin = getRandomFillerSkin();
        }
        
        const item = document.createElement('div');
        item.className = `case-item rarity-${skin.rarity}`;
        item.style.backgroundImage = `url('${skin.image}')`;
        item.id = `item-${i}`;
        
        items.push({ element: item, skin: skin, index: i });
        spinnerContainer.appendChild(item);
    }
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'case-result';
    resultDiv.textContent = 'Rolling...';
    
    spinner.appendChild(spinnerContainer);
    openingContainer.appendChild(rollingStatus);
    openingContainer.appendChild(title);
    openingContainer.appendChild(spinner);
    openingContainer.appendChild(resultDiv);
    caseContainer.appendChild(openingContainer);
    
    profileCard.style.position = 'relative';
    profileCard.appendChild(caseContainer);
    
    const AUDIO_TRIGGER_OFFSET = 176; 
    const KNIFE_POSITION_OFFSET = -176; 
    
    setTimeout(() => {
        const itemWidth = 136; 
        
        const finalPosition = -(winningIndex * itemWidth) + (pointerPosition - 60) + KNIFE_POSITION_OFFSET;
        
        console.log(`🎯 CONFIG: Audio Offset: ${AUDIO_TRIGGER_OFFSET}px, Knife Offset: ${KNIFE_POSITION_OFFSET}px`);
        console.log(`Messer Index: ${winningIndex}, Item Width: ${itemWidth}, Pointer Position: ${pointerPosition}, Final Position: ${finalPosition}`);
        
        spinnerContainer.style.transform = `translateX(${finalPosition}px)`;
        showToast('🎰 Rolling for items... 🎯', 'matrix');
        
        window.animationStartTime = Date.now();
        startTickingSystem(finalPosition, pointerPosition, itemWidth, AUDIO_TRIGGER_OFFSET);
    }, 100);
    
    function startTickingSystem(finalPos, pointerPos, itemWidth, audioOffset = 0) {
        const animationDuration = 10000;
        const startPos = 0;
        
        const effectivePointerPos = pointerPos + audioOffset;
        
        let lastTriggerIndex = -1;
        
        console.log(`🔊 Audio-System: Pointer bei ${pointerPos}px, Effektive Position für Audio: ${effectivePointerPos}px`);
        
        const audioChecker = setInterval(() => {
            const elapsed = Date.now() - window.animationStartTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentPos = startPos + (finalPos - startPos) * easedProgress;
            
            const itemIndexAtPointer = Math.floor((effectivePointerPos - currentPos) / itemWidth);
            
            if (itemIndexAtPointer !== lastTriggerIndex && itemIndexAtPointer >= 0 && itemIndexAtPointer < 120) {
                const itemLeftEdge = currentPos + (itemIndexAtPointer * itemWidth);
                const itemRightEdge = itemLeftEdge + 120; 
                
                if (itemLeftEdge <= effectivePointerPos && effectivePointerPos <= itemRightEdge) {
                    lastTriggerIndex = itemIndexAtPointer;
                    
                    console.log(`🔊 Audio Trigger: Item ${itemIndexAtPointer} unter effektivem Pointer bei ${effectivePointerPos}px (Offset: ${audioOffset}px)`);
                    
                    try {
                        const tickSound = new Audio('/static/case_tick.wav');
                        tickSound.volume = 0.5;
                        tickSound.play().catch(e => console.log('Audio failed:', e));
                    } catch (e) {
                        console.log('Audio not available');
                    }
                }
            }
            
            if (progress >= 1) {
                clearInterval(audioChecker);
                console.log(`Animation finished. Final item should be: ${winningIndex} (${items[winningIndex].skin.name})`);
                
                const finalItemIndex = Math.floor((pointerPos - finalPos) / itemWidth);
                console.log(`✅ Validation: Item ${finalItemIndex} is actually under original pointer (${pointerPos}px)`);
                
                if (finalItemIndex === winningIndex) {
                    console.log('🎯 SUCCESS: Knife is correctly positioned!');
                } else {
                    console.log(`❌ ERROR: Expected item ${winningIndex}, but got ${finalItemIndex}`);
                    console.log(`💡 Try adjusting KNIFE_POSITION_OFFSET. Current: ${KNIFE_POSITION_OFFSET}px`);
                }
            }
        }, 25);
    }
    
    setTimeout(() => {
        const winningItem = document.getElementById(`item-${winningIndex}`);
        const knifeDropAudio = new Audio('/static/case_opened.wav');
        
        if (winningItem) {
            winningItem.classList.add('winning-item');
            winningItem.classList.add('knife-celebration');

            knifeDropAudio.volume = 0.8;
            knifeDropAudio.play().catch(e => console.warn('Knife drop audio error:', e));

            rollingStatus.textContent = '★ KNIFE DROPPED! ★';
            rollingStatus.style.color = '#ffd700';
            rollingStatus.style.textShadow = '0 0 15px #ffd700';
            
            resultDiv.textContent = `★ ${knifeItem.name} ★`;
            resultDiv.classList.add('show');
            
            caseContainer.style.background = `
                radial-gradient(circle at center, 
                    rgba(255, 215, 0, 0.2) 0%, 
                    rgba(255, 215, 0, 0.05) 0%, 
                    #0c0c1a 70%)
            `;
            
            showToast('🔥 ★ KNIFE UNBOXED! ★ 🔥', 'rainbow');
            
            if (typeof createFireworks === 'function') createFireworks();
            if (typeof createMagicSparkles === 'function') createMagicSparkles();
        }
        setTimeout(() => {
            originalChildren.forEach(child => {
                child.style.display = child.dataset.originalDisplay || '';
                delete child.dataset.originalDisplay;
            });
        }, 5770);

    }, 10500);
    
    // Cleanup
    setTimeout(() => {
        caseContainer.style.transition = 'opacity 2s ease-out';
        caseContainer.style.opacity = '0';
        
        if (backgroundAudio) {
            const volumeInterval = setInterval(() => {
                if (backgroundAudio.volume < originalVolume) {
                    backgroundAudio.volume = Math.min(backgroundAudio.volume + 0.01, originalVolume);
                } else {
                    backgroundAudio.volume = originalVolume;
                    clearInterval(volumeInterval);
                }
            }, 50);
        }
        
        setTimeout(() => {
            if (caseContainer.parentNode) {
                caseContainer.parentNode.removeChild(caseContainer);
            }
            if (caseStyle.parentNode) {
                caseStyle.parentNode.removeChild(caseStyle);
            }
            profileCard.style.position = '';
            showToast('🎉 Case opening completed! GG! 🎉');
        }, 2000);
    }, 14000);
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

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
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

function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight * 0.6) + 50;
            
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

document.addEventListener('DOMContentLoaded', function() {
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

    let avatarClicks = 0;
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', () => {
            avatarClicks++;
            
            avatar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 100);
            
            if (avatarClicks === 7) {
                triggerAvatarTransformation();
                avatarClicks = 0;
            }
            
            setTimeout(() => {
                if (avatarClicks < 7) avatarClicks = 0;
            }, 3000);
        });
    }

    let typedString = '';
    const secretCodes = {
        'rainbow': triggerRainbowMode,
        'gravity': triggerGravityMode,
        'glitch': triggerGlitchMode,
        'secret': triggerSecretMessage,
        'chaos': triggerTypingChaos,
        'magic': createMagicSparkles,
        'weed': triggerWeedMode,        
        '420': triggerWeedMode,         
        'case': triggerCaseOpening,
    };

    document.addEventListener('keypress', (e) => {
        typedString += e.key.toLowerCase();
        
        if (typedString.length > 15) {
            typedString = typedString.slice(-15);
        }
        
        Object.keys(secretCodes).forEach(code => {
            if (typedString.includes(code)) {
                secretCodes[code]();
                typedString = ''; // Reset
                
                setTimeout(() => {
                    showToast(`🎯 "${code.toUpperCase()}" activated!`, 'rainbow');
                }, 500);
            }
        });
    });

    let musicClickCount = 0;
    let musicClickTimer;
    const musicControl = document.getElementById('musicControl');
    if (musicControl) {
        musicControl.addEventListener('click', () => {
            musicClickCount++;
            
            musicControl.style.transform = 'scale(0.9) rotate(30deg)';
            setTimeout(() => {
                musicControl.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
            
            if (musicClickCount === 10) {
                triggerDanceMode();
                showToast('🎵 DJ MODE ACTIVATED! 🎵', 'rainbow');
                musicClickCount = 0;
            }
            
            clearTimeout(musicClickTimer);
            musicClickTimer = setTimeout(() => {
                musicClickCount = 0;
            }, 2000);
        });
    }
});
