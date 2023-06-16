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

        this.ccs = [];
    }

    playClosedCaptioning(caption, length)
    {
        let canvas = this.scene.sys.game.canvas;
        let ccText = this.scene.cameraManager.addUI(this.scene.add.text(canvas.width - 20, 0, caption, {
            color: "#ffffff",
            fontSize: "24px",
            fontStyle: "Bold",
            backgroundColor: "#000000"
        }).setOrigin(1, .5).setVisible(this.cc));
        let ccObj = {text: ccText, index: this.ccs.length, bgm: length < 0};
        this.ccs.push(ccObj);
        if(length >= 0)
        {
            this.scene.add.tween({
                targets: ccText,
                duration: length,
                alpha: 0,
                onComplete:()=>{
                    this.ccs.splice(ccObj.index, 1);
                    ccObj.text.destroy();
                    for(let i = 0; i < this.ccs.length; i++)
                    {
                        this.ccs[i].text.y = 300 - 24*(this.ccs.length/2.0 - .5 - i);
                        this.ccs[i].index = i;
                    }
                }
            });
        }
        for(let i = 0; i < this.ccs.length; i++)
        {
            this.ccs[i].text.y = 300 - 24*(this.ccs.length/2.0 - .5 - i);
        }
    }

    fadeOutBGMCaptions()
    {
        for(let i = 0; i < this.ccs.length; i++)
        {
            if(this.ccs[i].bgm = true)
            {
                this.scene.add.tween({
                    targets: ccText,
                    duration: 750,
                    alpha: 0,
                    onComplete:()=>{
                        this.ccs.splice(this.ccs[i].index, 1);
                        this.ccs[i].text.destroy();
                        for(let j = 0; j < this.ccs.length; j++)
                        {
                            this.ccs[j].text.y = 400 + 40*(this.ccs.length/2.0 - .5 - j);
                            this.ccs[j].index = j;
                        }
                    }
                });
            }
        }
    }

    addAudio(key, caption)
    {
        if(key in this.audioList)
        {
            console.log("Failed to add " + key + " to audioList");
            return;
        }
        console.log("Adding " + key + " to audioList");
        this.audioList[key] = {audio: this.scene.sound.add(key), caption: caption};
    }

    addBackgroundMusic(audioKey, volume, loop=true, priority=false)
    {
        if(!(audioKey in this.audioList))
        {
            console.error("Key does not exist, please check the spelling");
            return false;
        }
        let audio = this.audioList[audioKey].audio;
        if(priority || this.backgroundMusic == null)
        {
            if(this.backgroundMusic != null)
            {
                this.backgroundMusic.stop();
                this.fadeOutBGMCaptions();
            }
            this.playClosedCaptioning(this.audioList[audioKey].caption, -1);
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

    endBGM()
    {
        if(this.backgroundMusic != null)
        {
            this.backgroundMusic.stop();
            this.backgroundMusic = null;
        }
    }

    addSfx(audioKey, volume, loop=true, rate=1, alone=false, priority=false)
    {
        if(!(audioKey in this.audioList))
        {
            console.error("Key does not exist, please check the spelling");
            return false;
        }
        let audio = this.audioList[audioKey].audio;
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
                this.playClosedCaptioning(this.audioList[audioKey].caption, 3000);
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
            this.playClosedCaptioning(this.audioList[audioKey].caption, 3000);
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
                this.sfxVolumes.splice(i, 1);
                this.sfxs.splice(i, );
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
            if(this.backgroundMusic != null)
                this.backgroundMusic.volume = this.bgmVolume;
            // for(let i = 0; i < this.sfxs.length; i++)
            // {
            //     console.log("SFX " + i + " Volume: " + this.sfxVolumes[i]);
            //     this.sfxs[i].volume = this.sfxVolumes[i];
            // }
        }
        else
        {
            if(this.backgroundMusic != null)
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
        this.ccs.forEach(element => {
            element.text.setVisible(caption);
        });
        this.cc = caption;
    }

    toggleCC()
    {
        this.setCC(!this.cc);
        return !this.cc;
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