const words = ["apple", "banana", "water melon", "blueberry"];
let life = 10;
const form = document.querySelector(".form");
const textInput = document.querySelector('.formInput');
const listOfCharacters = document.getElementsByTagName("li");
const restart = document.querySelector('.restart');
const hiddenWord = document.querySelector('.hiddenWord');
const body = document.getElementsByTagName('body');
const lifes = document.querySelector('.lifes');


const div = document.createElement("div");
const h2 = document.createElement("h2");
const button = document.createElement("button");
lifes.textContent = `Lifes: ${life}`;


let randomWord = Math.floor(Math.random() * words.length);
let choosenWord = words[randomWord].toUpperCase();
console.log(choosenWord)
for (let i = 0; i < choosenWord.split('').length; i++) {
    const span = document.createElement("span");
    span.classList.add("char" + [i]);
    span.textContent = " _ ";
    hiddenWord.appendChild(span);
}

//restart Button
function restartGame() {
    location.reload();
    console.log('restart');
}
restart.addEventListener('click', restartGame);




let spanCharacters = document.querySelectorAll('span[class^=char]');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let answearFromInput = [];
    let answear = textInput.value.toUpperCase();
    answearFromInput.push(answear);
    textInput.value = '';
    textInput.focus();
    if (answear === choosenWord) {
        for (let i = 0; i < spanCharacters.length; i++) {
            spanCharacters[i].textContent = answear[i];
            for (let j = 0; j < listOfCharacters.length; j++) {
                if (answear[i] === listOfCharacters[j].textContent) {
                    listOfCharacters[j].classList.add("green");
                }
            }
        } alert("You won!");
    } else if (answear.length === 1) {
        let arrayOfChars = choosenWord.split('');
        if (arrayOfChars.indexOf(answear) === -1) {
            life--;
            lifes.textContent = `Lifes: ${life}`;
            for (let i = 0; i < listOfCharacters.length; i++) {
                if (answear === listOfCharacters[i].textContent) {
                    listOfCharacters[i].classList.add("red");
                }
            }
        } else {
            for (let j = 0; j < arrayOfChars.length; j++) {
                if (answear === arrayOfChars[j]) {
                    spanCharacters[j].textContent = answear;
                    for (let k = 0; k < listOfCharacters.length; k++) {
                        if (answear === listOfCharacters[k].textContent) {
                            listOfCharacters[k].classList.add("green");
                        }
                    }
                }
            }
        }

    } else if (answear.length > 1 && answear !== choosenWord) {
        life--;
        lifes.textContent = `Lifes: ${life}`;
        alert('Sorry wrong word :(');
    }
    if (life === 0) {
        div.classList.add('gameOver');
        h2.classList.add('gameOverTitle');
        h2.textContent = "You Lose!";
        button.textContent = "restart";
        button.classList.add('restart');
        button.classList.add('button');
        body[0].appendChild(div);
        div.appendChild(h2);
        div.appendChild(button);
        textInput.blur();
        button.addEventListener('click', restartGame);
    }
});