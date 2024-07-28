<template>  
  <div class="coins-card flex items-end justify-center w-full h-full">
    <div class="coins-card-items" v-for="coin in coins" :key="coin.id">
      <CoinsItem :coin="coin" />
    </div>
  </div>
</template>

<script setup>
const { coins } = defineProps(['coins'])
</script>

<style lang="sass">
.coins-card
  width: 100%  

  @media only screen and (min-width: 1px) and (max-width: 500px)
    margin-top: 500px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
</style>