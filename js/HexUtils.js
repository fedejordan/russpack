//Until 255
function hexFromInt(value){
	var firstCharacter = Math.floor(value/16);
	var secondCharacter = Math.floor(value - firstCharacter * 16);
	return convertToHexCharacter(firstCharacter) + convertToHexCharacter(secondCharacter);
}

function convertToHexCharacter(value){
	if(value == 10)
		return 'A';
	if(value == 11)
		return 'B';
	if(value == 12)
		return 'C';
	if(value == 13)
		return 'D';
	if(value == 14)
		return 'E';
	if(value == 15)
		return 'F';
	return "" + value;
}