var GeminiOS = {
    player: null,
    isPlaying: false,
    mode: 'player', // 'player' for video, 'web' for full website

    // প্লেয়ার ইনিশিয়ালাইজ করা
    initPlayer: function(elementId) {
        console.log("Initializing Gemini Player...");
        this.player = new YT.Player(elementId, {
            height: '100%',
            width: '100%',
            playerVars: { 
                'autoplay': 1, 
                'controls': 1, 
                'rel': 0, 
                'enablejsapi': 1,
                'origin': window.location.origin
            },
            events: {
                'onReady': () => { console.log("Player is Ready!"); },
                'onStateChange': (e) => { this.isPlaying = (e.data == 1); }
            }
        });
    },

    // পুরো ইউটিউব টিভি ওয়েবসাইট ওপেন করার জন্য
    openYouTubeTV: function() {
        this.mode = 'web';
        const overlay = document.getElementById('video-overlay');
        overlay.style.display = 'block';
        
        // প্লেয়ার কন্টেইনারে সরাসরি আইফ্রেম ঢুকিয়ে দিচ্ছি
        const container = document.getElementById('video-overlay');
        container.innerHTML = `<iframe id="tv-frame" src="https://www.youtube.com/tv#/" 
            allow="autoplay; encrypted-media; fullscreen" 
            style="width:100%; height:100%; border:none;"></iframe>`;
        console.log("Full YouTube TV Mode Activated.");
    },

    // রিমোট বা কিবোর্ড কমান্ড প্রসেস করা
    executeCommand: function(cmd) {
        console.log("Remote Command Received:", cmd);

        // ১. যদি ফুল ওয়েবসাইট (Web Mode) চলে
        if (this.mode === 'web') {
            if (cmd === 'Backspace' || cmd === 'Back' || cmd === 'Home') {
                location.reload(); // ওয়েব মোড থেকে ব্যাক করার সবচেয়ে সেফ উপায়
            }
            return;
        }

        // ২. যদি ভিডিও প্লেয়ার (Player Mode) চলে
        if (!this.player || typeof this.player.loadVideoById !== 'function') {
            console.warn("Player not ready yet!");
            return;
        }

        switch(cmd) {
            case 'Enter': 
                this.isPlaying ? this.player.pauseVideo() : this.player.playVideo();
                break;
            case 'ArrowRight': 
                this.player.seekTo(this.player.getCurrentTime() + 10);
                break;
            case 'ArrowLeft': 
                this.player.seekTo(this.player.getCurrentTime() - 10);
                break;
            case 'ArrowUp': 
                this.player.setVolume(this.player.getVolume() + 10);
                break;
            case 'ArrowDown': 
                this.player.setVolume(this.player.getVolume() - 10);
                break;
            case 'Backspace': 
            case 'Back':
                document.getElementById('video-overlay').style.display = 'none';
                this.player.stopVideo();
                break;
        }
    },

    loadVideo: function(videoId) {
        this.mode = 'player';
        if (this.player && typeof this.player.loadVideoById === 'function') {
            document.getElementById('video-overlay').style.display = 'block';
            this.player.loadVideoById(videoId);
        } else {
            console.error("YouTube API loading issue.");
            alert("Please wait, YouTube is loading...");
        }
    }
};
