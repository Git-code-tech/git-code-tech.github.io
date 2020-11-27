import * as config from './config.js';
var synth = window.speechSynthesis;
function speech(txt) {
    let utterThis = new SpeechSynthesisUtterance(txt);
    synth.speak(utterThis);
    utterThis.onend = function (event) {
        //console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
        config.readytotalk(true);
    }
}
export { speech };