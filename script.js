function togglePassword() {
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();

  if (input === "segreto123") {
    document.getElementById("main").style.display = "none";
    document.getElementById("revealed").style.display = "flex";

    // Pausa il background audio
    const bgMusic = document.getElementById("bg-music");
    if (!bgMusic.paused) {
      bgMusic.pause();
    }

    // Riproduce il suono di successo
    new Audio("success.mp3").play();
  } else {
    // Suono malefico prima dell'alert
    const failSound = new Audio("fail.mp3");
    failSound.play();

    setTimeout(() => {
      alert("Combinazione errata. Riprova.");
    }, 300); // piccolo delay per non bloccare l'audio
  }
}

function goBack() {
  document.getElementById("revealed").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("passwordInput").value = "";

  // Riavvia il background audio
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      console.log("Autoplay bloccato di nuovo");
    });
  }
}

// 🎧 Attiva audio di sottofondo dopo interazione (click)
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
