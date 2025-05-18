function togglePassword() { 
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  const bgMusic = document.getElementById("bg-music");

  if (input === "segreto123") {
    document.getElementById("main").style.display = "none";
    document.getElementById("revealed").style.display = "flex";

    if (bgMusic) {
      bgMusic.pause();
    }

    new Audio("success.mp3").play();
  } else {
    // Abbassa il volume della musica e suona subito fail.mp3
    if (bgMusic && !bgMusic.paused) {
      bgMusic.volume = 0.1;
    }

    const failSound = new Audio("fail.mp3");
    failSound.play();

    failSound.onended = () => {
      if (bgMusic) {
        bgMusic.volume = 1.0;
      }
    };

    // ALERT dopo l'audio, così non lo blocca
    setTimeout(() => {
      alert("Combinazione errata. Riprova.");
    }, 100);
  }
}

function goBack() {
  const bgMusic = document.getElementById("bg-music");

  document.getElementById("revealed").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("passwordInput").value = "";

  // Riavvia la musica da capo
  if (bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.play().catch((e) => {
      console.log("Audio bloccato, attendi un'interazione.");
    });
  }
}

// 🎧 Attiva audio di sottofondo dopo interazione iniziale
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bg-music');

  function enableAudio() {
    bgMusic.play().catch(() => {
      console.log("Autoplay bloccato");
    });
    document.removeEventListener('click', enableAudio);
  }

  document.addEventListener('click', enableAudio);
});
