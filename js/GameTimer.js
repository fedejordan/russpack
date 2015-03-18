var GAME_TIMER_FONT_NAME = "calibri";
var GAME_TIMER_FONT_SIZE = "60px";
var GAME_TIMER_FONT_COLOR = "#e8e8e8";//"#e4e4e4";
var GAME_TIMER_FONT_STYLE = "bold"
var GAME_COUNTER_DURATION = 1000;
var gameTimerGlobal;

function GameTimer(canvasContext, sceneWidth, sceneHeight){
	this.gameCount = 0;
	gameTimerGlobal = this;
	this.canvasContext = canvasContext;
	this.sceneWidth = sceneWidth;
	this.sceneHeight = sceneHeight;
	this.timer = setTimeout("gameCounter()", GAME_COUNTER_DURATION);
}

function gameCounter (){
	gameTimerGlobal.gameCount++;
	//gameTimerGlobal.updateTimeLabel();
	gameTimerGlobal.timer = setTimeout("gameCounter()", GAME_COUNTER_DURATION);
}

GameTimer.prototype.updateTimeLabel = function(){
	var layer=document.getElementById("timeLabel");
	layer.innerHTML="Game time: " + this.gameCount;
}

GameTimer.prototype.stopTimer = function(){
	clearTimeout(this.timer);
}

GameTimer.prototype.draw = function(){

	this.canvasContext.font = GAME_TIMER_FONT_STYLE + " " + GAME_TIMER_FONT_SIZE + " " + GAME_TIMER_FONT_NAME;
	this.canvasContext.fillStyle  = GAME_TIMER_FONT_COLOR;
	this.canvasContext.textBaseline = "middle";
	this.canvasContext.textAlign = "left";
	this.canvasContext.fillText(this.gameCount, this.sceneWidth*0.05, this.sceneHeight*0.5);
}