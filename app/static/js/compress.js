const compressBtn = document.getElementById("compress");
const fileInput = document.getElementById("audio-file");
const playBtn = document.getElementById("play");

playBtn.addEventListener('click', function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext; //new audio context to help us record
    audioCtx = new AudioContext();
   
    if(fileInput.files[0] == undefined) {
        return false;
    }
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

            // $.ajax({
            //     type: 'POST',
            //     url: 'https://3.218.104.126:8090/listen',
            //     data: blob,
            //     contentType: false, // set accordingly
            //     processData: false,  
            //     success:function(data) {
            //         handleData(data); 
            //     }
            // });
        });
    };
    
    reader1.readAsArrayBuffer(fileInput.files[0]);
        
},false);

compressBtn.addEventListener('click', function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext; //new audio context to help us record
    audioCtx = new AudioContext();
   
    if(fileInput.files[0] == undefined) {
        return false;
    }
    var reader1 = new FileReader();
	reader1.onload = function(ev) {
        audioCtx.decodeAudioData(ev.target.result).then(function(buffer) {

            var offlineAudioCtx = new OfflineAudioContext({
                numberOfChannels: 1,
                length: 16000 * buffer.duration,
                sampleRate: 16000,
            });

            // Audio Buffer Source
            soundSource = offlineAudioCtx.createBufferSource();
            soundSource.buffer = buffer;

            soundSource.connect(offlineAudioCtx.destination);

            // Create Compressor Node
            //compressor = offlineAudioCtx.createDynamicsCompressor();

            // compressor.threshold.setValueAtTime(-20, offlineAudioCtx.currentTime);
            // compressor.knee.setValueAtTime(30, offlineAudioCtx.currentTime);
            // compressor.ratio.setValueAtTime(5, offlineAudioCtx.currentTime);
            // compressor.attack.setValueAtTime(.05, offlineAudioCtx.currentTime);
            // compressor.release.setValueAtTime(.25, offlineAudioCtx.currentTime);

            // // Connect nodes to destination
            // soundSource.connect(compressor);
            //compressor.connect(offlineAudioCtx.destination);

            // Connect nodes to destination
            //soundSource.connect(compressor);
            //compressor.connect(offlineAudioCtx.destination);

            soundSource.start();
            offlineAudioCtx.startRendering().then(function(abuffer) {
                
                var duration = abuffer.duration,
                rate = abuffer.sampleRate,
                offset = 0;

                var blob = bufferToWave(abuffer, offlineAudioCtx.length);

                $.ajax({
                    type: 'POST',
                    url: 'https://3.218.104.126:8090/listen',
                    data: blob,
                    contentType: false, // set accordingly
                    processData: false,  
                    success:function(data) {
                        handleData(data); 
                    }
                });
            
            }).catch(function(err) {
                // Handle error
            });

            
        });
    };
    
    reader1.readAsArrayBuffer(fileInput.files[0]);
        
},false);

// Convert an AudioBuffer to a Blob using WAVE representation
function bufferToWave(abuffer, len) {
    var numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        offset = 0,
        pos = 0;
  
    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"
  
    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)
  
    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length
  
    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));
  
    while(pos < length) {
      for(i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++                                     // next source sample
    }
  
    // create Blob
    return new Blob([buffer], {type: "audio/wav"});
  
    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
  
    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }