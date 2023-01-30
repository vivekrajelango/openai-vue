<script setup>
import {ref} from 'vue';
import Playground from '../components/Playground.vue';
import ChatWindow from '../components/ChatWindow.vue';
import {useChatItem} from '@/stores/ChatItem';

const classNameRef = ref();
const chatItem = useChatItem();
const showPlayground = ref(true)
const propVal = ref('');
const showHandler=(params)=>{
    if(params === 'playground'){
        showPlayground.value = true;
    } else {
        showPlayground.value = false;
        propVal.value = params;
    }

    classNameRef.value.classList.remove('show')
}
</script>

<template>
   <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto px-0">
            <div id="sidebar" class="collapse collapse-horizontal border-end" ref="classNameRef">
                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                    <a class="list-group-item border-end-0 d-inline-block text-truncate" @click="showHandler('playground')"> <span>New Chat + </span> </a>
                    <a v-for="item in chatItem.item" @click="showHandler(item)" class="list-group-item border-end-0 d-inline-block text-truncate" >
                        <i class="bi bi-bootstrap"></i> 
                        <span>{{ item.inputItem }}</span> 
                    </a>
                </div>
            </div>
        </div>
        <main class="col ps-md-2 pt-2" >
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none text-white">&#9776; History</a>
            <Playground v-if="showPlayground"/>
            <ChatWindow 
                :propVal="propVal" 
                @emitValue="(payload)=>{
                    showPlayground= payload;
                }" 
                v-else/>
        </main>
    </div>
</div>
</template>

<style>
#sidebar-nav {
    width: 260px;
}

#sidebar-nav a {
    cursor: pointer;
}
</style>