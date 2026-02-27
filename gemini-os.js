// gemini-os.js
var GeminiOS = {
    player: null,
    isPlaying: false,

    // প্লেয়ার ইনিশিয়ালাইজ করা
    initPlayer: function(elementId) {
        this.player = new YT.Player(elementId, {
            height: '100%',
            width: '100%',
            playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'enablejsapi': 1 },
            events: {
                'onStateChange': (e) => { this.isPlaying = (e.data == 1); }
            }
        });
    },

    // রিমোট বা কিবোর্ড কমান্ড প্রসেস করা
    executeCommand: function(cmd) {
        if (!this.player) return;

        switch(cmd) {
            case 'Enter': // Play or Pause
                this.isPlaying ? this.player.pauseVideo() : this.player.playVideo();
                break;
            case 'Right': // 10s Forward
                this.player.seekTo(this.player.getCurrentTime() + 10);
                break;
            case 'Left': // 10s Rewind
                this.player.seekTo(this.player.getCurrentTime() - 10);
                break;
            case 'Up': // Volume Up
                this.player.setVolume(this.player.getVolume() + 10);
                break;
            case 'Down': // Volume Down
                this.player.setVolume(this.player.getVolume() - 10);
                break;
            case 'Back': // Close Video
                document.getElementById('video-overlay').style.display = 'none';
                this.player.stopVideo();
                break;
        }
    },

    loadVideo: function(videoId) {
        document.getElementById('video-overlay').style.display = 'block';
        this.player.loadVideoById(videoId);
    }
};
