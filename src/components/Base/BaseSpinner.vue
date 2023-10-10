<template>
  <div class="spinner" :class="spinnerClass" v-if="visible">
    <OrbitSpinner
      :animation-duration="spinnerDuration"
      :size="sizeValue"
      :color="spinnerColor"
    />
  </div>
</template>

<style lang="sass">
.spinner
  display: flex
  justify-content: center
  text-align: center
.spinner--tiny
  margin: 0
.spinner--small
  margin-bottom: 5px
.spinner--medium
  margin-bottom: 10px
.spinner--large
  margin-bottom: 15px
.spinner--huge
  margin-bottom: 20px
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { OrbitSpinner } from 'epic-spinners';

export default defineComponent({
  name: 'BaseSpinner',
  components: { OrbitSpinner },
  props: {
    visible: Boolean,
    size: {
      type: String,
      default: 'medium',
    },
    color: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      sizes: { tiny: 15, small: 20, medium: 25, large: 30, huge: 35 },
      spinnerDuration: 2000,
      defaultColor: 'red',
    };
  },
  computed: {
    spinnerClass() {
      return `spinner--${this.size}`;
    },
    spinnerColor() {
      return this.color ?? this.defaultColor;
    },
    sizeValue() {
      return this.sizes[this.size as keyof typeof this.sizes];
    },
  },
});
</script>
