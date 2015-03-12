var GAME_COUNTER_DURATION = 1000;
var gameTimerGlobal;

function GameTimer(){
	this.gameCount = 0;
	gameTimerGlobal = this;
	this.timer = setTimeout("gameCounter()", GAME_COUNTER_DURATION);
}

function gameCounter (){
	gameTimerGlobal.gameCount++;
	gameTimerGlobal.updateTimeLabel();
	gameTimerGlobal.timer = setTimeout("gameCounter()", GAME_COUNTER_DURATION);
}

GameTimer.prototype.updateTimeLabel = function(){
	var layer=document.getElementById("timeLabel");
	layer.innerHTML="Game time: " + this.gameCount;
}

GameTimer.prototype.stopTimer = function(){
	clearTimeout(this.timer);
}