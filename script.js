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

    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
    }

    new Audio("success.mp3").play();
  } else {
    // Abbassa il volume della musica di sottofondo temporaneamente
    if (bgMusic && !bgMusic.paused) {
      bgMusic.volume = 0.1;
    }

    const failSound = new Audio("fail.mp3");
    failSound.play();

    failSound.onended = () => {
      // Ripristina il volume dopo il fail
      if (bgMusic) {
        bgMusic.volume = 1.0;
      }
    };

    alert("Combinazione errata. Riprova.");
  }
}

function goBack() {
  const bgMusic = document.getElementById("bg-music");

  document.getElementById("revealed").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("passwordInput").value = "";

  // Riparte la musica di sottofondo se era stata messa in pausa
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch((e) => {
      console.log("Audio bloccato, attendi un'interazione.");
    });
  }
}

// 🎧 Attiva audio di sottofondo dopo interazione
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bg-music');
  
  function enableAudio() {
    bgMusic.play().catch((e) => {
      console.log("Autoplay bloccato, attesa interazione");
    });
    document.removeEventListener('click', enableAudio);
  }

  document.addEventListener('click', enableAudio);
});
