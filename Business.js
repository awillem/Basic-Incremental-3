class Business {
  constructor(cost, time, earnings) {
    this.owned = 0;
    this.currentCost = cost;
    this.costs = [];
    this.totalTime = time * 1000;
    this.timestampStart;
    this.timestampCurrent;
    this.timePercent =
      (this.timestampCurrent - this.timestampStart) / this.totalTime;
    this.multiplier = 1;
    this.earningsBase = parseFloat(earnings.toFixed(2));
    this.earningsPer = 0;
  }

  /*
  Possible Methods
  */

  calcCosts() {
    this.costs = [];
    let current = this.currentCost;
    let first = true;
    let buyingNum = this.owned;
    let levels = [];
    
    do {
      buyingNum += 1;
      if (first)  {
        levels.push(current);
        first = false;
      } else {
        if (buyingNum > 1 && buyingNum < 26) {
          current *= 1.04;
        } else if (buyingNum > 25 && buyingNum < 51) {
          current *= 1.02;
        } else if (buyingNum > 50 && buyingNum < 101 ) {
          current *= 1.01;
        } else {
          current *= 1.008;
        }
        levels.push(current);
      }
    } while (levels.length < 101);
    let a = levels[0];
    let b = 0,
        c = 0,
        d = 0;
    
    
    for (let i = 0; i < levels.length; i++) {
      if (i < 10) {
        b += levels[i];
      }
      if (i < 25) {
        c += levels[i];
      }
      d += levels[i];
    }
    a = parseFloat(a.toFixed(2));
    b = parseFloat(b.toFixed(2));
    c = parseFloat(c.toFixed(2));
    d = parseFloat(d.toFixed(2));
    this.costs.push(a,b,c,d);
  }

  changeCurrentCost() {}

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
    this.earningsPer = parseFloat(
      (this.earningsBase * this.owned * this.multiplier).toFixed(2)
    );
  }

  earn(newTime) {
    if (newTime - this.timestampStart >= this.totalTime) {
      totalCash += this.earningsPer;
      this.timestampStart = newTime;
    }
  }

  incrementTimePercent() {
    this.timePercent =
      (performance.now() - this.timestampStart) / this.totalTime;

    // console.log(this.timePercent, performance.now(), this.timestampStart,this.totalTime);
  }

  setTimestamp() {
    this.timestampStart = performance.now();
  }
}
