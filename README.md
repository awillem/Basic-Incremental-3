# Basic Incremental/Idle Game
This will be a basic incremental type game.  Previously started and got some functionality, but restarted now that I know how to use a css framework. The goal of this game serves two purposes.  First, it provides a slightly diverting game to play that does most of the work for ou.  Second, it is givnig me a chance to work on my programing/JavaScript skills, which is the main reason I started working on it.  I'm hoping to use what I learning making this game, to make other games in the future. 

## Where to Play
[Basic Incremental Game](https://awillem.github.io/Basic-Incremental-3/)

## Where to Discuss
Want to discuss the game and the upcoming changes, or make suggestion.  Come check out the [Discord](https://discord.gg/BKjj9kC)

## Tech/framework used
**Built with:**
+ Plain JavaScript 
+ Materialize.css

**Basic Setup**
This game currently has 3 classes.  First is the Business class, which sets up each business with it's methods for costs, earnings, and timing.  Second is the UI class.  This is used to create methods that are called for updating what is seen on the screen.  Third is the LocalStorage class which saves a players game info in localStorage.  It also has a method that calculates up to 12 hours worth of earnings when a player re-opens the game.

## Roadmap

I have a lot of features or tweaks I would like to add to this game. 

+ *First round of balancing is done.  We'll see how it goes.* Balance out the earning and costs.  Right now, there are points where you make more money from a smaller business compared to a bigger business with the same amount owned.
+ Add a *Max Buy* option to the buy multiplier.
+ Add a milestone system that gives either time or multiplier bonus.  Example.  Lemonade reaches 25 owned, it reaches first milestone and now takes half the time to collect earnings.  (2.5 seconds vs 5 seconds).  At 50 owned, it gets a 2x multiplier.  
+ Adding a prestige system.  This would reset the game, but you would get prestige points, each of which gives a 5% bonus. 
+ Adding a stats page. Total Net Worth, total resets, etc.
+ Add a manager system
+ Add upgrade/bonuses to buy with in-game cash.  (This is a free game).

