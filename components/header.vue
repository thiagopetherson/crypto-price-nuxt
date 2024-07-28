<template>  
  <div class="header justify-center flex w-full h-24 bg-purple-500">
    <div class="header-content flex items-center justify-between w-11/12 h-24">
      <NuxtLink class="cursor-pointer" @click.prevent="handleHomeClick">
        <span class="header-logo">CP</span> 
        <span class="font-bold">Crypto Price</span>
      </NuxtLink>
      <div v-if="!isCurrenciesPage"> 
        <NuxtLink to="/currency/currencies">Currency IDS</NuxtLink>
      </div>
    </div>     
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const isCurrenciesPage = computed(() => route.path === '/currency/currencies')


const handleHomeClick = async () => {
  // Gambi para quando estiver no componente e for para ele mesmo, então renderizar o componente novamente
  if (route.path === '/')   
    router.go(0)
  else
    router.push('/')
  
}

</script>

<style scoped lang="sass">
.header    
  color: #fff
  font-size: 1.4rem

  @media only screen and (min-width: 1px) and (max-width: 500px)
    font-size: 1.0rem

  .header-content

    a

      span:first-child    
        border: 3px solid #fff
        border-radius: 60%
        padding: 5px 8px 5px 8px       

      span:last-child
        margin: 5px   

    div
    
      a
        background-color: rgb(63, 37, 99)
        color: #fff 
        font-size: 1.3rem
        font-weight: 600
        padding: 10px 20px 10px 20px
        border: 0.5px solid black
        border-radius: 5px

        &:hover
          background-color: #a855f7   

        @media only screen and (min-width: 1px) and (max-width: 500px)
          font-size: 1.0rem
          padding: 7px 15px 7px 15px
</style>
