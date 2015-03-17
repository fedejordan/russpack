var GAME_SPEED = 0; //5
var SLOWER_SPEED = 500;
var LEVEL_COUNTER_DURATION = 1;
var levelTimerGlobal;

function LevelTimer(xSquaresCount, ySquaresCount, nextLevelFunction, drawCanvasFunction){
	this.levelCount = 0;
	levelTimerGlobal = this;
	this.updateLevelMaxCount(xSquaresCount, ySquaresCount);
	this.nextLevelFunction = nextLevelFunction;
	this.drawCanvasFunction = drawCanvasFunction;
	this.timer = setTimeout("levelCounter()", LEVEL_COUNTER_DURATION);
}

function levelCounter (){
	levelTimerGlobal.levelCount++;
		levelTimerGlobal.levelCount++;
	if(levelTimerGlobal.levelCount>levelTimerGlobal.levelMaxCount){
		levelTimerGlobal.levelCount = 0;
		levelTimerGlobal.nextLevelFunction();
		
	}
	levelTimerGlobal.drawCanvasFunction();
	levelTimerGlobal.timer = setTimeout("levelCounter()", LEVEL_COUNTER_DURATION);
}

LevelTimer.prototype.stopTimer = function(){
	clearTimeout(this.timer);
}

LevelTimer.prototype.updateLevelMaxCount = function (xSquaresCount, ySquaresCount){
	this.levelMaxCount = (ySquaresCount+xSquaresCount)* (SLOWER_SPEED - GAME_SPEED);
}