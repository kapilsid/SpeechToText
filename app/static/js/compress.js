const compressBtn = document.getElementById("compress");
const fileInput = document.getElementById("audio-file");
const playBtn = document.getElementById("play");

playBtn.addEventListener('click', function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext; //new audio context to help us record
    audioCtx = new AudioContext();
   
    
    var reader1 = new FileReader();
	reader1.onload = function(ev) {
        audioCtx.decodeAudioData(ev.target.result).then(function(buffer) {
            var soundSource = audioCtx.createBufferSource();

            soundSource.buffer = buffer;
            
            soundSource.connect(audioCtx.destination);
            soundSource.start(0);

            //Create Compressor Node
            // compressor = audioCtx.createDynamicsCompressor();

            // compressor.threshold.setValueAtTime(-20, audioCtx.currentTime);
            // compressor.knee.setValueAtTime(-30, audioCtx.currentTime);
            // compressor.ratio.setValueAtTime(5, audioCtx.currentTime);
            // compressor.attack.setValueAtTime(.05, audioCtx.currentTime);
            // compressor.release.setValueAtTime(.25, audioCtx.currentTime);

            // soundSource.connect(compressor);

            // compressor.connect(audioCtx.destination);
            // soundSource.start(0);
            // var blob = new Blob([buffer]);// , {type: "audio/wav"})

           
        });
    };
    if(fileInput.files[0] == undefined) {
        reader1.readAsArrayBuffer(recordedBuffer);
    }else{
        reader1.readAsArrayBuffer(fileInput.files[0]);
    }    
},false);

compressBtn.addEventListener('click', function() {

    if(fileInput.files[0] != undefined){
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext; //new audio context to help us record
        audioCtx = new AudioContext();
    
        
        var reader1 = new FileReader();
        reader1.onload = function(ev) {
            audioCtx.decodeAudioData(ev.target.result).then(function(buffer) {
                downSampleAndSend(buffer);
            });
        };
        
        reader1.readAsArrayBuffer(fileInput.files[0]);
    }
    else if(recordedBuffer != undefined){
        processRecording(recordedBuffer);
    }else{
        alert("Record or load a recording");
    }
},false);




