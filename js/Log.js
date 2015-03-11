function log(text, isNew){
	var layer=document.getElementById("log");
	if (isNew)
		layer.innerHTML+="<br/>"+text;
	else
		layer.innerHTML=text;
}