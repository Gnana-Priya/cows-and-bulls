var actualNumber, noOfCows = 0, noOfBulls = 0, noOfAttempts = 0, minAttempts = null, max, min;

document.getElementById('easy').addEventListener('click', function() {
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.game').style.display = 'block';
	max = 999;
	min = 100;
	document.getElementById("input-number").textContent = 'Guess the secret 3 digit number';
	document.getElementById("nos").placeholder = 'Enter 3 digit number';
	init();
})

document.getElementById('medium').addEventListener('click', function() {
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.game').style.display = 'block';
	document.getElementById("input-number").textContent = 'Guess the secret 4 digit number';
	document.getElementById("nos").placeholder = 'Enter 4 digit number';
	max = 9999;
	min = 1000;
	init();
})

document.getElementById('difficult').addEventListener('click', function() {
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.game').style.display = 'block';
	document.getElementById("input-number").textContent = 'Guess the secret 5 digit number';
	document.getElementById("nos").placeholder = 'Enter 5 digit number';
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

	var input = document.getElementById('nos').value;
	if (actualNumber == input) {
		noOfAttempts++;
		alert('Hurray!!! You won this game in ' + noOfAttempts + ' attempts');
		document.querySelector('.home').style.display = 'block';
		document.querySelector('.game').style.display = 'none';
		if (minAttempts == null || noOfAttempts < minAttempts) {
			minAttempts = noOfAttempts;
			document.getElementById('top-score').textContent = "Minimum no of attempts: " + minAttempts ;
		}
		reset();
	}

	else {
    	var inputDigits = [],
		inputNumber = input.toString();
		
		if (inputNumber < min
			|| inputNumber > max 
		) {
			alert ("Please enter a valid number");
			return;
		}

		noOfAttempts++;
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
		cell4.innerHTML = noOfBulls;

		if (noOfBulls == 0 && noOfCows == 0) {
			var x = row.insertCell(4);
			var img = document.createElement('img');
			img.src = "assets/thumbs-down.png";
			img.width = 25;
			img.height = 25;
			x.appendChild(img);
		} else {
			if (noOfCows > 0) {
				for (i=0; i<noOfCows; i++) {
					var x = row.insertCell(i+4);
					var img = document.createElement('img');
					img.src = "assets/cow.png";
					img.width = 25;
					img.height = 25;
					x.appendChild(img);
				}
			}

			if (noOfBulls > 0) {
				for (i=0; i<noOfBulls; i++) {
					// row.insertCell(noOfCows+i+4).innerHTML = "bull";
					var x = row.insertCell(noOfCows+i+4);
					var img = document.createElement('img');
					img.src = "assets/bull.png";
					img.width = 25;
					img.height = 25;
					x.appendChild(img);
				}
			}
		}
	}
	document.getElementById('nos').value = "";
})


function init()
{
	actualNumber = Math.floor(Math.random() * (max - min + 1) + min);
	noOfAttempts = 0;
}

function reset()
{
    document.getElementById('nos').value = '';
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
