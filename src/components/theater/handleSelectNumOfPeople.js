import ObserverSubject from "../../utils/ObserverSubject.js";
import SeatObserver from "./handleSelectSeats.js";

export class NumOfPeopleSubject extends ObserverSubject {
  constructor() {
    super();
    this.numOfPeopleStatus = {};
  }

  updateNumSelection(age, count) {
    this.numOfPeopleStatus[age] = count;
    super.notify(this.numOfPeopleStatus);
  }
}

export class NumOfPeopleObserver {
  update(data) {
    console.log("num of people Status:", data);
  }
}

const adultBtnSection = document.querySelector("#adultBtn");
const youthBtnSection = document.querySelector("#youthBtn");

export const addSelectNumOfPeopleHandler = () => {
  const numOfPeopleSubject = new NumOfPeopleSubject();
  const numOfPeopleObserver = new NumOfPeopleObserver();
  const seatObserver = new SeatObserver();

  numOfPeopleSubject.addObserver(numOfPeopleObserver);
  numOfPeopleSubject.addObserver(seatObserver);

  youthBtnSection.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("btn")) return;
    numOfPeopleSubject.updateNumSelection("youth", parseInt(target.innerText));
  });

  adultBtnSection.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("btn")) return;

    numOfPeopleSubject.updateNumSelection("adult", parseInt(target.innerText));
  });
};

export default NumOfPeopleObserver;
