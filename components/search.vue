<template>
    <div class="search">
        <div class="search-item text-center">
            <h1 class="text-4xl mb-[10px]">Realtime Currency Values</h1>
            <input type="text" class="p-[0.6%]" v-model="coin" />
            <button class="-ml-[2px] p-[0.8%]" @click="searchCoin()">Search Other Coin</button>       
            <h5 class="mt-[15px]">click on a coin to search by date</h5>   
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const coin = ref('')
const { getCoinValue } = inject('getCoin')


const searchCoin = () => {
  let val = coin.value
  getCoinValue(val)
}

</script>

<style scope lang="sass">
.search   
  width: 100%

  .search-item
    
    h1      
      color: rgb(63, 37, 99)     

      @media only screen and (min-width: 1px) and (max-width: 500px)
        font-size: 1.6rem  
                
    input
      background-color: #fff      
      @media only screen and (min-width: 1px) and (max-width: 500px)
        width: 40%
      
    button     
      background-color: #a855f7
      color: #fff           

      &:hover
        background-color: rgb(63, 37, 99)                    
      
    h5           
      font-size: 1.2rem
      font-weight: 400
      color: rgb(63, 37, 99)  
    
    @media only screen and (min-width: 1px) and (max-width: 500px)
      width: 100%


</style>