class Business {

  constructor(cost, time, earnings) {
    this.owned = 0;
    this.currentCost = cost;
    this.costs = [];
    this.totalTime = time * 1000;
    this.timestampStart;
    this.timestampCurrent;
    this.timePercent = (this.timestampCurrent - this.timestampStart)/this.totalTime;
    this.multiplier = 1;
    this.earningsBase = parseFloat(earnings.toFixed(2));
    this.earningsPer = 0;
  }

  /*
  Possible Methods
  */

  calcCosts() {

  }

  changeCurrentCost() {
    
  }

  buyBusiness(multiple) {
    if (this.owned === 0) {
      this.setTimestamp();
    }
    if (this.currentCost <= totalCash) {
      this.owned += parseInt(multiple);
      totalCash -= this.currentCost;
      this.setEarnings();  
  }
}

  setEarnings() {
    this.earningsPer = parseFloat((this.earningsBase * this.owned * this.multiplier).toFixed(2));
  }

  earn(newTime) {
    if (newTime - this.timestampStart >= this.totalTime){
      totalCash += this.earningsPer;
    }
  }


  increment() {

  }

  setTimestamp() {
    let date = new Date();
    this.timestampStart = date.getTime();
  }

}