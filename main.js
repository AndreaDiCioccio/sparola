
import { a3LettersWords, a4LettersWords, a5LettersWords, a6LettersWords, a7LettersWords }  from './words'

let canvas = {
    width:document.getElementById('sparola').clientWidth,
    height:document.getElementById('sparola').clientHeight
}

let column1 = {
    interval: null, 
    startXPosition: 10,
    startYPosition: 50,
    speed: 1,
    wordPosition: 0,
    word: ''
}

let column2 = {
    interval: null, 
    startXPosition: 250,
    startYPosition: 50,
    speed: 1,
    wordPosition: 0,
    word: ''
}

let column3 = {
    interval: null, 
    startXPosition: 500,
    startYPosition: 50,
    speed: 1,
    wordPosition: 0,
    word: ''
}

let a3LettersWordsCount = 0
let a4LettersWordsCount = 0
let a5LettersWordsCount = 0
let a6LettersWordsCount = 0
let a7LettersWordsCount = 0

let maxWords = 8
let remainingWords = maxWords * 5
let interval
let gameEnded = false
let speed = 50
let score = 0

let context = setupCanvas(document.getElementById('sparola'))

let text = document.getElementById('text')
text.value = ''
document.addEventListener('keypress', keyPress)

startPresentation()
setTimeout(function() {startGame()}, 10000)

function startPresentation(){
    context.font = '20px sans-serif'
    context.fillText(('type the word and press enter! hurry up!!!'), 50,50)
}
function startGame(){
    column1.word = getWord()
    column2.word = getWord()
    column3.word = getWord()
    interval = setInterval( function() {draw()}, speed)
}

function draw(){
    context.clearRect(0,0, canvas.width, canvas.height)
    drawRemainingWords()
    remainingWords ? drawColumn(column1) : null
    remainingWords ? drawColumn(column2) : null
    remainingWords ? drawColumn(column3) : null
}

function drawRemainingWords() {
    context.font = '20px sans-serif'
    context.fillText(('remaining words:' + remainingWords), 0, 20)
}

function drawColumn(column){
    context.font = '20px sans-serif'
    if(column.word.length == 4)
        column.speed = 1.5
    if(column.word.length == 5)
        column.speed = 2
    if(column.word.length == 6)
        column.speed = 2.5
    if(column.word.length == 7)
        column.speed = 3

    column.wordPosition += column.speed

    context.fillText((column.word), column.startXPosition, column.startYPosition + column.wordPosition)
    
    if(checkGameOver(column)){
        gameOver()
    }
}

function getWord(){

    let index = null
    let word = ''

    if(a3LettersWords.length > 0 && a3LettersWordsCount < maxWords){
        index = getWordIndex(a3LettersWords.length)
        word = a3LettersWords[index]
        a3LettersWords.splice(index, 1)
        a3LettersWordsCount++
    } else if(a4LettersWords.length > 0 && a4LettersWordsCount < maxWords){        
        index = getWordIndex(a4LettersWords.length)
        word = a4LettersWords[index]
        a4LettersWords.splice(index, 1)
        a4LettersWordsCount++
    } else if(a5LettersWords.length > 0 && a5LettersWordsCount < maxWords){
        index = getWordIndex(a5LettersWords.length)
        word = a5LettersWords[index]
        a5LettersWords.splice(index, 1)
        a5LettersWordsCount++
    } else if(a6LettersWords.length > 0 && a6LettersWordsCount < maxWords){
        index = getWordIndex(a6LettersWords.length)
        word = a6LettersWords[index]
        a6LettersWords.splice(index, 1)
        a6LettersWordsCount++
    } else if(a7LettersWords.length > 0 && a7LettersWordsCount < maxWords){
        index = getWordIndex(a7LettersWords.length)
        word = a7LettersWords[index]
        a7LettersWords.splice(index, 1)
        a7LettersWordsCount++
    } else 
        youWin()

    return word
}

function getWordIndex(arrayLength){
    let index = null
    while(index == null || index > arrayLength){
        index = Math.random() * 1000
    }
    return Math.floor(index)
}

function keyPress(key){
    if(key.code == 'Enter' && !gameEnded)
        sparola()
}

function sparola(){
    if(text.value == column1.word){
        updateScore(column1)
        remainingWords--
        resetColumn(column1)
    }else if(text.value == column2.word){
        updateScore(column2)
        remainingWords--
        resetColumn(column2)
    }else if(text.value == column3.word){
        updateScore(column3)
        remainingWords--
        resetColumn(column3)
    }

    text.value = ''
}

function resetColumn(column){
    column.wordPosition = 0
    column.word = getWord()
}

function updateScore(column){
    let distance = column.wordPosition
    score += column.word.length * 10000 / distance
    score = Math.floor(score)
}

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

function youWin(){
    clearInterval(interval)
    context.clearRect(0,0, canvas.width, canvas.height)
    context.font = '50px sans-serif'
    context.fillText('you are a Champion', 0, 80)
    context.font = '25px sans-serif'
    context.fillText('your score is ' + score, 0, 120)
}                

function gameOver(){
    //cancella il canvas e scrivi game over
    clearInterval(interval)
    setTimeout( function() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.font = '100px sans-serif'
        context.fillText('Game Over', 0, 80)
        context.font = '25px sans-serif'
        context.fillText('your score is ' + score, 0, 120)
        gameEnded = true
    }, 1000)
}

function checkGameOver(column){
    if(column.startYPosition + column.wordPosition > canvas.height){
        return true
    }
}