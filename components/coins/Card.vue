<template>  
  <div :class="{'coins-card': true, 'multiple-items': isMultipleItems}">
    <div class="coins-card-items" v-for="coin in coins" :key="coin.id">
      <CoinsItem :coin="coin" />
    </div>
  </div>
</template>

<script setup>
const props  = defineProps(['coins'])
const isMultipleItems = computed(() => props.coins && props.coins.length > 1)

</script>

<style lang="sass">
.coins-card
  width: 100%
  display: flex
  align-items: flex-end
  justify-content: center

  @media only screen and (min-width: 1px) and (max-width: 500px)    
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
  
.multiple-items
  @media only screen and (min-width: 1px) and (max-width: 500px)
    margin-top: 500px
</style>