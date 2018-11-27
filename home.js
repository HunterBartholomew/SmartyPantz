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
		$(".deck-navbar").css("display", "block");
        $(".stopwatch").css("display", "block");
        $(".swcontrols").css("display", "block");
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



class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));