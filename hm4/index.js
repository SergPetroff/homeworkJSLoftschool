(function(){
	var divcontainer = document.getElementById('container');
	var newdiv = document.createElement('div');
	
	prepend(divcontainer,newdiv)
	deleteTextNodes(document.getElementById('subdiv2'))
	scanDOM(document)
})()


function prepend(container,newElem){
	var firstChild = container.firstElementChild;
	container.insertBefore(newElem, firstChild);
};


function deleteTextNodes(elem){
	var arrChildEl = elem.childNodes;
	var arrForDel = [];

	//собираем текстовые ноды
	for (var i = 0; i < arrChildEl.length; i++) {
		var currNode = arrChildEl[i];
		
		if (currNode.nodeType === 1) {
			deleteTextNodes(currNode) // рекурсия
		}else if(currNode.nodeType === 3){
			arrForDel.push(currNode);
		}
	}

	// удаление
	for (var i = 0; i < arrForDel.length; i++) {
		arrForDel[i].remove()
	}
}

function scanDOM(doc) {
	var arrChildEl = elem.childNodes;
	var result ={};
	var currentTag =""

	/*недоделал*/


	console.log(result)
}