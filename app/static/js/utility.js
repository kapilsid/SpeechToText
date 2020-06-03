 var downsampleBuffer = function (buffer, sampleRate, outSampleRate) {
    if (outSampleRate == sampleRate) {
        return buffer;
    }
    if (outSampleRate > sampleRate) {
        throw "downsampling rate show be smaller than original sample rate";
    }
    var sampleRateRatio = sampleRate / outSampleRate;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Int16Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
        var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        var accum = 0, count = 0;
        for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }

        result[offsetResult] = Math.min(1, accum / count)*0x7FFF;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result.buffer;
}  

function downSampleAndSend(buffer){
    var offlineAudioCtx = new OfflineAudioContext({
        numberOfChannels: 1,
        length: 16000 * buffer.duration,
        sampleRate: 16000,
    });

    // Audio Buffer Source
    soundSource = offlineAudioCtx.createBufferSource();
    soundSource.buffer = buffer;

    soundSource.connect(offlineAudioCtx.destination);

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

}

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

function processRecording(){
    let fileReader = new FileReader();
                     
    fileReader.onloadend = () => {
        arrayBuffer = fileReader.result;
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
            
            var offlineAudioCtx = new OfflineAudioContext({
                numberOfChannels: 1,
                length: 16000 * audioBuffer.duration,
                sampleRate: 16000,
            });

            // Audio Buffer Source
            soundSource = offlineAudioCtx.createBufferSource();
            soundSource.buffer = audioBuffer;

            soundSource.connect(offlineAudioCtx.destination);

            soundSource.start();
            offlineAudioCtx.startRendering().then(function(abuffer) {
                
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
                createDownloadLink(blob,"wav");
            
            }).catch(function(err) {
                // Handle error
            });
            
            
        })
    }

    fileReader.readAsArrayBuffer(buffer);
                        
}
