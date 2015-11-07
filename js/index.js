
//variables
var score = 0;
var count = 0;
var cardOne;
var cardTwo;
var numberOfMoves=0;
var timeoutID //= window.setTimeout();
var cards = $(".card");
var gameCount = 0;
var winCount = 0;
cards=shuffleCards(cards);

// Init Skrollr
var s = skrollr.init({
    forceHeight: false
});

$( document ).ready(function(){
	// Check for touch
    if(Modernizr.touch) {
 
        // Init Skrollr
        var s = skrollr.init();
        s.destroy();
    };
});

//push the start button, run the shuffle sequence
$("#start").on("click", function(){
	newGame();
});

//the game sequence
////////////////////////////////////////////////////////////////////
$(".card").on("click",function(e){;
	if($('.visible').length < 2){
	//keeps track of how many cards have been flipped over
	count ++
	if($(this).hasClass("visible") == false){
			//reveals the flipped over cards
		$(e.target).toggleClass("hidden visible");
		//assigns the variables the classes of the flipped over cards 
		cardOne = $(".visible").eq(0).attr("class");
		cardTwo = $(".visible").eq(1).attr("class");
		};
		//if two cards are flipped, checks if they match
		if(count == 2){
			numberOfMoves++;
			setTimeout(compareCards, 750);
		};
	}
});

//this function shuffles the cards
function shuffleCards(cards){
	// maybe dont need to re-assign variable
	var cards=$(".card");
	var currentIndex = cards.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = cards[currentIndex];
		cards[currentIndex] = cards[randomIndex];
		cards[randomIndex] = temporaryValue;
	};
	cards.each(function(index,card){
		$(".game").prepend(card);
	});
	return cards;
};

function newGame(){

//if new game is clicked when any cards are turned over, it removes the visible marker
	$(".visible").toggleClass("visible");
//removes the winning background -- getting rid of that until I find a better background image
	//$("body").removeClass("winning");
	//if any cards have been put out of play when new game is clicked, it turns off
	//out-of-play, and also adds hidden back on
	$(".out-of-play").toggleClass("out-of-play");
	$(".hidden").toggleClass("hidden");
//these timeouts give you the flash of visible cards
	setTimeout(
		shuffleBounce, 250);
	setTimeout(resetCards, 2000);
//ups the game count
	gameCount += 1;
//if you win 3 times in a row, adds a surprise card
	setTimeout(easterEgg, 2000);
//refreshes the view of the stats, resets them all to zero
	displayStats();
};

//resets and displays the stats score, number of moves, and resets the taunting text 
function displayStats() {
	numberOfMoves = 0;
	score = 0;
	$(".score").text(score);
	$(".turn-counter").text(numberOfMoves);
	$(".turn").text("Click a card to begin");
	$(".winnertext").css("display", "none");
};
function shuffleBounce(){
	shuffleCards(cards);
	/* off for now
	$(".card").effect("bounce", "slow")*/
};
function resetCards(){
	$(".card").addClass("hidden");
};
function compareCards() {
	if(cardOne == cardTwo){
		matched();
	} else {
		mismatch();
	};
	if(score === 5) {
		youWin()
	};
	$(".score").text(score);
	$(".turn-counter").text(numberOfMoves);
//remove the visible class, which is really just a marker and has no styling attached to it
	$(".visible").toggleClass("visible");
	count = 0;
};

function mismatch() {
	//if they don't match, turn them over again by adding the hidden class
	/* off for now
	$(".visible").effect("shake", "medium");*/
	$(".visible").addClass("hidden");
	$(".turn").text("try again, loser");

};

function matched() {
	//hides the matching cards, adds one to the score
		$(".visible").addClass("out-of-play");
		score += 1;
		$(".turn").text("match!!!!!");
};

function youWin() {
			$(".winnertext").css("display", "block")
			$(".visible").addClass("hidden");
			//$("body").addClass("winning");
			winCount += 1;
		};
function easterEgg() {
	if ( (winCount === 5)  ) {
	
		$(".fatcat").addClass("kardashian");
		$(".fatcat").removeClass("fatcat");
	} else {
	
		//if kardashian was in play, toggles that back out
		$(".kardashian").addClass("fatcat");
		$(".kardashian").removeClass("kardashian");
	};
}
function adjustWindow(){
    // Get window size
    winH = $(window).height();
    winW = $(window).width();
     
    // Keep minimum height 550
    if(winH <= 550) {
        winH = 550;
    }
     
    // Init Skrollr for 768 and up
    if( winW >= 768) {
 
        // Init Skrollr
        var s = skrollr.init({
            forceHeight: false
        });
 
        // Resize our slides
        //$(slide).height(winH);
 
        //s.refresh($('.homeSlide'));
 
    } else {
 
        // Init Skrollr
        var s = skrollr.init();
        s.destroy();
    }
 
    // Check for touch
    if(Modernizr.touch) {
 
        // Init Skrollr
        var s = skrollr.init();
        s.destroy();
    }
 
};
  
function initAdjustWindow() {
    return {
        match : function() {
            adjustWindow();
        },
        unmatch : function() {
            adjustWindow();
        }
    };
};
 
enquire.register("screen and (min-width : 768px)", initAdjustWindow(), false);


