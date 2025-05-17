function togglePassword() {
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  const errorSound = document.getElementById("errorSound");

  if (input === "segreto123") {
    document.getElementById("main").style.display = "none";
    document.getElementById("revealed").style.display = "flex";
  } else {
    errorSound.currentTime = 0;
    errorSound.play();
    alert("❌ Combinazione errata. Ritenta!");
  }
}

function goBack() {
  document.getElementById("revealed").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("passwordInput").value = "";
}
