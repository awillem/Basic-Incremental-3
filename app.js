

// Initialize classes
const ui = new UI();
//cost, time, earnings
const lemonade = new Business(10, 5, 5.0);
lemonade.calcCosts();
const candy = new Business(100, 10, 25.0);
candy.calcCosts();
const coffee = new Business(1000, 25, 50.0);
coffee.calcCosts();
const pizzaria = new Business(5000, 40, 100.0);
pizzaria.calcCosts();
const gameStore = new Business(10000, 60, 200.0);
gameStore.calcCosts();
const pet = new Business(25000, 90, 500.0);
pet.calcCosts();
const eyeGlass = new Business(100000, 120, 1000.0);
eyeGlass.calcCosts();
const computer = new Business(250000, 180, 10000.0);
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

buyMultipliersUl.addEventListener("click", e => {
  ui.updateBuyMultiplier(e);
});

game.addEventListener("click", e => {
  if (e.target.className === "btn") {
    let businessIndex = buttons.indexOf(e.target);
    let bus = businesses[businessIndex];
    if (eval(bus).currentCost < totalCash) {
      eval(bus).buyBusiness(activeMultipier);
      ui.updateOwned(businessIndex);
      ui.updateEarnings(businessIndex);
      console.log(bus);
      // ui.updateCash();
    }
  }
});

// function for updating screen, called in requestanimationframe()
function update(timestamp) {
  ui.updateCash();
  // lemonade.incrementTimePercent();
  incTimePercent();
  // lemonade.earn(timestamp);
  businessEarn(timestamp);
  // ui.updatePreloader();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

setInterval(() => {
  ui.updatePreloader(businesses);
  changePreloader();
}, 50);


/*
  Functions
*/
function businessEarn(timestamp) {
  businesses.forEach(bus => {
    eval(bus).earn(timestamp);
  });
}

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

function changePreloader () {
  businesses.forEach((bus, i) => {
    if (eval(bus).totalTime < 1000) {
      preloaders[i].className = 'indeterminate pink';
    }
  });
}
