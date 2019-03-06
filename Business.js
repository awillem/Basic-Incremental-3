class Business {
  constructor(cost, time, earnings, costInc) {
    this.owned = 0;
    // this.startingCost = cost;
    this.currentCost = cost;
    this.costs = [];
    this.maxCost = [];
    this.costInc = costInc;
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
   Methods
  */

  /* 
    In an incremental game, the cost for each successive buy increases.  
    This method takes in the cost to buy the last purchased and then multiplies 
    that amount by 4-6% to get the next cost
    Creates an array of 4 arrays for this.costs.  Each array is for one of the different multiplier levels.  It includes the total cost to buy at that level and what the last purchased business would cost. (eventually will get set to this.currentCost when purchase is made).
  */
  calcCosts() {
    this.costs = [];
    let current = this.currentCost;
    let buyingNum = this.owned;
    let levels = [];
    
    do {
      buyingNum += 1;
      if (this.owned === 0 && buyingNum === 1)  {
        levels.push(current);
      } else {
        // if (buyingNum > 1 && buyingNum < 26) {
        //   current = parseFloat((current * 1.04).toFixed(2));
        // } else if (buyingNum > 25 && buyingNum < 51) {
        //   current = parseFloat((current *1.045).toFixed(2));
        // } else if (buyingNum > 50 && buyingNum < 101 ) {
        //   current = parseFloat((current * 1.05).toFixed(2));
        // } else {
        //   current  = parseFloat((current * 1.06).toFixed(2));
        // }
        current = parseFloat((current * this.costInc).toFixed(2));
        
        levels.push(current);
      }
    } while (levels.length < 100);
    // console.log(levels[0],levels[9],levels[24],levels[99]);
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
    this.costs.push([a, levels[0]],[b, levels[9]],[c, levels[24]],[d, levels[99]]);
    // console.log(this.costs);
  }

  // Will eventually add a max multiplier

//   calcMax() {
//     let current = this.currentCost;
//     let buyingNum = this.owned;
//     let bought = 0;
//     let levels = 0;
//     if (current <= totalCash){
//     while (levels < totalCash) {
//       buyingNum += 1;
//       if (this.owned === 0)  {
//         levels += current;
//         // first = false;
//       } else {
//         if (buyingNum > 1 && buyingNum < 26) {
//           levels += parseFloat((current * 1.04).toFixed(2));
//         } else if (buyingNum > 25 && buyingNum < 51) {
//           levels += parseFloat((current *1.045).toFixed(2));
//         } else if (buyingNum > 50 && buyingNum < 101 ) {
//           levels += parseFloat((current * 1.05).toFixed(2));
//         } else {
//           levels  += parseFloat((current * 1.06).toFixed(2));
//         }
        
//       }
//       bought ++;
//     } 

//     this.maxCost.push([levels, bought]);
//     console.log(this.maxCost);
//   } else {
//     this.maxCost.push([current, 1]);
//   }
// }

  // changeCurrentCost(level) {    
  //     this.currentCost = this.costs[level][1];
  // }


  /*
    Takes in the multiplier number.  
    If this the first purchase of this business, a timestamp is set, which is then reset each time an earnings cycle completes.
    It increases owned by the multiplier number.  Subtracts the cost from totalCash.  Updates the earnings amount.  Sets currentCost to the cost of the highest purchased business.  and then recalcs costs. 
  */
  buyBusiness(multiple) {
    let level = [1,10,25,100].indexOf(eval(multiple));
    if (this.owned === 0) {
      this.setTimestamp();
    }
    // if (this.costs[level][0] <= totalCash) {
      this.owned += parseInt(multiple);
      totalCash -= this.costs[level][0];
      this.setEarnings();
      // this.currentCost = this.changeCurrentCost(level);
      this.currentCost = this.costs[level][1];
      this.calcCosts();
    // }
  }

  // Sets the earnings based on the amount owned.
  setEarnings() {
    this.earningsPer = parseFloat(
      (this.earningsBase * this.owned * this.multiplier).toFixed(2)
    );
  }

  // This gets called in the requestAnimationFrame, so it is running constantly
  // Checks if the time since the last earning is greater than the totalTime.
  // If true, it adds the earnings to totalCash and resets the time stamp.
  earn(newTime) {
    if (newTime - this.timestampStart >= this.totalTime) {
      totalCash += this.earningsPer;
      this.timestampStart = newTime;
    }
  }

  // Updates the time percent which is used for the preloaders.
  incrementTimePercent() {
    this.timePercent =
      (performance.now() - this.timestampStart) / this.totalTime;

    // console.log(this.timePercent, performance.now(), this.timestampStart,this.totalTime);
  }

  // sets the timestamp with performance, which usings the same high resolution timestamp as the requestAnimationFrame.  This timer started when requestAnimationFrame was started, so it is different than the milliseconds you would get from a Date object. 
  setTimestamp() {
    this.timestampStart = performance.now();
  }
}
