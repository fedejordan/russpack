/*
RussPack 2015 Federico Jordan
Desarrollo
- Comprobar bien lineas completas (recursividad)
- Boton "Jugar de nuevo"
- Boton "Reset"
- Animaciones, efectos
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
var SCENE_HEIGHT = 500;
var SQUARE_WIDTH = 30; //40
var RECTS_SEPARATION = 4; //5
var MAX_SQUARES_BORDER = 4;
var DRAW_LEVEL_TIMER_BAR = true;
var squareArea = SQUARE_WIDTH + RECTS_SEPARATION;
var squaresBorder = 1;
var canvas;
var canvasContext;
var gameType;
var drawingEnabled;
var gameScene;

//Animations
var DELTA_MOV_ANIMATION = 5;
var ANIMATIONS_ENABLED = true;
var movingCount = 0;

//Game playing
var INITIAL_SQUARES_NUMBER = 5; //5
var NUMBER_OF_COLORS = 5;
var MAX_SQUARES_NUMBER = 10; //10
var xSquaresCount;
var ySquaresCount;
var playEnabled;
var userSquare;
var squaresMatrix;

//Points
var points;

//Timers
var levelTimer;
var gameTimer;
var levelTimerBar;

function drawCanvas() {
	clearScreen();
	if(ANIMATIONS_ENABLED)
		squaresBorder = MAX_SQUARES_BORDER - MAX_SQUARES_BORDER*levelTimer.levelCount/levelTimer.levelMaxCount;
	if(drawingEnabled){
		if(DRAW_LEVEL_TIMER_BAR)
			levelTimerBar.draw();
		
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
	if(playEnabled){
		var originalPositionX = userSquare.positionX;
		var originalPositionY = userSquare.positionY;
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
	initCounters();
	squaresBorder = MAX_SQUARES_BORDER;
	points = 0;
}

function initSquares(){
	squaresMatrix = new Array(MAX_SQUARES_NUMBER);
	for(var i=0;i<MAX_SQUARES_NUMBER;i++){
		squaresMatrix[i] = new Array(MAX_SQUARES_NUMBER);
	}
	for(var i=0;i<MAX_SQUARES_NUMBER;i++){
		for(var j=0;j<MAX_SQUARES_NUMBER;j++){
			squaresMatrix[i][j] = new Square(0, 0, SQUARE_WIDTH, getRandomColor(), canvasContext, squaresBorder);
		}
	}
}

function initSquaresScene(){
	xSquaresCount = INITIAL_SQUARES_NUMBER;
	ySquaresCount = INITIAL_SQUARES_NUMBER;
	gameScene = new GameScene(squareArea, xSquaresCount, ySquaresCount, SCENE_WIDTH, SCENE_HEIGHT);
	updateSquaresPosition();
	userSquare = new Square(gameScene.positionX - squareArea, gameScene.positionY - squareArea, SQUARE_WIDTH, getRandomColor(), canvasContext, squaresBorder);
}

function initCounters(){
	gameTimer = new GameTimer();
	levelTimer = new LevelTimer(xSquaresCount, ySquaresCount, nextLevel, drawCanvas);
	levelTimer.updateLevelMaxCount(xSquaresCount, ySquaresCount);
	levelTimerBar = new LevelTimerBar(levelTimer, canvasContext);
}

function stopCounters(){
	gameTimer.stopTimer();
	levelTimer.stopTimer();
}

function updateSquaresScene(){
	log("Number of squares: " + xSquaresCount*ySquaresCount);
	gameScene.update(squareArea, xSquaresCount, ySquaresCount, SCENE_WIDTH, SCENE_HEIGHT);
	updateSquaresPosition();
}

function updateSquaresPosition(){
	for(var i=0;i<xSquaresCount;i++){
		for(var j=0;j<ySquaresCount;j++){
			squaresMatrix[i][j].updatePosition(gameScene.positionX + squareArea *i, gameScene.positionY + squareArea*j);
		}
	}
}

function nextUserPositionIsValid(originalPositionX, originalPositionY){
	if(!userSquare.actualPositionIsValidInGameScene(gameScene, squareArea))
		return false;
	
		if(userSquare.isInsideGameScene(gameScene)){
			moveSquares(originalPositionX, originalPositionY);
		}
	return true;
}

function moveSquares(originalPositionX, originalPositionY){
	if(userSquare.positionX - originalPositionX != 0)
		moveRowWithAnimation((userSquare.positionY - gameScene.positionY) / squareArea, (userSquare.positionX - originalPositionX)/ squareArea);
	if(userSquare.positionY - originalPositionY != 0)
		moveColWithAnimation((userSquare.positionX - gameScene.positionX) / squareArea, (userSquare.positionY - originalPositionY) / squareArea);
	
}

function checkForCompletes(){
	checkForCompleteRows();
	checkForCompleteCols();
}

function moveRowWithAnimation(row, movement){
	if(movingCount==0){
		playEnabled = false;
		userSquare.moveX(-movement * squareArea);
	}
	movingCount+=DELTA_MOV_ANIMATION;
	for(var i=0;i<xSquaresCount;i++){
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
		moveCol(col, movement);
		checkForCompletes();
		playEnabled = true;
	}
}

function moveRow(row, movement){
	var auxSquare = { color: userSquare.color, points: userSquare.points };
	if(movement<0){ //to left
		userSquare.getColorAndPointsFromSquare(squaresMatrix[0][row]);
		for(var i=0;i<xSquaresCount-1;i++){
			squaresMatrix[i][row].getColorAndPointsFromSquare(squaresMatrix[i+1][row]);
		}
		squaresMatrix[xSquaresCount-1][row].getColorAndPointsFromSquare(auxSquare);
		userSquare.positionX = squaresMatrix[0][0].positionX - squareArea;
	}
	else{ //to right
		userSquare.getColorAndPointsFromSquare(squaresMatrix[xSquaresCount-1][row]);
		for(var i=xSquaresCount-2;i>=0;i--){
			squaresMatrix[i+1][row].getColorAndPointsFromSquare(squaresMatrix[i][row]);
		}
		squaresMatrix[0][row].getColorAndPointsFromSquare(auxSquare);
		userSquare.positionX = squaresMatrix[xSquaresCount-1][0].positionX + squareArea;
	}
}

function moveCol(col, movement){
	var auxSquare = { color: userSquare.color, points: userSquare.points };
	if(movement<0){ //to bottom
		userSquare.getColorAndPointsFromSquare(squaresMatrix[col][0]);
		for(var i=0;i<ySquaresCount-1;i++){
			squaresMatrix[col][i].getColorAndPointsFromSquare(squaresMatrix[col][i+1]);
		}
		squaresMatrix[col][ySquaresCount-1].getColorAndPointsFromSquare(auxSquare);
		userSquare.positionY = squaresMatrix[0][0].positionY - squareArea;
	}
	else{ //to top
		userSquare.getColorAndPointsFromSquare(squaresMatrix[col][ySquaresCount-1]);
		for(var i=ySquaresCount-2;i>=0;i--){
			squaresMatrix[col][i+1].getColorAndPointsFromSquare(squaresMatrix[col][i]);
		}
		squaresMatrix[col][0].getColorAndPointsFromSquare(auxSquare);
		userSquare.positionY = squaresMatrix[0][ySquaresCount-1].positionY + squareArea;
	}
}

function checkForCompleteCols(){
	var complete = true;
	for(var i=0;i<xSquaresCount;i++){
		for(var j=0;j<ySquaresCount-1;j++){
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
			if(squaresMatrix[j][i].color != squaresMatrix[j+1][i].color)
				complete = false;
		}
		if(complete)
			deleteRow(i);
		complete = true;
	}
}

function incrementPointsFromRow(row){
	var pointsIncrement = 0;
	for(var j=0;j<xSquaresCount;j++){
		pointsIncrement+=squaresMatrix[j][row].points;
	}
	points+=pointsIncrement;
}

function incrementPointsFromCol(col){
	var pointsIncrement = 0;
	for(var j=0;j<ySquaresCount;j++){
		pointsIncrement+=squaresMatrix[col][j].points;
	}
	points+=pointsIncrement;
}

function deleteCol(col){
	incrementPointsFromCol(col);
	for(var i=col;i<xSquaresCount-1;i++){
		for(var j=0;j<ySquaresCount;j++){
			squaresMatrix[i][j].getColorAndPointsFromSquare(squaresMatrix[i+1][j]);
		}
	}
	
	userSquare.updatePositionByDeletingColInGameScene(gameScene, squareArea);

	xSquaresCount--;
	
	resizeSquaresWidth();
	levelTimer.levelCount = 0;
	
	if(!isWinner()){
		updateSquaresScene();
		checkForCompletes();
	}
}

function deleteRow(row){
	incrementPointsFromRow(row);
	for(var i=row;i<ySquaresCount-1;i++){
		for(var j=0;j<xSquaresCount;j++){
			squaresMatrix[j][i].getColorAndPointsFromSquare(squaresMatrix[j][i+1]);
		}
	}
	
	userSquare.updatePositionByDeletingRowInGameScene(gameScene, squareArea);
	ySquaresCount--;	
	
	resizeSquaresWidth();
	levelTimer.levelCount = 0;
	
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
	canvasContext.fillStyle = BACKGROUND_COLOR;
	canvasContext.fillRect (0, 0, SCENE_WIDTH, SCENE_HEIGHT);
}

function resizeSquaresWidth(){
	//toDo: Try to set rects width bigger when rects count decrease, and smaller when it increase.
	/*SQUARE_WIDTH = 40/(xSquaresCount+ySquaresCount)*4;
	for(var i=0;i<xSquaresCount;i++){
		for(var j=0;j<ySquaresCount;j++){
			squaresMatrix[i][j].width = SQUARE_WIDTH;
		}
	}
	userSquare.width = SQUARE_WIDTH;
	squareArea = SQUARE_WIDTH + RECTS_SEPARATION;
*/
	
}

function nextLevel(){
	if(xSquaresCount<ySquaresCount){
		xSquaresCount++;
		if(!isLooser()){
			for(var i=0;i<ySquaresCount;i++){
				squaresMatrix[xSquaresCount-1][i].color = getRandomColor();
			}
			userSquare.updatePositionByAddingColInGameScene(gameScene, squareArea);
		}
	}
	else{
		ySquaresCount++;
		if(!isLooser()){
			for(var i=0;i<xSquaresCount;i++){
				squaresMatrix[i][ySquaresCount-1].color = getRandomColor();
			}
			userSquare.updatePositionByAddingRowInGameScene(gameScene, squareArea);
		}
	}
	
	resizeSquaresWidth();
	
	if(!isLooser()){
		levelTimer.updateLevelMaxCount(xSquaresCount, ySquaresCount);
		updateSquaresScene();
		drawCanvas();
	}
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
