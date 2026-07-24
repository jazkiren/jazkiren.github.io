let isCallActive = false;

function initiateCallSequence() {
  const overlay = document.getElementById('incomingCallOverlay');
  if (overlay) overlay.style.display = 'flex';
  SoundEngine.playJoinSound();
}

function acceptIncomingCall() {
  document.getElementById('incomingCallOverlay').style.display = 'none';
  document.getElementById('callOverlay').style.display = 'flex';
  isCallActive = true;
}

function declineIncomingCall() {
  document.getElementById('incomingCallOverlay').style.display = 'none';
}

function endCall() {
  document.getElementById('callOverlay').style.display = 'none';
  isCallActive = false;
}
