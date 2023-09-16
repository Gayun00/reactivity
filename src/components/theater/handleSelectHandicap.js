import ObserverSubject from "../../utils/ObserverSubject.js";

const handicapCheckbox = document.querySelector("#checkHandicap");

export class HandicapCheckSubject extends ObserverSubject {
  constructor() {
    super();
    this.isHandicapChecked = false;
  }

  updateStatus() {
    this.isHandicapChecked = !this.isHandicapChecked;
    super.notify(this.isHandicapChecked);
  }
}

export class HandicapCheckObserver {
  #handleCheckboxEnable(isEnabled) {
    handicapCheckbox.disabled = !isEnabled;
  }

  update({ numOfPeople, selectedSeats }) {
    if (numOfPeople) {
      const totalNum = Object.values(numOfPeople).reduce(
        (acc, curr) => (acc += curr),
        0
      );
      if (totalNum > 0 && totalNum <= 4) {
        this.#handleCheckboxEnable(true);
        return;
      }
      this.#handleCheckboxEnable(false);
    }

    if (selectedSeats) {
      if (selectedSeats.general || selectedSeats.musseukbox)
        this.#handleCheckboxEnable(false);
    }
  }
}

export const handleHandicapCheckHandler = () => {
  handicapCheckbox.addEventListener("click", () => {});
};
