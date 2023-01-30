<script setup>
import {ref} from 'vue';
const showPlayground = ref(true);
const props = defineProps({
    propVal: {}
})
</script>

<template>
    <div class="container">
    <div class="col-sm-5 mt-4 ">
        <div class="card text-dark bg-light">
            <h5 class="card-header">Chat History</h5>
            <div class="card-body">
                <h5 class="card-title">Q: {{ propVal.inputItem }}</h5>
                <pre>{{ propVal.outputItem }}</pre>
            </div>
        </div>  
    </div>
    <div class="col-sm-5 mt-2 text-end">
        <button class="btn btn-sm btn-primary" @click="$emit('emitValue', showPlayground)">New Chat +</button>
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