import {Letter.js} from 'module';
module.exports = {
  hello: function() {
    return "Letter.js";
    }
    }
    
    const myModule = require('./mymodule');
    let val = myModule.letter.js();
    
   function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = Letter.js;

    // callback function.
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

const Word = require('./Letter.js');
const inquirer = require('inquirer');

var target;
var targetWord;
var guesses;
var guessesLeft;

const wordList = ["abstract",	"arguments",	"boolean",
"break",	"byte",	"case",	"catch",
"char",	"class", "continue",
"debugger",	"default",	"delete",	"do",
"double",	"else",	"eval",
"export",	"extends",	"false",	"final",
"finally",	"float",	"for",	"function",
"goto",	"if",	"implements",	"import",
"in",	"instanceof", "interface",
"let",	"long",	"native",	"new",
"null",	"package",	"private",	"protected",
"public",	"return",	"short",	"static",
"super",	"switch",	"synchronized",	"this",
"throws",	"transient",	"true",	"void"]; 

    // Select a word from the given list
    function randomWord(wordList) {
        var index = Math.floor(Math.random() * wordList.length);
        return wordList[index];
    }

const questions = [
    {
        name: 'letterGuessed',
        message: 'Guess a letter',
        validate: function (value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1); // fix letter logic later
            return valid || 'Please enter a single letter';
        },
        when: function () {
            return (!target.allGuessed() && guessesLeft > 0);
        }
    },
    {
        type: 'confirm',
        name: 'playAgain',
        message: 'Want to play again?',
        // default: true,
        when: function () {
            return (target.allGuessed() || guessesLeft <= 0);
        }
    }
];

function resetGame() {
    targetWord = randomWord(wordList);
    // console.log(targetWord);
    target = new Word(targetWord);
    target.makeGuess(' ');
    guesses = [];
    guessesLeft = 9;
}

function ask() {
    // console.log('target.allGuessed():', target.allGuessed());
    if (!target.allGuessed() && guessesLeft > 0) {
        console.log(target + '');
    }
    
    inquirer.prompt(questions).then(answers => {
        // console.log('answers.playAgain ' + answers.playAgain);
        if ('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }

        if (answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();
            
            if (guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                target.makeGuess(currentGuess);
                if (targetWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('you already guessed', currentGuess);
                
            }
        }

        if (!target.allGuessed()) {
            if (guessesLeft < 1) {
                console.log('no more guesses');
                console.log(targetWord, 'was correct.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remaining:', guessesLeft);
            }

        } else {
            console.log(targetWord, 'is correct!');
            // console.log(answers.playAgain);
        }

        ask();
    }); // end inquirer.then
}
resetGame();
ask();
