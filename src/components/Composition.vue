<script setup>
    import {ref, computed} from 'vue';
    import {useCounterStore} from '@/stores/Counter';

    const storeCounter = useCounterStore();
    const counter = ref(0)
    const increase=()=>{
        counter.value++
    }
    const decrease=()=>{
        counter.value--
    }

    const oddOrEven =computed(()=>{
        if(counter.value%2===0) return 'even'
        return 'odd'

    })
</script>

<template>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
    <h1>Count by Composition API-{{ counter }}</h1>
    <button @click="decrease">-</button>
    <button @click="increase">+</button>
    <hr/>
    <div>
        The counter value is {{ oddOrEven }}
    </div>
    <h1>Count by Pinia-{{ storeCounter.count }}</h1>
    <button @click="storeCounter.decreaseCount">-</button>
    <button @click="storeCounter.increaseCount">+</button>
    <hr/>
</template>

