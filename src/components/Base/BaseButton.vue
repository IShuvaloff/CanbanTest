<template>
  <button class="base-btn" :type="type">{{ caption }}</button>
</template>

<script lang="ts">
import { ButtonHTMLAttributes, PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
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

.base-btn
  padding: 10px
  background-color: $color-primary
  border-radius: 6px
  font-weight: 600
  font-size: 16px
  color: $color-gs-1
  letter-spacing: 0.15px
  transition: background-color .2s ease-in-out
  &:focus, &:hover
    background-color: lighten($color-primary, 10%) //$color-primary-hovered
  &:active
    background-color: darken($color-primary, 5%) //$color-primary-pressed
  &--plans
    background-color: $color-plans
    &:focus, &:hover
      background-color: lighten($color-plans, 10%)
    &:active
      background-color: darken($color-plans, 5%)
  &--working
    background-color: $color-working
    &:focus, &:hover
      background-color: lighten($color-working, 10%)
    &:active
      background-color: darken($color-working, 5%)
  &--complete
    background-color: $color-complete
    &:focus, &:hover
      background-color: lighten($color-complete, 10%)
    &:active
      background-color: darken($color-complete, 5%)

@media (max-width: 991.98px)
  .base-btn
    font-size: 14px

@media (max-width: 575.98px)
  .base-btn
    padding: 5px
    font-size: 12px
</style>
