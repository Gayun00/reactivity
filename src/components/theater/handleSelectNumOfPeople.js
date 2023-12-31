import ObserverSubject from "../../utils/ObserverSubject.js";
import { HandicapCheckObserver } from "./handleSelectHandicap.js";
import SeatObserver, { SeatSubject } from "./handleSelectSeats.js";

const adultBtnSection = document.querySelector("#adultBtn");
const youthBtnSection = document.querySelector("#youthBtn");
const handicapCheckbox = document.querySelector("#checkHandicap");

export class NumOfPeopleSubject extends ObserverSubject {
  constructor() {
    super();
    this.numOfPeople = {
      adult: 0,
      youth: 0,
    };
    this.init();

    if (NumOfPeopleSubject.instance) return;
    NumOfPeopleSubject.instance = this;
  }

  static getInstace() {
    if (!this.instance) {
      this.instance = new NumOfPeopleSubject();
    }
    return this.instance;
  }

  init() {
    setTimeout(() => {
      super.notify({ numOfPeople: this.numOfPeople });
    }, 0);
  }

  get totalCount() {
    return Object.values(this.numOfPeople).reduce(
      (acc, curr) => (acc += curr),
      0
    );
  }

  get numOfPeopleData() {
    return this.numOfPeople;
  }

  resetNum() {
    this.numOfPeople = {
      adult: 0,
      youth: 0,
    };
    super.notify({ numOfPeople: this.numOfPeople });
  }

  updateNumSelection(age, count) {
    this.#handleChangeNumOfPeople(age, count);
    this.numOfPeople[age] = count;
    super.notify({ numOfPeople: this.numOfPeople });
  }

  #handleChangeNumOfPeople(age, count) {
    const updateCount = { ...this.numOfPeople, [age]: count };
    const updatedTotalCount = Object.values(updateCount).reduce(
      (acc, curr) => (acc += curr),
      0
    );
    const selectedSeatCount = SeatSubject.getInstace().selectedSeats.length;

    if (updatedTotalCount < selectedSeatCount) {
      window.alert(`선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?`);
      SeatSubject.getInstace().resetSelectedSeats();
    }
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

  update({ numOfPeople }) {
    this.#handleSelectedBtn(numOfPeople);
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
