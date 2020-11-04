import { a3LettersWords }  from './words'

let sparola = document.getElementById('sparola')
context = setupCanvas(sparola)

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

let canvas = {
    width:sparola.clientWidth,
    height:sparola.clientHeight
}

let column1 = {
    interval: null, 
    startXPosition: 10,
    startYPosition: 20,
    speed: 2,
    wordPosition: 0,
    word: ''
}

let column2 = {
    startXPosition: 0,
    startYPosition: 10,
    speed: 2
}

let column3 = {
    startXPosition: 0,
    startYPosition:10,
    speed: 1
}

column1.interval = setInterval( function() {drawColumn1()}, 20)
//window.requestAnimationFrame(drawColumn1)

function drawColumn1(){
    console.log('drawColumn1')
    context.clearRect(0,0, canvas.width, canvas.height)
    context.font = '20px sans-serif'
    context.fillText((getWord(column1)), column1.startXPosition, column1.startYPosition + column1.wordPosition)
    column1.wordPosition += column1.speed
    if(checkGameOver()){
        gameOver()
    }
}

function checkGameOver(){
    if(column1.startYPosition + column1.wordPosition > canvas.height){
        return true
    }
}

function gameOver(){
    //cancella il canvas e scrivi game over
    clearInterval(column1.interval)
    context.clearRect(0,0, canvas.width, canvas.height)
    context.font = '100px sans-serif'
    context.fillText('Game Over', 0, 80)
    console.log('GameOver')
}

function getWord(column){
    if(a3LettersWords > 0){
        index = getWordIndex(a3LettersWords.length)
        column.word = a3LettersWords[index]
        a3LettersWords.splice(index, 1)
    }
}

function getWordIndex(arrayLength){
    index = null
    while(index == null || index > arrayLength){
        index = Math.random() * 1000
    }
    console.log('wordIndex', index)
    return index
}