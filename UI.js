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
   Methods
  */

// Called when business is purchased.  
  updateOwned(businessIndex) {
    let bus = businesses[businessIndex];
    ownedSpans[businessIndex].innerText = eval(bus).owned;
  }

  // Called when business is purchased.  
  updateEarnings(businessIndex) {
    let bus = businesses[businessIndex];
    if (eval(bus).earningsPer === 0){
      earningAmt[businessIndex].innerText = eval(bus).earningsBase;
    } else {
      earningAmt[businessIndex].innerText = eval(bus).earningsPer;
    }
  }

/* 
  Updates the buy multipliers (1, 10, 25, 100, max)
  called when a player clicks on a new multiplier.
  Changes the clicked multipler to have the active class
  Sets activeMultiplier variable to the new multipler
*/

  updateBuyMultiplier(e) {
    if (window.innerWidth > 992){
      buyMultipliersNav.forEach((multiplier, index) => {
        if(index !== 0) {
          multiplier.classList.remove('active');
        }
      });
    } else {
      buyMultipliersNavMobile.forEach((multiplier, index) => {
        if(index !== 0) {
          multiplier.classList.remove('active');
        }
      });
    }
    e.target.parentElement.classList.add('active');
    activeMultipier = e.target.innerText;
    businessCostMultiplier.forEach(button => {
      if (activeMultipier === "max") {
        // add max business # in parens
      } else {
        button.innerText = activeMultipier;
      }
    });
  }

  // Called when business is purchased or when Buy Amt multiplier changes. 
  updateCost(multiplier, bus) {
    if (multiplier !== 'max'){
      let level = [1,10,25,100].indexOf(eval(multiplier));
      businessCost.forEach((cost,index) => {
        cost.innerText = eval(bus[index]).costs[level][0];
      });
    }
  }

  // updateMax(businesses) {
  //   businesses.forEach((bus, index) => {
  //     eval(bus).calcMax();
  //   });
    
  //   businessCost.forEach((cost,index) => {
  //     console.log(businesses[index].maxCost[1]);
  //     cost.innerText = eval(businesses[index]).maxCost[0];
  //   });
  //   buttons.forEach((button, index) => {
  //     button.innerText = eval(businesses[index]).maxCost[1];
  //   });
  // }

  /* 
    updates the style.width of each preloader after the first business is bought. 
    Was having issues with the preloaders never making it to 100%, and not getting down to 0% when it reset.
    This method bumps up the percent to 100% or down to 1% depending on how close it is to finishing.  The longer the business timer runs, the less it needs to be adjusted.
  */
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

  // Updates Total Cash.
  updateCash() {
    cashOnScreen.innerText = parseFloat(totalCash.toFixed(2));
  }

  // For each business, looks to see if there is enough money to buy at the current
  // multiplier level.  If not, it disables the button.
  updateDisableButton () {
    buttons.forEach((button, index) => {
      if(businessCost[index].innerText > totalCash) {
        button.classList.add('disabled');
      } else {
        button.classList.remove('disabled');
      }
      
    });
  }

  // Used to set times when information is retrieved from localStorage
  setTimestamp (businesses) {
    businesses.forEach( bus => {
      if (eval(bus).owned > 0){
        eval(bus).setTimestamp();
        }
    });
  }
}