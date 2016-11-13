(function () {
	var allNumbers = [1, 2, 4, 5, 6, 7, 8],
	someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
	noNumbers = ['это', 'массив', 'без', 'чисел'];
	try{
		console.log(isSomeTrue(noNumbers,isNumber))
	} catch(e){
		console.log(e.message)
	}
})()

function isSomeTrue(source, filterFn){
	if (source.length === 0) {
		throw new Error('EMPTY ARRAY');
	}
		for (var i = 0; i < source.length; i++) {
			
			if (filterFn(source[i])) {
				return true;
			}
		}
		return false;
}

function isNumber(val){ 
	return typeof val === 'number';
}
