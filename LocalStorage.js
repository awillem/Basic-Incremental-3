class LocalStorage {

  // Set Storage
    setStore (businesses) {
      let day = new Date();
      localStorage.setItem('time', JSON.stringify(day.getTime()));
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
        eval(bus).milestone = data.milestone;
      });
    }

  // Create earnings when game is re-opened 
    createEarnings(businesses) {
      let timeNow = new Date();
      let timeThen = JSON.parse(localStorage.getItem("time"));
      let diff = timeNow.getTime() - timeThen;
      if (diff > (12*60*60*1000)) {
        diff = 12*60*60*1000;
      }
      let earnings = 0;
      businesses.forEach( bus => {
        earnings += (Math.floor(diff/eval(bus).totalTime)) * eval(bus).earningsPer;
      });
      if (earnings > 0) {
        totalCash += earnings;
        ui.updateCash();
        setTimeout(() => {
          alert(`You earned ${earnings} while you were away!`);
        }, 500);
        
      }
    }

    clearStorage() {
      localStorage.clear();
    }
}