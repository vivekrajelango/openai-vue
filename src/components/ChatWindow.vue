<script>
import {Configuration, OpenAIApi } from 'openai';
import {ref, onMounted } from 'vue';
// const transcript = ref('')
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition();

let configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
});
let openai = new OpenAIApi(configuration);

export default{
    data(){
        return{
            name: "OpenAI",
            inputVal: '',
            inputText:'',
            outputVal: '',
            inputBindVal:'',
            displayVal:'',
            freeText:'',
            indexVal: 0,
            totalIndex:0,
            transcript:'',
            dataArr: [
                {
                    id:1,
                    input:"Who are you btw?",
                    output:"I am chat"
                }
                ],
            option: {
                model: "text-davinci-003",
                temperature: 1,
                max_tokens: 250,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            }
        }
    },
    mounted(){
        this.$refs.buttonRef.disabled = true;
        sr.continious = true;
        sr.interimResults = true;

        sr.onstart=()=>{
            console.log('recording started')
        }
        sr.onend=()=>{
            this.checkResponse(this.$refs.transcript.value);
        }

        sr.onresult=async (evt)=>{
            const text = await Array.from(evt.results)
                .map(result=>result[0])
                .map(result=>result.transcript)
                .join('')
                // console.log('text', text);
                this.$refs.transcript.value = text;

        }
    },
    methods:{
        inputHandler(e){ 
            this.inputVal = e.target.value;
            if(this.inputVal.length>7){
                this.$refs.buttonRef.disabled = false;
            } else {
                this.$refs.buttonRef.disabled = true;
            }
            this.freeText = "Please wait.... "
        },
        async checkResponse(promptVal){
            // this.inputBindVal = this.inputVal;
            this.inputBindVal = promptVal;
            this.displayVal = '';
            this.inputText= '';
            this.$refs.buttonRef.disabled = true;
            // const promtObj = {...this.option, prompt:this.inputVal }
            const promtObj = {...this.option, prompt:promptVal }
            const response = await openai.createCompletion(promtObj);
            // console.log('xx', response.data.choices[0].text)
            this.outputVal = response.data.choices[0].text;
            // console.log('xxxx', this.outputVal.length)
            // if(response){
            //     this.dataArr.push(
            //         {
            //             input: this.inputVal,
            //             output: this.outputVal
            //         }
            //     )
            // }
            // this.totalIndex = this.dataArr[this.dataArr.length-1].output.length;
            this.indexVal = 0;
            this.totalIndex = this.outputVal.length;
            this.typeWriter();
        },
        typeWriter() { 
            if (this.indexVal < this.totalIndex) { 
                this.displayVal += this.outputVal.charAt(this.indexVal);
                this.indexVal++;
                setTimeout(this.typeWriter, 50);
            }
        },
        listenItem(){
            sr.start();
        }
    }
}
</script>

<template>
    <div class="container">
    <div class="col-sm-5 mt-5 ">
        <div class="card text-dark bg-light">
            <h5 class="card-header">AI Playground</h5>
            <!-- <div class="card-body" v-for="(item, index) in dataArr">
                <h5 class="card-title">- {{ item.input }}</h5>
                <pre class="card-text">{{ item.output}}</pre>
            </div> -->
            <div class="card-body">
                <h5 class="card-title" v-if="this.inputBindVal">Q: {{ this.inputBindVal }}</h5>
                <pre v-if="this.inputBindVal">{{this.displayVal ? this.displayVal : this.freeText}}</pre>
            </div>
        </div>  
    </div>
    <div class="col-sm-5 mt-2">
        <input class="form-control form-control-lg" v-model="inputText" @keyup="inputHandler" type="text" placeholder="ask me any question">
        <small class="text-left">Minimun 7 characters</small>
        <!-- <div class="input-group mb-2 form-control">
            <div class="input-group-prepend">
                <div class="input-group-text playIcon" @click="listenItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                </svg>
                </div>
            </div>
            <input class="form-control" v-model="inputText" @change="inputHandler" type="text" placeholder="ask me any question">
        </div> -->
        
    </div>
    <div class="col-sm-5 text-center mt-3">
        <span class="voiceIcon me-2" @click="listenItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
            </svg>
        </span>
        <button class="btn btn-primary" @click="checkResponse(this.inputVal)" ref="buttonRef">Check response</button>
        <!-- <button @click="listenItem">Record</button> -->
        
        <input type="hidden" ref="transcript" value="text"/>
    </div>
    </div>
</template>
 


<style>
.textArea{
    background-color: #f7f7f8;
    width: 50%;
    height:100px;
    cursor:text;
    border:1px solid #c5c5d2;
    border-radius: 5px;
}
textarea{
    width:100%;
    height: 100%;
}
</style>