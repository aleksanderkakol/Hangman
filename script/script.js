const url = `https://api.datamuse.com/words?rel_jja=nice`;

let uniqueChar = [];
let live = 10;
const form = document.querySelector(".form");
const textInput = document.querySelector('.formInput');
const listOfCharacters = document.getElementsByTagName("li");
const restart = document.querySelector('.restart');
const hiddenWord = document.querySelector('.hiddenWord');
const body = document.getElementsByTagName('body');
const lives = document.querySelector('.lives');


const div = document.createElement("div");
const h2 = document.createElement("h2");
const button = document.createElement("button");

lives.textContent = `You have ${live} lives`;


(getWord = async () => {
    let data = await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });

    let randomWord = Math.floor(Math.random() * data.length);
    let choosenWord = data[randomWord].word.toUpperCase();
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


    //submit characters

    let spanCharacters = document.querySelectorAll('span[class^=char]');
    let answearFromInput = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();


        let answear = textInput.value.toUpperCase();
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
            }
            alert("You won!");
        } else if (answear.length === 1) {
            let arrayOfChars = choosenWord.split('');
            if (arrayOfChars.indexOf(answear) === -1) {
                live--;
                lives.textContent = `You have ${live} lives`;
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
            live--;
            lives.textContent = `You have ${live} lives`;
            alert('Sorry wrong word :(');
        }
        if (live === 0) {
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
})()
