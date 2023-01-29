<script setup>
import {useCounterStore} from '@/stores/Counter';

const counterStore = useCounterStore();
</script>

<template>
   <p>Dashboard--{{ counterStore.count }}</p>
   <RouterLink to="/composition">Composition</RouterLink>
</template>