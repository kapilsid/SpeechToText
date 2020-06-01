var compressBtn = $("#compress");
var fileInput = $("#audio-file");

compressBtn.addEventListener('click', function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext; //new audio context to help us record
    audioContext = new AudioContext();
   
    if(fileInput.files[0] == undefined) {
        return false;
    }
    var reader1 = new FileReader();
	reader1.onload = function(ev) {
        audioCtx.decodeAudioData(ev.target.result).then(function(buffer) {
            var soundSource = audioCtx.createBufferSource();

            soundSource.buffer = buffer;
            
            // Create Compressor Node
            compressor = audioCtx.createDynamicsCompressor();

            compressor.threshold.setValueAtTime(-20, audioCtx.currentTime);
            compressor.knee.setValueAtTime(-30, audioCtx.currentTime);
            compressor.ratio.setValueAtTime(5, audioCtx.currentTime);
            compressor.attack.setValueAtTime(.05, audioCtx.currentTime);
            compressor.release.setValueAtTime(.25, audioCtx.currentTime);

            soundSource.connect(compressor);

            compressor.connect(audioCtx.destination);
            soundSource.start(0);
        });
    };
    
    reader1.readAsArrayBuffer(fileInput.files[0]);
        
},false);