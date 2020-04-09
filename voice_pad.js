var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//var grammar = '#JSGF V1.0'

names = ['aditya', 'yashpal', 'ekta', 'parth', 'divyansh', 'shivam', 'debrupa']

gender = ['male', 'female', 'decline']

var age = [];
for (var i = 1; i <= Number; i++) {
    age.push(i);
}

var grammar = '#JGSF V1.0; grammar details; public<details> =' + 'Prescribe for' + names.join('|') + age.join('|') + gender.join('|')
';'



var recognition = new SpeechRecognition();
var SpeechRecognitionList = new SpeechGrammarList();
SpeechRecognitionList.addFromString(grammar, 1);

recognition.grammars = new SpeechGrammarList();
recognition.continuous = false;
recognition.lang = 'en-IN'; // Set Language to India English

recognition.interminResults = false;
recognition.maxAlternatives = 1;

// To-do select name age and gender



function PatientDetailsSpeak() {
    recognition.start();
    console.log('Recognition Started');


}

recognition.onresult = function(event) {
    var output = event.results[0][0].transcript;

    ChangePlaceholder(output);

    console.log('Confidence:' + event.results[0][0].confidence + " " + event.results[0][0].transcript);

}

function ChangePlaceholder(output) {
    fields = output.split(" ");
    console.log(fields[2]);
    console.log(fields[3]);
    console.log(fields[4]);

    if (section == 1) {
        document.getElementById("name").placeholder = fields[2];
        document.getElementById("age").placeholder = fields[3];
        document.getElementById("gender").placeholder = fields[4];
    }
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    console.log('No match found');
}

recognition.onerror = function(event) {
    console.log('Error occured ' + event.error);
}