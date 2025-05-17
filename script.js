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
  document.getElementById("background-audio").pause();
    new Audio("success.mp3").play();
  } else {
    alert("Combinazione errata. Riprova.");
    new Audio("fail.mp3").play();
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
