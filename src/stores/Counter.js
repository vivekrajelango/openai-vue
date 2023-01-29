import {defineStore} from 'pinia'

export const useCounterStore=defineStore({
    id: 'counter',
    state:()=>({
        count: 0
    }),
    actions:{
        increaseCount(){
            this.count++
        },
        decreaseCount(){
            this.count--
        }
    }
})
