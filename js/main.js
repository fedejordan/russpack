/*
RussPack 2015 Federico Jordan
Desarrollo
- Comprobar bien lineas completas (recursividad)
- Boton "Jugar de nuevo"
- Boton "Reset"
- Animaciones
- Contador de tiempo (barra)
- Contador de puntaje
- Mejores graficos
- Fondo nuevo
- Compartir por facebook
- Niveles de dificultad
- Organizar mejor el codigo
- Estilos CSS

Captura de usuarios:
- Publicidad en facebook
- Publicidad con adwords
- Compartir en grupos de desarrolladores o gamers

Retencion de usuarios:
- Desafios
- Premios
- 

*/

//Globals
//Game drawing
var GAME_TYPE_NORMAL = 0;
var GAME_TYPE_IMPOSSIBLE = 1;
var GAME_TYPE_ONLY_NUMBERS = 2;
var GAME_TYPE_NUMBERS_AND_COLORS = 3;
var GAME_TYPE_GRAY_SCALE = 4;
var BACKGROUND_COLOR = '#CCCCCC'; //
var SCENE_WIDTH = 1200;
var SCENE_HEIGHT = 600;
var SQUARE_WIDTH = 40;
var RECTS_SEPARATION = 5;
var squaresBorder = 1;
var MAX_squaresBorder = 5;
var ANIMATIONS_ENABLED = true;
var BORDER_COLOR = "#000000";
var squareArea = SQUARE_WIDTH + RECTS_SEPARATION;
var gameType;
var drawingEnabled;

//Game playing
var INITIAL_SQUARES_NUMBER = 5;
var NUMBER_OF_COLORS = 5;
var MAX_SQUARES_NUMBER = 10;
var xSquaresCount;
var ySquaresCount;
var squaresSceneWidth;
var squaresSceneHeight;
var squaresSceneX;
var squaresSceneY;
var playEnabled;
var userSquare;
var canvas;
var canvasContext;
var squaresMatrix;

//Timer
var GAME_SPEED = 5;
var SLOWER_SPEED = 100;
var GAME_COUNTER_DURATION = 1000;
var LEVEL_COUNTER_DURATION = 1;
var levelMaxCount;
var gameCount;
var levelCount;
var levelTimer;
var gameTimer;

function drawCanvas(){
	clearScreen();
	if(drawingEnabled){
		drawLevelTimerBar();
		
		for(var i=0;i<xSquaresCount;i++){
			for(var j=0;j<ySquaresCount;j++){
				squaresMatrix[i][j].border = squaresBorder;
				squaresMatrix[i][j].draw();
			}
		}
		userSquare.border = squaresBorder;
		userSquare.draw();
	}
}
		
function getRandomColor() {
	if(gameType!=GAME_TYPE_IMPOSSIBLE){
		if(gameType==GAME_TYPE_GRAY_SCALE){
			var colors = new Array("#000000","#222222","#444444","#888888","#AAAAAA","#CCCCCC","#EEEEEE","#FFFFFF");
			var color = colors[Math.floor(Math.random()*NUMBER_OF_COLORS)];
			return color
		}
		else if(gameType==GAME_TYPE_ONLY_NUMBERS){
			return null;
		}
		else{	
			var redColor = "#FF0000";
			var greenColor = "#00FF00";
			var blueColor = "#0000FF";
			var orangeColor = "#FF7700";
			var cyanColor = "#00FFFF";
			var yellowColor = "#FFFF00";
			var magentaColor = "#FF00FF";
			var colors = new Array(redColor, greenColor, blueColor, orangeColor, cyanColor, yellowColor, magentaColor);
			var color = colors[Math.floor(Math.random()*NUMBER_OF_COLORS)];
			return color;
		}
	}
	else{
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
}
		
document.onkeydown=function(e){
	//dibujarCanvas();
	if(playEnabled){
		var originalPositionX = userSquare.positionX;
		var originalPositionY = userSquare.positionY;
		//log("userSquare.positionX: " + userSquare.positionX + " userSquare.positionY: " + userSquare.positionY);
		switch(e.keyCode){
			case 39:
				userSquare.moveX(squareArea);
				break;
			case 37:
				userSquare.moveX(-squareArea);
				break;
			case 38:
				userSquare.moveY(-squareArea);
				break;
			case 40:
				userSquare.moveY(squareArea);
				break;
			default:
				break;
		}
		if (!nextUserPositionIsValid(originalPositionX, originalPositionY)){
			//log("nextUserPositionIsValid = false");
			userSquare.updatePosition(originalPositionX, originalPositionY);
		}
	}
}

function initScene(){
	canvas = document.getElementById('myCanvas');
	canvasContext = canvas.getContext('2d');
	playEnabled = true;
	drawingEnabled = true;
	gameType = GAME_TYPE_NORMAL;
	initSquares();
	initSquaresScene();
	drawCanvas();
	initCounters();
}

function printRectsColor(){
	for(var i=0;i<xSquaresCount;i++){
		for(var j=0;j<ySquaresCount;j++){
			log("i: " + i + " j: " + j + " color: " + rectsColorArray[i][j], false);
		}
	}
}

function initSquares(){
	//rectsColorArray = new Array(MAX_SQUARES_NUMBER);
	squaresMatrix = new Array(MAX_SQUARES_NUMBER);
	for(var i=0;i<MAX_SQUARES_NUMBER;i++){
		//rectsColorArray[i] = new Array(MAX_SQUARES_NUMBER);
		squaresMatrix[i] = new Array(MAX_SQUARES_NUMBER);
	}
	for(var i=0;i<MAX_SQUARES_NUMBER;i++){
		for(var j=0;j<MAX_SQUARES_NUMBER;j++){
			//rectsColorArray[i][j] = getRandomColor();
			squaresMatrix[i][j] = new Square(0, 0, SQUARE_WIDTH, getRandomColor(), canvasContext, squaresBorder);
		}
	}
	
}

function initSquaresScene(){
	xSquaresCount = INITIAL_SQUARES_NUMBER;
	ySquaresCount = INITIAL_SQUARES_NUMBER;
	updateSquaresScene();
	userSquare = new Square(squaresSceneX - squareArea, squaresSceneY - squareArea, SQUARE_WIDTH, getRandomColor(), canvasContext, squaresBorder);
}

function updateSquaresScene(){
	//log("xSquaresCount: " + xSquaresCount + " ySquaresCount: " + ySquaresCount);
	squaresSceneWidth = squareArea * xSquaresCount;
	squaresSceneHeight = squareArea * ySquaresCount;
	squaresSceneX = (SCENE_WIDTH-squaresSceneWidth)/2;
	squaresSceneY = (SCENE_HEIGHT-squaresSceneHeight)/2;
	updateSquaresPosition();
}

function updateSquaresPosition(){
	for(var i=0;i<xSquaresCount;i++){
		for(var j=0;j<ySquaresCount;j++){
			squaresMatrix[i][j].updatePosition(squaresSceneX + squareArea *i, squaresSceneY + squareArea*j);
		}
	}
}

function nextUserPositionIsValid(originalPositionX, originalPositionY){
	//log("userSquare.positionX: " + userSquare.positionX + " userSquare.positionY: " + userSquare.positionY + "squaresSceneX: " + squaresSceneX + "squaresSceneY: " + squaresSceneY + "squaresSceneWidth: " + squaresSceneWidth + "squaresSceneHeight: " + squaresSceneHeight + "squareArea: " + squareArea );
	if(!userSquare.actualPositionIsValid(squaresSceneX, squaresSceneY, squaresSceneWidth, squaresSceneHeight, squareArea))
		return false;	
	
	if(userSquare.isInside(squaresSceneX, squaresSceneY, squaresSceneWidth, squaresSceneHeight))
		moveSquares(originalPositionX, originalPositionY);
	
	return true;
}

function moveSquares(originalPositionX, originalPositionY){
	if(userSquare.positionX - originalPositionX != 0)
		moveRowWithAnimation((userSquare.positionY - squaresSceneY) / squareArea, (userSquare.positionX - originalPositionX)/ squareArea);
	if(userSquare.positionY - originalPositionY != 0)
		moveColWithAnimation((userSquare.positionX - squaresSceneX) / squareArea, (userSquare.positionY - originalPositionY) / squareArea);
	
}

function checkForCompletes(){
	checkForCompleteRows();
	checkForCompleteCols();
}

var movingCount = 0; 
var DELTA_MOV_ANIMATION = 6;
function moveRowWithAnimation(row, movement){
	if(movingCount==0){
		playEnabled = false;
		userSquare.moveX(-movement * squareArea);
	}
	movingCount+=DELTA_MOV_ANIMATION;
	for(var i=0;i<xSquaresCount;i++){
		//rectsColorArray[i][row] = rectsColorArray[i+1][row];
		squaresMatrix[i][row].moveX(movement * DELTA_MOV_ANIMATION);
	}
	userSquare.moveX(movement * DELTA_MOV_ANIMATION);
	if(movingCount<squareArea)
		setTimeout("moveRowWithAnimation(" + row + ", " + movement + ")", 1);
	else{
		for(var i=0;i<xSquaresCount;i++){
			squaresMatrix[i][row].moveX(-movement * movingCount);
		}
		movingCount = 0;
		//userSquare.moveX(-movement * squareArea);
		moveRow(row, movement);
		checkForCompletes();
		playEnabled = true;
	}
}

function moveColWithAnimation(col, movement){
	if(movingCount==0){
		playEnabled = false;
		userSquare.moveY(-movement * squareArea);
	}
	movingCount+=DELTA_MOV_ANIMATION;
	for(var i=0;i<ySquaresCount;i++){
		//rectsColorArray[i][row] = rectsColorArray[i+1][row];
		squaresMatrix[col][i].moveY(movement * DELTA_MOV_ANIMATION);
	}
	userSquare.moveY(movement * DELTA_MOV_ANIMATION);
	if(movingCount<squareArea)
		setTimeout("moveColWithAnimation(" + col + ", " + movement + ")", 1);
	else{
		for(var i=0;i<ySquaresCount;i++){
			squaresMatrix[col][i].moveY(-movement * movingCount);
		}
		movingCount = 0;
		//userSquare.moveX(-movement * squareArea);
		moveCol(col, movement);
		checkForCompletes();
		playEnabled = true;
	}
}

function moveRow(row, movement){
	var auxcolor = userSquare.color;
	if(movement<0){ //to left
		//userSquare.color = rectsColorArray[0][row];
		if(ANIMATIONS_ENABLED)
		userSquare.color = squaresMatrix[0][row].color;
		for(var i=0;i<xSquaresCount-1;i++){
			//rectsColorArray[i][row] = rectsColorArray[i+1][row];
			squaresMatrix[i][row].color = squaresMatrix[i+1][row].color;
		}
		//rectsColorArray[xSquaresCount-1][row] = auxcolor;
		squaresMatrix[xSquaresCount-1][row].color = auxcolor;
		//userSquare.moveX(-(xSquaresCount)*squareArea);
		userSquare.positionX = squaresMatrix[0][0].positionX - squareArea;
	}
	else{ //to right
		//userSquare.color = rectsColorArray[xSquaresCount-1][row];
		userSquare.color = squaresMatrix[xSquaresCount-1][row].color;
		for(var i=xSquaresCount-2;i>=0;i--){
			//rectsColorArray[i+1][row] = rectsColorArray[i][row];
			squaresMatrix[i+1][row].color = squaresMatrix[i][row].color
		}
		//rectsColorArray[0][row] = auxcolor;
		squaresMatrix[0][row].color = auxcolor;
		//userSquare.moveX((xSquaresCount)*squareArea);
		userSquare.positionX = squaresMatrix[xSquaresCount-1][0].positionX + squareArea;
	}
}

function moveCol(col, movement){
	var auxcolor = userSquare.color;
	if(movement<0){ //to bottom
		//userSquare.color = rectsColorArray[col][0];
		userSquare.color = squaresMatrix[col][0].color;
		for(var i=0;i<ySquaresCount-1;i++){
			//rectsColorArray[col][i] = rectsColorArray[col][i+1];
			squaresMatrix[col][i].color = squaresMatrix[col][i+1].color;
		}
		//rectsColorArray[col][ySquaresCount-1] = auxcolor;
		squaresMatrix[col][ySquaresCount-1].color = auxcolor;
		//userSquare.moveY(-(ySquaresCount)*squareArea);
		userSquare.positionY = squaresMatrix[0][0].positionY - squareArea;
	}
	else{ //to top
		//userSquare.color = rectsColorArray[col][ySquaresCount-1];
		userSquare.color = squaresMatrix[col][ySquaresCount-1].color;
		for(var i=ySquaresCount-2;i>=0;i--){
			//rectsColorArray[col][i+1] = rectsColorArray[col][i];
			squaresMatrix[col][i+1].color = squaresMatrix[col][i].color;
		}
		//rectsColorArray[col][0] = auxcolor;
		squaresMatrix[col][0].color = auxcolor;
		//userSquare.moveY((ySquaresCount)*squareArea);
		userSquare.positionY = squaresMatrix[0][ySquaresCount-1].positionY + squareArea;
	}
}

function checkForCompleteCols(){
	var complete = true;
	for(var i=0;i<xSquaresCount;i++){
		for(var j=0;j<ySquaresCount-1;j++){
			//if(rectsColorArray[i][j] != rectsColorArray[i][j+1])
			if(squaresMatrix[i][j].color != squaresMatrix[i][j+1].color)
				complete = false;
		}
		if(complete)
			deleteCol(i);
		complete = true;
	}
}

function checkForCompleteRows(){
	var complete = true;
	for(var i=0;i<ySquaresCount;i++){
		for(var j=0;j<xSquaresCount-1;j++){
			//if(rectsColorArray[j][i] != rectsColorArray[j+1][i])
			if(squaresMatrix[j][i].color != squaresMatrix[j+1][i].color)
				complete = false;
		}
		if(complete)
			deleteRow(i);
		complete = true;
	}
}

function deleteCol(col){
//	log("There's a complete col: " + col);
	for(var i=col;i<xSquaresCount-1;i++){
		for(var j=0;j<ySquaresCount;j++){
			//rectsColorArray[i][j] = rectsColorArray[i+1][j];
			squaresMatrix[i][j].color = squaresMatrix[i+1][j].color;
		}
	}
	userSquare.updatePositionByDeletingCol(squaresSceneX, squaresSceneWidth, squareArea);

	xSquaresCount--;
	
	resizeSquaresWidth();
	levelCount = 0;
	
	if(!isWinner()){
		updateSquaresScene();
		checkForCompletes();
	}
}

function deleteRow(row){
//	log("There's a complete row: " + row);
	for(var i=row;i<ySquaresCount-1;i++){
		for(var j=0;j<xSquaresCount;j++){
			//rectsColorArray[j][i] = rectsColorArray[j][i+1];
			squaresMatrix[j][i].color = squaresMatrix[j][i+1].color;
		}
	}
	userSquare.updatePositionByDeletingRow(squaresSceneY, squaresSceneHeight, squareArea);
	ySquaresCount--;	
	
	resizeSquaresWidth();
	levelCount = 0;
	
	if(!isWinner()){
		updateSquaresScene();
		checkForCompletes();
	}
}

function isWinner(){
	if(xSquaresCount==1 || ySquaresCount==1){
		log("Congratulations!");
		playEnabled = false;
		drawingEnabled = false;
		stopCounters();
		clearScreen();
		return true;
	}
	else
		return false;
}

function clearScreen(){
//	log("Screen cleared");
	canvasContext.fillStyle = BACKGROUND_COLOR;
	canvasContext.fillRect (0, 0, SCENE_WIDTH, SCENE_HEIGHT);
}

function resizeSquaresWidth(){
	//toDo: Try to set rects width bigger when rects count decrease, and smaller when it increase.
}

function initCounters(){
	gameCount = 0;
	levelCount = 0;
	updateLevelMaxCount();
	gameTimer = setTimeout("gameCounter()", GAME_COUNTER_DURATION);
	levelTimer = setTimeout("levelCounter()", LEVEL_COUNTER_DURATION);
}

function gameCounter(){
	gameCount++;
	updateTimeLabel();
	gameTimer = setTimeout("gameCounter()", GAME_COUNTER_DURATION);
}

function stopCounters(){
	clearTimeout(levelTimer);
	clearTimeout(gameTimer);
}

function updateTimeLabel(){
	var layer=document.getElementById("timeLabel");
	layer.innerHTML="Game time: " + gameCount;
}

function levelCounter(){
	levelCount++;
	updateTimeLabel();
	if(levelCount==levelMaxCount){
		levelCount = 0;
		nextLevel();
	}
	drawCanvas();
	if(ANIMATIONS_ENABLED)
		squaresBorder=MAX_squaresBorder*levelCount/levelMaxCount;
	levelTimer = setTimeout("levelCounter()", LEVEL_COUNTER_DURATION);
}

function nextLevel(){
	if(xSquaresCount<ySquaresCount){
		xSquaresCount++;
		for(var i=0;i<ySquaresCount;i++){
			//rectsColorArray[xSquaresCount-1][i] = getRandomColor();
			squaresMatrix[xSquaresCount-1][i].color = getRandomColor();
		}
		userSquare.updatePositionByAddingCol(squaresSceneX, squaresSceneWidth, squareArea);
	}
	else{
		ySquaresCount++;
		for(var i=0;i<xSquaresCount;i++){
			//rectsColorArray[i][ySquaresCount-1] = getRandomColor();
			squaresMatrix[i][ySquaresCount-1].color = getRandomColor();
		}
		userSquare.updatePositionByAddingRow(squaresSceneY, squaresSceneHeight, squareArea);
	}
	if(isLooser()){
		playEnabled = false;
		drawingEnabled = false;
	}
	else{
		updateLevelMaxCount();
		updateSquaresScene();
		drawCanvas();
	}
}

function updateLevelMaxCount(){
	levelMaxCount = (ySquaresCount+xSquaresCount)* (SLOWER_SPEED - GAME_SPEED);
	
}

function isLooser(){
	if(ySquaresCount > MAX_SQUARES_NUMBER || xSquaresCount > MAX_SQUARES_NUMBER){
		log("Game over.");
		playEnabled = false;
		drawingEnabled = false;
		stopCounters();
		return true;
	}
	else
		return false;
}

function drawLevelTimerBar(){
	var LEVEL_TIMER_BAR_BORDER = 2;
	canvasContext.fillStyle = "#000000";
	canvasContext.fillRect (0, 0, SCENE_WIDTH, SCENE_HEIGHT * 0.05);
	canvasContext.fillStyle = calculateLevelTimerBarColor();
	var barTotalWidth = SCENE_WIDTH - LEVEL_TIMER_BAR_BORDER * 2;
	var barTotalHeight = SCENE_HEIGHT * 0.05 - LEVEL_TIMER_BAR_BORDER * 2;
	var barWidth = (barTotalWidth * levelCount) / levelMaxCount;
	canvasContext.fillRect (LEVEL_TIMER_BAR_BORDER, LEVEL_TIMER_BAR_BORDER, barWidth, barTotalHeight);
}

function calculateLevelTimerBarColor(){
	var greenComponent;
	if(levelCount<levelMaxCount/2)
		greenComponent = 255;
	else
		greenComponent = 255*(2 - levelCount / (levelMaxCount/2));
	
	var redComponent;
	if(levelCount>levelMaxCount/2)
		redComponent = 255;
	else
		redComponent = 255*levelCount/(levelMaxCount/2);
	
	var barColor = "#" + hexFromInt(redComponent) + hexFromInt(greenComponent) + "00";
	//log("barColor: " + barColor + " redComponent: " + hexFromInt(redComponent) + " greenComponent: " + hexFromInt(greenComponent)); 	
	return barColor;
}
