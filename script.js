//wait until the window is loaded before performining
//the init() function
window.onload=init;

//--------------------------------------GLOBAL VARIABLES--------------------------------------//

//declare canvas contexts here so they are can be accesed globally
var ctx, ctx2, canvas2;

//canvas width and height
var w;
var h;

//Position for object on the canvas
var xPos = 0;
var yPos = 0;

var firstClick = {x: 0, y: 0};
var secondClick = {x: 0, y: 0};

//the size of the brush
var brushSize = document.getElementById("brushSize");

//background 1
var bg1 = document.getElementById("bg1");

//image brushs
var cat;
var elephant;
var poop;

//sprite width and height
var spriteH = 40;
var spriteW = 40;

//what shape are we drawing
var shape;

//boolean to check for drawing lines
var drawingLine = false;

//mouse down will turn on drawState, mouse up will turn off drawState
var drawState = false;

//--------------------------------------FUNCTIONS--------------------------------------//

//sets up the canvas and resets its properties
function init() {
	//gets the first canvas
	var canvas = document.getElementById("drawing");
	ctx = canvas.getContext("2d");
    
	//grabs the canvas width and height
	w = canvas.width;
	h = canvas.height;
    
	//clears the canvas for when the clear button is pressed
    ctx.clearRect(0,0,w,h);
	
	//add mouse event listeners to the canvas
	canvas.addEventListener("mousemove",getMousePosition,false);
	canvas.addEventListener("mousedown", drawOn,false);
	canvas.addEventListener("mouseup", drawOff,false);
	
	//create another canvas element to hold the shape we want to draw
	canvas2 = document.createElement("canvas");
	canvas2.width = spriteH;
	canvas2.height = spriteH;
	
	//setup the canvas context
	ctx2 = canvas2.getContext("2d");
	
	//set the stroke and line width
	ctx2.strokeStyle = "#000000"; //black
	ctx2.lineWidth = 1;
    
    //load the image brushes
    cat = new Image(40,40);
    cat.src = "img/cat.png";
    elephant = new Image(40,40);
    elephant.src = "img/elephant.png";
    poop = new Image(40,40);
    poop.src = "img/poop.png";
    
    
	//set the initial color to white
	setColor("#ffffff");
	
	//set the default shape to a square
	setShape('circle');
	
	//draw the shape in canvas2
	drawShape();
	
	//this is the draw function that will be repeated using animation frames
	draw();
	
}

//--------------------------------------DRAW FUNCTION--------------------------------------//

function draw() {
	
	//this is in raf.js
	requestAnimationFrame(draw);
	
	//draw what ever is in canvas2 at xPos,yPos
	if (drawState) {
        ctx.drawImage
		ctx.drawImage(canvas2,xPos,yPos);
        if(drawLine == true) {
            
			ctx.strokeStyle = 1;
            ctx.beginPath();
            ctx.moveTo(oldXPos, oldYPos)
			ctx.lineTo(xPos, yPos);
			ctx.lineWidth = lineWidth;
			ctx.stroke();
		}
	}
}

//--------------------------------------COORDINATE FUNCTIONS--------------------------------------//

//update the position of the drawing object to the mouse position
function getMousePosition(e) {
	//need to subtract the offsetLeft and offsetTop positions of the element
	xPos = e.clientX - getPosition(e.currentTarget).x - spriteW/2;
	//we need to offset the scrolling using pageYOffset 
	yPos = e.clientY - getPosition(e.currentTarget).y - spriteH/2 + window.pageYOffset;
	
	//for debugging
	console.log(e.currentTarget);
	console.log("x = "+ xPos + " y = " + yPos);
	console.log(e.clientX);
}

//Script for getting element position is from
//reference:http://www.kirupa.com/html5/get_element_position_using_javascript.htm
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollLeft + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}


//functions to turn drawing state on and off
function drawOn(e) {
	drawState = true;
}

function drawOff(e) {
	drawState = false;
}

//--------------------------------------ASSIGN SHAPES TO BE DRAWN--------------------------------------//

function drawShape() {
	ctx2.clearRect(0,0,spriteH,spriteH);
	if (shape == 'square') {
		makeSquare();
    } else if (shape == 'triangle') {
		makeTriangle();
    } else if (shape == 'circle') {
		makeCircle();
	} else if (shape == 'diamond') {
        makeDiamond();
    } else if (shape == 'bolt') {
        makeBolt();
    } else if (shape == 'cat') {
        makeCat();
    } else if (shape == 'elephant') {
        makeElephant();
    } else if (shape == 'poop') {
        makePoop();
    } else if (shape == 'line') {
        makeLine();
    } else {
    }
}

//--------------------------------------BRUSHES--------------------------------------//

//shape brushes
function makeSquare() {
	//draw a square in canvas2 using existing fill color
	ctx2.fillRect(0,0,spriteW,spriteH);
	ctx2.strokeRect(0,0,spriteW,spriteH);
}

function makeCircle() {
	//draw a circle in canvas2 using existing fill color
	ctx2.beginPath();
	ctx2.arc(spriteH/2,spriteH/2,spriteH/2-1,0,2*Math.PI);
	ctx2.stroke();
	ctx2.fill();	
}

function makeTriangle() {
	ctx2.beginPath();
	ctx2.moveTo(0, spriteH);
	ctx2.lineTo(spriteW, spriteH);
	ctx2.lineTo(spriteW/2, 0);
	ctx2.lineTo(0, spriteH)
	ctx2.closePath();
	ctx2.stroke();
	ctx2.fill();
}

function makeDiamond() {
	ctx2.beginPath();
	ctx2.moveTo(0, spriteH/2);
	ctx2.lineTo(spriteW/2, spriteH);
	ctx2.lineTo(spriteW, spriteH/2);
	ctx2.lineTo(spriteW/2, 0);
    ctx2.lineTo(0,spriteH/2); 
	ctx2.closePath();
	ctx2.stroke();
	ctx2.fill();
}

function makeBolt() {
    ctx2.beginPath();
    ctx2.moveTo(0,spriteH/2);
    ctx2.lineTo(spriteW/4, spriteH);
    ctx2.lineTo(spriteW/2,spriteH/2);
    ctx2.lineTo(spriteW, spriteH);
    ctx2.lineTo(spriteW/2, spriteH/4);
    ctx2.lineTo(spriteW/4, spriteH - spriteH/4);
    ctx2.lineTo(0, spriteH/2);
    ctx2.closePath();
    ctx.stroke();
    ctx2.fill();
}

//--------------------------------------IMAGES--------------------------------------//

function makeCat() {
    ctx2.drawImage(cat, 0, 0, spriteW, spriteH);
}

function makeElephant() {
    ctx2.drawImage(elephant, 0, 0, spriteW, spriteH);
}

function makePoop() {
    ctx2.drawImage(poop, 0, 0, spriteW, spriteH);
}

//--------------------------------------LINEBRUSH--------------------------------------//

function makeLine() {
    drawingLine = true;
    spriteW = 5;
    spriteH = 5;
    if(drawLine == true) {
			ctx.strokeStyle = 1;
			ctx.lineTo(xPos, yPos);
			ctx.lineWidth = lineWidth;
			ctx.stroke();
		}
}

	/*ctx2.lineWidth = 10;
    ctx2.strokeStyle = selectedColor;
    ctx2.fillStyle = selectedColor;
    ctx2.beginPath();
    ctx2.translate(spriteW/2, spriteH/2);
    ctx2.lineTo(oldXPos, oldYPos);
    ctx2.lineTo(xPos, yPos);
    ctx2.stroke();
    ctx2.closePath();
    ctx2.resetTransform();	
    oldXPos = xPos;
	oldYPos = yPos;*/

//--------------------------------------BACKGROUND--------------------------------------//

function background(b) {
        var canvas = document.getElementById("drawing");
        canvas.className = b;
}

//--------------------------------------TOOLBAR FUNCTIONS--------------------------------------//

// Change color
function setColor(c) {
	ctx2.fillStyle = c;
	//need to redraw the shape as well
	drawShape();
}

function setShape(s) {
	//remember the shape
	shape = s;
	drawShape();
}

//change brush size according to the slider
function showValue(newValue) {
	brushSize.innerHTML=newValue;
	spriteH = brushSize.innerHTML;
    spriteW = brushSize.innerHTML;
    
	//for debugging
	console.log(spriteH);
	console.log(spriteW); 
}

//change brush size
function changeSize() {
    spriteW = brushSize.innerHTML;
    spriteH = brushSize.innerHTML;
    canvas2.width = brushSize.innerHTML;
    canvas2.height = brushSize.innerHTML;
    ctx2.fillStyle = "#ffffff"
    drawShape();
}