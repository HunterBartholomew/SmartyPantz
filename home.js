$("#card").flip();
var title = [];
var front = [];
var back = [];
count = 0;
formCount = 0;
var deckName = document.getElementById("deck-name");

function init() {
	$("#current").append(front[count]);
	$(".back").append(back[count]);
	$("#deck-name").append(title[count]);
	if(deckName) {
        $(".home-title").css("display", "none");
        $(".navbar").css("display", "none");
		$(".select-deck").css("display", "none");
		// $(".deck-navbar").css("display", "block");
	}
}

<!--Movement Functions-->
function forward() {
	$("#current").empty()
	$(".back").empty();
	if(count >= front.length-1) {
		count = 0;
	} else {
		count++;
	}
	$("#current").append(front[count]);
	$(".back").append(back[count]);
	$("#card").flip(false);
	$("#deck").effect("shake", {distance:5}, "slow");
	borderMove();
}

function prev() {
	$("#current").empty()
	$(".back").empty();
	if(count <= 0) {
		count = front.length-1;
	} else {
		count--;
	}
	$("#current").append(front[count]);
	$(".back").append(back[count]);
	$("#card").flip(false);
}

function restart() {
	$("#current").empty()
	$(".back").empty();
	count = 0;
	$("#current").append(front[count]);
	$(".back").append(back[count]);
	$("#card").flip(false);
}

function shuffle() {

	// Both arrays should be the same length
	let counter = front.length;

	// Iterate over whole array
	while (counter > 0) {

		// Random index
		let index = Math.floor(Math.random() * counter);

		counter--;

		// Shuffle front
		let temp1 = front[counter];
		front[counter] = front[index];
		front[index] = temp1;

		// Shuffle back
		let temp2 = back[counter];
		back[counter] = back[index];
		back[index] = temp2;

	}
}

<!--Other funcs-->
function addForm() {
	formCount++;
	$(".deck-form").append(`<div>
		<textarea id="front${formCount}" name="front${formCount}" placeholder="Question" class="cardEntry" {
			constructor() {

			}
		}></textarea>
		<textarea id="back${formCount}" name="back${formCount}" placeholder="Answer" class="cardEntry"></textarea>
		</div>`);
	}

	function sendTo() {
		$("form :input").each(function(index) {
			console.log(index)
			console.log($(this).val())

			if(index == 1){
				title.push($(this).val());
			}else if(index % 2 === 0 && index !=0) {
				front.push($(this).val());
			} else if(index !==0) {
				back.push($(this).val());
			}
		});
		console.log(title)
		console.log(front)
		console.log(back)
		$(".form").css("display", "none");
		$(".cards").css("display", "unset");
		init();
	}
	function borderMove() {
		$(".front-deck").transfer({
			to: $("#current"),
			className: "border-transfer",
			duration: 500
		}, function(x) {
			$("#current").css("border", "3px solid orange");
		});
	}


	<!--Movement-->
	$("#card").on("click", function(x) {
		if($("#current").css("border")) {
			$("#current").css("border", "");;
		}
	});

	$("#deck").on("click", function(x) {
		forward();
	});

	$("#next").on("click", function(x) {
		forward();
	});

	$("#prev").on("click", function(x) {
		prev();
	});

	$("#restart").on("click", function(x) {
		restart();
	});

	$("#shuffle").on("click", function(x) {
		shuffle();
	});

	$(".add").on("click", function(x) {
		addForm();
	});

	$(".submit").on("click", function(x) {
		sendTo();
	});