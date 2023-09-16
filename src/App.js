import { addSelectNumOfPeopleHandler } from "./components/theater/handleSelectNumOfPeople.js";
import { addSelectSeatsHandler } from "./components/theater/handleSelectSeats.js";

class App {
  constructor() {
    this.theaterBtn = document.querySelector("#theaterBtn"); // 1
    this.render();
  }

  handleLoginClick = () => {};

  handleTheaterClick = () => {
    addSelectSeatsHandler();
    addSelectNumOfPeopleHandler();
  };

  render() {
    this.handleTheaterClick();
  }
}

export default App;
