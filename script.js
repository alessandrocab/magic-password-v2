function togglePassword() { 
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();

  if (input === "segreto123") {
    document.getElementById("main").style.display = "none";
    document.getElementById("revealed").style.display = "flex";
    // Pausa background
    document.getElementById("bg-music").pause();
    new Audio("success.mp3").play();
  } else {
    const bgMusic = document.getElementById("bg-music");

    // Abbassa il volume temporaneamente
    const originalVolume = bgMusic.volume;
    bgMusic.volume = 0.1;

    const failSound = new Audio("fail.mp3");
    failSound.play().catch((e) => {
      console.warn("Impossibile riprodurre fail.mp3:", e);
    });

    // Dopo il fail.mp3 (es. 1.5s), riportiamo il volume originale
    setTimeout(() => {
      bgMusic.volume = originalVolume;
    }, 1500);

    alert("Combinazione errata. Riprova.");
  }
}

function goBack() {
  document.getElementById("revealed").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("passwordInput").value = "";
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
