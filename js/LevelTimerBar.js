var LEVEL_TIMER_BAR_BORDER = 2;
var LEVEL_TIMER_BAR_HEIGHT_PERCENT = 0.03;

function LevelTimerBar(levelTimer, canvasContext){
	this.levelTimer = levelTimer; 
	this.canvasContext = canvasContext;
}

LevelTimerBar.prototype.draw = function(){
	var BAR_HEIGHT = SCENE_HEIGHT * LEVEL_TIMER_BAR_HEIGHT_PERCENT;
	this.canvasContext.fillStyle = "#000000";
	this.canvasContext.fillRect (0, 0, SCENE_WIDTH, BAR_HEIGHT); 
	this.canvasContext.fillStyle = this.calculateLevelTimerBarColor();
	var barTotalWidth = SCENE_WIDTH - LEVEL_TIMER_BAR_BORDER * 2;
	var barTotalHeight = BAR_HEIGHT - LEVEL_TIMER_BAR_BORDER * 2;
	var barWidth = (barTotalWidth * levelTimer.levelCount) / levelTimer.levelMaxCount;
	
	this.canvasContext.fillRect (LEVEL_TIMER_BAR_BORDER, LEVEL_TIMER_BAR_BORDER, barWidth, barTotalHeight);
}

LevelTimerBar.prototype.calculateLevelTimerBarColor = function(){
	var greenComponent;
	if(this.levelTimer.levelCount<this.levelTimer.levelMaxCount/2)
		greenComponent = 255;
	else
		greenComponent = 255*(2 - this.levelTimer.levelCount / (this.levelTimer.levelMaxCount/2));
	
	var redComponent;
	if(this.levelTimer.levelCount>this.levelTimer.levelMaxCount/2)
		redComponent = 255;
	else
		redComponent = 255*this.levelTimer.levelCount/(this.levelTimer.levelMaxCount/2);
	
	var barColor = "#" + hexFromInt(redComponent) + hexFromInt(greenComponent) + "00";
	//log("barColor: " + barColor + " redComponent: " + hexFromInt(redComponent) + " greenComponent: " + hexFromInt(greenComponent)); 	
	return barColor;
}