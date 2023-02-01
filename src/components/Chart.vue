<script setup>
import {ref, onMounted} from 'vue';

const synth = ref(window.speechSynthesis);
const greetingSpeech = ref(new window.SpeechSynthesisUtterance())
const inputItem = ref('');
const name = ref('');
const voiceList = ref([])
const selectedVoice = ref(1);

onMounted(()=>{
    const voiceList = synth.value.getVoices();
    synth.onvoiceschanged = () => {
      voiceList = synth.getVoices()
    }
    console.log('spee', voiceList);
    listenForSpeechEvents()
})

const listenForSpeechEvents=()=>{
    greetingSpeech.value.onstart = () => {
        console.log('started')
      }

      greetingSpeech.value.onend = () => {
        console.log('ended')
      }
}
const playClick=()=>{
        greetingSpeech.value.text = `${name.value}`
        // greetingSpeech.value.voice = voiceList.value[29] 
        synth.value.speak(greetingSpeech.value)

}
</script>

<template>
    <div class="chart-app1">
        <!-- <input type="text" ref="inputItem"/> -->
        <form>

        <div class="form-group">
          <label for="your-name">Your name</label>
          <input class="form-control" id="your-name" type="text" v-model="name" required>
        </div>

        <!-- <button type="submit" class="btn btn-success">Greet</button> -->
      </form>
        <button @click="playClick">Click</button>
    </div>
    
</template>

<style>
.chart-app{
    background-color: white;
}
</style>