(function(){
	
	function Calc (num){
		this.result = num;
	};
	Calc.prototype.sum = function(){
		return [].reduce.call(arguments, function(prev,current){
			return prev += current;
		}, this.result);
	}
	Calc.prototype.dif = function(){
		return [].reduce.call(arguments, function(prev,current){
			return prev -= current;
		}, this.result);
	}
	Calc.prototype.div = function(){
		return [].reduce.call(arguments, function(prev,current){
			return prev/current
		}, this.result);
	}
	Calc.prototype.mul = function(){
		return [].reduce.call(arguments, function(prev,current){
			return prev * current;
		}, this.result);
	}



	// Конструктор 
	function constCalc (num) {
	    // Вызов конструктора родителя
		Calc.apply(this, arguments);
	}

	// Наследование
	constCalc.prototype = Object.create(Calc.prototype);
	constCalc.prototype.constructor = constCalc;

	// Переопределение метода sum
	constCalc.prototype.sum = function() {
	   // Вызвать метод родителя, передав ему текущие аргументы
	   var result = Calc.prototype.sum.apply(this, arguments);
	   // Возводим в степень
	   return Math.pow(result, 2);
	}
	// Переопределение метода dif
	constCalc.prototype.dif = function() {
	   // Вызвать метод родителя, передав ему текущие аргументы
	   var result = Calc.prototype.dif.apply(this, arguments);
	   // Возводим в степень
	   return Math.pow(result, 2);
	}

	// Переопределение метода div
	constCalc.prototype.div = function() {
	   // Вызвать метод родителя, передав ему текущие аргументы
	   var result = Calc.prototype.div.apply(this, arguments);
	   // Возводим в степень
	   console.log(result)
	   return Math.pow(result, 2);
	}

	// Переопределение метода div
	constCalc.prototype.mul = function() {
	   // Вызвать метод родителя, передав ему текущие аргументы
	   var result = Calc.prototype.mul.apply(this, arguments);
	   // Возводим в степень
	   console.log(result)
	   return Math.pow(result, 2);
	}


	var sum = new Calc(100);
	console.log(sum.sum(1,2,3));

	var sum2 = new constCalc(100);
	console.log(sum2.sum(1,2,3));

	var dif = new Calc(100);
	console.log(dif.dif(10,20));

	var dif2 = new constCalc(100);
	console.log(dif2.dif(10,20));

	var div = new Calc(100);
	console.log(div.div(2,2));

	var div2 = new constCalc(100);
	console.log(div2.div(2,2));

	var mul = new Calc(100);
	console.log(mul.mul(2,2));

	var mul2 = new constCalc(100);
	console.log(mul2.mul(2,2));



})()


/*function calculator(firstNumber){

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
}*/