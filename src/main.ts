import "./style.css";
import { Game } from "./js/classes/Game";
import { dimensions } from "./js/constants";

window.onload = () => {
  const game = new Game();
  game.loop();
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Hello World</h1>
    <canvas id="game" width="${dimensions.width}" height="${dimensions.height}"></canvas>
  </div>
`;
