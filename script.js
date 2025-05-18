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
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789".split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 40);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
