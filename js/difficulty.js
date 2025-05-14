const difficultyLevels = document.querySelectorAll(".menu_list");
const homeBtn = document.querySelector(".home-btn_link");

const difficultyLevelHndl = (event) => {
  const action = event.target.dataset.difficultyLevel;
  console.log(action)
  localStorage.setItem("difficultylevel", JSON.stringify(action));
  
};

difficultyLevels.forEach((btn) => {
    btn.addEventListener("click", difficultyLevelHndl);
});

homeBtn.addEventListener("click",(event) => {
    localStorage.setItem("difficultylevel",JSON.stringify("medium"));
})