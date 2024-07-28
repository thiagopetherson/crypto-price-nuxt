<template>
  <div class="coin-details" v-if="coin">
    <div class="coin-details-title">
      <h1>{{ coin.name }}</h1>
      <h3>choose the period</h3>
    </div>
    <div class="coin-details-img">
      <img :src="coin.image.large" /> 
    </div>
    <div class="coin-details-info">
      <h5>only current year</h5> 
    </div>
    <div class="coin-details-search">
        <input class="coin-details-search-date" type="date" v-model="form.date" />
        <input class="coin-details-search-time" type="time" v-model="form.time" />
        <button class="coin-details-search-submit" @click="getCoinByDate()">Search</button>         
    </div>  
  </div> 
</template>

<script setup>

// Import Composables
const { brazilianCurrency } = useFormat()

// Import Plugins
const { $toast } = useNuxtApp()
const toast = useToast()

// Properties
const coin = ref(null);
const form = ref({
  date: '',
  time: ''
})
const searchedCoinValue = ref(null);

// Variables
const { currency } = useRoute().params

// Methods
const getCoin = async () => { 
  const response = await $fetch(`https://api.coingecko.com/api/v3/coins/${currency}?vs_currency=brl`)  
  coin.value = response  
}

const getCoinByDate = async () => {

  if (form.value.date === "") {
    $toast.warning("Select a date.")        
    return
  }

  let sdt = Math.floor(+new Date(`${form.value.date} ${form.value.time}`) / 1000) // Searched Date Timestamp   
  // let cdt = Math.floor(+new Date() / 1000) // Current Date Timestamps
  let cdt = sdt + 86400 // Adding 24 hours (in seconds) to the searched date timestamp

  const response = await $fetch(`https://api.coingecko.com/api/v3/coins/${currency}/market_chart/range?vs_currency=brl&from=${sdt}&to=${cdt}`)    
  searchedCoinValue.value = brazilianCurrency(response.prices[0][1])
  console.log(searchedCoinValue.value)    
  notification(searchedCoinValue.value, coin.value.name, coin.value.image.thumb)
}

const notification = (value, currencyName, currencyThumb) => {
  toast.add({        
    id: 'search_request_value',
    title: `Value of ${currencyName} on the searched date:`,
    description: value,
    avatar: { src: currencyThumb },     
    timeout: 10000,    
    actions: [{
      label: 'Close',
      click: () => {

      }
    }],
  })
}

// Life Cycle
onMounted(async () => {
  await getCoin()    
})

</script>

<style lang="sass">
.coin-details  
  width: 100%
  height: 90vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .coin-details-title
    width: 40%    
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    @media only screen and (min-width: 1px) and (max-width: 500px)
      width: 80%   

    h1      
      font-size: 2rem
      font-weight: 400
      color: #a855f7
      text-transform: uppercase

      @media only screen and (min-width: 1px) and (max-width: 500px)
        font-size: 1.8rem
    
    h3      
      color: rgb(63, 37, 99) 
      font-size: 1.4rem
      font-weight: normal

      @media only screen and (min-width: 1px) and (max-width: 500px)
        font-size: 1.2rem

  .coin-details-img
    margin: 2% 0 2% 0
    width: 12%

    @media only screen and (min-width: 1px) and (max-width: 500px)
      width: 35%   

    img
      width: 100%
      border-radius: 50%     
     
  
  .coin-details-info

    h5
      color: rgb(63, 37, 99) 
      font-size: 1.2rem

      @media only screen and (min-width: 1px) and (max-width: 500px)
        margin-top: 10px
        margin-bottom: 10px
        font-size: 1.0rem

  .coin-details-search    
    width: 30%
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 2%

    @media only screen and (min-width: 1px) and (max-width: 500px)
      width: 95%

    input
      background-color: #fff
      padding: 1% 5% 1% 5%
      margin-top: 2%
      margin-right: 2%
      font-size: 1.3rem      
      

    button
      background-color: #a855f7
      color: #fff 
      font-size: 1.3rem
      font-weight: 600
      padding: 1.3% 5% 1.3% 5%
      margin-top: 2%
      border-radius: 5px

      &:hover
        background-color: rgb(63, 37, 99)   
    
</style>
