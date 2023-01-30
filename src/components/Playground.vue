<script setup>
import {ref, onMounted} from 'vue';
import {Configuration, OpenAIApi } from 'openai';
import {useChatItem} from '@/stores/ChatItem'

const chatItem = useChatItem();
//speech recognition
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition();

//openAI api
let configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
});
let openai = new OpenAIApi(configuration);

const indexVal = ref(0);
const inputText = ref('');
const totalIndex = ref()
const inputVal = ref('');
const inputBindVal = ref('');
const outputVal = ref('');
const displayVal = ref('');
const loadingText = ref('');
const buttonRef = ref();
const playRef = ref(true);
const transcript = ref('');
const option = ref(
    {
        model: "text-davinci-003",
        temperature: 1,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
    }
)

onMounted(()=>{
    buttonRef.value.disabled = true;
    sr.continious = true;
    sr.interimResults = true;

    sr.onstart=()=>{
        console.log('recording started')
    }
    sr.onend=()=>{
        console.log('recording stopped')
        playRef.value = true
        checkResponse(transcript.value);
    }

    sr.onresult= async(evt)=>{
        const text = await Array.from(evt.results)
            .map(result=>result[0])
            .map(result=>result.transcript)
            .join('')
            // console.log('text', text);
            transcript.value = text;
    }
})
const inputHandler=(e)=>{
    inputVal.value = e.target.value;
    loadingText.value = 'Please wait....'
    if(inputVal.value.length<1) return buttonRef.value.disabled = true;

    return buttonRef.value.disabled = false;
}

const checkResponse= async (promptVal)=>{ 
    inputBindVal.value = promptVal;
    displayVal.value = '';
    inputText.value= '';
    buttonRef.value.disabled  = true;
    const promtObj = {...option.value, prompt:promptVal }
    const response = await openai.createCompletion(promtObj);
    // console.log('xx', response.data.choices[0].text)
    outputVal.value = response.data.choices[0].text;

    //send value to store
    chatItem.addItem(promptVal, outputVal.value)
    indexVal.value = 0;
    totalIndex.value = outputVal.value.length;
    typeWriter();
}
const typeWriter=()=>{
    if (indexVal.value < totalIndex.value) { 
        displayVal.value += outputVal.value.charAt(indexVal.value);
        indexVal.value++;
        setTimeout(typeWriter, 50);
    }
}
const listenVoice=()=>{
    playRef.value = false
    sr.start();
}
const stopVoice=()=>{
    playRef.value = true
    sr.onend();
}
</script>

<template>
    <div class="container">
    <div class="col-sm-5 mt-4">
        <div class="card text-dark bg-light">
            <h5 class="card-header">AI Playground</h5>
            <div class="card-body">
                <h5 class="card-title" v-if="inputBindVal">Q: {{ inputBindVal }}</h5>
                <pre v-if="inputBindVal">{{displayVal ? displayVal : loadingText}}</pre>
            </div>
        </div>  
    </div>
    <div class="col-sm-5 mt-2">
        <input class="form-control form-control-lg" v-model="inputText" @keyup="inputHandler" type="text" placeholder="ask me any question">
        <!-- <small class="text-left">Minimun 7 characters</small> -->
        
    </div>
    <div class="col-sm-5 text-center mt-3">
        <span class="voiceIcon me-2" @click="listenVoice" v-if="playRef">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
            </svg>
        </span>
        <span class="voiceIcon me-2" @click="stopVoice" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16"> <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/> </svg>
        </span>
        <button class="btn btn-primary" @click="checkResponse(inputVal)" ref="buttonRef">Check response</button>
        <input type="hidden" ref="transcript" value="text"/>
    </div>
    </div>
</template>