export default class Recorder {
    #recording = false;
    recordedBuffer = [];

    constructor(source) {
        this.context = source.context;
        
        let processor = this.context.createScriptProcessor(1024,1,1);
        source.connect(processor);
        processor.connect(this.context.destination);
    
        processor.onaudioprocess = (e) => {
            if (!this.#recording) return;
        
            e.inputBuffer.getChannelData(0).forEach(e => {
                this.recordedBuffer.push(e);
            })
        };

    }

    record(clear=true) {
        if (clear) this.clear();
        this.#recording = true;
    }

    stop() {
        this.#recording = false;
    }

    clear() {
        this.recordedBuffer = [];
    }

    getBuffer() {
        return this.recordedBuffer;
    }

    isRecording() {
        return this.#recording;
    }

    play() {
        let playSource = this.context.createBufferSource();
        let newBuffer = this.context.createBuffer(1, this.recordedBuffer.length, this.context.sampleRate);
        newBuffer.getChannelData(0).set(this.recordedBuffer);
        playSource.buffer = newBuffer;
        playSource.connect(this.context.destination);
        playSource.start();
        playSource.onended = function() {
            playSource.disconnect(this.context.destination);
        }
    }
}

