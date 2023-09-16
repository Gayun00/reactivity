import { addSelectSeatsHandler } from "./components/theater/handleSelectSeats.js";

class App {
  constructor() {
    this.theaterBtn = document.querySelector("#theaterBtn"); // 1
    this.render();
  }

  handleLoginClick = () => {};

  handleTheaterClick = () => {
    addSelectSeatsHandler();
  };

  render() {
    this.handleTheaterClick();
  }
}

export default App;
