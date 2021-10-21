const switchBox = document.getElementById('switch-box');
const switchBtn = document.getElementById('switch-btn');
const body = document.getElementById('body');


function handleSwitch() {
    body.classList.toggle('body-dark');
    switchBtn.classList.toggle('move-switch');
    switchBtn.classList.toggle('switch-dark')
    switchBox.classList.toggle('switch-box-dark')
}

switchBox.addEventListener('click', () => {
  handleSwitch();
});