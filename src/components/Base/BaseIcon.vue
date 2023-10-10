<template>
  <!-- <div class="icon-wrapper" :title="hint"> TODO!!! -->
  <svg class="icon" :id="id" :ref="id">
    <use :xlink:href="'#' + name"></use>
  </svg>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getRandom } from '../../scripts/utils';

export default defineComponent({
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    hint: String,
    clicked: {
      type: Boolean,
      default: false,
    },
    colorHovered: String,
  },
  data() {
    return {
      id: '',
    };
  },
  methods: {
    svg() {
      return this.$refs[this.id] as HTMLElement;
    },
    updateIconColor() {
      if (this.clicked) {
        this.svg()?.classList.add('icon--clicked');
      } else {
        this.svg()?.classList.remove('icon--clicked');
      }
    },
  },
  watch: {
    clicked() {
      this.updateIconColor();
    },
  },
  mounted() {
    this.id = 'icon-' + getRandom(1, 100000).toString();
  },
});
</script>

<style lang="sass">
@import '../../assets/sass/variables'

.icon
  fill: $color-gs-7
  &--clicked
    fill: #009BF2
  &--hovered
    fill: $color-primary-hovered
</style>
