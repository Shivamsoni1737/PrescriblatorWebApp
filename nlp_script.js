/*

Documentation Reffered to: 

https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API


*/
var SpeechRecogniton = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/*
js object to read CSV file and convert it to an array
 1) Current method: https://blog.mounirmesselmeni.de/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/
 2) old:https://github.com/typeiii/jquery-csv
*/

function handleFiles(files) {
    //check for various File API support
    if (window.FileReader) {
        //FileReader are supported
        getAsText(files[0])
    } else {
        alert('FileReader are not Supported in this browser.');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    var csv = event.target.result
    processData(csv);
}