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

const handleSelectedSeat = (target) => {
  for (const seat of seatsSection.children) {
    if (seat.classList.contains("clicked")) {
      if (seat.innerHTML !== target.innerHTML) seat.classList.remove("clicked");
    }
  }
  target.classList.add("clicked");
};

export const addSelectSeatsHandler = () => {
  const seatSubject = new SeatSubject();
  const seatObserver = new SeatObserver();
  const handicapCheckObserver = new HandicapCheckObserver();

  seatSubject.addObserver(seatObserver);
  seatSubject.addObserver(handicapCheckObserver);

  seatsSection.addEventListener("click", (e) => {
    const target = e.target;
    handleSelectedSeat(target);
    let classname = "general";
    if (target.classList.contains("musseukbox")) classname = "musseukbox";
    if (target.classList.contains("handicap")) classname = "handicap";

    seatSubject.updateSeatSelection(classname, true);
  });
};

export default SeatObserver;
