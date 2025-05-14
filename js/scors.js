const playersData = JSON.parse(localStorage.getItem("players"));
playersData.sort((a, b) => b.scor - a.scor);
const playerelementCon = document.querySelector(".menu");
const CreateElement = (allData) => {
  let counter = 1;
  allData.forEach((data) => {
    const playerEl = `<li class="menu_list fadeInLeft">
    <div class="left-content_menuList">
        <span class="player-number">${counter}</span>
        <p class="player-name">${data.name}</p>
    </div>
    <span class="player-scor">${data.scor}</span>
</li>`;
    counter++;
    playerelementCon.innerHTML += playerEl;
  });
};

CreateElement(playersData);
