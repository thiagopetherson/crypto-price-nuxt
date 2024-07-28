<template>  
  <div class="currency-list-container">   
    <div v-if="currencyIds" class="currency-list-container-content">  
      <div class="currency-list-page-header">
        <div class="currency-list-page-header-description">
          <span class="currency-list-page-header-description-title">Values ​​available for search (Name - ID)</span>
          <span class="currency-list-page-header-description-legend">You need to use the ID when searching</span>
        </div>
        <div class="currency-list-page-header-search">
          <input v-model="searchQuery" type="text" placeholder="Search currencies..." class="currency-list-page-header-search-input" />
        </div>
      </div>
      <div v-if="filteredCurrencies && filteredCurrencies.length > 0" class="currency-list">      
        <div v-for="currency in filteredCurrencies" :key="currency.id" class="currency-item">
          {{ currency.name }} - {{ currency.id }}
        </div>
      </div>
      <div v-else class="currency-list-no-matching-currencies-found">
        <h5>No matching currencies found...</h5>
      </div>
    </div>
    <div v-else class="currency-list-container-loading"> 
      <h5>NOW LOADING...</h5>
    </div>
  </div>
</template>

<script setup>
const currencyIds = ref(null)
const searchQuery = ref("")

// Methods
const getAllCurrencies = async () => {
  const response = await $fetch(`https://api.coingecko.com/api/v3/coins/list`)    
  currencyIds.value = response   
}

// Computed
const filteredCurrencies = computed(() => {
  if (!currencyIds.value) return []
  if (!searchQuery.value) return currencyIds.value
  return currencyIds.value.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    currency.id.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Life Cycle
onMounted(async () => {
  await getAllCurrencies();
}) 
</script>

<style scoped lang="sass">
.currency-list-container
  width: 100%
  height: 100%
  min-height: 100vh
  display: flex

  .currency-list-container-content
    display: flex  
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    height: 100% 
        

    .currency-list-page-header
      width: 95%
      display: flex
      justify-content: space-between
      align-items: center
      padding-top: 0.5%
      padding-bottom: 0.5%

      @media only screen and (min-width: 1px) and (max-width: 500px)
        flex-direction: column
        padding-top: 10px
        padding-bottom: 10px
        text-align: center

      .currency-list-page-header-description
        display: flex
        flex-direction: column

        .currency-list-page-header-description-title      
          font-size: 1.5rem
          font-weight: 600
          color: rgb(63, 37, 99)       

          @media only screen and (min-width: 1px) and (max-width: 500px)
            font-size: 1.0rem

          @media only screen and (min-width: 501px) and (max-width: 1000px)  
            font-size: 1.1rem

        .currency-list-page-header-description-legend
          font-size: 1.1rem
          color: rgb(63, 37, 99) 

          @media only screen and (min-width: 1px) and (max-width: 500px)
            font-size: 1.0rem
          
          @media only screen and (min-width: 501px) and (max-width: 1000px)  
            font-size: 1.1rem

      .currency-list-page-header-search
        display: flex
        align-items: center
      
        .currency-list-page-header-search-input
          background-color: #fff
          padding: 8px     
          width: 300px
          border: 1px solid #ddd
          border-radius: 4px

          @media only screen and (min-width: 1px) and (max-width: 500px)
            margin-top: 5px
            width: 280px
            padding: 5px     

    .currency-list  
      display: flex
      flex-wrap: wrap
      gap: 10px
      width: 95%  
      overflow-y: auto
      padding: 10px
      background: #fff
      border: 1px solid #ddd
      border-radius: 8px

      .currency-item
        flex: 1 1 calc(33.333% - 10px)
        padding: 10px
        background: #f0f0f0
        border-radius: 4px
        border: 1px solid #e0e0e0
        display: flex
        justify-content: space-between
        font-size: 14px
        color: #333

        &:hover
          background: #e0e0e0

    .currency-list-no-matching-currencies-found
      display: flex
      width: 95%   
      justify-content: center
      text-align: center  
      font-size: 18px
      color: #333

      h5
        font-size: 1.5rem
        font-weight: 600
        color: rgb(63, 37, 99)

  .currency-list-container-loading
    width: 100%
    height: 100%    
    align-self: center
    justify-items: center
    text-align: center

    h5
      font-size: 1.5rem
      font-weight: 600
      color: rgb(63, 37, 99)
</style>
