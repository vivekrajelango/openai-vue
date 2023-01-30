import {defineStore} from 'pinia'

export const useChatItem = defineStore({
    id:'chat',
    state:()=>({
        item: [],
        count: 0
    }),
    actions:{
        addItem(inputVal, outputVal){  
            this.item.push({
                inputItem: inputVal,
                outputItem: outputVal
            })
        },
    }
})