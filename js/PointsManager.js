var POINTS_FONT_NAME = "arial";
var POINTS_FONT_SIZE = "60px";
var POINTS_FONT_COLOR = "#fff";

function PointsManager(canvasContext, sceneWidth, sceneHeight){
	this.points = 0;
	this.canvasContext = canvasContext;
	this.sceneWidth = sceneWidth;
	this.sceneHeight = sceneHeight;
}

PointsManager.prototype.addPoints = function(pointsToAdd){
	this.points+=pointsToAdd;
	this.printPoints();
}


PointsManager.prototype.subtractPoints = function(pointsToSubtract){
	this.points-=pointsToSubtract;
	this.printPoints();
}

PointsManager.prototype.printPoints = function(){
	console.log("Score: " + this.points);
}

PointsManager.prototype.draw = function(){
	this.canvasContext.font = POINTS_FONT_SIZE + " " + POINTS_FONT_NAME;
	this.canvasContext.fillStyle  = POINTS_FONT_COLOR;
	this.canvasContext.textBaseline = "middle";
	this.canvasContext.textAlign = "left";
	this.canvasContext.fillText(this.points, this.sceneWidth*0.05, this.sceneHeight*0.2);
}