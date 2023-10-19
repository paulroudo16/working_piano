const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let audio = new Audio(`tunes/a.wav`);
let isKeyPressed = false; // flag to track key press/release

const playTune = (key) => {
  audio.src = `tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

const stopTune = () => {
  audio.pause();
  audio.currentTime = 0;
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
  if (allKeys.includes(e.key) && !isKeyPressed) {
    playTune(e.key);
    isKeyPressed = true;
  }
};

const releasedKey = (e) => {
  if (allKeys.includes(e.key)) {
    //stopTune();
    isKeyPressed = false;
  }
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
document.addEventListener("keyup", releasedKey);
