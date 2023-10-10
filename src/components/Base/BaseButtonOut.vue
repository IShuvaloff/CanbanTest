<template>
  <BaseButton class="base-btn-out" :caption="caption" :type="type" />
</template>

<script lang="ts">
import { ButtonHTMLAttributes, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseButtonOut',
  props: {
    caption: {
      type: String,
      default: 'Нажать',
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.base-btn-out
  background-color: $color-gs-1
  border: 1px solid $color-gs-3
  color: $color-primary
  &:focus:not(.disabled), &:hover:not(.disabled)
    border-color: $color-gs-5
    background-color: $color-gs-1
  &:active:not(.disabled)
    background-color: $color-primary-bg
    border-color: $color-gs-3
  &.disabled
    background-color: $color-gs-2
    border-color: $color-gs-5
    color: $color-gs-5
</style>
