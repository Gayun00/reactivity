import ObserverSubject from "../../utils/ObserverSubject.js";
import { HandicapCheckObserver } from "./handleSelectHandicap.js";
import SeatObserver from "./handleSelectSeats.js";

const adultBtnSection = document.querySelector("#adultBtn");
const youthBtnSection = document.querySelector("#youthBtn");

export class NumOfPeopleSubject extends ObserverSubject {
  constructor() {
    super();
    this.numOfPeopleStatus = {
      adult: 0,
      youth: 0,
    };
    this.init();
  }

  init() {
    setTimeout(() => {
      super.notify(this.numOfPeopleStatus);
    }, 0);
  }

  updateNumSelection(age, count) {
    this.numOfPeopleStatus[age] = count;
    super.notify(this.numOfPeopleStatus);
  }
}

export class NumOfPeopleObserver {
  #handleSelectedBtn(numOfPeople) {
    this.#toggleButton(numOfPeople.adult, adultBtnSection.children);
    this.#toggleButton(numOfPeople.youth, youthBtnSection.children);
  }

  #toggleButton(count, buttonList) {
    for (const button of buttonList) {
      if (parseInt(button.innerText) === count) {
        button.classList.add("toggle");
      } else {
        if (button.classList.contains("toggle"))
          button.classList.remove("toggle");
      }
    }
  }

  update(data) {
    console.log("num of people Status:", data);
    this.#handleSelectedBtn(data);
  }
}

const numOfPeopleSubject = new NumOfPeopleSubject();
const numOfPeopleObserver = new NumOfPeopleObserver();
const seatObserver = new SeatObserver();
const handicapCheckObserver = new HandicapCheckObserver();

numOfPeopleSubject.addObserver(numOfPeopleObserver);
numOfPeopleSubject.addObserver(seatObserver);
numOfPeopleSubject.addObserver(handicapCheckObserver);

export const addSelectNumOfPeopleHandler = () => {
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
