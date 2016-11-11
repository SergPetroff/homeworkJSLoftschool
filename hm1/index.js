(function(){
	var myarr = ['я', 'умею', 'писать', 'рекурсивные', 'функции'];
	recursionFunc(myarr)
})();

function recursionFunc(arr, i){
	if (!i) {
		i = 0
	}
	if (i<arr.length) {
		console.log(arr[i])
		i++
		recursionFunc(arr,i)
	}
	
}