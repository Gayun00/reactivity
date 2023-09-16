import ObserverSubject from "../../utils/ObserverSubject.js";

const seatsSection = document.querySelector("#theaterSeat");

export class SeatSubject extends ObserverSubject {
  constructor() {
    super();
    this.seatStatus = {};
  }

  updateSeatSelection(seatType, isSelected) {
    this.seatStatus[seatType] = isSelected;
    super.notify(this.seatStatus);
  }
}

export class SeatObserver {
  update(data) {
    this.handleSeatSelectEnable(data);
  }

  handleSeatSelectEnable(numOfPeople) {
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

  seatSubject.addObserver(seatObserver);

  seatsSection.addEventListener("click", (e) => {
    const target = e.target;
    seatSubject.updateSeatSelection(target.classList[1] || "general", true);
  });
};

export default SeatObserver;
