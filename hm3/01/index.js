(function () {
	let array = [1, 2, 3, 4, 5, 6];
	
	forEach(array, item => console.log(item));

	let greaterThan4 = filter(array, item => item > 4);
	console.log(greaterThan4)

	let sqare = map(array, item => item*item);
	console.log(sqare)

	let myreduce  = reduce(array,function(prev,cur,index){
		return prev + cur;
	})
	console.log(myreduce)

})()

function forEach(array,callback){
	if (typeof callback === 'function' && Array.isArray(array)) {
		for (var i = 0; i < array.length; i++) {
			callback(array[i])
		}
	}
}
function filter(array, callback){
 	var result = []
 	if (typeof callback === 'function' && Array.isArray(array)) {
 		for (var i = 0; i < array.length; i++) {
 			if(callback(array[i])){
 				result.push(array[i]);
 			}
 		}
 	}
 	return result
}

function map(array, callback){
 	var result = [] 	
 	if (typeof callback === 'function' && Array.isArray(array)) {
 		for (var i = 0; i < array.length; i++) {
 			result.push(callback(array[i]));
 		}
 	}
 	return result
}

function slice(array,begin,end){
 	var result = [] 	
 	if (Array.isArray(array)) {
 		for (var i = 0; i < array.length; i++) {
 			if (i>=begin && i<end ) {
 				result.push(array[i])
 			}
 		}
 	}
 	return result
}

function reduce(array,callback,initialValue){
 	var result;
 	if(!initialValue){
 		result = 0;
 	}else{
		result = initialValue;
 	}

 	if (typeof callback === 'function' && Array.isArray(array)) {
      for (var i = 0; i < array.length; i++) {
      		let index = i+1;
      		result = callback(result,array[i],index)
      	}
      }
    return result;
}