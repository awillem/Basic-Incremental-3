/*
  UI Class
  This class will be what actually makes changes to elements within the DOM
*/

class UI {
  constructor() {
    this.lemonade = true;
    this.candy = true;
    this.coffee = true;
    this.pizza = true;
    this.game = true;
    this.pet = true;
    this.eye = true;
    this.computer = true;
    this.dragon = true;
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

  updatePreloader(businesses) {
    businesses.forEach((bus, i) => {
      let percent = eval(bus).timePercent * 100;
      if (eval(bus).totalTime <= 2000){
        if (percent > 65 ) {
          percent = 100;
        } else if (percent < 35) {
          percent = 1;
        }
      } else if (eval(bus).totalTime <= 5000){
        if (percent > 85 ) {
          percent = 100;
        } else if (percent < 15) {
          percent = 1;
        }
      } else if (eval(bus).totalTime <= 25000){
        if (percent > 95) {
          percent = 100;
        } else if (percent < 5) {
          percent = 1;
        }
      }else if (eval(bus).totalTime <= 100000){
        if (percent > 97) {
          percent = 100;
        } else if (percent < 3) {
          percent = 1;
        }
      }/*else {*/
      //   if (percent > 99) {
      //     percent = 100;
      //   } else if (percent < 1) {
      //     percent = 0;
      //   }
      // }
        preloaders[i].style.width = percent + '%';
      
    });

    
  }

  updateCash() {
    cashOnScreen.innerText = totalCash;
  }

  updateTime() {

  }
}