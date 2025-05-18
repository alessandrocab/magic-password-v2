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
    new Audio("fail.mp3").play();
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
