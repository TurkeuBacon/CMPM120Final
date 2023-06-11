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
        this.bgmVolume = 1;
        this.backgroundMusic = null;
        this.sfxs = [];
        this.sfxVolumes = [];
        this.muted = false;
        this.cc = false;
    }

    addAudio(key)
    {
        if(key in this.audioList)
        {
            console.log("Failed to add " + key + " to audioList");
            return;
        }
        console.log("Adding " + key + " to audioList");
        this.audioList[key] = this.scene.sound.add(key);
    }

    addBackgroundMusic(audioKey, volume, loop=true, priority=false)
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
            audio.volume = volume;
            audio.play();
            console.log("Getting Volume: " + audio.volume);
            this.bgmVolume = volume;
            this.backgroundMusic = audio;
            if(this.muted) this.backgroundMusic.volume = 0;
            return true;
        }
        return false;
    }

    addSfx(audioKey, volume, loop=true, rate=1, alone=false, priority=false)
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
                audio.volume = volume;
                audio.play();
                this.sfxs = [audio];
                this.sfxVolumes = [volume];
                //if(this.muted) this.sfxs[0].volume = 0;
                return true;
            }
            return false;
        }
        else
        {
            audio.loop = loop;
            audio.setRate(rate);
            audio.volume = volume;
            audio.play();
            this.sfxVolumes.push(volume);
            this.sfxs.push(audio);
            //if(this.muted) audio.volume = 0;
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
                this.sfxVolumes = this.sfxVolumes.splice(i, i);
                this.sfxs = this.sfxs.splice(i, i);
                break;
            }
        }
    }

    endAllSound()
    {
        if(this.backgroundMusic != null)
            this.backgroundMusic.stop();
        this.backgroundMusic = null;
        this.sfxs.forEach(sfx => {
            this.sfx.stop();
        });
        this.sfxs = [];
        this.sfxVolumes = [];
    }

    setMute(mute)
    {
        if(!mute)
        {
            console.log("BGM Volume: " + this.bgmVolume);
            this.backgroundMusic.volume = this.bgmVolume;
            // for(let i = 0; i < this.sfxs.length; i++)
            // {
            //     console.log("SFX " + i + " Volume: " + this.sfxVolumes[i]);
            //     this.sfxs[i].volume = this.sfxVolumes[i];
            // }
        }
        else
        {
            this.backgroundMusic.volume = 0;
            // for(let i = 0; i < this.sfxs.length; i++)
            // {
            //     this.sfxs[i].volume = 0;
            // }
        }
        this.muted = mute;
    }

    toggleMute()
    {
        this.setMute(!this.muted);
        localStorage.setItem("Muted", (this.muted ? "TRUE": "FALSE"));
        return this.muted;
    }

    setCC(caption)
    {
        this.cc = caption;
    }

    toggleCC()
    {
        this.setCC(!this.cc);
        return this.cc;
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