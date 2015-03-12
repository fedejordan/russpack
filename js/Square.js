var BORDER_COLOR = "#000000";

function Square(positionX, positionY, width, color, canvasContext, border){
	this.positionX = positionX;
	this.positionY = positionY;
	this.width = width;
	this.color = color;
	this.canvasContext = canvasContext;
	this.border = border;
}

Square.prototype.draw = function(){
	canvasContext.fillStyle = BORDER_COLOR;
	canvasContext.fillRect (this.positionX - this.border, this.positionY - this.border, this.width + 2 * this.border, this.width + 2 * this.border);
	canvasContext.fillStyle = this.color;
	canvasContext.fillRect (this.positionX, this.positionY, this.width, this.width);
}

Square.prototype.updatePosition = function(newPositionX, newPositionY){
	this.positionX = newPositionX;
	this.positionY = newPositionY;
}

Square.prototype.moveX = function(incrementX){
	this.positionX += incrementX;
}

Square.prototype.moveY = function(incrementY){
	this.positionY += incrementY;
}

Square.prototype.actualPositionIsValid = function(rectsSceneX, rectsSceneY, rectsSceneWidth, rectsSceneHeight, squareArea){
	if(this.positionX >= rectsSceneX + rectsSceneWidth + squareArea)
		return false;
	else if(this.positionY >= rectsSceneY + rectsSceneHeight + squareArea)
		return false;
	else if(this.positionX < rectsSceneX - squareArea)
		return false;
	else if(this.positionY < rectsSceneY - squareArea)
		return false;
	return true;
}

Square.prototype.actualPositionIsValidInGameScene = function(gameScene, squareArea){
	if(this.positionX >= gameScene.positionX + gameScene.width + squareArea)
		return false;
	else if(this.positionY >= gameScene.positionY + gameScene.height + squareArea)
		return false;
	else if(this.positionX < gameScene.positionX - squareArea)
		return false;
	else if(this.positionY < gameScene.positionY - squareArea)
		return false;
	return true;
}

Square.prototype.isInside = function(rectsSceneX, rectsSceneY, rectsSceneWidth, rectsSceneHeight){
	return (this.positionX >= rectsSceneX && this.positionX < rectsSceneX + rectsSceneWidth && this.positionY >= rectsSceneY && this.positionY < rectsSceneY + rectsSceneHeight);
}

Square.prototype.isInsideGameScene = function(gameScene){
	return this.isInside(gameScene.positionX, gameScene.positionY, gameScene.width, gameScene.height);
}

Square.prototype.updatePositionByDeletingCol = function(rectsSceneX, rectsSceneWidth, rectArea){
	//log("updatePositionByDeletingCol(" + rectsSceneX + ", " + rectsSceneWidth + ", " + rectArea + ")");
	if(this.positionX >= rectsSceneX+rectsSceneWidth)
		this.positionX-=rectArea/2;
	else
		this.positionX+=rectArea/2;
	//log("this.positionX: " + this.positionX);
}

Square.prototype.updatePositionByDeletingRow = function(rectsSceneY, rectsSceneHeight, rectArea){
	//log("updatePositionByDeletingRow(" + rectsSceneY + ", " + rectsSceneHeight + ", " + rectArea + ")");
	if(this.positionY >= rectsSceneY+rectsSceneHeight)
		this.positionY-=rectArea/2;
	else
		this.positionY+=rectArea/2;
	//log("this.positionY: " + this.positionY);
}

Square.prototype.updatePositionByAddingCol = function(rectsSceneX, rectsSceneWidth, rectArea){
	//log("updatePositionByAddingCol(" + rectsSceneX + ", " + rectsSceneWidth + ", " + rectArea + ")");
	if(this.positionX >= rectsSceneX+rectsSceneWidth)
		this.positionX+=rectArea/2;
	else
		this.positionX-=rectArea/2;
	//log("this.positionX: " + this.positionX);
}

Square.prototype.updatePositionByAddingRow = function(rectsSceneY, rectsSceneHeight, rectArea){
	//log("updatePositionByAddingRow(" + rectsSceneY + ", " + rectsSceneHeight + ", " + rectArea + ")");
	if(this.positionY >= rectsSceneY+rectsSceneHeight)
		this.positionY+=rectArea/2;
	else
		this.positionY-=rectArea/2;
	//log("this.positionY: " + this.positionY);
}

Square.prototype.updatePositionByDeletingColInGameScene = function(gameScene, rectArea){
	this.updatePositionByDeletingCol(gameScene.positionX, gameScene.width, rectArea);
}

Square.prototype.updatePositionByDeletingRowInGameScene = function(gameScene, rectArea){
	this.updatePositionByDeletingRow(gameScene.positionY, gameScene.height, rectArea);
}

Square.prototype.updatePositionByAddingColInGameScene = function(gameScene, rectArea){
	this.updatePositionByAddingCol(gameScene.positionX, gameScene.width, rectArea);
	
}

Square.prototype.updatePositionByAddingRowInGameScene = function(gameScene, rectArea){
	this.updatePositionByAddingRow(gameScene.positionY, gameScene.height, rectArea);
}