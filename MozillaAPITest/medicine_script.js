/*

Documentation Reffered to: 

https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API


*/

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/* medicine names picked up from:
https://github.com/openhealthcare/open-formulary
*/
var medicines = ["Syp Calpol",
    "Cetriz",
    "Syp Retherma C",
    "Syp Augmentin",
    "Syp Taxim",
    "Syrup Retherma C",
    "Syrup Augmentin",
    "Syrup Taxim",
    "Ascoryl Ls",
    "Montec Lc",
    "Oxipod",
    "Azitral",
    "Ceff",
    "Mefast",
    "Sinnaerest",
    "Tixylix",
    "Artegesic",
    "Orofer",
    "Clacimax",
    "Syp Weltone",
    "Vit A",
    "Vit D",
    "Vitamin A",
    "Vitamin D",
    "Rinifol",
    "Oflamac m.",
    "Normetrogyl",
    "Gutpro"
];

/*
Refer to this while making a grammar: https://www.w3.org/TR/jsgf/
*/

// var grammar = '#JSGF V1.0; grammar medicenes; public <medicines> = ' + medicines.join('|') + ';'

var grammar = 'public <medicines> = ' + medicines.join('|') + ';'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-IN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var medicineHTML = ''

medicines.forEach(function(v, i, a) {
    console.log(v, i);
    medicineHTML += '<span style> ' + v + '&emsp;' + ' </span>';

    document.body.onclick = function() {
        recognition.start();
        console.log('Ready to receive a medicine Name');
    }
});


hints.innerHTML = 'Tap/click any where on the page then say a medicine Name <br><br>' + medicineHTML + '.';

recognition.onresult = function(event) {
    var medicine = event.results[0][0].transcript;
    diagnostic.textContent = 'medicine Name heard: ' + medicine + '.';
    console.log('Confidence: ' + event.results[0][0].confidence + event.results[0][0].transcript);
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    diagnostic.textConternt = "I didn't recognize that medicine,";
}

recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occured in recognition:' + event.error;
}