
//variables
var score = 0
var count = 0
var cardOne
var cardTwo
var numberOfMoves=0;
var timeout = window.setTimeout();
var cards=$(".card");
var gameCount = 0;
var winCount = 0;
cards=shuffleCards(cards);

/*!
 * jQuery UI Effects Shake 1.11.2
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 */

//this function shuffles the cards

function shuffleCards(cards){
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
	}
	cards.each(function(index,card){
		$(".game").prepend(card);
	});
	return cards;
};

//resets and displays the stats score, number of moves, and resets the taunting text 
function displayStats() {
	numberOfMoves = 0
	score = 0
	$(".score").text(score);
	$(".turn-counter").text(numberOfMoves);
	$(".turn").text("Click a card to begin");
	$(".winnertext").css("display", "none");
}
function newGame(){
	//if any cards have been put out of play when new game is clicked, it turns off
	//out-of-play, and also adds hidden back on
	

	$(".out-of-play").toggleClass("out-of-play");
	$(".hidden").toggleClass("hidden");

	setTimeout(function(){
	shuffleCards(cards);
}, 1000);

	setTimeout(function(){
	$(".card").addClass("hidden");
}, 2000);


	//if kardashian was in play, toggles that back out
	$(".kardashian").toggleClass("fatcat", "kardashian");
	//if new game is clicked when any cards are turned over, it removes the visible marker
	$(".visible").toggleClass("visible");
	//removes the winning background
	$("body").removeClass("winning");
	gameCount += 1;
	if(gameCount == 3&&winCount == 3){
		$(".fatcat").addClass("kardashian");
		$(".fatcat").toggleClass("fatcat");
	};
	
	//refreshes the view of the stats, resets them all to zero
	displayStats();
}

$( document ).click(function() {
  $(".cards").effect("shake");
});
//NEW GAME on clicking the start button, shuffles the cards, resets the variables to 0, resets the stats

$("#start").on("click", function(){
	newGame()
	
});

//flips selected card over
$(".card").on("click",function(e){
	
	//keeps track of how many cards have been flipped over
	if($(this).hasClass("visible") == false){
		count += 1
//reveals the flipped over cards


$(e.target).toggleClass("hidden visible");
	 //assigns the variables the classes of the flipped over cards 
	 cardOne = $(".visible").eq(0).attr("class");
	 cardTwo = $(".visible").eq(1).attr("class");
	 console.log(count)
//if two cards are flipped, checks if they match
if(count == 2){
	numberOfMoves++;
	setTimeout(function() {
		if(cardOne == cardTwo){
//hides the matching cards, adds one to the score
$(".visible").addClass("out-of-play");
score += 1
$(".turn").text("match!!!!!");
if(score == 5) {
	$(".winnertext").css("display", "block")
	$(".visible").addClass("hidden");
	$("body").addClass("winning");
	winCount += 1
}
}
else {
 				//if they don't match, turn them over again by adding the hidden class
 				$(".visible").addClass("hidden");
 				$(".turn").text("try again, loser");
 			}
 			$(".score").text(score);
 			$(".turn-counter").text(numberOfMoves);
	//remove the visible class, which is really just a marker and has no styling attached to it
	$(".visible").toggleClass("visible")
	count = 0

}, 750);
}
}
});



 //if e.target child one matches e.target child two,
	 //add 1 to score
	 //add class hidden to e.target (the div)
	 //else display alert try again
	 //add class hidden to e.target children


/* randomly assign colors to the cards on the board
when card is clicked, reveal card color
when second card is clicked, check if colors match
if card one color matches card two color, both cards disappear and add 1 to score
else, turn cards over 


	IDEAS
create arrays of different themes of cards
cupcakes
kittens
memes
mr. universe from different years

make the background reflect the cards, do like a crazy sparkle background for the memes
maybe have a bigger set for each array than there are cards so that it shuffles through many different options
something really cool happens when you win.
prizes for winning in less turns

a little memory game generator that lets you type in a list of 5 things, then it automatically like fetches picture of those things somehow and shuffles them into the cards
*/

