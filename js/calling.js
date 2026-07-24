let isCallActive = false;
let isMuted = false;
let isCamOn = false;
let webcamStream = null;
let currentCallTarget = "Bot";

function initiateCallSequence() {
  document.getElementById('callTargetModal').style.display = 'flex';
}

function startCallTarget(target) {
  currentCallTarget = target;
  document.getElementById('callTargetModal').style.display = 'none';

  if (target === "Bot") {
    document.getElementById('incomingCallOverlay').style.display = 'flex';
    SoundEngine.playRingtone();
  } else {
    // Send live network invite call to targeted online user
    chatChannel.postMessage({
      type: 'CALL_INVITE',
      targetUser: target,
      callerName: user.name,
      callerAvatar: user.avatar
    });
    alert(`Calling ${target}... Waiting for answer.`);
  }
}

function acceptIncomingCall() {
  SoundEngine.stopRingtone();
  document.getElementById('incomingCallOverlay').style.display = 'none';
  document.getElementById('callOverlay').style.display = 'flex';
  document.getElementById('otherCallUserName').textContent = currentCallTarget;
  isCallActive = true;
}

function declineIncomingCall() {
  SoundEngine.stopRingtone();
  document.getElementById('incomingCallOverlay').style.display = 'none';
}

function endCall() {
  SoundEngine.stopRingtone();
  document.getElementById('callOverlay').style.display = 'none';
  isCallActive = false;
  if (webcamStream) {
    webcamStream.getTracks().forEach(track => track.stop());
    webcamStream = null;
  }
  document.getElementById('webcamVideo').style.display = 'none';
  document.getElementById('userPulseCard').style.display = 'block';
}

function toggleMute() {
  isMuted = !isMuted;
  document.getElementById('muteBtn').textContent = isMuted ? '🔇' : '🎙️';
}

async function toggleCamera() {
  const videoElem = document.getElementById('webcamVideo');
  const avatarElem = document.getElementById('userPulseCard');

  if (!isCamOn) {
    try {
      webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoElem.srcObject = webcamStream;
      videoElem.style.display = 'block';
      avatarElem.style.display = 'none';
      isCamOn = true;
      document.getElementById('camBtn').textContent = '📷';
    } catch (err) {
      alert("Camera access denied or unequipped.");
    }
  } else {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
    }
    videoElem.style.display = 'none';
    avatarElem.style.display = 'block';
    isCamOn = false;
    document.getElementById('camBtn').textContent = '📹';
  }
}

function simulateSpeakingToggle() {
  const userCard = document.getElementById('userCallCard');
  userCard.classList.toggle('speaking');
}
