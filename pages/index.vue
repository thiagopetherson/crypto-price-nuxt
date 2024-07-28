<template>  
  <div class="home">    
    <div class="search h-52">
      <Search />    
    </div>   
    <div class="card h-96">
      <CoinsCard :coins="coins" />
    </div>
  </div>
</template>

<script setup>
// Import Vue
import { provide } from 'vue'

// Import Plugins
const { $toast } = useNuxtApp()

const coins = ref(null);

const getCoinsValues = async () => {
  const response = await $fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=bitcoin%2Cethereum%2Ccosmos%2Cdacxi&order=market_cap_desc&per_page=100&page=1&sparkline=false")
  

  let bitcoin = response.find(element => element.id === 'bitcoin')            
  let ethereum = response.find(element => element.id === 'ethereum')    
  let atom = response.find(element => element.id === 'cosmos')
  let dacxi = response.find(element => element.id === 'dacxi') 
  
  coins.value = [bitcoin, ethereum, atom, dacxi]  
}

const getCoinValue = async (coin) => {
  if (coin === '') {
    $toast.warning("Campo de busca em branco.")
    getCoinsValues()
    return
  }

  const response = await $fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${coin.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
  if (response.length === 0) {
    $toast.error("Não foram encontrados resultados para essa busca.")
    return
  }


  coins.value = response
}

provide('getCoin', {
  getCoinValue,
})

onMounted(async () => {
  await getCoinsValues()    
})

</script>

<style lang="sass">
.home
  width: 100%  
  margin-top: 2%
  display: flex
  flex-direction: column
  @media only screen and (min-width: 1px) and (max-width: 500px)
    margin-top: 0%

  .search
    width: 100%
    display: flex
    justify-content: center
    align-items: flex-end

    @media only screen and (min-width: 1px) and (max-width: 500px)
      justify-content: center
      align-items: center

  .card
    width: 100%
    display: flex
    justify-content: center
    align-items: flex-end

    @media only screen and (min-width: 1px) and (max-width: 500px)
      margin-top: 10%
      justify-content: center
      align-items: center

</style>