const Scor = JSON.parse(localStorage.getItem("scor"));
const scorEl = document.querySelector(".scor-number");
const actionBtns = document.querySelectorAll(".menu_list");
const alertEl = document.querySelector(".alert");

let dataPlayers;
if (JSON.parse(localStorage.getItem("players")) != null) {
  dataPlayers = JSON.parse(localStorage.getItem("players"));
} else {
  dataPlayers = [];
}
const nameInput = document.querySelector(".username-input");

if (Scor != undefined) {
  scorEl.innerText = Scor;
}

const actionHndl = (event) => {
  const action = event.target.dataset.action;
  if (action == "Save") {
    if (nameInput.value.length) {
      dataPlayers.push({
        name: nameInput.value,
        scor: Scor,
      });
      localStorage.setItem("players", JSON.stringify(dataPlayers));
    } else {
      event.preventDefault();
      alertEl.style.display = "block";
      alertEl.style.animationName = "moveFromTop";

      setTimeout(() => {
        alertEl.style.animationName = "movetoTop";
      }, 1500);
      setTimeout(() => {
        alertEl.style.display = "none";
      }, 1700);
    }
  }
};

actionBtns.forEach((btn) => {
  btn.addEventListener("click", actionHndl);
});
