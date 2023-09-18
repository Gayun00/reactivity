import { NumOfPeopleSubject } from "./handleSelectNumOfPeople.js";
const amountSection = document.querySelector("#amount");

const ticketPrices = {
  adult: 10000,
  youth: 7000,
  handicap: 5000,
};

const musseukDiscountRate = 0.2;

export class TicketPriceObserver {
  update({ selectedSeats }) {
    this.#calculatePrice(selectedSeats);
  }

  #calculatePrice(selectedSeats) {
    const numOfPeople = NumOfPeopleSubject.getInstace().numOfPeopleData;
    const ageList = [];
    let totalPrice = 0;

    for (const key in numOfPeople) {
      if (numOfPeople.hasOwnProperty(key)) {
        for (let i = 0; i < numOfPeople[key]; i++) {
          ageList.push(key);
        }
      }
    }

    for (let i = 0; i < selectedSeats.length; i++) {
      const age = ageList[i];
      const isMusseuk = selectedSeats[i].seatType === "musseukbox";
      if (isMusseuk) {
        totalPrice += ticketPrices[age] * (1 - musseukDiscountRate);
      } else {
        totalPrice += ticketPrices[age];
      }
    }

    amountSection.innerText = totalPrice;
  }
}
