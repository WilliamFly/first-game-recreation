const log = console.log;
var canvas = document.getElementById("gameScreen");

var ctx = canvas.getContext("2d");

//Ball variable
var x=0;
var y=0;

//Barrier 1 variable (Blue Rectangle)
var b1ud=127;
var speed1 = 5;

//Barrier 2 variable (Purple Ellipses)
var e=15;

var e1=0;
var es1=5;
var ex1;
var ey1;

var e2=0;
var es2=3;
var ex2;
var ey2;

var e3=0;
var es3=4;
var ex3;
var ey3;

var e4=0;
var es4=6;
var ex4;
var ey4;

//Barrier 3 variable (Orange Circle)
var ox=0;
var oy=0;
var osx=0;
var osy=0;

//Barrier 4 variable (Final Blue Squares)
var bsx1=0;
var bsx2=0;
var bsx3=0;
var bss1=1;
var bss2=1;
var bss3=1;


//Starting Text 
let start = false;
let clicked = false;

function titleScreen(){
	ctx.font = "62px Times New Roman";
	ctx.fillStyle =  "#ff0000";
	ctx.fillText("RED BALL ESCAPE!",104,92);

	ctx.font = "36px Times New Roman";
	ctx.fillStyle = "#fbff00";
	ctx.fillText("By: William Mucha (2015)",104,160);

	ctx.font = "40px Times New Roman";
	ctx.fillStyle = "#00ff0d";
	ctx.fillText("Objective and Controls:",104,266);
	ctx.font = "30px Times New Roman";
	ctx.fillText("1. The point of the game is to get to the",104,340);
	ctx.fillText("other green box.",104,377);
	ctx.fillText("2. Use your arrow keys to move the ball.",104,414);
	ctx.fillText("3. Not allowed to hold the keys. (You have",104,460);
	ctx.fillText("to tap)",104,499);
	ctx.fillText("4. You have unlimited tries.",104,538);
	ctx.fillText("5. Have fun!!! :D",104,582);

	ctx.font = "46px Times New Roman";
	ctx.fillStyle = "#ff0000";
	ctx.fillText("Click anywhere to start!", 104,650);
}

titleScreen();

canvas.addEventListener('mousedown', e => {
	if (clicked === false && start === false) {
		start=true;
		clicked=true;
		gameRunner();
	}
})

function gameRunner(){
	
	draw();
	setInterval(stateLightBlueRect, 100);
	setInterval(stateOrangeCircle, 5);
	setInterval(stateBlueSquares, 20)
	
	canvas.addEventListener("keydown", e => {
		if (e.keyCode == 39){
            x+=10;
			barrier();
			draw();
        } else if(e.keyCode == 37){
            x-=10;
			barrier();
			draw();
        } else if(e.keyCode == 40){
            y+=10;
			barrier();
			draw();
        } else if(e.keyCode == 38){
            y-=10;
			barrier();
			draw();
        }
	});
	
}

function draw(){
	drawBackground();
	drawPlayer();
	drawLightBlueRect();
	drawOrangeCircle();
	drawBlueSquares();
}

function drawBackground(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.style.background = "#0033ff"
	//Maze
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(42,72,694,66);
    ctx.fillRect(688,134,48,70);
    ctx.fillRect(42,204,694,200);
    ctx.fillRect(42,400,60,300);
    ctx.fillRect(42,656,146,60);
        
    ctx.fillStyle = "#00a6ff";
    ctx.fillRect(320,436,60,280);
    ctx.fillRect(222,656,140,60);
        
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(184,436,56,280);
    ctx.fillRect(240,436,140,60);
    ctx.fillRect(376,436,140,60);
    ctx.fillRect(512,436,166,280);
        
    //Start Green rectangle
    ctx.fillStyle = "#15ff00";
    ctx.fillRect(42,72,66,66);
        
    //End Green rectangle
    ctx.fillRect(678,650,66,66);
}

function drawPlayer(){
	ctx.fillStyle = "#ff0000";
	ctx.beginPath();
    ctx.arc(x+72,y+103,15,0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function drawLightBlueRect(){
	//Light blue rectangle
    ctx.fillStyle = "#00ffff";
    ctx.fillRect(254,speed1+-130,100,204);
}

function stateLightBlueRect(){
	if (b1ud > 400) {
        speed1 = -10;
    }
    if (b1ud < 137) {
        speed1 = 70;
    }
    b1ud = b1ud+speed1;
	if (x < 292 && y === 0 && x > 162 && speed1 === 70) {
        x=0;
    }
	draw();
}

function drawOrangeCircle(){
	//Orange Circle
	ctx.fillStyle = "#ff7700";
	ctx.beginPath();
    ctx.arc(ox+210,oy+460,20,0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function stateOrangeCircle(){
	if (ox === 0 && oy === 0) {
        osx=0;
        osy=1;
    }
    if (ox === 0 && oy === 220) {
        osx=1;
        osy=0;
    }
    if (ox === 140 && oy === 220) {
        osx=0;
        osy=-1;
    }
    if (ox === 140 && oy === 0) {
        osx=-1;
        osy=0;
    } 
    ox=ox+osx;
    oy=oy+osy;
	if(x === ox+140 && y === oy+360){
		x=0;
		y=0;
	}
	draw();
}

function drawBlueSquares(){
	//Blue Squares
    ctx.fillStyle = "#00d9ff";
    ctx.fillRect(bsx1+513,503,40,40);
    ctx.fillRect(bsx2+573,583,40,40);
    ctx.fillRect(bsx3+633,663,40,40);
}

function stateBlueSquares(){
	if (bsx1 > 120) {
        bss1=-1;
    }
    if (bsx1 < 0) {
        bss1=1;
    }
    bsx1=bss1+bsx1;
    if (bsx2 > 60) {
        bss2=-1;
    }
    if (bsx2 < -60) {
        bss2=1;
    }
    bsx2=bss2+bsx2;
    if (bsx3 > 0) {
        bss3=-1;
    }
    if (bsx3 < -120) {
        bss3=1;
    }
    bsx3=bss3+bsx3;
	//Contact with three blue squares
    if (y > 394 && y < 450 && x > 432 && x === bsx1+458) {
        x=0;
        y=0;
    }
    if (y > 472 && y < 528 && x > 432 && x === bsx2+528) {
        x=0;
        y=0;
    }
    if (y > 550 && y < 606 && x > 432 && x === bsx3+458) {
        x=0;
        y=0;
    }
	draw();
}

function barrier(){
	//Barrier
    //First Path (Blue Rectangle)
    if (y < 0) {
        y=y+10;
    } else if (x < 0) {
        x=x+10;
    } else if (x > 649) {
        x=x-10;
    } else if (y > 0 && x < 639 && y < 11) {
        y=y-10;
    } else if (y > 0 && x < 631 && y < 111 && x > 621) {
        x=x+10;
    }/*Second Path Pirple elipses*/
	else if (y < 111 && y > 90 && x < 629) {
        y=y+10;
    } else if (y > 288 && x > 5 && y < 299) {
        y=y-10;
    }/*Third Path Orange ball and Blue cubes*/
	else if (y >= 300 && x > 5 && y < 569 && x < 50){
        x=x-10;
    } else if (y > 586) {
        y=y-10;
    } else if (y < 578 && x > 9 && x < 126 && y > 540) {
        y=y+10;
    } else if (y > 382 && y < 600 && x > 156 && x < 200) {
        x=x-10;
    } else if (y > 322 && y < 570 && x < 126 && x > 60) {
        x=x+10;
    } else if (y > 322 && y < 346 && x > 126 && x < 638) {
        y=y+10;
    } else if (y > 376 && y < 734 && x > 152 && x < 451) {
        if(y < 381){
			y=y-10;
		} else {
			x=x+10;
		}
    } else if (y > 322 && y < 570 && x > 581 && x < 614) {
        x=x-10;
    } else if (y > 382 && y < 564 && x > 600 && x < 800) {
        y=y+10;
    }
}
