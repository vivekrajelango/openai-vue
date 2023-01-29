
<template>
    <OptionSelection />
</template>

<script>
import OptionSelection from '../components/OptionSelection.vue';

export default {
    components: {
        OptionSelection
    },
    data(){
        return {
            API_KEY: import.meta.env.VITE_OPEN_API_KEY, 
            // data: arrItem
        }
        
    }
}
</script>