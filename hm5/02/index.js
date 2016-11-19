(function(){
	eventDOM()
})()

function eventDOM(){
	var rundomTop = Math.floor(Math.random() * window.innerHeight),
		rundomLeft = Math.floor(Math.random() * window.innerWidth),
		rundomWith = Math.floor(Math.random()*100),
		rundomHeight = Math.floor(Math.random()*100),
		rundomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	var newBtn = document.createElement('button')
	newBtn.innerHTML = "Кнопка"
	newBtn.id = "idbtn"
	newBtn.style.cssText ='position:absolute;top:'+rundomTop+'px;left:'+rundomLeft+'px;width:'+rundomWith+'px;height:'+rundomHeight+'px;background:'+rundomColor+';';
	newBtn.addEventListener("mousedown",dragAndDrop);
	newBtn.ondragstart = function() {
	  return false;
	};
		
	document.body.appendChild(newBtn)

	
}

function dragAndDrop(event){
	targetBtn =event.target;
	
	moveAt(event)
	
	function moveAt(e) {
		console.log(e.pageX,';',targetBtn.offsetWidth)
	    targetBtn.style.left = e.pageX - targetBtn.offsetWidth / 2 + 'px';
	    targetBtn.style.top = e.pageY - targetBtn.offsetHeight / 2 + 'px';
	  }

	document.onmousemove = function(e) {
    	moveAt(e);
  	}

	targetBtn.onmouseup = function() {
	    document.onmousemove = null;
	    targetBtn.onmouseup = null;
	}
}
