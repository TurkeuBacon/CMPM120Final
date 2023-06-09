class AudioManager{

    static instances = {};
    static getInstance(scene)
    {
        let key = scene.scene.key;
        if(!(key in this.instances))
        {
            console.log("Creating " + key + " Scene Audio Manager");
            this.instances[key] = new AudioManager(scene);
        }
        console.log("Returning " + key + " Scene Audio Manager");
        return this.instances[key];
    }

    constructor(scene){
        this.scene = scene;
        this.audioList = {};
        this.backgroundMusic = null;
        this.sfxs = [];
    }

    addAudio(key, volume)
    {
        if(key in this.audioList)
        {
            console.log("Failed to add " + key + " to audioList");
            return;
        }
        console.log("Adding " + key + " to audioList");
        this.audioList[key] = this.scene.sound.add(key, {volume: volume});
    }

    addBackgroundMusic(audioKey, loop=true, priority=false)
    {
        if(!(audioKey in this.audioList))
        {
            console.error("Key does not exist, please check the spelling");
            return false;
        }
        let audio = this.audioList[audioKey];
        if(priority || this.backgroundMusic == null)
        {
            if(this.backgroundMusic != null)
            {
                this.backgroundMusic.stop();
            }
            audio.loop = loop;
            audio.play();
            this.backgroundMusic = audio;
            return true;
        }
        return false;
    }

    addSfx(audioKey, loop=true, rate=1, alone=false, priority=false)
    {
        if(!(audioKey in this.audioList))
        {
            console.error("Key does not exist, please check the spelling");
            return false;
        }
        let audio = this.audioList[audioKey];
        if(alone)
        {
            if(this.sfxs.length > 0 && priority)
            {
                for(let i = 0; i < this.sfxs.length; i++)
                {
                    this.sfxs[i].stop();
                }
                audio.loop = loop;
                audio.setRate(rate);
                audio.play();
                this.sfxs = [audio];
                return true;
            }
            return false;
        }
        else
        {
            audio.loop = loop;
            audio.setRate(rate);
            audio.play();
            this.sfxs.push(audio);
            return true;
        }
    }

    stopSfx(audioKey)
    {
        for(let i = 0; i < this.sfxs.length; i++)
        {
            if(this.sfxs[i].key == audioKey)
            {
                this.sfxs[i].loop = false;
                this.sfxs = this.sfxs.splice(i, i);
                break;
            }
        }
    }

    endAllSound()
    {
        
    }
}

export default AudioManager;

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