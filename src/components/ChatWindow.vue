<template>
    <div class="container">
    <!-- <h1 class="mb-3">Vue - Playground</h1> -->
    <div class="col-sm-5 mt-5 ">
        <div class="card text-dark bg-light">
            <h5 class="card-header">AI Playground</h5>
            <!-- <div class="card-body" v-for="(item, index) in dataArr">
                <h5 class="card-title">- {{ item.input }}</h5>
                <pre class="card-text">{{ item.output}}</pre>
            </div> -->
            <div class="card-body">
                <h5 class="card-title" v-if="this.inputVal">Q: {{ this.inputVal }}</h5>
                <pre v-if="this.freeText">A: {{this.displayVal ? this.displayVal : this.freeText}}</pre>
            </div>
        </div>  
    </div>
    <div class="col-sm-5 mt-3 text-center">
        <input class="form-control form-control-lg" v-model="inputText" @change="inputHandler" type="text" placeholder="ask me any question">
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
        <button class="btn btn-primary mt-3" @click="checkResponse">Check response</button>
    </div>
    </div>
</template>
 
<script>
// import { VueTyper } from 'vue-typer'
import {Configuration, OpenAIApi } from 'openai';
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
            displayVal:'',
            freeText:'',
            indexVal: 0,
            totalIndex:0,
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
                // stop: [" Human:", " AI:"],
            }
        }
    },
    mounted(){
        // this.typeWriter();
    },
    methods:{
        inputHandler(e){ 
            this.inputVal = e.target.value;
            this.freeText = "Please wait.... "
        },
        async checkResponse(){
            const promtObj = {...this.option, prompt:this.inputVal }
            const response = await openai.createCompletion(promtObj);
            // console.log('xx', response.data)
            this.outputVal = response.data.choices[0].text;
            if(response){
                this.dataArr.push(
                    {
                        input: this.inputVal,
                        output: this.outputVal
                    }
                )
            }
            this.inputText= ''
            this.totalIndex = this.dataArr[this.dataArr.length-1].output.length;
            this.typeWriter();
        },
        typeWriter() { 
            if (this.indexVal < this.totalIndex) { 
                this.displayVal += this.dataArr[this.dataArr.length-1].output.charAt(this.indexVal);
                this.indexVal++;
                setTimeout(this.typeWriter, 50);
            }
        },
        listenItem(){
            console.log('xx')
        }
    }
}
</script>

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