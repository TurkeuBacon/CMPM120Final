class AudioManager{
    constructor(scene){
        this.scene = scene;
        this.audioObjects = [];
    }
    
    loadAudio(key,file){
        const audio = new Audio(file);
        this.audioObjects[key] = audio;
    }

    playAudio(key){
        const audio = this.audioObjects[key];
        if(audio){
            audio.play();
        }
    }

    pauseAudio(key){
        const audio = this.audioObjects[key];
        if(audio){
            audio.pause();
        }
    }

    stopAudio(key){
        const audio = this.audioObjects[key];
        if(audio){
            audio.pause();
            audio.currentTime = 0;
        }
    }

}

/*
const audioManager = new AudioManager();

// Load audio files
audioManager.loadAudio('bgm', 'assets/audio/bgm.mp3');
audioManager.loadAudio('sfx', 'assets/audio/sfx.wav');

// Play audio
audioManager.playAudio('bgm');

// Pause audio
audioManager.pauseAudio('bgm');

// Stop audio
audioManager.stopAudio('bgm');
*/

//extend the audiomanager class to whever you need it, then this is how you use it^^
//create an audiomanager then use the commands.