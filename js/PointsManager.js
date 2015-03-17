var POINTS_FONT_NAME = "calibri";
var POINTS_FONT_SIZE = "220px";
var POINTS_FONT_COLOR = "#e8e8e8";//"#e4e4e4";
var POINTS_FONT_STYLE = "bold"

function PointsManager(canvasContext, sceneWidth, sceneHeight){
	this.points = 0;
	this.canvasContext = canvasContext;
	this.sceneWidth = sceneWidth;
	this.sceneHeight = sceneHeight;
	this.animationTimerCount = 0;
	this.pointsIncrementAnimations = [];
}

PointsManager.prototype.addPoints = function(pointsToAdd, rowOrCol, lineNumber){
	this.points+=pointsToAdd;
	this.printPoints();
	this.pointsIncrementAnimations.push(new PointsIncrementAnimation(pointsToAdd, rowOrCol, lineNumber));
}

PointsManager.prototype.subtractPoints = function(pointsToSubtract){
	this.points-=pointsToSubtract;
	this.printPoints();
}

PointsManager.prototype.printPoints = function(){
	console.log("Score: " + this.points);
}

PointsManager.prototype.draw = function(){
	this.canvasContext.font = POINTS_FONT_STYLE + " " + POINTS_FONT_SIZE + " " + POINTS_FONT_NAME;
	this.canvasContext.fillStyle  = POINTS_FONT_COLOR;
	this.canvasContext.textBaseline = "middle";
	this.canvasContext.textAlign = "left";
	this.canvasContext.fillText(this.points, this.sceneWidth*0.05, this.sceneHeight*0.23);
}

//PointsIncrementAnimation

function PointsIncrementAnimation(pointsIncrement, rowOrCol, lineNumber){
	this.pointsIncrement = pointsIncrement;
	this.rowOrCol = rowOrCol;
	this.lineNumber = lineNumber;
}