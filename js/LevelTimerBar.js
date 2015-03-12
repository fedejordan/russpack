function drawLevelTimerBar(){
	var LEVEL_TIMER_BAR_BORDER = 2;
	var BAR_HEIGHT = SCENE_HEIGHT * 0.03;
	canvasContext.fillStyle = "#000000";
	canvasContext.fillRect (0, 0, SCENE_WIDTH, BAR_HEIGHT);
	canvasContext.fillStyle = calculateLevelTimerBarColor(levelTimer);
	var barTotalWidth = SCENE_WIDTH - LEVEL_TIMER_BAR_BORDER * 2;
	var barTotalHeight = BAR_HEIGHT - LEVEL_TIMER_BAR_BORDER * 2;
	var barWidth = (barTotalWidth * levelTimer.levelCount) / levelTimer.levelMaxCount;
	
	canvasContext.fillRect (LEVEL_TIMER_BAR_BORDER, LEVEL_TIMER_BAR_BORDER, barWidth, barTotalHeight);
}

function calculateLevelTimerBarColor(levelTimer){
	var greenComponent;
	if(levelTimer.levelCount<levelTimer.levelMaxCount/2)
		greenComponent = 255;
	else
		greenComponent = 255*(2 - levelTimer.levelCount / (levelTimer.levelMaxCount/2));
	
	var redComponent;
	if(levelTimer.levelCount>levelTimer.levelMaxCount/2)
		redComponent = 255;
	else
		redComponent = 255*levelTimer.levelCount/(levelTimer.levelMaxCount/2);
	
	var barColor = "#" + hexFromInt(redComponent) + hexFromInt(greenComponent) + "00";
	//log("barColor: " + barColor + " redComponent: " + hexFromInt(redComponent) + " greenComponent: " + hexFromInt(greenComponent)); 	
	return barColor;
}