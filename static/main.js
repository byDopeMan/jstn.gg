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

function initializeSpotifyData(startTime, endTime, username) {
    window.spotifyStartTime = startTime;
    window.spotifyEndTime = endTime;
    window.discordUsername = username;
}

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
});