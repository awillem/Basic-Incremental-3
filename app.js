

// Initialize classes
const ui = new UI();
//cost, time, earnings
const lemonade = new Business(10, 5, 5.0);
lemonade.calcCosts();
const candy = new Business(100, 10, 50.0);
candy.calcCosts();
const coffee = new Business(1000, 25, 100.0);
coffee.calcCosts();
const pizzaria = new Business(5000, 40, 250.0);
pizzaria.calcCosts();
const gameStore = new Business(10000, 60, 500.0);
gameStore.calcCosts();
const pet = new Business(25000, 90, 1000.0);
pet.calcCosts();
const eyeGlass = new Business(100000, 120, 2500.0);
eyeGlass.calcCosts();
const computer = new Business(250000, 180, 15000.0);
computer.calcCosts();
const dragon = new Business(1000000, 240, 100000.0);
dragon.calcCosts();


/*
   Global Variables 
*/
const businesses = [
  "lemonade",
  "candy",
  "coffee",
  "pizzaria",
  "gameStore",
  "pet",
  "eyeGlass",
  "computer",
  "dragon"
];
let cashOnScreen = document.getElementById("total-money");
let totalCash = parseFloat(document.querySelector("#total-money").innerText);
const buyMultipliersUl = document.getElementById("nav-mobile");
const buyMultipliers = Array.from(
  document.getElementById("nav-mobile").children
);
let activeMultipier = parseInt(buyMultipliers[1].innerText);
const game = document.getElementById("game-cards");
const businessCards = Array.from(
  document.getElementsByClassName("card-content")
);
const ownedSpans = Array.from(document.getElementsByClassName("owned"));
const earningAmt = Array.from(document.getElementsByClassName("earnings"));
const earningTime = Array.from(document.getElementsByClassName("time"));
const businessMultiplier = Array.from(
  document.getElementsByClassName("multiplier")
);
const businessCostMultiplier = Array.from(
  document.getElementsByClassName("multiples")
);
const businessCost = Array.from(document.getElementsByClassName("cost"));
const buttons = Array.from(document.getElementsByClassName("btn"));
const preloaders = Array.from(document.getElementsByClassName("determinate"));

/*
  Event Listeners
*/

// Listens for click on the Buy Amount.  
//  Updates the target to be the activeMultiplier and updates costs for each business
buyMultipliersUl.addEventListener("click", e => {
  ui.updateBuyMultiplier(e);
  ui.updateCost(activeMultipier, businesses);
});

// Listens for clicks on the "Buy buttons".  
// Calls the business's buyBusiness method
// updates the Owned, Earnings, and Cost for that business
game.addEventListener("click", e => {
  if (e.target.className === "btn") {
    let businessIndex = buttons.indexOf(e.target);
    let bus = businesses[businessIndex];
      eval(bus).buyBusiness(activeMultipier);
      ui.updateOwned(businessIndex);
      ui.updateEarnings(businessIndex);
      ui.updateCost(activeMultipier,businesses);
  }
});

/*
  this function is called recursively with the requestAnimationFrame() method
  that method fires at the refresh rate of the monitor, hopefully close to 60fps
  It has access to a high-resolution timestamp
  The function calls both UI methods and helper functions to keep things updated on screen
*/
function update(timestamp) {
  ui.updateDisableButton();
  ui.updateCash();
  incTimePercent();
  businessEarn(timestamp);
  // ui.updatePreloader();
  // if (activeMultipier === 'max') {
  //   ui.updateMax(businesses);
  // }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// The preloaders did not run smoothly when called with requestAnimationFrame.
// This set Interval updates the preloaders 20 times per second
// The preloaders still need some work to run smoothly.

setInterval(() => {
  ui.updatePreloader(businesses);
  changePreloader();
}, 50);


/*
  Functions
*/

// Calls the earn method on each business.  Runs constantly with requestAnimationFrame
function businessEarn(timestamp) {
  businesses.forEach(bus => {
    eval(bus).earn(timestamp);
  });
}

// Calls the method that keeps track of the time between earnings for each business. This percent is what runs the preloaders.
function incTimePercent(){
  lemonade.incrementTimePercent();
  candy.incrementTimePercent();
  coffee.incrementTimePercent();
  pizzaria.incrementTimePercent();
  gameStore.incrementTimePercent();
  pet.incrementTimePercent();
  eyeGlass.incrementTimePercent();
  computer.incrementTimePercent();
  dragon.incrementTimePercent();
}

// Eventually there will be ways to reduce the earnings cycle time for businesses.  If a business goes below 1 second, it changes the preloader to one that runs constantly. 
function changePreloader () {
  businesses.forEach((bus, i) => {
    if (eval(bus).totalTime < 1000) {
      preloaders[i].className = 'indeterminate pink';
    }
  });
}
