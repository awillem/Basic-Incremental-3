/*
  UI Class
  This class will be what actually makes changes to elements within the DOM
*/

class UI {
  constructor() {
    // this.lemonade = 0;
    // this.candy = 1;
    // this.coffee = 2;
    // this.pizza = 3;
    // this.game = 4;
    // this.pet = 5;
    // this.eye = 6;
    // this.computer = 7;
    // this.dragon = 8;
  }

  /*
  Possible Methods
  */


  updateOwned(businessIndex) {
    let bus = businesses[businessIndex];
    console.log(eval(bus).owned);
    // console.log(`${bus}`[owned]);

    ownedSpans[businessIndex].innerText = eval(bus).owned;
  }

  updateEarnings(businessIndex) {
    let bus = businesses[businessIndex];
    earningAmt[businessIndex].innerText = eval(bus).earningsPer;
  }

/* 
  Updates the buy multipliers (1, 10, 25, 100, max)
  called when a player clicks on a new multiplier.
  Changes the clicked multipler to have the active class
  Sets activeMultiplier variable to the new multipler
*/

  updateBuyMultiplier(e) {
    buyMultipliers.forEach((multiplier, index) => {
      if(index !== 0) {
        multiplier.classList.remove('active');
      }
    });
    e.target.parentElement.classList.add('active');
    activeMultipier = e.target.innerText;
    // TO DO - update buy cost
    // TO DO - update buy button
    businessCostMultiplier.forEach(button => {
      if (activeMultipier === "max") {
        // add max business # in parens
      } else {
        button.innerText = activeMultipier;
      }
    });
  }

  updateCost() {

  }

  updatePreloader() {

  }

  updateCash() {
    cashOnScreen.innerText = totalCash;
  }

  updateTime() {

  }
}