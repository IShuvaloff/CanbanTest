<template>
  <BaseContainer class="home">
    <h1 class="home__header">Canban-сетка</h1>
    <div class="group">
      <div class="group__header">
        <h2 class="group__header-text">В ПЛАНАХ</h2>
        <SvgIcon
          class="icon icon--add group__header-icon"
          name="iconPlus"
          title="Добавить запись"
          @click="addProduct"
        />
      </div>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :card="product"
      />
    </div>
    <div class="group">
      <div class="group__header">
        <h2 class="group__header-text">В РАБОТЕ</h2>
      </div>
    </div>
    <div class="group">
      <div class="group__header">
        <h2 class="group__header-text">ГОТОВО</h2>
      </div>
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import { loadProducts } from '@/scripts/api';
import { Product } from '@/scripts/interfaces';
import { defineComponent } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'HomeView',
  components: { ProductCard, SvgIcon },
  data() {
    return {
      products: [] as Product[],
    };
  },
  watch: {
    products(value) {
      console.log(value);
    },
  },
  methods: {
    addProduct() {
      // TODO: добавить новый продукт:
      //  1. открыть диалоговое окно;
      //  2. ввести данные;
      //  3. сохранить.
    },
  },
  created() {
    loadProducts()
      .then((list) => {
        list.forEach((item: Product) =>
          this.products.push({ ...item, group: 1 }),
        );
      })
      .catch((err) => {
        console.log(`Ошибка загрузки списка продуктов с сайта: ${err.message}`);
      });
  },
});
</script>

<style lang="sass" scoped>
.home
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
  &__header
    display: none
.group
  display: flex
  flex-direction: column
  align-items: center
  min-width: 200px
  width: 100%
  // outline: 1px solid red
  &__header
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 20px
    &-text
      // margin-right: 20px
      font-weight: 600
      font-size: 40px
    &-icon
      stroke: green
      stroke-width: 3px
      width: 50px
      height: 50px
.card
  &:not(:last-child)
    margin-bottom: 20px

@media (max-width: 991.98px)
  .group
    &__header
      margin-bottom: 15px
      &-text
        font-size: 32px
      &-icon
        width: 40px
        height: 40px

@media (max-width: 767.98px)
  .home
    grid-template-columns: repeat(2, 1fr)

@media (max-width: 575.98px)
  .home
    grid-template-columns: 1fr

@media (max-width: 575.98px)
  .group
    &__header
      margin-bottom: 10px
      &-text
        font-weight: 600
        font-size: 26px
      &-icon
        stroke-width: 2px
        width: 30px
        height: 30px
  .card
    &:not(:last-child)
      margin-bottom: 15px
</style>
