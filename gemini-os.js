var GeminiOS = {
    player: null,
    isPlaying: false,

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

    executeCommand: function(cmd) {
        if (!this.player) return;
        console.log("Executing:", cmd);

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
        document.getElementById('video-overlay').style.display = 'block';
        this.player.loadVideoById(videoId);
    }
};
