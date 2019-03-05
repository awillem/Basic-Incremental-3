

//initialize classes
 const store = new LocalStorage();
 const ui = new UI();
 //cost, time, earnings
 const lemonade = new Business(10, 5, 5.0);
 const candy = new Business(100, 10, 50.0);
 const coffee = new Business(1000, 25, 100.0);
 const pizzaria = new Business(5000, 40, 250.0);
 const gameStore = new Business(10000, 60, 500.0);
 const pet = new Business(25000, 90, 1000.0);
 const eyeGlass = new Business(100000, 120, 2500.0);
 const computer = new Business(250000, 180, 15000.0);
 const dragon = new Business(1000000, 240, 100000.0);

window.addEventListener("load", () => {
  
  let test = JSON.parse(localStorage.getItem('lemonade')); 
  if (window.localStorage.length === 0 || test.costs.length === 0){ // if no local storage, calc Costs
    lemonade.calcCosts();
    candy.calcCosts();
    coffee.calcCosts();  
    pizzaria.calcCosts();  
    gameStore.calcCosts();  
    pet.calcCosts();  
    eyeGlass.calcCosts();  
    computer.calcCosts();  
    dragon.calcCosts();
    ui.updateCost(activeMultiplier,businesses);
  } else { // otherwise get info from storage
      // get local storage, parseJSON, set game variables with response.
      store.getStore(businesses);
      businesses.forEach( (bus,index) => {
        ui.updateOwned(index);
        ui.updateEarnings(index);
      });
      ui.updateCost(activeMultiplier,businesses);
      requestAnimationFrame((timestamp) => {
        ui.setTimestamp(businesses);
        update(timestamp);
      }); 
      store.createEarnings(businesses);
  }
  
   
});

// Initialize classes
// const ui = new UI();
// //cost, time, earnings
// const lemonade = new Business(10, 5, 5.0);
// lemonade.calcCosts();
// const candy = new Business(100, 10, 50.0);
// candy.calcCosts();
// const coffee = new Business(1000, 25, 100.0);
// coffee.calcCosts();
// const pizzaria = new Business(5000, 40, 250.0);
// pizzaria.calcCosts();
// const gameStore = new Business(10000, 60, 500.0);
// gameStore.calcCosts();
// const pet = new Business(25000, 90, 1000.0);
// pet.calcCosts();
// const eyeGlass = new Business(100000, 120, 2500.0);
// eyeGlass.calcCosts();
// const computer = new Business(250000, 180, 15000.0);
// computer.calcCosts();
// const dragon = new Business(1000000, 240, 100000.0);
// dragon.calcCosts();


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
// let buyMultipliers;
// let buyMultipliersUl;
// function changeNav () {
//   if (window.innerWidth > 992) {
//     buyMultipliersUl = document.getElementById("nav");
//     buyMultipliers = Array.from(document.getElementById("nav").children);
//   } else if (window.innerWidth < 993) {
//     buyMultipliersUl = document.getElementById("nav-mobile");
//     buyMultipliers = Array.from(document.getElementById("nav").children);
//   }
// }
// changeNav();

let buyMultipliersNav = Array.from(document.getElementById("nav").children);
let buyMultipliersUlNav = document.getElementById("nav");
let buyMultipliersNavMobile = Array.from(document.getElementById("nav-mobile").children);
let buyMultipliersUlNavMobile = document.getElementById("nav-mobile");
let activeMultiplier;
if (window.innerWidth > 992 ){
   activeMultiplier = parseInt(buyMultipliersNav[1].innerText);
} else {
   activeMultiplier = parseInt(buyMultipliersNavMobile[1].innerText);
}


/*
  Event Listeners
*/

// Updates buyMultiplierUl based on window size
window.addEventListener("resize", () => {
  let level = [1,10,25,100].indexOf(eval(activeMultiplier)) + 1;
    // if (window.innerWidth > 992 ) {
      simulateClick(buyMultipliersNav[level]);
    // } else {
      simulateClick(buyMultipliersNavMobile[level]);
    // }
});

// Listens for click on the Buy Amount.  
//  Updates the target to be the activeMultiplier and updates costs for each business
buyMultipliersUlNav.addEventListener("click", e => {
  // console.log(e.target.parentElement.parentElement);
  ui.updateBuyMultiplier(e);
  ui.updateCost(activeMultiplier, businesses);
});

buyMultipliersUlNavMobile.addEventListener("click", e => {
  // console.log(e.target.parentElement.parentElement);
  ui.updateBuyMultiplier(e);
  ui.updateCost(activeMultiplier, businesses);
});

// Listens for clicks on the "Buy buttons".  
// Calls the business's buyBusiness method
// updates the Owned, Earnings, and Cost for that business
game.addEventListener("click", e => {
  if (e.target.className === "btn") {
    let businessIndex = buttons.indexOf(e.target);
    let bus = businesses[businessIndex];
      eval(bus).buyBusiness(activeMultiplier);
      ui.updateOwned(businessIndex);
      ui.updateEarnings(businessIndex);
      ui.updateCost(activeMultiplier,businesses);
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
  // incTimePercent();
  businessEarn(timestamp);
  // ui.updatePreloader();
  // if (activeMultiplier === 'max') {
  //   ui.updateMax(businesses);
  // }
  requestAnimationFrame(update);
}

requestAnimationFrame((timestamp) => {
  update(timestamp);
});

// The preloaders did not run smoothly when called with requestAnimationFrame.
// This set Interval updates the preloaders 20 times per second
// The preloaders still need some work to run smoothly.

setInterval(() => {
  incTimePercent();

  ui.updatePreloader(businesses);
  changePreloader();
}, 50);

setInterval(() => {
  store.setStore(businesses);
}, 1000);


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


let simulateClick = function (elem) {
  let evt = new MouseEvent ('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  let canceled = !elem.dispatchEvent(evt);
}