import ObserverSubject from "../../utils/ObserverSubject.js";
import { HandicapCheckObserver } from "./handleSelectHandicap.js";

const seatsSection = document.querySelector("#theaterSeat");

export class SeatSubject extends ObserverSubject {
  constructor() {
    super();
    this.selectedSeats = {
      general: false,
      musseukbox: false,
      handicap: false,
    };
  }

  updateSeatSelection(seatType, isSelected) {
    this.selectedSeats[seatType] = isSelected;
    super.notify({ selectedSeats: this.selectedSeats });
  }
}

export class SeatObserver {
  update({ numOfPeople, selectedSeats }) {
    if (numOfPeople) this.#handleSeatSelectEnable(numOfPeople);
    if (selectedSeats) this.#handleSeatDisable(selectedSeats);
  }

  #disableSeats(classname) {
    const seats = document.querySelectorAll(`.${classname}`);

    for (const seat of seats) {
      seat.classList.add("disabled");
    }
  }

  #handleSeatDisable(selectedSeats) {
    const { general, musseukbox, handicap } = selectedSeats;

    if (general) {
      this.#disableSeats("musseukbox");
      this.#disableSeats("handicap");
    }

    if (musseukbox) {
      this.#disableSeats("seat:not(.handicap):not(.musseukbox)");
      this.#disableSeats("handicap");
    }
  }

  #handleSeatSelectEnable(numOfPeople) {
    const totalNum = Object.values(numOfPeople).reduce(
      (acc, curr) => (acc += curr),
      0
    );
    const seats = seatsSection.children;

    if (!totalNum) {
      for (const seat of seats) {
        seat.classList.add("disabled");
      }
      return;
    }

    for (const seat of seats) {
      seat.classList.remove("disabled");
    }
  }
}

export const addSelectSeatsHandler = () => {
  const seatSubject = new SeatSubject();
  const seatObserver = new SeatObserver();
  const handicapCheckObserver = new HandicapCheckObserver();

  seatSubject.addObserver(seatObserver);
  seatSubject.addObserver(handicapCheckObserver);

  seatsSection.addEventListener("click", (e) => {
    const target = e.target;
    seatSubject.updateSeatSelection(target.classList[1] || "general", true);
  });
};

export default SeatObserver;
