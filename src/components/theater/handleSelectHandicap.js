import ObserverSubject from "../../utils/ObserverSubject.js";
import { resetSelectedSeats } from "./handleSelectSeats.js";

const handicapCheckbox = document.querySelector("#checkHandicap");
const handicapSeats = document.querySelectorAll(".seat.handicap");

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

const handleCancelHandicapSeat = () => {
  let hasSelectedSeat = false;

  if (handicapCheckbox.checked) return;

  for (const seat of handicapSeats) {
    if (seat.classList.contains("clicked")) {
      hasSelectedSeat = true;
    }
  }

  if (!hasSelectedSeat) return;

  window.alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
  resetSelectedSeats();
};

export const handleHandicapCheckHandler = () => {
  handicapCheckbox.addEventListener("click", () => {
    handleCancelHandicapSeat();
  });
};
