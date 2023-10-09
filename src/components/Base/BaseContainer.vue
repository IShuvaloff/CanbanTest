<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseContainer',
});
</script>

<style lang="sass" scoped>
.container
  margin: 0 auto
  padding-left: 32px
  padding-right: 32px
  max-width: 1440px

@media (max-width: 575.98px)
  .container
    padding: 10px
</style>
