class LocalStorage {

  // Set Storage
    setStore (businesses) {
      businesses.forEach( bus => {
        localStorage.setItem(bus, JSON.stringify(eval(bus)));
      });
      localStorage.setItem('totalCash', JSON.stringify(totalCash));
      
    }

  // Get Storage
    getStore (businesses) {
      totalCash = JSON.parse(localStorage.getItem('totalCash'));

      businesses.forEach( bus => {
        let data = JSON.parse(localStorage.getItem(bus));
        // set data on business
        eval(bus).owned = data.owned;
        eval(bus).currentCost = data.currentCost;
        eval(bus).costs = data.costs;
        eval(bus).maxCost = data.maxCost;
        eval(bus).totalTime = data.totalTime;
        eval(bus).multiplier = data.multiplier;
        eval(bus).earningsBase = data.earningsBase;
        eval(bus).earningsPer = data.earningsPer;
      });
    }

}