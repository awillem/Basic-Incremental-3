// Initialize classes
const ui = new UI();
//cost, time, earnings
const lemonade = new Business(10, 5, 5.00);
const candy = new Business(100, 10, 25.00);
const coffee = new Business(1000, 25, 50.00);
const pizzaria = new Business(5000, 40, 100.00);
const gameStore = new Business(10000, 60, 200.00);
const pet = new Business(25000, 90, 500.00);
const eyeGlass = new Business(100000, 120, 1000.00);
const computer = new Business(250000, 180, 10000.00);
const dragon = new Business(1000000, 240, 100000.00);

/*
   Global Variables 
*/
const businesses = [
  "lemonade", "candy", "coffee", "pizzaria", "gameStore", "pet", "eyeGlass", "computer", "dragon"
]
let cashOnScreen = document.getElementById('total-money');
let totalCash = parseFloat(document.querySelector('#total-money').innerText);
const buyMultipliersUl = document.getElementById('nav-mobile');
const buyMultipliers = Array.from(document.getElementById('nav-mobile').children);
let activeMultipier = parseInt(buyMultipliers[1].innerText);
const game = document.getElementById('game-cards');
const businessCards = Array.from(document.getElementsByClassName('card-content'));
const ownedSpans = Array.from(document.getElementsByClassName('owned'));
const earningAmt = Array.from(document.getElementsByClassName('earnings'));
const earningTime = Array.from(document.getElementsByClassName('time'));
const businessMultiplier = Array.from(document.getElementsByClassName('multiplier'));
const businessCostMultiplier = Array.from(document.getElementsByClassName('multiples'));
const businessCost = Array.from(document.getElementsByClassName('cost'));
const buttons = Array.from(document.getElementsByClassName('btn'));


/*
  Event Listeners
*/

buyMultipliersUl.addEventListener('click', e => {
    ui.updateBuyMultiplier(e);
});

game.addEventListener('click', e => {
  if (e.target.className === 'btn'){
    let businessIndex = buttons.indexOf(e.target);
    let bus = businesses[businessIndex];
    eval(bus).buyBusiness(activeMultipier);
    ui.updateOwned(businessIndex);
    ui.updateEarnings(businessIndex);
    console.log(cashOnScreen);
    ui.updateCash();
  }
});


// console.log(buyMultipliersUl);

