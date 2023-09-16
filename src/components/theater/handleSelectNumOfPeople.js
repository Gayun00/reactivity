import ObserverSubject from "../../utils/ObserverSubject.js";
import { HandicapCheckObserver } from "./handleSelectHandicap.js";
import SeatObserver from "./handleSelectSeats.js";

const adultBtnSection = document.querySelector("#adultBtn");
const youthBtnSection = document.querySelector("#youthBtn");
const handicapCheckbox = document.querySelector("#checkHandicap");

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
    const totalNum = Object.values(numOfPeople).reduce(
      (acc, curr) => (acc += curr),
      0
    );
    if (handicapCheckbox.checked && totalNum >= 4) {
      window.alert(
        `머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.`
      );
      return;
    }
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
