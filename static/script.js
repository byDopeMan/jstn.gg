let musicPlaying = false;

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
        icon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>';
        musicPlaying = false;
    } else {
        video.muted = false;
        icon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>';
        musicPlaying = true;
    }
}

function copyDiscord() {
    navigator.clipboard.writeText('{{ user.username }}').then(() => {
        showToast('Discord username copied!');
    });
}

function openDiscordProfile() {
    copyDiscord();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function updateSpotifyProgress() {
    // Note: This function contains template variables that need to be handled by your backend
    // You'll need to pass these values from your template to JavaScript variables
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

    // Konami code easter egg
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konami.join(',')) {
            showToast('🎉 Easter egg found! You are awesome!');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
        }
    });
});

// Function to initialize Spotify data (call this from your template)
function initializeSpotifyData(startTime, endTime, username) {
    window.spotifyStartTime = startTime;
    window.spotifyEndTime = endTime;
    window.discordUsername = username;
}

// Updated copyDiscord function that uses the global variable
function copyDiscord() {
    const username = window.discordUsername || 'Unknown';
    navigator.clipboard.writeText(username).then(() => {
        showToast('Discord username copied!');
    });
}