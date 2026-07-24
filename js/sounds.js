// Sound Engine mapped to audio sources
const discordRingAudio = new Audio('https://raw.githubusercontent.com/xi-3/Discord-Sound-Effects/main/Ringtone.mp3');
discordRingAudio.loop = true;

const whatsappTextAudio = new Audio('https://raw.githubusercontent.com/shreyas14/WhatsApp-web-clone/master/public/sounds/notification.mp3');

const SoundEngine = {
  playRingtone() {
    discordRingAudio.currentTime = 0;
    discordRingAudio.play().catch(e => console.log('Audio playback prevented:', e));
  },

  stopRingtone() {
    discordRingAudio.pause();
    discordRingAudio.currentTime = 0;
  },

  playMessageSound() {
    whatsappTextAudio.currentTime = 0;
    whatsappTextAudio.play().catch(e => console.log('Audio playback prevented:', e));
  }
};
