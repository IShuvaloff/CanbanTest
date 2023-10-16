<template>
  <div class="card" :class="cardTypeClass" @dblclick="dialogOpen">
    <ProductDialog
      v-if="isDialogOpened"
      :product="card"
      @cancel="dialogClose"
      @submit="dialogSubmit"
    />

    <div class="card__container">
      <img class="card__img" :src="photo" alt="Фото" />

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
          @click="moveToPlans"
        />
        <BaseButton
          class="base-btn--working card__option"
          caption="В работу"
          v-show="card?.group !== 2"
          @click="moveToWorking"
        />
        <BaseButton
          class="base-btn--complete card__option"
          caption="Завершить"
          v-show="card?.group !== 3"
          @click="moveToComplete"
        />
      </div>
    </div>

    <SvgIcon
      class="icon icon--delete card__icon card__icon--edit"
      name="iconEdit"
      title="Изменить запись"
      @click="dialogOpen"
    />
    <SvgIcon
      class="icon icon--delete card__icon card__icon--delete"
      name="iconPlus"
      title="Удалить запись"
      @click="deleteCard"
    />
  </div>
</template>

<script lang="ts">
import { Product } from '@/scripts/interfaces';
import { PropType, defineComponent, defineAsyncComponent } from 'vue';
import SvgIcon from './SvgIcon.vue';
import { mapMutations } from 'vuex';
import { DBProductEdit } from '@/scripts/api';

export default defineComponent({
  name: 'ProductCard',
  components: {
    SvgIcon,
    ProductDialog: defineAsyncComponent({
      loader: () => import('@/components/ProductDialog.vue'),
      delay: 0,
      loadingComponent: () => '<h2>Загрузка...</h2>',
    }),
  },
  props: {
    card: {
      type: Object as PropType<Product>,
      requred: true,
    },
  },
  data() {
    return {
      isDialogOpened: false,
    };
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
    photo() {
      return this.card?.image
        ? this.card.image
        : new URL('@/assets/no-photo.jpg', import.meta.url).href;
    },
  },
  methods: {
    ...mapMutations(['deleteProduct', 'updateProduct']),
    dialogOpen() {
      this.isDialogOpened = true;
    },
    dialogClose() {
      this.isDialogOpened = false;
    },
    dialogSubmit(product: Product) {
      this.dialogClose();
      DBProductEdit(product);

      this.updateProduct({
        ...product,
        price: product.price ?? 0,
      });
    },
    deleteCard() {
      this.deleteProduct(this.card?.id);
    },
    editCard() {
      this.updateProduct(this.card);
    },
    moveToGroup(group: number) {
      if (![1, 2, 3].includes(group)) return;
      this.updateProduct({ ...this.card, group });
    },
    moveToPlans() {
      this.moveToGroup(1);
    },
    moveToWorking() {
      this.moveToGroup(2);
    },
    moveToComplete() {
      this.moveToGroup(3);
    },
  },
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
    &--edit
      position: absolute
      top: 10px
      left: 10px
      width: 20px
      height: 20px
      fill: $color-primary
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
    padding: 20px
  &__img
    align-self: center
    border-radius: 6px
    max-height: 300px
    max-width: 75%
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
    word-break: break-word
  &__category
    align-self: flex-end
    margin-bottom: 10px
    font-weight: 600
    font-size: 14px
    color: $color-gs-5
  &__descr
    word-break: break-word
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
    color: $color-gs-7 !important
    &:not(:last-child)
      margin-right: 10px

@media (max-width: 575.98px)
  .card
    &__img
      max-height: 250px
    &__container
      padding: 10px
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
