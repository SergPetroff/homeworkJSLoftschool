(function(){
	
	var constCalc = new calculator(100);

	function mysqrt(){
		return this * this
	}
	console.log(mysqrt.call(constCalc.sum(1,2,3)))
	console.log(mysqrt.call(constCalc.dif(10,20)))
	console.log(mysqrt.call(constCalc.div(2,2)))
	console.log(mysqrt.call(constCalc.mul(2,2)))
})()

function calculator(firstNumber){

	return {
		sum:function(){
			var result = 0
			for (var i = 0; i < arguments.length; i++) {
				result = result + arguments[i]
			}

			return result + firstNumber
		},
		dif:function(){
			var result = 0
			for (var i = 0; i < arguments.length; i++) {
				result = result + arguments[i]
			}

			return firstNumber - result
		},
		div:function(){
			var result = 0;
			result =  firstNumber / arguments[0];
			if (typeof arguments[1] === 'number') {
				result = result / arguments[1];
			}
			

			return result
		},
		mul:function(){
			var result = 0;
			result = firstNumber * arguments[0];
			if (typeof arguments[1] === 'number') {
				result = result * arguments[1];	
			}
			return result
		}
	}
}