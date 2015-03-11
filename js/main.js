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
var rectArea = SQUARE_WIDTH + RECTS_SEPARATION;
var gameType;

//Game playing
var INITIAL_RECTS_NUMBER = 5;
var NUMBER_OF_COLORS = 5;
var MAX_RECTS = 10;
var xRectsCount;
var yRectsCount;
var rectsColorArray;
var recsSceneWidth;
var recsSceneHeight;
var recsSceneX;
var recsSceneY;
var playEnabled;
var userSquare;
var canvas;
var canvasContext;

//Timer
var GAME_SPEED = 10;
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
	if(playEnabled){
		drawLevelTimerBar();
		for(var i=0;i<xRectsCount;i++){
			for(var j=0;j<yRectsCount;j++){
				canvasContext.fillStyle = rectsColorArray[i][j];
				drawRect(recsSceneX + rectArea *i, recsSceneY + rectArea*j, SQUARE_WIDTH, SQUARE_WIDTH, canvasContext);
			}
		}
	userSquare.border = squaresBorder;
	userSquare.draw();
	}
}
		
function drawRect(x, y, w, h, canvasContext){
	var rectColor = canvasContext.fillStyle;
	canvasContext.fillStyle = BORDER_COLOR;
	canvasContext.fillRect (x - squaresBorder, y - squaresBorder, w + 2 * squaresBorder, h + 2 * squaresBorder);
	canvasContext.fillStyle = rectColor;
	canvasContext.fillRect (x, y, w, h);
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
				userSquare.moveX(rectArea);
				break;
			case 37:
				userSquare.moveX(-rectArea);
				break;
			case 38:
				userSquare.moveY(-rectArea);
				break;
			case 40:
				userSquare.moveY(rectArea);
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
	gameType = GAME_TYPE_NORMAL;
	initRectsScene();
	initRects();
	drawCanvas();
	initCounters();
}

function printRectsColor(){
	for(var i=0;i<xRectsCount;i++){
		for(var j=0;j<yRectsCount;j++){
			log("i: " + i + " j: " + j + " color: " + rectsColorArray[i][j], false);
		}
	}
}

function initRects(){
	rectsColorArray = new Array(MAX_RECTS);
	for(var i=0;i<MAX_RECTS;i++)
		rectsColorArray[i] = new Array(MAX_RECTS)
		
	for(var i=0;i<MAX_RECTS;i++){
		for(var j=0;j<MAX_RECTS;j++){
			rectsColorArray[i][j] = getRandomColor();
		}
	}
	
	userRectColor = getRandomColor();
	//printRectsColor();
	
}

function initRectsScene(){
	xRectsCount = INITIAL_RECTS_NUMBER;
	yRectsCount = INITIAL_RECTS_NUMBER;
	updateRectsScene();
	userSquare = new Square(recsSceneX - rectArea, recsSceneY - rectArea, SQUARE_WIDTH, getRandomColor(), canvasContext, squaresBorder);
}

function updateRectsScene(){
	//log("xRectsCount: " + xRectsCount + " yRectsCount: " + yRectsCount);
	recsSceneWidth = rectArea * xRectsCount;
	recsSceneHeight = rectArea * yRectsCount;
	recsSceneX = (SCENE_WIDTH-recsSceneWidth)/2;
	recsSceneY = (SCENE_HEIGHT-recsSceneHeight)/2;
}

function nextUserPositionIsValid(originalPositionX, originalPositionY){
	//log("userSquare.positionX: " + userSquare.positionX + " userSquare.positionY: " + userSquare.positionY + "recsSceneX: " + recsSceneX + "recsSceneY: " + recsSceneY + "recsSceneWidth: " + recsSceneWidth + "recsSceneHeight: " + recsSceneHeight + "rectArea: " + rectArea );
	if(!userSquare.actualPositionIsValid(recsSceneX, recsSceneY, recsSceneWidth, recsSceneHeight, rectArea))
		return false;	
	
	if(userSquare.isInside(recsSceneX, recsSceneY, recsSceneWidth, recsSceneHeight))
		moveRects(originalPositionX, originalPositionY);
	
	return true;
}

function moveRects(originalPositionX, originalPositionY){
	if(userSquare.positionX - originalPositionX != 0)
		moveRow((userSquare.positionY - recsSceneY) / rectArea, (userSquare.positionX - originalPositionX)/ rectArea);
	if(userSquare.positionY - originalPositionY != 0)
		moveCol((userSquare.positionX - recsSceneX) / rectArea, (userSquare.positionY - originalPositionY) / rectArea);
	checkForCompletes();
}

function checkForCompletes(){
	checkForCompleteRows();
	checkForCompleteCols();
}

function moveRow(row, movement){
	var auxcolor = userSquare.color;
	if(movement<0){ //to left
		userSquare.color = rectsColorArray[0][row];
		for(var i=0;i<xRectsCount-1;i++){
			rectsColorArray[i][row] = rectsColorArray[i+1][row];
		}
		rectsColorArray[xRectsCount-1][row] = auxcolor;
		userSquare.moveX(-(xRectsCount)*rectArea);
	}
	else{ //to right
		userSquare.color = rectsColorArray[xRectsCount-1][row];
		for(var i=xRectsCount-2;i>=0;i--){
			rectsColorArray[i+1][row] = rectsColorArray[i][row];
		}
		rectsColorArray[0][row] = auxcolor;
		userSquare.moveX((xRectsCount)*rectArea);
	}
}

function moveCol(col, movement){
	var auxcolor = userSquare.color;
	if(movement<0){ //to bottom
		userSquare.color = rectsColorArray[col][0];
		for(var i=0;i<yRectsCount-1;i++){
			rectsColorArray[col][i] = rectsColorArray[col][i+1];
		}
		rectsColorArray[col][yRectsCount-1] = auxcolor;
		userSquare.moveY(-(yRectsCount)*rectArea);
	}
	else{ //to top
		userSquare.color = rectsColorArray[col][yRectsCount-1];
		for(var i=yRectsCount-2;i>=0;i--){
			rectsColorArray[col][i+1] = rectsColorArray[col][i];
		}
		rectsColorArray[col][0] = auxcolor;
		userSquare.moveY((yRectsCount)*rectArea);
	}
}

function checkForCompleteCols(){
	var complete = true;
	for(var i=0;i<xRectsCount;i++){
		for(var j=0;j<yRectsCount-1;j++){
			if(rectsColorArray[i][j] != rectsColorArray[i][j+1])
				complete = false;
		}
		if(complete)
			deleteCol(i);
		complete = true;
	}
}

function checkForCompleteRows(){
	var complete = true;
	for(var i=0;i<yRectsCount;i++){
		for(var j=0;j<xRectsCount-1;j++){
			if(rectsColorArray[j][i] != rectsColorArray[j+1][i])
				complete = false;
		}
		if(complete)
			deleteRow(i);
		complete = true;
	}
}

function deleteCol(col){
//	log("There's a complete col: " + col);
	for(var i=col;i<xRectsCount-1;i++){
		for(var j=0;j<yRectsCount;j++){
			rectsColorArray[i][j] = rectsColorArray[i+1][j];
		}
	}
	userSquare.updatePositionByDeletingCol(recsSceneX, recsSceneWidth, rectArea);
	xRectsCount--;
	
	resizeRectWidth();
	levelCount = 0;
	
	if(!isWinner()){
		updateRectsScene();
		checkForCompletes();
	}
}

function deleteRow(row){
//	log("There's a complete row: " + row);
	for(var i=row;i<yRectsCount-1;i++){
		for(var j=0;j<xRectsCount;j++){
			rectsColorArray[j][i] = rectsColorArray[j][i+1];
		}
	}
	userSquare.updatePositionByDeletingRow(recsSceneY, recsSceneHeight, rectArea);
	yRectsCount--;	
	
	resizeRectWidth();
	levelCount = 0;
	
	if(!isWinner()){
		updateRectsScene();
		checkForCompletes();
	}
}

function isWinner(){
	if(xRectsCount==1 || yRectsCount==1){
		log("Congratulations!");
		playEnabled = false;
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

function resizeRectWidth(){
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
	if(xRectsCount<yRectsCount){
		xRectsCount++;
		for(var i=0;i<yRectsCount;i++)
			rectsColorArray[xRectsCount-1][i] = getRandomColor();
		userSquare.updatePositionByAddingCol(recsSceneX, recsSceneWidth, rectArea);
	}
	else{
		yRectsCount++;
		for(var i=0;i<xRectsCount;i++)
			rectsColorArray[i][yRectsCount-1] = getRandomColor();
		userSquare.updatePositionByAddingRow(recsSceneY, recsSceneHeight, rectArea);
	}
	if(isLooser()){
		playEnabled = false;
	}
	else{
		updateLevelMaxCount();
		updateRectsScene();
		drawCanvas();
	}
}

function updateLevelMaxCount(){
	levelMaxCount = (yRectsCount+xRectsCount)* (SLOWER_SPEED - GAME_SPEED);
	
}

function isLooser(){
	if(yRectsCount > MAX_RECTS || xRectsCount > MAX_RECTS){
		log("Game over.");
		playEnabled = false;
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
