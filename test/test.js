import Recorder from '../src/recorder.js';

let AudioContext = window.AudioContext|| window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
let context = new AudioContext();
const recordButton = document.getElementById('record');
const playButton = document.getElementById('play');

var handleSuccess = function(stream) {
    let source = context.createMediaStreamSource(stream);
    let recorder = new Recorder(source);
    //console.log(recordButton);
    recordButton.addEventListener('click', function() {
        console.log('click record!');
        if (recorder.isRecording()) {
            recorder.stop();
            recordButton.setAttribute('class', 'btn btn-block btn-success btn-lg');
            recordButton.innerText = 'RECORD';
        } else {
            recorder.record();
            recordButton.setAttribute('class', 'btn btn-block btn-danger btn-lg');
            recordButton.innerText = 'STOP';
        }
    });

    playButton.addEventListener('click', function() {
        // playBuffer(recordedChunks);
        console.log('click play!');
        recorder.play();
    });
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess)