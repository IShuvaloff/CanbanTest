<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    iconPath(): string {
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }
      return icon.url;
    },
    className(): string {
      return 'svg-icon svg-icon--' + this.name;
    },
  },
});
</script>

<style lang="sass">
.svg-icon
  /* fill: currentColor; */
  height: 24px
  width: 24px
  transition: stroke 0.2s ease-in-out, fill 0.2s ease-in-out
</style>
