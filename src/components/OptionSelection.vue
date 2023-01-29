<template>
    <div class="container-fluid">
        <h1>Vue - Open AI - Playground</h1>
        <div class="grid-main" v-if="showItem">
            <span v-for="item of data" @click="textArea(item, item.option)">
                <h2> {{ item.name }}</h2>
                <p> {{ item.desc }}</p>  
            </span>
        </div>
        <div v-if="showTextArea">
            <textarea rows="15" cols="70" :placeholder="placeHolder" @input="textAreaHandler"></textarea>
            <p><button @click="seeResult">See Result</button></p>
            <p>{{ output }}</p>
        </div>
        
    </div>
</template>

<script>
import arrItem from '../views/data.js';
import {Configuration, OpenAIApi } from 'openai';

let configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
});

let openai = new OpenAIApi(configuration);

export default {
    data(){
        return{
            data: arrItem,
            showItem: true,
            showTextArea: false,
            placeHolder: '',
            inputVal: '',
            item: '',
            output:''
        }
    },
    // async created() {
    //     await this.seeResult();
    // },
    methods: {
        textArea(item, option){
            this.showItem= false;
            this.showTextArea = true;
            this.placeHolder = item.desc;
            this.item = option;
        },
        textAreaHandler(e){
            this.inputVal = e.target.value;
        },
        async seeResult(){
            const promtObj = {...this.item, prompt:this.inputVal }
            const response = await openai.createCompletion(promtObj);
            // this.output = response.data.choices[0].text;
            console.log('xx', response.data)
        }
    }
}
</script>