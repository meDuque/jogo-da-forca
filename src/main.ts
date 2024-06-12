import "./styles.css";

document.querySelector<HTMLDivElement>("#game")!.innerHTML = `
  <div>
    <header>
      <h1>Jogo da Forca</h1>
    </header>
    <button class="new">Novo Jogo</button>
    <main>
      <article class="content-img">
        <img src="img1.png" width="250px" alt="Jogo da forca">
      </article>
      <article class="content">
        <div class="guess-word"></div>
        <div class="clue"></div>
        <div class="btns"></div>
      </article>
    </main>
  </div>
`;
