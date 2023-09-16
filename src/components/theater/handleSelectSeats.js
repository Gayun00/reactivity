import ObserverSubject from "../../utils/ObserverSubject.js";

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
    console.log("Seat Status:", data);
  }

  enableSeatSelect() {
    //
  }
}

const seatsSection = document.querySelector("#theaterSeat");

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
