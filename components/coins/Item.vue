<template> 
  <div class="item-content flex flex-col items-center">         
    <NuxtLink :to="`currency/${coin.id}`">{{ coin.name }}</NuxtLink>    
    <img class="w-4/5 cursor-pointer mt-[7%] mb-[7%]" :src="coin.image" />          
    <p>{{ brazilianCurrency(coin.current_price) }}</p>
  </div>    
</template>

<script setup>
const { brazilianCurrency } = useFormat()

const { coin } = defineProps(['coin'])
</script>

<style lang="sass">

.item-content

  @media only screen and (min-width: 1px) and (max-width: 500px)
    margin-top: 50px

  a 
    font-size: 1.5rem
    font-weight: normal
    color: rgb(63, 37, 99)  
    text-decoration: none

    @media only screen and (min-width: 1px) and (max-width: 500px)
      font-size: 1.2rem

  a:first-child        
    &:hover
      color: #a855f7
  
  p  
    font-size: 1.5rem
    font-weight: normal
    color: rgb(63, 37, 99)  
    animation: animate 2.0s linear infinite
    @keyframes animate
      0%
        color: rgb(63, 37, 99)  
      50%
        color: #a855f7
      100%
        color: rgb(63, 37, 99)
    
    @media only screen and (min-width: 1px) and (max-width: 500px)
      font-size: 1.2rem

  img              
  
    &:hover
      transition: 1s
      transform: scale(1.1)    
             
  
  @media only screen and (min-width: 1px) and (max-width: 500px)
    img
      width: 50%  
 
</style>