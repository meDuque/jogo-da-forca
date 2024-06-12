import getWord from "./words.ts";

const contentBtns = document.querySelector<HTMLDivElement>(".btns")!;
const contentGuessWord = document.querySelector<HTMLDivElement>(".guess-word")!;
const img = document.querySelector<HTMLImageElement>("img")!;
const contentClue = document.querySelector<HTMLDivElement>(".clue")!;
const btnNew = document.querySelector<HTMLButtonElement>(".new")!;

btnNew.onclick = () => init();
let indexImg: number;

init();

function init() {
  indexImg = 1;
  img.src = `img1.png`;

  generateGuessSection();
  generateButtons();
}

function generateGuessSection() {
  contentGuessWord.textContent = "";

  const { word, clue } = getWord();
  const wordWithoutAccent = word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  Array.from(wordWithoutAccent).forEach((letter) => {
    const span = document.createElement("span");

    span.textContent = "_";
    span.setAttribute("word", letter.toUpperCase());
    contentGuessWord.appendChild(span);
  });

  contentClue.textContent = `Dica: ${clue}`;
}

function wrongAnswer() {
  indexImg++;
  img.src = `img${indexImg}.png`;

  if (indexImg === 7) {
    setTimeout(() => {
      alert("Perdeu :/");
      init();
    }, 100);
  }
}

function verifyLetter(letter: string | null) {
  const arr = document.querySelectorAll(`[word="${letter}"]`);

  if (!arr.length) wrongAnswer();

  arr.forEach((e) => {
    e.textContent = letter;
  });

  const spans = document.querySelectorAll(`.guess-word span`);
  const won = !Array.from(spans).find((span) => span.textContent === "_");

  if (won) {
    setTimeout(() => {
      alert("Ganhou!!!");
      init();
    }, 100);
  }
}

function generateButtons() {
  contentBtns.textContent = "";

  for (let i = 97; i < 123; i++) {
    const btn = document.createElement("button");
    const letter = String.fromCharCode(i).toUpperCase();
    btn.textContent = letter;

    btn.onclick = () => {
      btn.disabled = true;
      btn.style.backgroundColor = "gray";
      verifyLetter(letter);
    };

    contentBtns.appendChild(btn);
  }
}
