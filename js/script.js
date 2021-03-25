let preQuestions = null;

fetch('https://quiztai.herokuapp.com/api/quiz')
    	.then(resp => resp.json())
    	.then(resp => {
        	   preQuestions = resp;
             setQuestion(index)
    	});

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');
let indexp = document.querySelector('.index');
let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let results = document.querySelector('.results');
let list = document.querySelector('.list');
let userscore = document.querySelector('.userScorePoint');
let average = document.querySelector('.average');
let index = 0;
let points = 0;
let gry = 1;

function activateAnswers() {
	for (let i = 0; i < answers.length; i++) {
		answers[i].addEventListener('click', doAction);
	}
}

activateAnswers();

function markCorrect(elem) {
   elem.classList.add('correct');
}

function markInCorrect(elem) {
   elem.classList.add('incorrect');
}
function disableAnswers() {
	for (let i = 0; i < answers.length; i++) {
		answers[i].removeEventListener('click', doAction);
	}
}

function clearClass() {
	for (let i = 0; i<answers.length; i++) {
		
		let elem = answers[i];
		
		if (elem.classList.contains('correct')) {
			elem.classList.remove('correct');
			}
		if (elem.classList.contains('incorrect')){
			elem.classList.remove('incorrect');
			}
		}
}

function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}

function setQuestion(index) {
   clearClass();
   indexp.innerText = index+1;
   question.innerHTML = preQuestions[index].question;
   if (preQuestions[index].answers.length === 2) {
       answers[2].style.display = 'none';
       answers[3].style.display = 'none';
   } else {
       answers[2].style.display = 'block';
       answers[3].style.display = 'block';
   }
   answers[0].innerHTML = preQuestions[index].answers[0];
   answers[1].innerHTML = preQuestions[index].answers[1];
   answers[2].innerHTML = preQuestions[index].answers[2];
   answers[3].innerHTML = preQuestions[index].answers[3];
}

next.addEventListener('click', function () {
	index++;
   if (index == preQuestions.length) {
       list.style.display = 'none';
       results.style.display = 'block';
	   userscore.innerHTML = points;
	   var obj2 = localStorage.getItem("averageuserscores");
	   var gryilosc = localStorage.getItem("gamecount");
	   let punkty = obj2+points;
	   let averagescore = (punkty/gryilosc);
	   localStorage.setItem("averageuserscores",averagescore);
	   localStorage.setItem("gamecount",gry);
	   average.innerHTML = averagescore;
	   
	   
   } else {
       setQuestion(index);
       activateAnswers();
   }
});

previous.addEventListener('click', function () {
    index--;
	if (index < 0){
		index = 0;
		return;
	}
    setQuestion(index);
    activateAnswers();
});

restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});