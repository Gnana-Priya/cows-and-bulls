var actualNumber, noOfCows = 0, noOfBulls = 0, noOfAttempts = 0, minAttempts = null, max, min;

document.getElementById('easy').addEventListener('click', function() {
	console.log('easy');
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.game').style.display = 'block';
	max = 999;
	min = 100;
	init();
})

document.getElementById('medium').addEventListener('click', function() {
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.game').style.display = 'block';
	max = 9999;
	min = 1000;
	init();
})

document.getElementById('difficult').addEventListener('click', function() {
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.game').style.display = 'block';
	max = 99999;
	min = 10000;
	init();
})

document.getElementById('choose-level').addEventListener('click', function() {
    reset();
})

document.getElementById('submit').addEventListener('click', function() {
	noOfCows = 0;
	noOfBulls = 0;
	noOfAttempts++;

	console.log(actualNumber);
	console.log(noOfAttempts);

	var input = document.getElementById('number').value;
	if (actualNumber == input) {
		alert('Hurray!!! You won this game in ' + noOfAttempts + ' attempts');
		document.querySelector('.home').style.display = 'block';
		document.querySelector('.game').style.display = 'none';
		console.log(document.getElementById('top-score').value);
		if (minAttempts == null || noOfAttempts < minAttempts) {
			minAttempts = noOfAttempts;
			document.getElementById('top-score').textContent = minAttempts ;
		}
		reset();
	}

	else {
    	var inputDigits = [],
        inputNumber = input.toString();

    	for (var i = 0, len = inputNumber.length; i < len; i += 1) {
    	    inputDigits.push(+inputNumber.charAt(i));
    	}

    	var outputDigits = [],
        outputNumber = actualNumber.toString();

    	for (var i = 0, len = outputNumber.length; i < len; i += 1) {
    	    outputDigits.push(+outputNumber.charAt(i));
    	}

    	for (i = 0; i < inputNumber.length; i++) {
    		if (inputDigits[i] == outputDigits[i]) {
    			noOfCows++;
    			inputDigits[i] = -1;
    			outputDigits[i] = -2;
    		}
    	}

    	for (i = 0; i < inputNumber.length; i++)
    	{
    		if (outputDigits.indexOf(inputDigits[i]) !== -1) {
    			noOfBulls++;
    		}
    	}

    	document.getElementById('cows').textContent = 'Cows: ' + noOfCows;
    	document.getElementById('bulls').textContent = 'Bulls: ' + noOfBulls;
        document.querySelector('.history').style.display = 'block';
        var table = document.getElementById('tbody');
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = noOfAttempts;
        cell2.innerHTML = inputNumber;
        cell3.innerHTML = noOfCows;
        cell4.innerHTML = noOfBulls
	}
})


function init()
{
	actualNumber = Math.floor(Math.random() * (max - min + 1) + min);
	console.log(actualNumber);
	noOfAttempts = 0;
}

function reset()
{
    document.getElementById('number').value = '';
    document.getElementById('cows').textContent = 'Cows: 0';
    document.getElementById('bulls').textContent = 'Bulls: 0';
    document.querySelector('.home').style.display = 'block';
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.history').style.display = 'none';
    var Parent = document.getElementById('tbody');
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
}





