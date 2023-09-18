import ObserverSubject from "../../utils/ObserverSubject.js";
import { TicketPriceObserver } from "./handlePrice.js";
import { HandicapCheckObserver } from "./handleSelectHandicap.js";
import { NumOfPeopleSubject } from "./handleSelectNumOfPeople.js";

const seatsSection = document.querySelector("#theaterSeat");
const remainSeatText = document.querySelector("#remainSeatCnt");

const initSeats = () => {
  for (let i = 0; i < seatsSection.children.length; i++) {
    seatsSection.children[i].setAttribute("data-seatNum", i);
  }
};

initSeats();

export class SeatSubject extends ObserverSubject {
  #selectedSeats = [];
  constructor() {
    super();
    if (SeatSubject.instance) return;
    SeatSubject.instance = this;
  }

  static getInstace() {
    if (!this.instance) {
      this.instance = new SeatSubject();
    }
    return this.instance;
  }

  get selectedSeats() {
    return this.#selectedSeats;
  }

  resetSelectedSeats() {
    this.#selectedSeats = [];
    super.notify({ selectedSeats: this.#selectedSeats });
  }

  updateSeatSelection(seatType, seatNum) {
    const totalNumOfPeople = NumOfPeopleSubject.getInstace().totalCount;

    const isClickedSeat = this.#selectedSeats.some(
      (seat) => seat.seatNum === seatNum
    );
    if (!isClickedSeat && totalNumOfPeople === this.#selectedSeats.length)
      return;

    if (isClickedSeat) {
      this.#selectedSeats = this.#selectedSeats.filter(
        (seat) => seat.seatNum !== seatNum
      );
    } else {
      this.#selectedSeats.push({ seatType, seatNum });
    }

    super.notify({ selectedSeats: this.#selectedSeats });
  }
}

export class SeatObserver {
  update({ numOfPeople, selectedSeats }) {
    if (numOfPeople) this.#handleSeatSelectEnable(numOfPeople);
    if (selectedSeats) {
      this.#handleSeatDisable(selectedSeats);
      this.#selectSeat(selectedSeats);
      this.#updateRemainSeats(selectedSeats);
    }
  }

  #selectSeat(selectedSeats) {
    const totalNum = NumOfPeopleSubject.getInstace().totalCount;

    for (const seat of seatsSection.children) {
      if (seat.classList.contains("clicked")) seat.classList.remove("clicked");
    }

    selectedSeats.forEach((selectedSeat) => {
      const clickedSeat = document.querySelector(
        `button[data-seatnum="${selectedSeat.seatNum}"]`
      );
      clickedSeat.classList.add("clicked");
    });

    if (totalNum === selectedSeats.length) {
      this.#disableRemainSeats();
    }

    if (!selectedSeats) {
      this.#resetSelectedSeats();
    }
  }

  #resetSelectedSeats() {
    for (const seat of seatsSection.children) {
      if (!seat.classList.contains("clicked")) {
        seat.classList.add("clicked");
      }
    }
  }

  #disableRemainSeats() {
    for (const seat of seatsSection.children) {
      if (!seat.classList.contains("clicked")) {
        seat.classList.add("disabled");
      }
    }
  }

  #updateRemainSeats(selectedSeats) {
    const totalSeatCount = seatsSection.children.length;
    remainSeatText.innerText = totalSeatCount - selectedSeats.length;
  }

  #disableSeats(classname) {
    const seats = document.querySelectorAll(`.${classname}`);

    for (const seat of seats) {
      seat.classList.add("disabled");
    }
  }

  #handleSeatDisable(selectedSeats) {
    const hasGeneral = selectedSeats.some(
      (selectedSeat) => selectedSeat.seatType === "general"
    );
    const hasMusseuk = selectedSeats.some(
      (selectedSeat) => selectedSeat.seatType === "musseukbox"
    );

    if (hasGeneral) {
      this.#disableSeats("musseukbox");
      this.#disableSeats("handicap");
    }

    if (hasMusseuk) {
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
      if (seat.classList.contains("musseukbox")) {
        if (totalNum % 2 == 0) {
          seat.classList.remove("disabled");
        } else {
          seat.classList.add("disabled");
        }
      } else {
        seat.classList.remove("disabled");
      }
    }
  }
}

export const addSelectSeatsHandler = () => {
  const seatSubject = new SeatSubject();
  const seatObserver = new SeatObserver();
  const handicapCheckObserver = new HandicapCheckObserver();
  const ticketPriceObserver = new TicketPriceObserver();

  seatSubject.addObserver(seatObserver);
  seatSubject.addObserver(handicapCheckObserver);
  seatSubject.addObserver(ticketPriceObserver);

  seatsSection.addEventListener("click", (e) => {
    const target = e.target;
    const seatNum = target.getAttribute("data-seatnum");
    let classname = "general";
    if (target.classList.contains("musseukbox")) classname = "musseukbox";
    if (target.classList.contains("handicap")) classname = "handicap";

    seatSubject.updateSeatSelection(classname, seatNum);
  });
};

export default SeatObserver;
