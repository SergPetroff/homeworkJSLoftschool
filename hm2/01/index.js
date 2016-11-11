(function () {
	var allNumbers = [1, 2, 4, 5, 6, 7, 8],
	someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
	noNumbers = ['это', 'массив', 'без', 'чисел'];
	try{
		console.log(isAllTrue(allNumbers,isNumber))
	} catch(e){
		console.log(e.message)
	}
})()

function isAllTrue(source, filterFn){
	if (source.length === 0) {
		throw new Error('EMPTY ARRAY');
	}
	var checkNum = true;
		for (var i = 0; i < source.length; i++) {
			if (!filterFn(source[i])) {
				checkNum = false
			}
		}
	return checkNum
}

function isNumber(val){ 
	return typeof val === 'number';
}