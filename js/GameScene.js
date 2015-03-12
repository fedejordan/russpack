function GameScene(squareArea, xSquaresCount, ySquaresCount, SCENE_WIDTH, SCENE_HEIGHT){
	var width, height, positionX, positionY;
	this.update(squareArea, xSquaresCount, ySquaresCount, SCENE_WIDTH, SCENE_HEIGHT);
}

GameScene.prototype.update = function(squareArea, xSquaresCount, ySquaresCount, SCENE_WIDTH, SCENE_HEIGHT){
	this.width = squareArea * xSquaresCount;
	this.height = squareArea * ySquaresCount;
	this.positionX = (SCENE_WIDTH-this.width)/2;
	this.positionY = (SCENE_HEIGHT-this.height)/2;
}