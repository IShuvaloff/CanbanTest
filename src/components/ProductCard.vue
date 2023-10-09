<template>
  <div class="card" :class="cardTypeClass">
    <div class="card__container">
      <img class="card__img" :src="card?.image" alt="Фото" />

      <div class="card__content">
        <div class="card__rating">
          <p class="card__rating-rate">Рейтинг: {{ card?.rating?.rate }}</p>
          <p class="card__rating-count">Голосов: {{ card?.rating?.count }}</p>
        </div>

        <h2 class="card__title">{{ card?.title }}</h2>
        <p class="card__category">{{ card?.category }}</p>
        <p class="card__descr">{{ card?.description }}</p>
        <p class="card__price">Цена: {{ card?.price }}</p>
      </div>

      <div class="card__options">
        <BaseButton
          class="base-btn--plans card__option"
          caption="В планы"
          v-show="card?.group !== 1"
        />
        <BaseButton
          class="base-btn--working card__option"
          caption="В работу"
          v-show="card?.group !== 2"
        />
        <BaseButton
          class="base-btn--complete card__option"
          caption="Завершить"
          v-show="card?.group !== 3"
        />
      </div>
    </div>
    <SvgIcon
      class="icon icon--delete card__icon card__icon--delete"
      name="iconPlus"
      title="Удалить запись"
      @click="deleteProduct"
    />
  </div>
</template>

<script lang="ts">
import { Product } from '@/scripts/interfaces';
import { PropType, defineComponent } from 'vue';
import SvgIcon from './SvgIcon.vue';

export default defineComponent({
  name: 'ProductCard',
  components: { SvgIcon },
  mixins: [],
  props: {
    card: {
      type: Object as PropType<Product>,
      requred: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    cardTypeClass() {
      switch (this.card?.group) {
        case 1:
          return 'card--plans';
        case 2:
          return 'card--working';
        case 3:
          return 'card--complete';
        default:
          return '';
      }
    },
  },
  watch: {},
  emits: [],
  methods: {
    deleteProduct() {
      // TODO: удалить продукт
    },
  },
  // created() {},
  // mounted() {},
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'
.card
  position: relative
  display: flex
  flex-direction: column
  align-items: stretch
  border-radius: 6px
  max-width: 400px
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px
  &--plans
    background-color: $color-bg-card-plans
  &--working
    background-color: $color-bg-card-working
  &--complete
    background-color: $color-bg-card-complete
  &__icon
    &--delete
      position: absolute
      top: 5px
      right: 5px
      width: 35px
      height: 35px
      stroke: red
      transform: rotate(45deg)
  &__container
    display: flex
    flex-direction: column
    align-items: stretch
    padding: 10px
  &__img
    align-self: center
    border-top-left-radius: 6px
    border-top-right-radius: 6px
    max-height: 300px
  &__content
    display: flex
    flex-direction: column
    align-items: flex-start
    margin-bottom: 10px
    margin-top: 40px
  &__rating
    align-self: stretch
    display: flex
    align-items: center
    justify-content: space-between
    font-size: 16px
  &__title
    font-size: 24px
  &__category
    align-self: flex-end
    margin-bottom: 10px
    font-weight: 600
    font-size: 14px
    color: $color-disabled-brd
  &__price
    align-self: flex-end
    margin-bottom: 10px
    font-weight: 600
    font-size: 20px
  &__options
    display: flex
    align-items: center
    justify-content: stretch
  &__option
    width: 100%
    color: $color-text !important
    &:not(:last-child)
      margin-right: 10px

@media (max-width: 575.98px)
  .card
    &__img
      max-height: 250px
    &__rating
      font-size: 13px
    &__title
      font-size: 16px
    &__category
      font-size: 11px
    &__descr
      font-size: 12px
    &__price
      font-size: 16px
</style>
